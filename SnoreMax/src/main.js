const API_URL = "https://pokeapi.co/api/v2/pokemon";
const pokemonList = document.getElementById("pokemonList"); // Retrieves Pokémon list container element
const pokemonNameInput = document.getElementById("pokemonName"); // Retrieves Pokémon name input element
const addPokemonForm = document.getElementById("addPokemonForm"); // Retrieves Pokémon search form element
const pokemonDialog = document.getElementById("pokemonDialog"); // Retrieves Pokémon modal dialog element
const pokemonDisplay = document.getElementById("pokemonDisplay"); // Retrieves element to display Pokémon name
const pokemonImage = document.getElementById("pokemonImage"); // Retrieves element to display Pokémon image

let currentPage = 0; // Variable to track current page of Pokémon list
const pokemonPerPage = 5; // Number of Pokémon to display per page
let totalPokemonCount = 0; // Total number of Pokémon available in the API

// Fetch Pokémon list based on page and limit
async function fetchPokemonPage(page = 0) {
  const offset = page * pokemonPerPage; // Calculates offset based on current page
  try {
    const response = await fetch(
      `${API_URL}?limit=${pokemonPerPage}&offset=${offset}`
    ); // Fetches Pokémon data from API based on limit and offset
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon data: ${response.statusText}`);
    }
    const data = await response.json(); // Parses response JSON data
    totalPokemonCount = data.count; // Retrieves total number of Pokémon from API
    renderPokemonList(data.results); // Renders Pokémon list on the webpage
  } catch (error) {
    console.error("Error:", error.message); // Logs error message if fetching data fails
  }
}

// Render Pokémon list to the DOM
function renderPokemonList(pokemonArray) {
  pokemonList.innerHTML = ""; // Clears existing Pokémon list
  pokemonArray.forEach((pokemon) => {
    const pokemonButton = document.createElement("button"); // Creates button element for each Pokémon
    pokemonButton.textContent =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Capitalizes Pokémon names
    pokemonButton.className = "pokemon-button"; // Sets class for styling
    pokemonButton.addEventListener("click", () => {
      pokemonNameInput.value = pokemon.name; // Sets Pokémon name in search input
      displayPokemonCard(pokemon.name); // Displays Pokémon details in modal
    });
    pokemonList.appendChild(pokemonButton); // Appends Pokémon button to the list container
  });
}

// Display Pokémon details in the modal (using <dialog>)
async function displayPokemonCard(pokemonName) {
  try {
    const response = await fetch(`${API_URL}/${pokemonName}`); // Fetches Pokémon details by name
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon data: ${response.statusText}`);
    }
    const pokemon = await response.json(); // Parses fetched Pokémon data
    pokemonDisplay.textContent =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Capitalizes Pokémon name
    pokemonImage.src =
      pokemon.sprites.other.dream_world.front_default ||
      pokemon.sprites.front_default; // Sets Pokémon image URL

    pokemonDialog.showModal(); // Displays modal with Pokémon details
  } catch (error) {
    alert("Pokémon not found. Please try again."); // Shows alert if Pokémon data fetch fails
    console.error("Error:", error.message); // Logs error message
  }
}

// Handle the form submission for searching a Pokémon by name and showing a modal
addPokemonForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents default form submission
  const pokemonName = pokemonNameInput.value.trim(); // Retrieves and trims Pokémon name input
  if (pokemonName) {
    displayPokemonCard(pokemonName); // Displays Pokémon details for the searched name in modal
    pokemonNameInput.value = ""; // Clears input field after submission
  } else {
    alert("Please enter a Pokémon name!"); // Alerts user if input is empty
  }
});

// Handle modal close when clicked outside the modal content
pokemonDialog.addEventListener("click", (e) => {
  if (e.target === pokemonDialog) {
    pokemonDialog.close(); // Closes modal when clicking outside of its content
  }
});

// Pagination controls
document.getElementById("nextPage").addEventListener("click", () => {
  if ((currentPage + 1) * pokemonPerPage < totalPokemonCount) {
    currentPage++;
    fetchPokemonPage(currentPage); // Fetches next page of Pokémon list
  }
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    fetchPokemonPage(currentPage); // Fetches previous page of Pokémon list
  }
});

// Initial fetch and display of 10 Pokémon
fetchPokemonPage(currentPage); // Fetches initial Pokémon list upon page load
