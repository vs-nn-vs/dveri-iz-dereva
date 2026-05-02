(function() {
    // 1. Инициализация (здесь будет ваш Public Key)
    emailjs.init("gVG3uJSKnmmEg95ex"); 
})();

window.onload = function() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Чтобы страница не перезагружалась

        // 2. Визуальная индикация (опционально)
        const btn = form.querySelector('button');
        btn.innerText = 'Отправка...';

        // 3. Отправка данных
        // "service_ID" и "template_ID" возьмете из личного кабинета EmailJS
        emailjs.sendForm('service_6h5azal', 'template_fzqtn7s', this)
            .then(function() {
                alert('Сообщение успешно отправлено!');
                btn.innerText = 'Отправить';
                form.reset(); // Очистка формы
            }, function(error) {
                alert('Ошибка при отправке: ' + JSON.stringify(error));
                btn.innerText = 'Попробовать снова';
            });
    });
}