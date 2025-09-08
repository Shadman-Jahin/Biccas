
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


    // * ================================
    // * PLAN TOGGLE BUTTON
    // * ================================

    const toggle = document.getElementById('toggle');
    const monthlyBtn = document.getElementById('monthly');
    const yearlyBtn = document.getElementById('yearly');
    const pro = document.querySelector(".pro h2");
    const business = document.querySelector(".business h2");
    console.log(pro, business);

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


