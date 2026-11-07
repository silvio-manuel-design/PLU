#!/usr/bin/env python3
"""
Synchronize navigation (header + mobile-nav) from root pages to all subpages.
"""
import os
import re
import glob

ROOT_DIR = "tutorials"
PAGES_DIR = os.path.join(ROOT_DIR, "pages")

def extract_block(lines, start_marker, end_marker, unique_start=True):
    """Extract a block of lines from start_marker to end_marker (inclusive)."""
    start_idx = None
    end_idx = None
    for i, line in enumerate(lines):
        if start_marker in line:
            if unique_start and start_idx is not None:
                continue
            start_idx = i
        if start_idx is not None and end_marker in line:
            # For header: first </header> after start
            # For mobile-nav: need to track nav depth
            if start_marker == '<header class="site-header"':
                end_idx = i
                break
            elif start_marker == '<nav class="mobile-nav"':
                # Track depth
                depth = 0
                for j in range(start_idx, len(lines)):
                    depth += lines[j].count('<nav')
                    depth -= lines[j].count('</nav>')
                    if depth == 0:
                        end_idx = j
                        break
                break
    if start_idx is None or end_idx is None:
        raise ValueError(f"Could not find block: {start_marker}")
    return start_idx, end_idx, lines[start_idx:end_idx+1]


def read_file(path):
    with open(path, 'r', encoding='utf-8-sig') as f:
        return f.readlines()


def write_file(path, lines):
    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(lines)


def get_lang_switch(lines):
    """Extract the lang-switch nav block from a page."""
    start = None
    end = None
    for i, line in enumerate(lines):
        if '<nav class="lang-switch"' in line:
            start = i
        if start is not None and '</nav>' in line:
            end = i
            break
    if start is None or end is None:
        return None
    return lines[start:end+1]


def get_mobile_nav_active_href(lines):
    """Find any href in mobile-nav that has class=\"active\"."""
    in_mobile = False
    nav_depth = 0
    active_hrefs = []
    for line in lines:
        if '<nav class="mobile-nav"' in line:
            in_mobile = True
            nav_depth = 1
            continue
        if in_mobile:
            nav_depth += line.count('<nav')
            nav_depth -= line.count('</nav>')
            if nav_depth == 0:
                break
            m = re.search(r'<a\s+[^>]*href="([^"]*)"[^>]*class="[^"]*active[^"]*"', line)
            if m:
                active_hrefs.append(m.group(1))
            else:
                m = re.search(r'<a\s+[^>]*class="[^"]*active[^"]*"[^>]*href="([^"]*)"', line)
                if m:
                    active_hrefs.append(m.group(1))
    return active_hrefs


def apply_path_adjustments(block_lines, is_en):
    """Adjust paths for subpages (one level deeper)."""
    result = []
    for line in block_lines:
        original = line
        # Absolute paths stay
        # index.html -> ../index.html
        line = re.sub(r'href="index\.html"', 'href="../index.html"', line)
        line = re.sub(r'href="index-en\.html"', 'href="../index-en.html"', line)
        # pages/vision.html -> vision.html
        line = re.sub(r'href="pages/([^"]*)"', r'href="\1"', line)
        # ki-academy-... -> ../ki-academy-...
        line = re.sub(r'href="ki-academy-', 'href="../ki-academy-', line)
        # assets/... -> ../assets/...
        line = re.sub(r'src="assets/', 'src="../assets/', line)
        line = re.sub(r'href="assets/', 'href="../assets/', line)
        # js/... -> ../js/...
        line = re.sub(r'src="js/', 'src="../js/', line)
        line = re.sub(r'href="js/', 'href="../js/', line)
        # css/... -> ../css/...
        line = re.sub(r'href="css/', 'href="../css/', line)
        # Section anchors: href="#..." -> href="../index.html#..." or ../index-en.html#...
        # But only in header/mobile-nav content (skip if already adjusted)
        # Use negative lookbehind to avoid double-adjusting
        home_index = "../index-en.html" if is_en else "../index.html"
        def anchor_repl(m):
            anchor = m.group(1)
            # Don't touch if it's already an absolute path or already has ../
            if anchor.startswith('/'):
                return m.group(0)
            return f'href="{home_index}{anchor}"'
        line = re.sub(r'href="(#[^"]*)"', anchor_repl, line)
        result.append(line)
    return result


def remove_aria_current_from_home(block_lines):
    """Remove aria-current=\"page\" from the header home link and mobile-nav home link."""
    result = []
    for line in block_lines:
        # Remove aria-current="page" from home links (nav-item--home or mobile-nav__section--home)
        # But don't touch lang-switch
        if 'lang-switch' not in line and 'aria-current="page"' in line:
            line = re.sub(r'\s*aria-current="page"', '', line)
        result.append(line)
    return result


def replace_lang_switch(block_lines, lang_switch_lines):
    """Replace the lang-switch block in block_lines with lang_switch_lines."""
    result = []
    in_lang = False
    for line in block_lines:
        if '<nav class="lang-switch"' in line:
            in_lang = True
            result.extend(lang_switch_lines)
            continue
        if in_lang and '</nav>' in line:
            in_lang = False
            continue
        if not in_lang:
            result.append(line)
    return result


def add_mobile_nav_active(block_lines, active_hrefs):
    """Add class=\"active\" to matching hrefs in mobile-nav."""
    if not active_hrefs:
        return block_lines
    result = []
    in_mobile = False
    nav_depth = 0
    for line in block_lines:
        if '<nav class="mobile-nav"' in line:
            in_mobile = True
            nav_depth = 1
        elif in_mobile:
            nav_depth += line.count('<nav')
            nav_depth -= line.count('</nav>')
            if nav_depth == 0:
                in_mobile = False
            else:
                # Check if this line contains an <a> with one of the active hrefs
                for href in active_hrefs:
                    # Match <a href="..."> without class="active"
                    pattern = rf'(<a\s+[^>]*href="{re.escape(href)}"[^>]*)>'
                    if re.search(pattern, line) and 'class="active"' not in line:
                        line = re.sub(pattern, r'\1 class="active">', line)
                        break
        result.append(line)
    return result


def process_page(subpage_path, root_header_lines, root_mobile_lines, is_en):
    subpage_lines = read_file(subpage_path)

    # Extract subpage's own lang-switch and mobile-nav active states
    lang_switch = get_lang_switch(subpage_lines)
    active_hrefs = get_mobile_nav_active_href(subpage_lines)

    # Find subpage header and mobile-nav boundaries
    sub_header_start, sub_header_end, _ = extract_block(subpage_lines, '<header class="site-header"', '</header>')
    sub_mobile_start, sub_mobile_end, _ = extract_block(subpage_lines, '<nav class="mobile-nav"', '</nav>')

    # Prepare new blocks from root
    new_header = apply_path_adjustments(list(root_header_lines), is_en)
    new_mobile = apply_path_adjustments(list(root_mobile_lines), is_en)

    # Remove aria-current from home links
    new_header = remove_aria_current_from_home(new_header)
    new_mobile = remove_aria_current_from_home(new_mobile)

    # Replace lang-switch
    if lang_switch:
        new_header = replace_lang_switch(new_header, lang_switch)

    # Add mobile nav active states
    new_mobile = add_mobile_nav_active(new_mobile, active_hrefs)

    # Reassemble the file
    new_lines = []
    new_lines.extend(subpage_lines[:sub_header_start])
    new_lines.extend(new_header)
    # Lines between header and mobile-nav
    new_lines.extend(subpage_lines[sub_header_end+1:sub_mobile_start])
    new_lines.extend(new_mobile)
    new_lines.extend(subpage_lines[sub_mobile_end+1:])

    write_file(subpage_path, new_lines)
    print(f"Updated: {subpage_path}")


def main():
    # Read root pages
    de_lines = read_file(os.path.join(ROOT_DIR, "index.html"))
    en_lines = read_file(os.path.join(ROOT_DIR, "index-en.html"))

    _, _, de_header = extract_block(de_lines, '<header class="site-header"', '</header>')
    _, _, de_mobile = extract_block(de_lines, '<nav class="mobile-nav"', '</nav>')
    _, _, en_header = extract_block(en_lines, '<header class="site-header"', '</header>')
    _, _, en_mobile = extract_block(en_lines, '<nav class="mobile-nav"', '</nav>')

    # Process all subpages
    subpages = sorted(glob.glob(os.path.join(PAGES_DIR, "*.html")))
    for path in subpages:
        basename = os.path.basename(path)
        if basename.endswith('-en.html'):
            is_en = True
            process_page(path, en_header, en_mobile, is_en)
        else:
            is_en = False
            process_page(path, de_header, de_mobile, is_en)

    print("\nDone! All subpages synchronized.")


if __name__ == "__main__":
    main()
