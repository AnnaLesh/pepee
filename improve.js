const taskCards = document.querySelectorAll('.task-card');
const modal = document.getElementById('modal');
const buyButton = document.getElementById('buyButton');

taskCards.forEach(card => {
    card.addEventListener('click', function() {
        modal.style.display = 'flex'; // Показываем модальное окно
    });
});

buyButton.addEventListener('click', function() {
    modal.style.display = 'none'; // Скрываем модальное окно
});
