const keyboardDiv = document.querySelector(".keyboard");
// Function to fetch a random word from the server
function fetchRandomWord() {
    fetch('/random-word')
        .then(response => response.json())
        .then(data => {
            const { word, hint } = data;
            console.log(`Word: ${word}, Hint: ${hint}`);
        })
        .catch(error => {
            console.error("Error fetching random word:", error);
        });
}
// create the keyboard
for (let index = 97; index <= 122; index++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(index);
    keyboardDiv.appendChild(button);
    // e.prevent default fixed an error where page was refreshing
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(index), e.preventDefault()));
}
fetchRandomWord();