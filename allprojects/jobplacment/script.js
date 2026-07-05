/**
 * CAREERBRIDGE PLATFORM SYSTEM ENGINES
 */
document.addEventListener('DOMContentLoaded', () => {

    // ================= MOBILE NAVIGATION DRAWER HANDLING =================
    const menuButton = document.getElementById('hamburgerMenuButtonNode');
    const navLinksList = document.getElementById('navMenuLinksList');
    const allIndividualNavAnchors = document.querySelectorAll('.nav-anchor-item');

    if (menuButton && navLinksList) {
        // Master execution function for the state change
        const toggleNavigationMenuState = () => {
            menuButton.classList.toggle('system-trigger-state-active');
            navLinksList.classList.toggle('system-menu-state-open');
        };

        menuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleNavigationMenuState();
        });

        // Close menu immediately if background elements are selected
        allIndividualNavAnchors.forEach(anchor => {
            anchor.addEventListener('click', () => {
                menuButton.classList.remove('system-trigger-state-active');
                navLinksList.classList.remove('system-menu-state-open');
            });
        });
    }

    // ================= CONVERSATIONAL TERMINAL APPLICATION ACTIONS =================
    const optionsButtonStack = document.getElementById('terminalOptionsButtonStack');
    const chatLogsStream = document.getElementById('terminalChatLogsStreamContainer');
    const dispatchButton = document.getElementById('executePayloadDispatchButton');
    let selectedSectorToken = "";

    if (optionsButtonStack && chatLogsStream && dispatchButton) {
        optionsButtonStack.addEventListener('click', (e) => {
            const variantTargetButton = e.target.closest('.interactive-option-select-button');
            if (!variantTargetButton) return;

            selectedSectorToken = variantTargetButton.getAttribute('data-value');
            const visualLabelString = variantTargetButton.textContent;

            // Generate user text record log bubble
            const userBubble = document.createElement('div');
            userBubble.className = 'user-outgoing-chat-bubble-item';
            userBubble.innerHTML = `<p>${visualLabelString}</p>`;
            chatLogsStream.appendChild(userBubble);

            // Strip choices list out of active displays
            optionsButtonStack.style.display = 'none';

            // Simulate server parsing algorithm payload execution
            setTimeout(() => {
                const systemResponseBubble = document.createElement('div');
                systemResponseBubble.className = 'bot-incoming-chat-bubble-item';
                systemResponseBubble.innerHTML = `
                    <p><strong>Sector Parameters Locked!</strong> Configuration data routing structures initialized successfully for: <em>${selectedSectorToken}</em>.</p>
                `;
                chatLogsStream.appendChild(systemResponseBubble);

                // Enable Dispatch Action Handle Link System
                dispatchButton.classList.remove('variant-disabled');
                dispatchButton.removeAttribute('disabled');
                dispatchButton.querySelector('span').textContent = "Execute Secure Parameter Handover Loop";
            }, 600);
        });

        dispatchButton.addEventListener('click', () => {
            if (!selectedSectorToken) return;
            const systemTargetNumber = "1234567890";
            const dynamicMessageString = `Hello CareerBridge Infrastructure Ops. I have successfully locked down my targeted dynamic functional path allocation parameter to: ${selectedSectorToken}. Please review immediate profile matching options.`;
            
            window.open(`https://api.whatsapp.com/send?phone=${systemTargetNumber}&text=${encodeURIComponent(dynamicMessageString)}`, '_blank');
        });
    }

    // ================= INTERACTIVE CAPTURE FORM CONTROLLERS =================
    const contactFormInstance = document.getElementById('contactFunctionalFormModule');
    if (contactFormInstance) {
        contactFormInstance.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Candidate profile matrix data package dispatched smoothly to integration operations systems.');
            contactFormInstance.reset();
        });
    }
});