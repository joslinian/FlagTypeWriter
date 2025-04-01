// Pure vanilla JavaScript implementation for typewriter effect
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  
  // Create the UI elements
  const container = document.createElement('div');
  
  const loadingMessage = document.createElement('div');
  loadingMessage.textContent = 'Loading...';
  
  const characterList = document.createElement('ul');
  characterList.style.listStyleType = 'none';
  characterList.style.padding = '0';
  
  const errorMessage = document.createElement('div');
  errorMessage.style.display = 'none';
  errorMessage.style.color = 'red';
  
  // Add elements to the DOM
  container.appendChild(loadingMessage);
  container.appendChild(characterList);
  container.appendChild(errorMessage);
  root.appendChild(container);
  
  // Function to show an error
  const showError = (message) => {
    errorMessage.textContent = `Error: ${message}`;
    errorMessage.style.display = 'block';
    loadingMessage.style.display = 'none';
  };
  
  // Function to add a character to the list
  const addCharacter = (char) => {
    const listItem = document.createElement('li');
    listItem.textContent = char;
    characterList.appendChild(listItem);
  };
  
  // Function to start typewriter animation
  const startTypewriterAnimation = (text) => {
    if (!text) return;
    
    // Hide loading message
    loadingMessage.style.display = 'none';
    
    // Split the text into an array of characters
    const characters = Array.from(text);
    let currentIndex = 0;
    
    // Add the first character immediately
    addCharacter(characters[currentIndex++]);
    
    // Add the remaining characters with a delay
    const intervalId = setInterval(() => {
      if (currentIndex < characters.length) {
        addCharacter(characters[currentIndex++]);
      } else {
        clearInterval(intervalId);
        console.log('Animation complete');
      }
    }, 500); // Half-second delay
  };
  
  // Fetch the flag data from our server-side proxy endpoint to avoid CORS issues
  fetch('/api/flag')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      console.log('Received flag data:', data);
      // Trim any whitespace and start animation
      startTypewriterAnimation(data.trim());
    })
    .catch(error => {
      console.error('Fetch error:', error);
      showError(error.message || 'Unknown error occurred');
    });
});