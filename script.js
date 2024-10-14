document.getElementById('container').addEventListener('click', function(event) {
    const img = new Image();
    img.src = 'img/mini-monet.png';
    img.className = 'flying-image';
    img.style.top = event.clientY + 'px';
    img.style.left = event.clientX + 'px';
    document.body.appendChild(img);

    const scoreElement = document.getElementById('score');
    let currentScore = parseInt(scoreElement.textContent.replace(/\D/g, ''), 10);
    currentScore += 1;
    scoreElement.textContent = currentScore;

    // Отправляем AJAX-запрос на сервер для обновления money
    fetch('/update_money', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ money: 1, user_id: userId }), // Передаем user_id
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Money updated:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    img.addEventListener('animationend', () => {
        img.remove();
    });
});
