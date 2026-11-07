/**
 * Modul 1: Grundlagen - Spezifische Scripts
 * Demystifizierung durch Interaktion
 */

(function() {
    'use strict';

    // ============================================
    // QUIZ: KI oder nicht?
    // ============================================
    
    document.querySelectorAll('.quiz-card').forEach(card => {
        const correctAnswer = card.dataset.answer; // "yes" oder "no"
        const buttons = card.querySelectorAll('.quiz-btn');
        const feedback = card.querySelector('.quiz-feedback');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                const choice = this.dataset.choice;
                const isCorrect = choice === correctAnswer;
                
                // Disable all buttons
                buttons.forEach(b => b.disabled = true);
                
                // Visual feedback
                if (isCorrect) {
                    this.classList.add('selected-correct');
                    card.classList.add('answered-correct');
                    feedback.textContent = '✓ Richtig! ' + getExplanation(card, true);
                    feedback.className = 'quiz-feedback show correct';
                    
                    // Progress update
                    if (window.KIAcademy && window.KIAcademy.progress) {
                        window.KIAcademy.progress.setCheckpoint('01', 'quiz-answered');
                    }
                    
                    if (window.A11y) {
                        window.A11y.announce('Richtig! ' + getExplanation(card, true));
                    }
                } else {
                    this.classList.add('selected-wrong');
                    card.classList.add('answered-wrong');
                    
                    // Mark correct button
                    buttons.forEach(b => {
                        if (b.dataset.choice === correctAnswer) {
                            b.classList.add('selected-correct');
                        }
                    });
                    
                    feedback.textContent = '✗ Das war nicht ganz richtig. ' + getExplanation(card, false);
                    feedback.className = 'quiz-feedback show wrong';
                    
                    if (window.A11y) {
                        window.A11y.announce('Falsch. ' + getExplanation(card, false));
                    }
                }
                
                feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        });
    });
    
    function getExplanation(card, isCorrect) {
        const icon = card.querySelector('.quiz-icon').textContent;
        const explanations = {
            '📸': 'Gesichtserkennung nutzt Machine Learning, um Muster in Pixeln zu erkennen.',
            '🧮': 'Ein Taschenrechner führt nur vorprogrammierte Berechnungen durch - keine KI.',
            '🎬': 'Empfehlungsalgorithmen lernen aus Ihrem Verhalten - klassisches Machine Learning.',
            '🚦': 'Eine zeitgesteuerte Ampel folgt starren Regeln, ohne zu "lernen".',
            '🗣️': 'Sprachassistenten verstehen Muster in Sprache und generieren Antworten - komplexe KI.'
        };
        return explanations[icon] || '';
    }

    // ============================================
    // MODULE COMPLETION
    // ============================================
    
    const moduleCheckbox = document.getElementById('modul1-complete');
    
    if (moduleCheckbox) {
        moduleCheckbox.addEventListener('change', function() {
            if (this.checked) {
                if (window.KIAcademy && window.KIAcademy.progress) {
                    window.KIAcademy.progress.completeModule('01');
                }
                
                if (window.KIInteractions && window.KIInteractions.Confetti) {
                    window.KIInteractions.Confetti.trigger(this);
                }
                
                if (window.A11y) {
                    window.A11y.announce('Herzlichen Glückwunsch! Modul 1 Grundlagen erfolgreich abgeschlossen.');
                }
                
                // Update with OVERALL progress (not just this module)
                const progressBar = document.querySelector('.progress-bar-fill');
                const progressValue = document.querySelector('.progress-value');
                const progressBarContainer = document.querySelector('.progress-bar[role="progressbar"]');
                
                if (window.KIAcademy && window.KIAcademy.progress) {
                    const overallPercentage = window.KIAcademy.progress.getPercentage();
                    if (progressBar) progressBar.style.width = overallPercentage + '%';
                    if (progressValue) progressValue.textContent = overallPercentage + '%';
                    if (progressBarContainer) progressBarContainer.setAttribute('aria-valuenow', overallPercentage);
                }
            }
        });
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    
    function initProgress() {
        if (!window.KIAcademy || !window.KIAcademy.progress) return;
        
        const progress = window.KIAcademy.progress;
        
        // Check if this module is completed
        if (progress.isCompleted('01') && moduleCheckbox) {
            moduleCheckbox.checked = true;
        }
        
        // Always show OVERALL progress across all modules
        const progressBar = document.querySelector('.progress-bar-fill');
        const progressValue = document.querySelector('.progress-value');
        const progressBarContainer = document.querySelector('.progress-bar[role="progressbar"]');
        const overallPercentage = progress.getPercentage();
        
        if (progressBar) progressBar.style.width = overallPercentage + '%';
        if (progressValue) progressValue.textContent = overallPercentage + '%';
        if (progressBarContainer) progressBarContainer.setAttribute('aria-valuenow', overallPercentage);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProgress);
    } else {
        initProgress();
    }

})();
