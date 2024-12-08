
function changeCharacter() {
    const characters = document.querySelectorAll('.characters-container img');

    
    characters.forEach(character => {
        character.style.display = 'none';
    });

    
    const randomIndex = Math.floor(Math.random() * characters.length);
    const selectedCharacter = characters[randomIndex];


    selectedCharacter.style.display = 'block';
}


function initializeTypingEffect() {
    const typer = document.querySelector("span[words]");
    const wordsToType = typer.getAttribute("words").split(',');
    const typingSpeed = parseInt(typer.getAttribute('typing-speed')) || 70;
    const typingDelay = parseInt(typer.getAttribute('typing-delay')) || 700;

    let currentWordIndex = 0;
    let currentCharacterIndex = 0;

    function type() {
        const wordToType = wordsToType[currentWordIndex % wordsToType.length];

        if (currentCharacterIndex < wordToType.length) {
            typer.innerHTML += wordToType[currentCharacterIndex++];
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, typingDelay);
        }
    }

    function erase() {
        const wordToType = wordsToType[currentWordIndex % wordsToType.length];
        if (currentCharacterIndex > 0) {
            typer.innerHTML = wordToType.substr(0, --currentCharacterIndex);
            setTimeout(erase, typingSpeed);
        } else {
            currentWordIndex++;
            setTimeout(type, typingDelay);
        }
    }

    type();
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '•';
    snowflake.style.fontSize = Math.random() * 24 + 10 + 'px';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animation = `fall ${Math.random() * 10 + 10}s linear infinite, sideWays ${Math.random() * 2 + 1}s ease-in-out infinite`;

    document.body.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, Math.random() * 6000 + 6000);
}


const styleSheet = document.styleSheets[0];
styleSheet.insertRule('@keyframes fall { 0% { top: -50px; } 100% { top: 100vh; } }', styleSheet.cssRules.length);
styleSheet.insertRule('@keyframes sideWays { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(20px); } }', styleSheet.cssRules.length);


document.addEventListener('copy', function (e) {
    e.preventDefault();
    e.clipboardData.setData('text', 'Nope');
});

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.addEventListener('selectstart', function (e) {
    e.preventDefault();
});


window.onload = function () {
    changeCharacter(); 
    initializeTypingEffect(); 
    setInterval(createSnowflake, 200);
};
