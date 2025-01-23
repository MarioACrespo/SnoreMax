const API_URL = "https://pokeapi.co/api/v2/pokemon";
const pokemonList = document.getElementById("pokemonList");
const pokemonNameInput = document.getElementById("pokemonName");
const addPokemonForm = document.getElementById("addPokemonForm");
const pokemonDialog = document.getElementById("pokemonDialog");
const pokemonDisplay = document.getElementById("pokemonDisplay");
const pokemonImage = document.getElementById("pokemonImage");

let currentPage = 0;
const pokemonPerPage = 10;
let totalPokemonCount = 0;

// Fetch Pokémon list based on page and limit
async function fetchPokemonPage(page = 0) {
  const offset = page * pokemonPerPage;
  try {
    const response = await fetch(
      `${API_URL}?limit=${pokemonPerPage}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon data: ${response.statusText}`);
    }
    const data = await response.json();
    totalPokemonCount = data.count; // Total number of Pokémon in the API
    renderPokemonList(data.results);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Render Pokémon list to the DOM
function renderPokemonList(pokemonArray) {
  pokemonList.innerHTML = ""; // Clear existing list
  pokemonArray.forEach((pokemon) => {
    const pokemonButton = document.createElement("button");
    pokemonButton.textContent =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Capitalize first letter
    pokemonButton.className = "pokemon-button";
    pokemonButton.addEventListener("click", () => {
      displayPokemonCard(pokemon.name); // Show the modal with details
    });
    pokemonList.appendChild(pokemonButton);
  });
}

// Display Pokémon details in the modal
async function displayPokemonCard(pokemonName) {
  try {
    const response = await fetch(`${API_URL}/${pokemonName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon data: ${response.statusText}`);
    }
    const pokemon = await response.json();

    // Fill the modal with the fetched Pokémon's details
    pokemonDisplay.textContent =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Capitalize first letter
    pokemonImage.src =
      pokemon.sprites.other.dream_world.front_default ||
      pokemon.sprites.front_default;

    // Open the modal dialog
    pokemonDialog.showModal();
  } catch (error) {
    alert("Pokémon not found. Please try again.");
    console.error("Error:", error.message);
  }
}

// Handle the form submission for searching a Pokémon by name
addPokemonForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload
  const pokemonName = pokemonNameInput.value.trim();
  if (pokemonName) {
    displayPokemonCard(pokemonName); // Display searched Pokémon's details
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

//code for fetching stats:
//===========================================================================
const getPokemonData = async (term) => {
  const url = "https://pokeapi.co/api/v2/pokemon";
  const response = await fetch(url);

  // update ui with data

  //document.getElementById("pokemonDisplay").innerHTML = pokemon.name;
  document.getElementById(
    "update_candy_title"
  ).innerHTML = `${pokemon.name} Candy`;
  document.getElementById("update_hp").innerHTML = `HP ${Math.floor(
    Math.random() * pokemon.stats[0].base_stat + 1
  )}/${pokemon.stats[0].base_stat}`;
  document.getElementById(
    "update_cp"
  ).innerHTML = `XP ${pokemon.base_experience}`;
  document.getElementById(
    "update_type"
  ).innerHTML = `${pokemon.types[0].type.name} / ${pokemon.types[1].type.name}`;
  document.getElementById("update_weight").innerHTML = `${pokemon.weight}kg`;
  document.getElementById("update_height").innerHTML = `0.${pokemon.height}m`;
  document.getElementById("update_stardust").innerHTML = Math.floor(
    Math.random() * 10000 + 1
  );
  document.getElementById("update_candy").innerHTML = Math.floor(
    Math.random() * 200 + 1
  );
};

submitBtn.addEventListener("click", () => getPokemonData(search_term.value));
//
