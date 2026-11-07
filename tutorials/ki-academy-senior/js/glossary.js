/**
 * KI ACADEMY - GLOSSARY SYSTEM
 * Inline Tooltips & Lexikon Functionality
 */

const Glossary = {
    terms: {
        'de': {
            'prompt': {
                short: 'Ihre Anfrage an die KI',
                full: 'Ein Prompt ist Ihre Eingabe oder Anfrage an die KI. Je präziser Sie formulieren, desto besser die Antwort. Denken Sie daran: Die KI kann nicht erraten, was Sie wollen - Sie müssen es klar ausdrücken.'
            },
            'system-anweisung': {
                short: 'Hintergrund-Regeln für die KI',
                full: 'System-Anweisungen sind versteckte Anweisungen, die der KI sagen, wie sie sich verhalten soll - zum Beispiel: "Sei höflich", "Antworte kurz" oder "Denke Schritt für Schritt". Sie werden vor Ihrer eigentlichen Frage an die KI übermittelt.'
            },
            'kontext': {
                short: 'Das Umfeld Ihrer Frage',
                full: 'Kontext ist die Information, die die KI braucht, um Ihre Frage richtig zu verstehen. Ohne Kontext kann die KI raten - mit Kontext liefert sie präzise Antworten. Beispiel: "Ich bin Lehrer" gibt der KI den nötigen Kontext für Ihre Frage.'
            },
            'token': {
                short: 'Wort-Bruchstücke, die die KI verarbeitet',
                full: 'KI-Modelle verstehen keine Wörter, sondern kleine Text-Einheiten namens Tokens. "Hund" könnte ein Token sein, aber "Supermarkt" vielleicht zwei: "Super" + "markt". Die Anzahl der Tokens bestimmt, wie viel die KI auf einmal verarbeiten kann.'
            },
            'kontextfenster': {
                short: 'Das Gedächtnis der KI',
                full: 'Das Kontextfenster ist die Menge an Text, die sich die KI während eines Gesprächs merken kann - typischerweise einige tausend Wörter. Ist das Fenster voll, "vergisst" die KI den ältesten Teil des Gesprächs.'
            },
            'halluzination': {
                short: 'Wenn die KI Dinge erfindet',
                full: 'Eine Halluzination tritt auf, wenn die KI selbstbewusst Informationen erfindet, die nicht stimmen - zum Beispiel falsche Quellen, erfundene Statistiken oder nicht existierende Personen. Deshalb: Immer Fakten prüfen!'
            },
            'iterieren': {
                short: 'Schrittweise verbessern',
                full: 'Iterieren bedeutet, etwas schrittweise zu verbessern. Bei der KI-Kommunikation heißt das: Sie starten mit einer Anfrage, bewerten die Antwort und verfeinern Ihre Frage - immer wieder, bis das Ergebnis passt.'
            },
            'chain-of-thought': {
                short: 'Lautes Nachdenken der KI',
                full: 'Chain of Thought (CoT) ist eine Technik, bei der Sie die KI auffordern, ihre Gedankengänge laut auszusprechen - zum Beispiel: "Erkläre mir Schritt für Schritt, wie du auf diese Lösung kommst." Das führt oft zu besseren Ergebnissen bei komplexen Aufgaben.'
            },
            'ki': {
                short: 'Künstliche Intelligenz',
                full: 'Künstliche Intelligenz (KI oder AI - Artificial Intelligence) bezeichnet Computer-Systeme, die Aufgaben erledigen können, die normalerweise menschliche Intelligenz erfordern - wie Verstehen von Sprache, Erkennen von Bildern oder Lösen von Problemen.'
            },
            'ki-modell': {
                short: 'Das "Gehirn" der KI',
                full: 'Ein KI-Modell ist die trainierte Software, die hinter einer KI-Anwendung steckt - wie GPT-4, Claude oder Gemini. Man kann es sich wie ein riesiges neuronales Netzwerk vorstellen, das auf riesigen Datenmengen trainiert wurde, um Muster zu erkennen und Text zu generieren.'
            },
            'chatbot': {
                short: 'KI-Anwendung zum Chatten',
                full: 'Ein Chatbot ist ein Computer-Programm, das mit Menschen in natürlicher Sprache kommunizieren kann - wie ChatGPT, Claude oder Google Bard. Er versteht Ihre Fragen und formuliert Antworten, als würden Sie mit einem Menschen chatten.'
            },
            'neuronales-netzwerk': {
                short: 'Vom Gehirn inspiriertes Rechenmodell',
                full: 'Ein neuronales Netzwerk ist ein Computer-Modell, das lose vom menschlichen Gehirn inspiriert ist. Es besteht aus Millionen miteinander verbundenen "Knoten" (wie virtuelle Neuronen), die zusammenarbeiten, um Muster in Daten zu erkennen.'
            },
            'maschinelles-lernen': {
                short: 'Lernen aus Daten',
                full: 'Maschinelles Lernen (Machine Learning) ist eine Methode, bei der Computer aus Daten lernen, ohne explizit programmiert zu werden. Je mehr Beispiele sie sehen, desto besser werden sie darin, Muster zu erkennen und Vorhersagen zu treffen.'
            },
            'ki-generierte-inhalte': {
                short: 'Von KI erstellte Texte, Bilder, Videos',
                full: 'KI-generierte Inhalte sind Texte, Bilder, Videos oder Musik, die von einer KI erstellt wurden. Sie werden oft mit Hinweisen wie "KI-generiert" oder "Created with AI" gekennzeichnet, um Transparenz zu schaffen.'
            },
            'bias': {
                short: 'Voreingenommenheit in Daten',
                full: 'Bias (Voreingenommenheit) tritt auf, wenn eine KI aufgrund ihrer Trainingsdaten bestimmte Vorurteile reproduziert - zum Beispiel Stereotype bezüglich Geschlecht, Herkunft oder Berufen. Entwickler arbeiten daran, dies zu minimieren.'
            }
        },
        'en': {
            'prompt': {
                short: 'Your request to the AI',
                full: 'A prompt is your input or question to the AI. The more precise your formulation, the better the answer. Remember: The AI cannot guess what you want - you must express it clearly.'
            },
            'system-prompt': {
                short: 'Background rules for the AI',
                full: 'System instructions are hidden instructions that tell the AI how to behave - for example: "Be polite", "Answer briefly" or "Think step by step". They are sent to the AI before your actual question.'
            },
            'context': {
                short: 'The environment of your question',
                full: 'Context is the information the AI needs to properly understand your question. Without context, the AI might guess - with context, it delivers precise answers. Example: "I am a teacher" provides the necessary context for your question.'
            },
            'token': {
                short: 'Text fragments the AI processes',
                full: 'AI models don\'t understand words, but small text units called tokens. "Dog" might be one token, but "supermarket" might be two: "super" + "market". The number of tokens determines how much the AI can process at once.'
            },
            'context-window': {
                short: 'The memory of the AI',
                full: 'The context window is the amount of text the AI can remember during a conversation - typically a few thousand words. When the window is full, the AI "forgets" the oldest part of the conversation.'
            },
            'hallucination': {
                short: 'When the AI invents things',
                full: 'A hallucination occurs when the AI confidently invents information that isn\'t true - such as false sources, made-up statistics, or non-existent people. Therefore: Always verify facts!'
            },
            'iterate': {
                short: 'Improve step by step',
                full: 'To iterate means to improve something gradually. In AI communication, this means: You start with a request, evaluate the answer, and refine your question - again and again until the result fits.'
            },
            'chain-of-thought': {
                short: 'The AI thinking out loud',
                full: 'Chain of Thought (CoT) is a technique where you ask the AI to speak its thought process out loud - for example: "Explain to me step by step how you arrive at this solution." This often leads to better results with complex tasks.'
            },
            'ai': {
                short: 'Artificial Intelligence',
                full: 'Artificial Intelligence (AI or KI - Künstliche Intelligenz) refers to computer systems that can perform tasks that normally require human intelligence - such as understanding language, recognizing images, or solving problems.'
            },
            'ai-model': {
                short: 'The "brain" of the AI',
                full: 'An AI model is the trained software behind an AI application - like GPT-4, Claude, or Gemini. You can imagine it as a huge neural network trained on massive amounts of data to recognize patterns and generate text.'
            },
            'chatbot': {
                short: 'AI application for chatting',
                full: 'A chatbot is a computer program that can communicate with humans in natural language - like ChatGPT, Claude, or Google Bard. It understands your questions and formulates answers as if you were chatting with a human.'
            },
            'neural-network': {
                short: 'Brain-inspired computing model',
                full: 'A neural network is a computer model loosely inspired by the human brain. It consists of millions of interconnected "nodes" (like virtual neurons) that work together to recognize patterns in data.'
            },
            'machine-learning': {
                short: 'Learning from data',
                full: 'Machine Learning is a method where computers learn from data without being explicitly programmed. The more examples they see, the better they become at recognizing patterns and making predictions.'
            },
            'ai-generated-content': {
                short: 'Texts, images, videos created by AI',
                full: 'AI-generated content is text, images, videos, or music created by AI. They are often labeled with notes like "AI-generated" or "Created with AI" to create transparency.'
            },
            'bias': {
                short: 'Prejudice in data',
                full: 'Bias (prejudice) occurs when an AI reproduces certain prejudices due to its training data - for example stereotypes regarding gender, origin, or professions. Developers are working to minimize this.'
            }
        }
    },

    currentLang: 'de',

    init() {
        this.currentLang = document.documentElement.lang || 'de';
        this.createTooltipElement();
        this.processGlossaryTerms();
        this.addEventListeners();
    },

    createTooltipElement() {
        if (!document.getElementById('glossary-tooltip')) {
            const tooltip = document.createElement('div');
            tooltip.id = 'glossary-tooltip';
            tooltip.className = 'glossary-tooltip';
            tooltip.setAttribute('role', 'tooltip');
            tooltip.innerHTML = `
                <div class="glossary-tooltip-header">
                    <span class="glossary-tooltip-term"></span>
                </div>
                <div class="glossary-tooltip-content"></div>
            `;
            document.body.appendChild(tooltip);
        }
    },

    processGlossaryTerms() {
        document.querySelectorAll('[data-glossary]').forEach(element => {
            const term = element.dataset.glossary;
            const lang = element.dataset.lang || this.currentLang;
            
            element.classList.add('glossary-term');
            element.setAttribute('tabindex', '0');
            element.setAttribute('aria-describedby', `glossary-${term}`);
            
            // Store term data
            element.dataset.term = term;
            element.dataset.lang = lang;
        });
    },

    addEventListeners() {
        const tooltip = document.getElementById('glossary-tooltip');
        if (!tooltip) return;

        document.addEventListener('mouseover', (e) => {
            const term = e.target.closest('[data-glossary]');
            if (term) {
                this.showTooltip(term, tooltip);
            }
        });

        document.addEventListener('mouseout', (e) => {
            const term = e.target.closest('[data-glossary]');
            if (term) {
                this.hideTooltip(tooltip);
            }
        });

        document.addEventListener('focus', (e) => {
            const term = e.target.closest('[data-glossary]');
            if (term) {
                this.showTooltip(term, tooltip);
            }
        }, true);

        document.addEventListener('blur', (e) => {
            const term = e.target.closest('[data-glossary]');
            if (term) {
                this.hideTooltip(tooltip);
            }
        }, true);

        // Keyboard: Escape to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideTooltip(tooltip);
            }
        });

        // Click to go to glossary (if not already on glossary page)
        document.addEventListener('click', (e) => {
            const term = e.target.closest('[data-glossary]');
            if (term && !window.location.pathname.includes('08-glossar') && !window.location.pathname.includes('08-glossary')) {
                const termId = term.dataset.glossary;
                const lang = term.dataset.lang || this.currentLang;
                const glossaryPath = lang === 'de' ? '08-glossar/module-08.html' : '08-glossary/module-08-en.html';
                window.location.href = `../${lang === 'de' ? 'de' : 'en'}/${glossaryPath}#${termId}`;
            }
        });
    },

    showTooltip(element, tooltip) {
        const termKey = element.dataset.glossary;
        const lang = element.dataset.lang || this.currentLang;
        const termData = this.terms[lang]?.[termKey] || this.terms['de']?.[termKey];

        if (!termData) return;

        const termName = element.textContent;
        tooltip.querySelector('.glossary-tooltip-term').textContent = termName;
        tooltip.querySelector('.glossary-tooltip-content').textContent = termData.short;
        
        // Add indicator if there's more info
        if (termData.full && !window.location.pathname.includes('08-glossar')) {
            const moreIndicator = document.createElement('div');
            moreIndicator.className = 'glossary-tooltip-more';
            moreIndicator.textContent = lang === 'de' ? 'Zum Glossar →' : 'To glossary →';
            const content = tooltip.querySelector('.glossary-tooltip-content');
            content.appendChild(moreIndicator);
        }

        // Position tooltip
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let top = rect.top - tooltipRect.height - 10;
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

        // Adjust if off-screen
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) {
            top = rect.bottom + 10;
        }

        tooltip.style.top = `${top + window.scrollY}px`;
        tooltip.style.left = `${left}px`;
        tooltip.classList.add('is-visible');
    },

    hideTooltip(tooltip) {
        tooltip.classList.remove('is-visible');
    },

    // Get full definition for glossary page
    getFullDefinition(termKey, lang = 'de') {
        return this.terms[lang]?.[termKey] || this.terms['de']?.[termKey] || null;
    },

    // Get all terms for glossary page
    getAllTerms(lang = 'de') {
        return this.terms[lang] || this.terms['de'];
    }
};

// Auto-highlight terms in content
const GlossaryHighlighter = {
    init() {
        // Only run if glossary is available
        if (typeof Glossary === 'undefined') return;
        
        const lang = document.documentElement.lang || 'de';
        const terms = Glossary.getAllTerms(lang);
        
        // Find text nodes and wrap glossary terms
        this.processTextNodes(document.body, terms, lang);
    },

    processTextNodes(element, terms, lang) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    // Skip if inside a script, style, or already processed
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;
                    if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    if (parent.closest('[data-glossary]') || parent.closest('.glossary-tooltip')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        const nodesToReplace = [];
        let node;
        while (node = walker.nextNode()) {
            const text = node.textContent;
            // Check if any glossary term appears in this text
            for (const [key, data] of Object.entries(terms)) {
                // Simple word boundary check - can be improved
                const regex = new RegExp(`\\b(${this.escapeRegExp(key)})\\b`, 'gi');
                if (regex.test(text)) {
                    nodesToReplace.push({ node, key, text });
                    break; // Only process first match per node
                }
            }
        }

        // Replace nodes
        nodesToReplace.forEach(({ node, key, text }) => {
            const parent = node.parentElement;
            if (!parent) return;
            
            const regex = new RegExp(`\\b(${this.escapeRegExp(key)})\\b`, 'gi');
            const parts = text.split(regex);
            
            const fragment = document.createDocumentFragment();
            parts.forEach((part, index) => {
                if (part.toLowerCase() === key.toLowerCase()) {
                    const span = document.createElement('span');
                    span.dataset.glossary = key;
                    span.dataset.lang = lang;
                    span.className = 'glossary-term';
                    span.textContent = part;
                    span.setAttribute('tabindex', '0');
                    span.setAttribute('aria-describedby', `glossary-${key}`);
                    fragment.appendChild(span);
                } else {
                    fragment.appendChild(document.createTextNode(part));
                }
            });
            
            parent.replaceChild(fragment, node);
        });

        // Re-initialize glossary on new elements
        Glossary.processGlossaryTerms();
    },

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        Glossary.init();
        // Optional: Auto-highlight (can be disabled if performance is an issue)
        // GlossaryHighlighter.init();
    });
} else {
    Glossary.init();
    // Optional: Auto-highlight
    // GlossaryHighlighter.init();
}

// Expose globally
window.Glossary = Glossary;
window.GlossaryHighlighter = GlossaryHighlighter;
