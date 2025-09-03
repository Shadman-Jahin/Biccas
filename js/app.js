
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

});


