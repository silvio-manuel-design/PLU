/* ============================================================
   SCENARIO TABS
   Generic tab switcher for video-video-scenario-tabs + video-scenario-panel pairs.
   Works across all modules that use this pattern.
   ============================================================ */

export function initScenarioTabs() {
  const tabs = document.querySelectorAll('.video-scenario-tab');
  const panels = document.querySelectorAll('.video-scenario-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const scenario = tab.dataset.scenario;

      tabs.forEach(t => t.classList.remove('is-active'));
      panels.forEach(p => p.classList.remove('is-active'));

      tab.classList.add('is-active');
      document.getElementById('panel-' + scenario)?.classList.add('is-active');
    });
  });
}
