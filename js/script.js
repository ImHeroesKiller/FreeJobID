function setLanguage(language) {
    var elements = document.querySelectorAll('[data-en]');
    elements.forEach(function (element) {
        if (language === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else if (language === 'id') {
            element.textContent = element.getAttribute('data-id');
        }
    });
}
