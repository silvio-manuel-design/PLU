/**
 * KI-Creative Lab Workshop — Main JavaScript
 * Handles i18n, theme switching, mobile navigation, dynamic rendering,
 * prompt filtering, clipboard copying, and workshop timer.
 */

class WorkshopApp {
  constructor() {
    this.lang = localStorage.getItem('ki-lab-lang') || 'de';
    this.theme = localStorage.getItem('ki-lab-theme') || 'dark';
    this.classroomMode = localStorage.getItem('ki-lab-classroom') || 'off';
    this.translations = {};
    this.projects = [];
    this.activePromptFilter = 'all';

    // Timer state
    this.timerInterval = null;
    this.timerSeconds = 25 * 60;
    this.timerRunning = false;

    // Quiz state
    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizAnswers = [];
    this.quizAnswered = false;
  }

  async init() {
    try {
      await this.loadData();
      this.applyInitialState();
      this.bindEvents();
      this.renderDynamicContent();
      this.initScrollAnimations();
      this.initScrollProgress();
    } catch (error) {
      console.error('Failed to initialize workshop app:', error);
      this.showNotification('Fehler beim Laden der Workshop-Daten.', 'error');
    }
  }

  async loadData() {
    const [translationsRes, projectsRes] = await Promise.all([
      fetch('data/translations.json'),
      fetch('data/projects.json')
    ]);

    if (!translationsRes.ok || !projectsRes.ok) {
      throw new Error('Failed to load data files');
    }

    this.translations = await translationsRes.json();
    const projectsData = await projectsRes.json();
    this.projects = projectsData.projects || [];
  }

  applyInitialState() {
    this.setLanguage(this.lang, false);
    this.setTheme(this.theme, false);
    this.setClassroomMode(this.classroomMode, false);
  }

  /* ============================================================
     i18n
     ============================================================ */

  setLanguage(lang, save = true) {
    this.lang = lang;
    document.documentElement.lang = lang;

    if (save) {
      localStorage.setItem('ki-lab-lang', lang);
    }

    this.updateStaticTexts();
    this.renderDynamicContent();
    this.updateLangToggle();
  }

  t(key) {
    const keys = key.split('.');
    let value = this.translations[this.lang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Fallback to key path
      }
    }

    return value;
  }

  updateStaticTexts() {
    // Meta
    document.title = this.t('meta.title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = this.t('meta.description');

    // All elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = this.t(key);
      if (typeof value === 'string') {
        el.textContent = value;
      }
    });
  }

  updateLangToggle() {
    const toggle = document.querySelector('[data-lang-toggle]');
    const label = toggle?.querySelector('[data-i18n="lang.current"]');
    if (toggle) {
      toggle.setAttribute('aria-label', this.t('lang.switchTo'));
    }
    if (label) {
      label.textContent = this.lang.toUpperCase();
    }
  }

  /* ============================================================
     Theme
     ============================================================ */

  setTheme(theme, save = true) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);

    if (save) {
      localStorage.setItem('ki-lab-theme', theme);
    }

    const heroDark = document.querySelector('[data-hero-dark]');
    const heroLight = document.querySelector('[data-hero-light]');
    if (heroDark) heroDark.hidden = theme !== 'dark';
    if (heroLight) heroLight.hidden = theme !== 'light';

    const toggle = document.querySelector('[data-theme-toggle]');
    const srText = toggle?.querySelector('[data-i18n="theme.light"], [data-i18n="theme.dark"]');
    if (toggle) {
      toggle.setAttribute('aria-checked', theme === 'light');
      toggle.setAttribute('aria-label', this.t(theme === 'dark' ? 'theme.light' : 'theme.dark'));
    }
    if (srText) {
      srText.setAttribute('data-i18n', theme === 'dark' ? 'theme.light' : 'theme.dark');
      srText.textContent = this.t(theme === 'dark' ? 'theme.light' : 'theme.dark');
    }
  }

  toggleTheme() {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /* ============================================================
     Classroom Mode
     ============================================================ */

  setClassroomMode(mode, save = true) {
    const isActive = mode === 'on';
    this.classroomMode = isActive ? 'on' : 'off';
    document.body.classList.toggle('is-classroom-mode', isActive);

    if (save) {
      localStorage.setItem('ki-lab-classroom', this.classroomMode);
    }

    this.updateClassroomToggle();
  }

  toggleClassroomMode() {
    const newMode = this.classroomMode === 'on' ? 'off' : 'on';
    this.setClassroomMode(newMode);
  }

  updateClassroomToggle() {
    const toggle = document.querySelector('[data-classroom-toggle]');
    if (!toggle) return;

    const isActive = this.classroomMode === 'on';
    toggle.setAttribute('aria-checked', isActive ? 'true' : 'false');
    toggle.setAttribute('aria-label', this.t(isActive ? 'classroom.disable' : 'classroom.enable'));

    const srText = toggle.querySelector('[data-i18n="classroom.enable"], [data-i18n="classroom.disable"]');
    if (srText) {
      srText.setAttribute('data-i18n', isActive ? 'classroom.disable' : 'classroom.enable');
      srText.textContent = this.t(isActive ? 'classroom.disable' : 'classroom.enable');
    }

    toggle.classList.toggle('is-active', isActive);
  }

  /* ============================================================
     Mobile Navigation
     ============================================================ */

  toggleMobileMenu() {
    const menu = document.querySelector('[data-mobile-toggle]');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!menu || !mobileMenu) return;

    const isOpen = mobileMenu.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    menu.setAttribute('aria-label', this.t(isOpen ? 'mobile.close' : 'mobile.open'));
  }

  closeMobileMenu() {
    const menu = document.querySelector('[data-mobile-toggle]');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!menu || !mobileMenu) return;

    mobileMenu.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('aria-label', this.t('mobile.open'));
  }

  /* ============================================================
     Rendering
     ============================================================ */

  renderDynamicContent() {
    this.renderConcepts();
    this.renderWFramework();
    this.renderQuiz();
    this.renderProjects();
    this.renderPrompts();
    this.renderPitch();
    this.renderEthics();
    this.renderAwards();
    this.observeReveals();
  }

  renderConcepts() {
    const container = document.querySelector('[data-concept-grid]');
    if (!container) return;

    const concepts = this.t('crashkurs.concepts') || [];
    const accents = ['cyan', 'pink', 'purple', 'amber', 'emerald', 'rose'];
    const icons = ['ph-user', 'ph-map-pin', 'ph-gear', 'ph-brain', 'ph-sparkle', 'ph-arrows-clockwise'];

    container.innerHTML = concepts.map((concept, index) => {
      const accent = accents[index % accents.length];
      const icon = icons[index % icons.length];
      const details = concept.details ? `<p class="ki-lab-concept-card__details">${this.escapeHtml(concept.details)}</p>` : '';
      return `
        <article class="ki-lab-concept-card ki-lab-reveal" data-concept-index="${index}" data-accent="${accent}" tabindex="0" role="button" aria-expanded="false">
          <div class="ki-lab-concept-card__icon" aria-hidden="true"><i class="ph ${this.escapeHtml(icon)}"></i></div>
          <h3 class="ki-lab-concept-card__term">${this.escapeHtml(concept.term)}</h3>
          <p class="ki-lab-concept-card__definition">${this.escapeHtml(concept.definition)}</p>
          <div class="ki-lab-concept-card__hint">
            <span>${this.t('crashkurs.exampleHint') || 'Details & Beispiel'}</span>
            <i class="ph ph-caret-down" aria-hidden="true"></i>
          </div>
          <div class="ki-lab-concept-card__expandable">
            ${details}
            <div class="ki-lab-concept-card__example">
              <p class="ki-lab-concept-card__example-label">${this.t('crashkurs.exampleLabel') || 'Beispiel'}</p>
              <p class="ki-lab-concept-card__example-text">${this.escapeHtml(concept.example)}</p>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  renderWFramework() {
    const container = document.querySelector('[data-wframework-items]');
    if (!container) return;

    const items = this.t('crashkurs.wframework.items') || [];
    const accents = ['cyan', 'purple', 'pink', 'amber', 'emerald'];

    container.innerHTML = items.map((item, index) => `
      <li class="ki-lab-checklist__item" data-accent="${accents[index % accents.length]}">
        <span class="ki-lab-checklist__question">${this.escapeHtml(item.question)}</span>
        <p class="ki-lab-checklist__answer">${this.escapeHtml(item.answer)}</p>
      </li>
    `).join('');
  }

  resetQuiz() {
    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizAnswers = [];
    this.quizAnswered = false;
    this.renderQuiz();
  }

  renderQuiz() {
    const container = document.querySelector('[data-quiz]');
    if (!container) return;

    const questions = this.t('quiz.questions') || [];

    if (this.quizIndex >= questions.length) {
      this.renderQuizResult(container, questions);
      return;
    }

    const question = questions[this.quizIndex];
    const currentAnswer = this.quizAnswers[this.quizIndex];

    container.innerHTML = `
      <div class="ki-lab-quiz__question" data-quiz-question="${this.quizIndex}">
        <span class="ki-lab-quiz__number">${this.quizIndex + 1}</span>
        <div class="ki-lab-quiz__header">
          <p class="ki-lab-quiz__progress">${this.t('quiz.progress').replace('{current}', this.quizIndex + 1).replace('{total}', questions.length)}</p>
          <p class="ki-lab-quiz__text">${this.escapeHtml(question.text)}</p>
        </div>
        <div class="ki-lab-quiz__options">
          ${question.options.map((option, oIndex) => {
            const isSelected = currentAnswer && currentAnswer.optionIndex === oIndex;
            const stateClass = isSelected
              ? (option.correct ? 'is-correct' : 'is-wrong')
              : '';
            const disabled = currentAnswer ? 'disabled' : '';
            return `
              <button
                class="ki-lab-quiz__option ${stateClass}"
                data-quiz-option="${oIndex}"
                data-quiz-correct="${option.correct ? 'true' : 'false'}"
                type="button"
                ${disabled}
              >${this.escapeHtml(option.text)}</button>
            `;
          }).join('')}
        </div>
        ${currentAnswer ? `
          <div class="ki-lab-quiz__feedback is-visible ${currentAnswer.correct ? 'is-correct' : 'is-wrong'}">
            ${currentAnswer.correct ? this.t('quiz.correct') : this.t('quiz.wrong')} ${this.escapeHtml(currentAnswer.explanation)}
          </div>
          <button class="ki-lab-quiz__next" data-quiz-next type="button">${this.t('quiz.next')}</button>
        ` : ''}
      </div>
    `;
  }

  renderQuizResult(container, questions) {
    const total = questions.length;
    const score = this.quizScore;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    let badge = this.t('quiz.badgeStarter');
    let message = this.t('quiz.resultStarter');
    if (score === total && total > 0) {
      badge = this.t('quiz.badgeExpert');
      message = this.t('quiz.resultPerfect');
    } else if (score >= Math.ceil(total / 2)) {
      badge = this.t('quiz.badgeAdvanced');
      message = this.t('quiz.resultGood');
    }

    const wrongAnswers = this.quizAnswers
      .map((answer, index) => ({ ...answer, question: questions[index] }))
      .filter(answer => !answer.correct);

    container.innerHTML = `
      <div class="ki-lab-quiz__result">
        <div class="ki-lab-quiz__badge">${this.escapeHtml(badge)}</div>
        <h3 class="ki-lab-quiz__result-title">${this.t('quiz.resultTitle')}</h3>
        <p class="ki-lab-quiz__result-score">${this.t('quiz.resultScore').replace('{score}', score).replace('{total}', total)}</p>
        <p class="ki-lab-quiz__result-message">${this.escapeHtml(message)}</p>

        ${wrongAnswers.length > 0 ? `
          <div class="ki-lab-quiz__review">
            <h4 class="ki-lab-quiz__review-title">${this.t('quiz.wrong')}</h4>
            ${wrongAnswers.map(answer => `
              <div class="ki-lab-quiz__review-item">
                <p class="ki-lab-quiz__review-question">${this.escapeHtml(answer.question.text)}</p>
                <p class="ki-lab-quiz__review-explanation">${this.escapeHtml(answer.explanation)}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <button class="ki-lab-quiz__retry" data-quiz-retry type="button">${this.t('quiz.resultRetry')}</button>
      </div>
    `;
  }

  renderProjects() {
    const container = document.querySelector('[data-project-grid]');
    if (!container) return;

    container.innerHTML = this.projects.map(project => {
      const title = project.title[this.lang] || project.title.de;
      const description = project.description[this.lang] || project.description.de;
      const category = project.category[this.lang] || project.category.de;
      const tags = project.tags?.[this.lang] || project.tags?.de || [];
      const difficulty = project.difficulty[this.lang] || project.difficulty.de;
      const deliverables = project.deliverables[this.lang] || project.deliverables.de;
      const prompts = project.prompts[this.lang] || project.prompts.de;

      const webpImage = project.image ? project.image.replace(/\.jpe?g$/i, '.webp') : '';

      return `
        <article class="ki-lab-project-card ki-lab-reveal" data-project-id="${project.id}" data-accent="${this.escapeHtml(project.accent || 'cyan')}">
          <div class="ki-lab-project-card__image">
            <picture>
              <source srcset="${this.escapeHtml(webpImage)}" type="image/webp">
              <img src="${this.escapeHtml(project.image)}" alt="${this.escapeHtml(title)}" loading="lazy">
            </picture>
            <span class="ki-lab-project-card__category">${this.escapeHtml(category)}</span>
          </div>
          <div class="ki-lab-project-card__content">
            <h3 class="ki-lab-project-card__title">${this.escapeHtml(title)}</h3>
            <p class="ki-lab-project-card__description">${this.escapeHtml(description)}</p>
            <div class="ki-lab-project-card__tags">
              ${tags.map(tag => `<span class="ki-lab-project-card__tag">${this.escapeHtml(tag)}</span>`).join('')}
            </div>
            <p class="ki-lab-project-card__meta">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              ${this.escapeHtml(difficulty)}
            </p>

            <button class="ki-lab-project-card__toggle" aria-expanded="false">
              <span>${this.t('projects.prompts')}</span>
              <svg class="ki-lab-project-card__toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <div class="ki-lab-project-card__details">
              <div class="ki-lab-project-card__details-inner">
                <h4 class="ki-lab-project-card__details-title">${this.t('projects.deliverables')}</h4>
                <ul class="ki-lab-project-card__list">
                  ${deliverables.map(item => `<li>${this.escapeHtml(item)}</li>`).join('')}
                </ul>

                <h4 class="ki-lab-project-card__details-title">${this.t('projects.prompts')}</h4>
                ${prompts.map(prompt => `
                  <div class="ki-lab-project-card__prompt">${this.escapeHtml(prompt)}</div>
                `).join('')}
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  renderPrompts() {
    this.renderPromptFilters();

    const container = document.querySelector('[data-prompt-grid]');
    if (!container) return;

    const prompts = this.t('prompts.items') || [];
    const categories = this.t('prompts.categories') || {};

    const filtered = this.activePromptFilter === 'all'
      ? prompts.map((prompt, index) => ({ prompt, index }))
      : prompts
          .map((prompt, index) => ({ prompt, index }))
          .filter(({ prompt }) => prompt.category === this.activePromptFilter);

    container.innerHTML = filtered.map(({ prompt, index }) => `
      <article class="ki-lab-prompt-card ki-lab-reveal" data-prompt-index="${index}">
        <div class="ki-lab-prompt-card__header">
          <div class="ki-lab-prompt-card__window-controls" aria-hidden="true">
            <span class="ki-lab-prompt-card__window-dot ki-lab-prompt-card__window-dot--red"></span>
            <span class="ki-lab-prompt-card__window-dot ki-lab-prompt-card__window-dot--yellow"></span>
            <span class="ki-lab-prompt-card__window-dot ki-lab-prompt-card__window-dot--green"></span>
          </div>
          <div class="ki-lab-prompt-card__meta">
            <span class="ki-lab-prompt-card__category">${this.escapeHtml(categories[prompt.category] || prompt.category)}</span>
            <h3 class="ki-lab-prompt-card__title">${this.escapeHtml(prompt.title)}</h3>
          </div>
          <button class="ki-lab-prompt-card__copy" data-copy-prompt="${index}" aria-label="${this.t('projects.copy')}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
        </div>
        <div class="ki-lab-prompt-card__body">
          <pre class="ki-lab-prompt-card__text">${this.escapeHtml(prompt.text)}</pre>
        </div>
      </article>
    `).join('');

    this.observeReveals(container);
  }

  renderPromptFilters() {
    const container = document.querySelector('[data-prompt-filters]');
    if (!container) return;

    const categories = this.t('prompts.categories') || {};

    container.innerHTML = Object.entries(categories).map(([key, label]) => `
      <button
        type="button"
        class="ki-lab-filter-bar__btn ${key === this.activePromptFilter ? 'is-active' : ''}"
        data-prompt-filter="${key}"
        role="tab"
        aria-selected="${key === this.activePromptFilter ? 'true' : 'false'}"
      >${this.escapeHtml(label)}</button>
    `).join('');

    container.querySelectorAll('[data-prompt-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.activePromptFilter = btn.getAttribute('data-prompt-filter');
        this.renderPrompts();
      });
    });
  }

  renderPitch() {
    const grid = document.querySelector('[data-pitch-grid]');
    if (grid) {
      const steps = this.t('pitch.steps') || [];
      grid.innerHTML = steps.map(step => `
        <article class="ki-lab-pitch-card ki-lab-reveal" data-accent="${this.escapeHtml(step.accent || 'cyan')}">
          <div class="ki-lab-pitch-card__top">
            <span class="ki-lab-pitch-card__icon" aria-hidden="true">
              <i class="ph ${this.escapeHtml(step.icon || 'ph-circle')}"></i>
            </span>
            <span class="ki-lab-pitch-card__number">${this.escapeHtml(step.number)}</span>
          </div>
          <h3 class="ki-lab-pitch-card__title">${this.escapeHtml(step.title)}</h3>
          <p class="ki-lab-pitch-card__description">${this.escapeHtml(step.description)}</p>
        </article>
      `).join('');
    }

    const toolsContainer = document.querySelector('[data-pitch-tools]');
    if (toolsContainer) {
      const tools = this.t('pitch.tools') || {};
      const items = tools.items || [];
      toolsContainer.innerHTML = `
        <header class="ki-lab-pitch-tools__header ki-lab-reveal">
          <span class="ki-lab-pitch-tools__eyebrow">${this.escapeHtml(tools.eyebrow || '')}</span>
          <h3 class="ki-lab-pitch-tools__title">${this.escapeHtml(tools.title || '')}</h3>
          <p class="ki-lab-pitch-tools__subtitle">${this.escapeHtml(tools.subtitle || '')}</p>
        </header>
        <div class="ki-lab-pitch-tools__grid">
          ${items.map((item) => `
            <article class="ki-lab-pitch-tool-card ki-lab-reveal">
              <div class="ki-lab-pitch-tool-card__icon" aria-hidden="true">
                <i class="ph ${this.escapeHtml(item.icon || 'ph-circle')}"></i>
              </div>
              <h4 class="ki-lab-pitch-tool-card__name">${this.escapeHtml(item.name)}</h4>
              <p class="ki-lab-pitch-tool-card__description">${this.escapeHtml(item.description)}</p>
            </article>
          `).join('')}
        </div>
      `;
    }

    const tipsContainer = document.querySelector('[data-pitch-tips]');
    if (tipsContainer) {
      const tips = this.t('pitch.tips') || {};
      const items = tips.items || [];
      tipsContainer.innerHTML = `
        <div class="ki-lab-pitch-tips__content ki-lab-reveal">
          <span class="ki-lab-pitch-tips__eyebrow">${this.escapeHtml(tips.eyebrow || '')}</span>
          <h3 class="ki-lab-pitch-tips__title">${this.escapeHtml(tips.title || '')}</h3>
          <ul class="ki-lab-pitch-tips__list">
            ${items.map(tip => `
              <li>${this.escapeHtml(tip)}</li>
            `).join('')}
          </ul>
        </div>
      `;
    }
  }

  renderEthics() {
    const container = document.querySelector('[data-ethics-list]');
    if (!container) return;

    const checks = this.t('ethics.checks') || [];

    container.innerHTML = checks.map(check => `
      <li class="ki-lab-reveal">${this.escapeHtml(check)}</li>
    `).join('');
  }

  renderAwards() {
    const grid = document.querySelector('[data-awards-grid]');
    const scorecard = document.querySelector('[data-awards-scorecard]');
    if (!grid || !scorecard) return;

    const categories = this.t('awards.categories') || [];
    const scorecardData = this.t('awards.scorecard') || {};
    const labels = scorecardData.labels || {};

    grid.innerHTML = categories.map((category, index) => `
      <article class="ki-lab-award-card ki-lab-reveal" data-accent="${this.escapeHtml(category.accent || 'cyan')}">
        <div class="ki-lab-award-card__number" aria-hidden="true">0${index + 1}</div>
        <div class="ki-lab-award-card__icon" aria-hidden="true">
          <i class="ph ${this.escapeHtml(category.icon || 'ph-trophy')}"></i>
        </div>
        <h3 class="ki-lab-award-card__title">${this.escapeHtml(category.title)}</h3>
        <ul class="ki-lab-award-card__criteria">
          ${(category.criteria || []).map(c => `<li>${this.escapeHtml(c)}</li>`).join('')}
        </ul>
      </article>
    `).join('');

    const totalCriteria = categories.reduce((sum, c) => sum + (c.criteria || []).length, 0);

    scorecard.innerHTML = `
      <div class="ki-lab-award-scorecard ki-lab-reveal">
        <div class="ki-lab-award-scorecard__header">
          <span class="ki-lab-award-scorecard__eyebrow">${this.escapeHtml(scorecardData.eyebrow || 'Jury-Tool')}</span>
          <h3 class="ki-lab-award-scorecard__title">${this.escapeHtml(scorecardData.title || 'Bewertungsbogen')}</h3>
          <p class="ki-lab-award-scorecard__subtitle">${this.escapeHtml(scorecardData.subtitle || '')}</p>
          <div class="ki-lab-award-scorecard__team">
            <label class="ki-lab-award-scorecard__team-label" for="award-team-name">${this.escapeHtml(scorecardData.teamLabel || 'Gruppenname')}</label>
            <input class="ki-lab-award-scorecard__team-input" type="text" id="award-team-name" name="award-team-name" placeholder="${this.escapeHtml(scorecardData.teamPlaceholder || '')}" autocomplete="off">
          </div>
        </div>
        <div class="ki-lab-award-scorecard__table-wrap">
          <table class="ki-lab-award-scorecard__table">
            <thead>
              <tr>
                <th scope="col">${this.escapeHtml(labels.category || 'Kategorie')}</th>
                <th scope="col">${this.escapeHtml(labels.criteria || 'Kriterien')}</th>
                <th scope="col" class="ki-lab-award-scorecard__points">${this.escapeHtml(labels.points || 'Punkte')}</th>
                <th scope="col">${this.escapeHtml(labels.notes || 'Notizen')}</th>
              </tr>
            </thead>
            <tbody>
              ${categories.map(category => (category.criteria || []).map((criterion, i) => `
                <tr>
                  ${i === 0 ? `<th scope="row" rowspan="${(category.criteria || []).length}" data-accent="${this.escapeHtml(category.accent || 'cyan')}">${this.escapeHtml(category.title)}</th>` : ''}
                  <td>${this.escapeHtml(criterion)}</td>
                  <td class="ki-lab-award-scorecard__points"><span class="ki-lab-award-scorecard__dot"></span></td>
                  <td></td>
                </tr>
              `).join('')).join('')}
            </tbody>
          </table>
        </div>
        <p class="ki-lab-award-scorecard__legend">
          ${this.escapeHtml((scorecardData.legend || '{count} criteria').replace('{count}', String(totalCriteria)))}
        </p>
      </div>
    `;
  }

  /* ============================================================
     Timer
     ============================================================ */

  initTimer() {
    this.updateTimerDisplay();
  }

  updateTimerDisplay() {
    const display = document.querySelector('[data-timer-display]');
    if (!display) return;

    const minutes = Math.floor(this.timerSeconds / 60);
    const seconds = this.timerSeconds % 60;
    display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  startTimer() {
    if (this.timerRunning) return;

    this.timerRunning = true;
    this.timerInterval = setInterval(() => {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
        this.updateTimerDisplay();
      } else {
        this.pauseTimer();
        this.showNotification(this.lang === 'de' ? 'Zeit abgelaufen!' : 'Time is up!', 'success');
      }
    }, 1000);
  }

  pauseTimer() {
    this.timerRunning = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resetTimer() {
    this.pauseTimer();
    this.timerSeconds = 25 * 60;
    this.updateTimerDisplay();
  }

  setTimerPreset(minutes) {
    this.pauseTimer();
    this.timerSeconds = minutes * 60;
    this.updateTimerDisplay();
  }

  /* ============================================================
     Clipboard
     ============================================================ */

  async copyPrompt(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showNotification(this.t('notifications.copied'), 'success');
    } catch (error) {
      this.showNotification(this.t('notifications.copyError'), 'error');
    }
  }

  /* ============================================================
     Notifications
     ============================================================ */

  showNotification(message, type = 'info') {
    const notification = document.querySelector('[data-notification]');
    if (!notification) return;

    notification.textContent = message;
    notification.classList.add('is-visible');

    setTimeout(() => {
      notification.classList.remove('is-visible');
    }, 3000);
  }

  /* ============================================================
     Utilities
     ============================================================ */

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /* ============================================================
     Events
     ============================================================ */

  bindEvents() {
    // Language toggle
    document.querySelector('[data-lang-toggle]')?.addEventListener('click', () => {
      const newLang = this.lang === 'de' ? 'en' : 'de';
      this.setLanguage(newLang);
    });

    // Theme toggle
    document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Classroom mode toggle
    document.querySelector('[data-classroom-toggle]')?.addEventListener('click', () => {
      this.toggleClassroomMode();
    });

    // Mobile menu
    document.querySelector('[data-mobile-toggle]')?.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    // Close mobile menu on link click
    document.querySelectorAll('.ki-lab-mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Concept cards toggle
    document.querySelector('[data-concept-grid]')?.addEventListener('click', (e) => {
      const card = e.target.closest('.ki-lab-concept-card');
      if (!card) return;

      const isActive = card.classList.toggle('is-active');
      card.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Project card toggles
    document.querySelector('[data-project-grid]')?.addEventListener('click', (e) => {
      const toggle = e.target.closest('.ki-lab-project-card__toggle');
      if (!toggle) return;

      const card = toggle.closest('.ki-lab-project-card');
      const isExpanded = card.classList.toggle('is-expanded');
      toggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });

    // Prompt copy buttons
    document.querySelector('[data-prompt-grid]')?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-copy-prompt]');
      if (!btn) return;

      const index = parseInt(btn.getAttribute('data-copy-prompt'), 10);
      const prompts = this.t('prompts.items') || [];
      const prompt = prompts[index];

      if (prompt) {
        this.copyPrompt(prompt.text);
      }
    });

    // Timer controls
    document.querySelector('[data-timer-start]')?.addEventListener('click', () => this.startTimer());
    document.querySelector('[data-timer-pause]')?.addEventListener('click', () => this.pauseTimer());
    document.querySelector('[data-timer-reset]')?.addEventListener('click', () => this.resetTimer());

    // Timer presets
    document.querySelectorAll('[data-timer-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const minutes = parseInt(btn.getAttribute('data-timer-preset'), 10);
        this.setTimerPreset(minutes);
      });
    });

    // Quiz interactions
    document.querySelector('[data-quiz]')?.addEventListener('click', (e) => {
      const optionBtn = e.target.closest('[data-quiz-option]');
      if (optionBtn) {
        const questionEl = optionBtn.closest('[data-quiz-question]');
        if (!questionEl) return;

        const questionIndex = parseInt(questionEl.getAttribute('data-quiz-question'), 10);
        if (this.quizAnswers[questionIndex]) return;

        const questions = this.t('quiz.questions') || [];
        const question = questions[questionIndex];
        const optionIndex = parseInt(optionBtn.getAttribute('data-quiz-option'), 10);
        const option = question?.options?.[optionIndex];
        const isCorrect = optionBtn.getAttribute('data-quiz-correct') === 'true';

        if (isCorrect) {
          this.quizScore += 1;
        }

        this.quizAnswers[questionIndex] = {
          optionIndex,
          correct: isCorrect,
          explanation: option?.explanation || ''
        };

        this.renderQuiz();
        return;
      }

      const nextBtn = e.target.closest('[data-quiz-next]');
      if (nextBtn) {
        this.quizIndex += 1;
        this.renderQuiz();
        return;
      }

      const retryBtn = e.target.closest('[data-quiz-retry]');
      if (retryBtn) {
        this.resetQuiz();
      }
    });

    // Back to top FAB
    this.initBackToTop();
  }

  initScrollAnimations() {
    if (this.revealObserver) return;

    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          this.revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.observeReveals();
  }

  observeReveals(scope = document) {
    if (!this.revealObserver) return;

    scope.querySelectorAll('.ki-lab-reveal:not(.is-visible), .ki-lab-section__header:not(.is-visible)')
      .forEach(el => this.revealObserver.observe(el));
  }

  initScrollProgress() {
    const progressBar = document.querySelector('[data-scroll-progress]');
    if (!progressBar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      progressBar.setAttribute('aria-valuenow', Math.round(progress));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  initBackToTop() {
    const fab = document.querySelector('[data-back-to-top]');
    if (!fab) return;

    const toggleVisibility = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const showThreshold = 500;

      if (scrollTop > showThreshold) {
        fab.classList.add('is-visible');
        fab.removeAttribute('hidden');
      } else {
        fab.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    window.addEventListener('resize', toggleVisibility, { passive: true });

    fab.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initial check
    toggleVisibility();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.workshopApp = new WorkshopApp();
    window.workshopApp.init();
  });
} else {
  window.workshopApp = new WorkshopApp();
  window.workshopApp.init();
}
