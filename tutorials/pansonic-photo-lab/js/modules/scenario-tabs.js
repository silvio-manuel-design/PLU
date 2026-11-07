/* ============================================================
   SCENARIO TABS + WORKFLOW TABS
   Generic tab switcher for scenario tabs, viewfinder workflow steps,
   and photo-scenario-panel pairs.
   ============================================================ */

export function initScenarioTabs() {
  // ── Standard scenario tabs ──
  const tabs = document.querySelectorAll('.photo-scenario-tab');
  const panels = document.querySelectorAll('.photo-scenario-panel');

  if (tabs.length && panels.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const scenario = tab.dataset.scenario;

        tabs.forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        panels.forEach(p => {
          p.classList.remove('is-active');
          p.hidden = true;
        });

        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        const panel = document.getElementById('panel-' + scenario);
        if (panel) {
          panel.classList.add('is-active');
          panel.hidden = false;
        }
      });
    });
  }

  // ── Viewfinder workflow steps ──
  const wfSteps = document.querySelectorAll('.photo-viewfinder__step[data-wf-step]');
  const wfPanels = document.querySelectorAll('.photo-scenario-panel[id^="wf-"]');

  if (wfSteps.length && wfPanels.length) {
    wfSteps.forEach(step => {
      step.addEventListener('click', () => {
        const stepId = step.dataset.wfStep;
        const panelId = step.getAttribute('aria-controls');

        wfSteps.forEach(s => {
          s.classList.remove('is-active');
          s.setAttribute('aria-selected', 'false');
        });
        wfPanels.forEach(p => {
          p.classList.remove('is-active');
          p.hidden = true;
        });

        step.classList.add('is-active');
        step.setAttribute('aria-selected', 'true');
        const panel = document.getElementById(panelId);
        if (panel) {
          panel.classList.add('is-active');
          panel.hidden = false;
        }
      });
    });
  }
}
