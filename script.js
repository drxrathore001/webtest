// Responsive hamburger menu, scroll header effect, and infinite destination carousel

document.addEventListener('DOMContentLoaded', function () {
    // ===== Hamburger Menu =====
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');

    if (hamburger && navUl) {
        hamburger.addEventListener('click', function () {
            navUl.classList.toggle('active');
        });
    }

    // ===== Scroll Header Effect =====
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ===== Infinite Destination Carousel Logic =====
    const container = document.querySelector('.destinations-container');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    
    if (container) {
        // 1. Setup Infinite Scroll (Cloning)
        const originalCards = Array.from(container.children);
        
        // Clone all cards and append/prepend them to create buffer zones
        // We clone the entire set to ensure the buffer is large enough for big screens
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('clone-end');
            container.appendChild(clone);
        });

        originalCards.reverse().forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('clone-start');
            container.insertBefore(clone, container.firstChild);
        });

        // 2. Initial Position
        // Move scroll to the start of the "Real" set
        // Card Width (250) + Margin (20) = 270px approx
        const cardWidth = 270; 
        const totalOriginalWidth = originalCards.length * cardWidth;
        
        // Set initial position to the start of the middle (real) set
        container.scrollLeft = totalOriginalWidth;

        // 3. Infinite Scroll Jump Logic
        container.addEventListener('scroll', () => {
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            // If scrolled into the "Start Clones" zone (too far left)
            if (container.scrollLeft <= 50) { 
                // Jump forward to the end of the real set
                container.scrollLeft = container.scrollLeft + totalOriginalWidth;
            } 
            // If scrolled into the "End Clones" zone (too far right)
            else if (container.scrollLeft >= totalOriginalWidth * 2 - container.clientWidth) { 
                // Jump backward to the start of the real set
                container.scrollLeft = container.scrollLeft - totalOriginalWidth;
            }

            updateActiveCard();
        });

        // 4. Button Logic (Manual Smooth Scroll)
        if (leftBtn) {
            leftBtn.addEventListener('click', () => {
                container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            });
        }

        if (rightBtn) {
            rightBtn.addEventListener('click', () => {
                container.scrollBy({ left: cardWidth, behavior: 'smooth' });
            });
        }

        // 5. Active Card Highlight Logic
        function updateActiveCard() {
            const allCards = document.querySelectorAll('.destination-wrapper');
            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;

            let minDistance = Infinity;
            let activeCard = null;

            allCards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                const distance = Math.abs(containerCenter - cardCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    activeCard = card;
                }
            });

            allCards.forEach(card => {
                if (card === activeCard) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        }
        
        // Initial update
        setTimeout(updateActiveCard, 100);
        window.addEventListener('resize', updateActiveCard);
    }
});