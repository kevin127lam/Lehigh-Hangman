let currentWord = [];
// Function to fetch a random word from the server
function fetchRandomWord() {
    fetch('/random-word')
        .then(response => response.json())
        .then(data => {
            const { word, hint } = data;
            currentWord = word;
            document.querySelector(".hint-display p").innerText = hint;
            document.querySelector(".word-display").innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
            console.log(`Word: ${word}, Hint: ${hint}`);
        })
        .catch(error => {
            console.error("Error fetching random word:", error);
        });
}

let correctLetters = [];
let wrongGuessCount = 0;
const init = (button, usedLetter) => {
    button.disabled = true;
    if (currentWord.includes(usedLetter)) {
        console.log("True");
        let wordArray = [...currentWord];
        let wordDisplayItems = document.querySelector(".word-display").querySelectorAll("li");
        for (let i = 0; i < wordArray.length; i++) {
            if (wordArray[i] === usedLetter) {
                correctLetters.push(usedLetter);
                wordDisplayItems[i].innerText = usedLetter;
                wordDisplayItems[i].classList.add("guessed");
            }
        }
    }
    else {
        console.log("false");
        wrongGuessCount++;
        document.querySelector(".laf-box img").src = `../img/lep${wrongGuessCount}.jpg`;
    }
    if(wrongGuessCount === 6){
        return gameStatus(false);
    } if(correctLetters.length === currentWord.length){
        return gameStatus(true);
    }
    document.querySelector(".guess-display").innerText = `${wrongGuessCount} / 6 `;
}

const gameStatus = (isVictory) => {
    setTimeout(() => {
        const statusOutput = isVictory ? `You found the word: ` : `The correct word was: `;
        const gameStatus = document.querySelector(".game-status");
        gameStatus.querySelector("img").src = `../img/${isVictory ? 'win' : 'loss'}.gif`;
        gameStatus.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameStatus.querySelector("p").innerHTML = `${statusOutput}<b>${currentWord}</b>`;
        gameStatus.classList.add("show");
    }, 600);
}

// create the keyboard
for (let index = 97; index <= 122; index++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(index);
    document.querySelector(".keyboard").appendChild(button);
    // e.prevent default fixed an error where page was refreshing
    button.addEventListener("click", e => init(e.target, String.fromCharCode(index), e.preventDefault()));
}
fetchRandomWord();
init();