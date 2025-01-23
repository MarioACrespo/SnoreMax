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
    pokemonDialog.close();
  }
});

// Pagination controls
document.getElementById("nextPage").addEventListener("click", () => {
  if ((currentPage + 1) * pokemonPerPage < totalPokemonCount) {
    currentPage++;
    fetchPokemonPage(currentPage);
  }
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    fetchPokemonPage(currentPage);
  }
});

// Initial fetch and display of 10 Pokémon
fetchPokemonPage(currentPage);

//
// code for fetching stats:
//===========================================================================
const getPokemonData = async (pokemonName) => {
  //const pokemonName = document.getElementById("submitBtn").value;

  const API_URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  const response = await fetch(API_URL);
  document.getElementById("show_error").classList.remove("show");
  document.getElementById("show_error").classList.add("hidden");

  if (response.status == 404 || response.statusText == "Not Found") {
    document.getElementById("show_error").classList.add("show");
    document.getElementById("show_error").classList.remove("hidden");
    return;
  }

  const pokemon = await response.json();
  debugger;
  // update ui with data

  //document.getElementById("pokemonDisplay").innerHTML = pokemon.name;
  //document.getElementById(
  // "update_candy_title"
  //).innerHTML = `${pokemon.name} Candy`;
  document.getElementById("update_hp").innerHTML = `HP ${
    Math.floor(Math.random() * pokemon.stats[0].base_stat) + 1
  }/${pokemon.stats[0].base_stat}`;
  //document.getElementById(
  //  "update_cp"
  //).innerHTML = `XP ${pokemon.base_experience}`;
  const types = pokemon.types.map((t) => t.type.name).join(" / ");
  document.getElementById("update_type").innerHTML = types;

  //document.getElementById(
  // "update_type"
  //).innerHTML = `${pokemon.types[0].type.name} / ${pokemon.types[1].type.name}`;
  document.getElementById("update_weight").innerHTML = `${pokemon.weight}kg`;
  document.getElementById("update_height").innerHTML = `0.${pokemon.height}m`;
  // document.getElementById("update_stardust").innerHTML = Math.floor(
  // Math.random() * 10000 + 1
  //);
  //document.getElementById("update_candy").innerHTML = Math.floor(
  //  Math.random() * 200 + 1
  // );
};

submitBtn.addEventListener("click", () =>
  getPokemonData(pokemonName.abilities)
);
//
