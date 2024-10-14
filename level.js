const levelCard = document.querySelector('.level-card img');
const levelName = document.querySelector('.level-name');
const prevArrow = document.getElementById('prevArrow');
const nextArrow = document.getElementById('nextArrow');

const levels = [
    {
        name: "first level - budgie",
        img: "img/levels/first-level.png"
    },
    {
        name: " second level - cockatiel",
        img: "img/levels/second-level.png"
    },
    {
        name: "third level - lovebird",
        img: "img/levels/third-level.png"
    }
];

let currentIndex = 0;

function updateLevel(index) {
    levelCard.src = levels[index].img;
    levelName.textContent = levels[index].name;
}

prevArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + levels.length) % levels.length;
    updateLevel(currentIndex);
});

nextArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % levels.length;
    updateLevel(currentIndex);
});

updateLevel(currentIndex);




