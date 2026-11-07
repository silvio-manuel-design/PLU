/**
 * Mission Page Interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // TABS
  // ==========================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      tabPanels.forEach(p => p.classList.remove('active'));
      const targetPanel = document.getElementById('tab-' + targetTab);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
  
  // ==========================================
  // OBJECTIVES CHECKLIST - PROGRESS SYSTEM
  // ==========================================
  const objectiveItems = document.querySelectorAll('.objective-item');
  
  // Progress display elements
  const objectivesCompletedEl = document.getElementById('objectives-completed');
  const progressPercentageEl = document.getElementById('progress-percentage');
  const progressFillEl = document.getElementById('mission-progress-fill');
  const progressMessageEl = document.getElementById('progress-message');
  
  // Get mission number
  const completeBtn = document.querySelector('.complete-mission-btn');
  const missionNum = completeBtn?.dataset.mission;
  const storageKey = missionNum ? `mission-${missionNum}-progress` : null;
  
  // Get quiz items for validation
  const quizItems = document.querySelectorAll('.quiz-item');
  const totalQuizzes = quizItems.length;
  
  // Function to check if mission can be completed
  function canCompleteMission() {
    const totalObjectives = objectiveItems.length;
    const completedObjectives = document.querySelectorAll('.objective-item.completed').length;
    const objectivesComplete = totalObjectives === 0 || completedObjectives === totalObjectives;
    
    const answeredQuizzes = document.querySelectorAll('.quiz-item.answered').length;
    const quizzesComplete = totalQuizzes === 0 || answeredQuizzes === totalQuizzes;
    
    return objectivesComplete && quizzesComplete;
  }
  
  // Function to update complete button state
  function updateCompleteButtonState() {
    if (!completeBtn) return;
    
    const canComplete = canCompleteMission();
    completeBtn.disabled = !canComplete;
    
    if (canComplete) {
      completeBtn.classList.remove('disabled');
      completeBtn.title = '';
    } else {
      completeBtn.classList.add('disabled');
      const totalObjectives = objectiveItems.length;
      const completedObjectives = document.querySelectorAll('.objective-item.completed').length;
      const answeredQuizzes = document.querySelectorAll('.quiz-item.answered').length;
      
      if (completedObjectives < totalObjectives) {
        completeBtn.title = `Noch ${totalObjectives - completedObjectives} Lernziel(e) offen`;
      } else if (answeredQuizzes < totalQuizzes) {
        completeBtn.title = `Noch ${totalQuizzes - answeredQuizzes} Quiz-Frage(n) offen`;
      }
    }
  }
  
  // Initialize button state
  updateCompleteButtonState();
  
  function updateProgressDisplay() {
    const total = objectiveItems.length;
    const completed = document.querySelectorAll('.objective-item.completed').length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Update display numbers
    if (objectivesCompletedEl) {
      objectivesCompletedEl.textContent = `${completed}/${total}`;
    }
    
    if (progressPercentageEl) {
      progressPercentageEl.textContent = `${percent}%`;
    }
    
    // Update progress bar
    if (progressFillEl) {
      progressFillEl.style.width = `${percent}%`;
    }
    
    // Update message
    if (progressMessageEl) {
      if (percent === 100) {
        progressMessageEl.innerHTML = '<span class="message-icon">🎉</span><span class="message-text">Super! Alle Lernziele erreicht. Du kannst die Mission jetzt abschließen!</span>';
        progressMessageEl.classList.add('complete');
      } else if (percent >= 66) {
        progressMessageEl.innerHTML = '<span class="message-icon">💪</span><span class="message-text">Fast geschafft! Nur noch ein Ziel.</span>';
        progressMessageEl.classList.remove('complete');
      } else if (percent >= 33) {
        progressMessageEl.innerHTML = '<span class="message-icon">👍</span><span class="message-text">Guter Start! Weiter so.</span>';
        progressMessageEl.classList.remove('complete');
      } else {
        progressMessageEl.innerHTML = '<span class="message-icon">🎯</span><span class="message-text">Hake alle Lernziele ab, um die Mission abzuschließen!</span>';
        progressMessageEl.classList.remove('complete');
      }
    }
  }
  
  // Handle objective item clicks - simple div-based approach
  objectiveItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      // Toggle completed state
      item.classList.toggle('completed');
      
      // Save to localStorage
      if (storageKey) {
        const completedStates = Array.from(objectiveItems).map(i => i.classList.contains('completed'));
        localStorage.setItem(storageKey, JSON.stringify({
          completed: completedStates,
          percent: Math.round((completedStates.filter(Boolean).length / objectiveItems.length) * 100)
        }));
      }
      
      updateProgressDisplay();
      updateCompleteButtonState();
    });
  });
  
  // Load saved progress
  function loadProgress() {
    if (!storageKey) return;
    
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        // New format: completed array
        if (data.completed && Array.isArray(data.completed)) {
          data.completed.forEach((isCompleted, index) => {
            if (objectiveItems[index] && isCompleted) {
              objectiveItems[index].classList.add('completed');
            }
          });
        }
        // Old format: checked array (for backward compatibility)
        else if (data.checked && Array.isArray(data.checked)) {
          data.checked.forEach((isChecked, index) => {
            if (objectiveItems[index] && isChecked) {
              objectiveItems[index].classList.add('completed');
            }
          });
        }
      }
    } catch (e) {
      console.warn('Could not load progress:', e);
    }
    
    updateProgressDisplay();
    updateCompleteButtonState();
  }
  
  // Initial load
  loadProgress();
  updateCompleteButtonState();
  
  // ==========================================
  // MISSION COMPLETION BUTTON HANDLER
  // ==========================================
  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      // Check if button is disabled (validation not met)
      if (completeBtn.disabled || completeBtn.classList.contains('disabled')) {
        return;
      }
      
      // Mark mission as complete via ProgressManager
      if (window.KIAcademy && window.KIAcademy.ProgressManager) {
        window.KIAcademy.ProgressManager.completeMission(parseInt(missionNum));
      }
      
      // Show completion section
      const missionCompleteSection = document.querySelector('.mission-complete');
      if (missionCompleteSection) {
        missionCompleteSection.style.display = 'block';
        missionCompleteSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      // Hide complete button container (mission is done)
      const completeActions = completeBtn.closest('.complete-actions');
      if (completeActions) {
        completeActions.style.display = 'none';
      }
      
      // Enable next mission button
      const nextBtn = document.querySelector('.next-mission-btn');
      if (nextBtn) {
        nextBtn.classList.remove('disabled');
        nextBtn.removeAttribute('disabled');
      }
    });
  }
  
  // ==========================================
  // PROMPT PRESETS (Mission 1)
  // ==========================================
  const presetBtns = document.querySelectorAll('.preset-btn');
  const terminalInput = document.getElementById('terminal-input');
  
  if (presetBtns.length > 0 && terminalInput) {
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const promptText = btn.dataset.prompt;
        if (promptText) {
          terminalInput.textContent = promptText;
        }
      });
    });
  }
  
  // ==========================================
  // SCROLL PROGRESS BAR
  // ==========================================
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  
  if (scrollProgressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgressBar.style.width = scrollPercent + '%';
    });
  }
  
  // ==========================================
  // QUIZ / SCHNELL-CHECK
  // ==========================================
  const quizFeedback = document.getElementById('quiz-feedback');
  
  if (quizItems.length > 0) {
    let correctAnswers = 0;
    let answeredQuestions = 0;
    const totalQuestions = quizItems.length;
    
    quizItems.forEach((item) => {
      const options = item.querySelectorAll('.quiz-option');
      
      options.forEach((option) => {
        option.addEventListener('click', function() {
          // Only allow one answer per question
          if (item.classList.contains('answered')) return;
          
          // Mark as answered
          item.classList.add('answered');
          answeredQuestions++;
          
          // Update complete button state
          updateCompleteButtonState();
          
          // Disable all options in this question
          options.forEach(o => o.classList.add('disabled'));
          
          // Mark selected option
          this.classList.add('selected');
          
          // Check if correct
          const isCorrect = this.dataset.correct === 'true';
          if (isCorrect) {
            correctAnswers++;
            this.classList.add('correct');
          } else {
            this.classList.add('wrong');
            // Show correct answer
            options.forEach(o => {
              if (o.dataset.correct === 'true') {
                o.classList.add('correct');
              }
            });
          }
          
          // Show feedback when all questions answered
          if (answeredQuestions === totalQuestions && quizFeedback) {
            const allCorrect = correctAnswers === totalQuestions;
            quizFeedback.innerHTML = `
              <div class="feedback-content ${allCorrect ? 'success' : 'partial'}">
                <span class="feedback-icon">${allCorrect ? '🎉' : '👍'}</span>
                <p>${correctAnswers}/${totalQuestions} richtig! ${allCorrect ? 'Perfekt!' : 'Fast geschafft!'}</p>
              </div>
            `;
            quizFeedback.style.display = 'block';
          }
        });
      });
    });
  }
  
});
