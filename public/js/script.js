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
  
  fetchRandomWord();