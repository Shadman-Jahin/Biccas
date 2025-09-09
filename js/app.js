// * ========================================
// * LENIS INTIALIZATION
// * ========================================

const lenis = new Lenis({
    duration: 1.5, // Duration of the smooth scroll animation in seconds
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
    direction: 'vertical', // vertical, horizontal
    gestureDirection: 'vertical', // vertical, horizontal, both
    smoothWheel: true, // Enables smooth scrolling for mouse wheel
    wheelMultiplier: 1.5, // Adjust scroll speed for mouse wheel
    smoothTouch: false, // Disables smooth scrolling for touch devices (often better for mobile performance)
    touchMultiplier: 2, // Adjust scroll speed for touch
    infinite: false, // Enables infinite scroll
    autoRaf: true, // Automatically calls lenis.raf(time) using requestAnimationFrame
});

// * =============
// * LOADER
// * =============

window.addEventListener("load", () => {
    const navEntries = performance.getEntriesByType("navigation");
    const loadTime = navEntries.length
        ? navEntries[0].loadEventEnd - navEntries[0].startTime
        : performance.now();

    const minimumTime = 1000; // 1s in ms
    const remainingTime = Math.max(0, minimumTime - loadTime);

    setTimeout(() => {
        document.documentElement.style.setProperty("--scrollbar-width", ".5rem");
        document.querySelector(".loader")?.remove();

        // ✅ CORRECT: Run the animation function ONLY after the loader is gone
        runAfterPageLoad();
    }, remainingTime);
});


// * ============================================
// * AOS INITIALIZE AND TEXT ANIMATION 
// * ============================================

const runAfterPageLoad = () => {
    Splitting();
    AOS.init({ once: false, duration: 1000, offset: 250 });

    const elements = document.querySelectorAll('[data-splitting][data-aos][data-animate-class]');

    elements.forEach(parent => {
        const chars = parent.querySelectorAll('.char,.word');
        const animateClass = parent.dataset.animateClass.trim().split(" ");
        const speed = Number(parent.dataset.customSpeed) || 0.05;
        let isAnimated = false;

        const runAnimation = () => {
            chars.forEach((char, i) => {
                char.classList.remove("animate__animated", ...animateClass);
                void char.offsetWidth;
                char.classList.add("animate__animated", ...animateClass);
                char.style.animationDelay = `${i * speed}s`;
            });
            isAnimated = true;
        };

        const resetAnimation = () => {
            chars.forEach(char => {
                char.classList.remove("animate__animated", ...animateClass);
                char.style.animationDelay = '0s';
            });
            isAnimated = false;
        };

        const observer = new MutationObserver(() => {
            if (parent.classList.contains('aos-animate')) {
                if (!isAnimated) runAnimation();
            } else {
                resetAnimation();
            }
        });

        observer.observe(parent, {
            attributes: true,
            attributeFilter: ['class'],
        });

        // ✅ This check is still useful for elements that are in the viewport from the start,
        // but now it runs at the right time.
        if (parent.classList.contains('aos-animate')) {
            runAnimation();
        }
    });
};











document.addEventListener('DOMContentLoaded', () => {
    // ! ====================================
    // ! THEME SELECTOR (adding localStorage)
    // ! ====================================

    const radios = document.querySelectorAll('input[name="theme"]');
    const saved = localStorage.getItem('themePreference');
    if (saved) document.getElementById(saved).checked = true;
    radios.forEach(r => r.addEventListener('change', e =>
        localStorage.setItem('themePreference', e.target.id)
    ));


    // * ===============================
    // * BOOTSTRAP TOOLTIP INITIALLIZE
    // * ===============================

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    tooltipTriggerList.forEach(el => {
        el.addEventListener('shown.bs.tooltip', () => {
            setTimeout(() => {
                bootstrap.Tooltip.getInstance(el).hide();
            }, 2000);
        });
    });

    // * ================================
    // * PLAN TOGGLE BUTTON
    // * ================================

    const toggle = document.getElementById('toggle');
    const monthlyBtn = document.getElementById('monthly');
    const yearlyBtn = document.getElementById('yearly');
    const pro = document.querySelector(".pro h2");
    const business = document.querySelector(".business h2");

    monthlyBtn.addEventListener('click', () => {
        toggle.classList.remove('yearly');
        monthlyBtn.classList.add('active');
        yearlyBtn.classList.remove('active');
        pro.innerHTML = `<p class="text-white">$</p> 12`;
        business.innerHTML = `<p>$</p> 28`;
    });

    yearlyBtn.addEventListener('click', () => {
        toggle.classList.add('yearly');
        yearlyBtn.classList.add('active');
        monthlyBtn.classList.remove('active');
        pro.innerHTML = `<p class="text-white">$</p> 8`;
        business.innerHTML = `<p>$</p> 16`;
    });

});


// * ===========================
// * BROWER COOKIES
// * ===========================

window.addEventListener("load", () => {
    const offcanvasElement = document.querySelector("#cookies .offcanvas");
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
    setTimeout(() => {
        bsOffcanvas.show();
    }, 15000);
})
