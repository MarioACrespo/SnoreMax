// Function to convert height from meters to feet and inches
function convertHeightToFeetInches(heightInMeters) {
  const heightInInches = heightInMeters * 39.3701; // Convert meters to inches
  const feet = Math.floor(heightInInches / 12); // Convert inches to feet
  const inches = Math.round(heightInInches % 12); // Remaining inches
  return { feet, inches };
}

// Function to convert weight from kilograms to pounds
function convertWeightToPounds(weightInKilograms) {
  return weightInKilograms * 2.20462; // Convert kilograms to pounds
}

// Function to show Pokémon details in the modal
function showPokemonDetails(pokemonData) {
  const modal = document.getElementById("pokemonDialog");

  // Update Pokémon name
  const pokemonName = pokemonData.name;
  document.getElementById("pokemonDisplay").textContent = pokemonName;

  // Update Pokémon image
  const pokemonImage = document.getElementById("pokemonImage");
  pokemonImage.src = pokemonData.sprites.front_default;

  // Convert height and weight
  const heightInMeters = pokemonData.height / 10; // Height in meters (from decimeters)
  const weightInKilograms = pokemonData.weight / 10; // Weight in kilograms (from hectograms)

  const { feet, inches } = convertHeightToFeetInches(heightInMeters); // Get height in feet and inches
  const weightInPounds = convertWeightToPounds(weightInKilograms); // Get weight in pounds

  // Update height and weight in the modal
  document.getElementById(
    "pokemonHeight"
  ).textContent = `Height: ${feet}' ${inches}"`; // Display height in feet and inches
  document.getElementById(
    "pokemonWeight"
  ).textContent = `Weight: ${weightInPounds.toFixed(2)} lbs`; // Display weight in pounds

  // Update types
  const types = pokemonData.types
    .map((typeInfo) => typeInfo.type.name)
    .join(", ");
  document.getElementById("pokemonTypes").textContent = `Types: ${types}`;

  // Open the modal
  modal.showModal();
}

// Function to create a list of Pokémon with clickable images
function createPokemonList(pokemonList) {
  const pokemonListContainer = document.getElementById("pokemonList");
  pokemonListContainer.innerHTML = ""; // Clear the list before adding new Pokémon

  pokemonList.forEach((pokemon) => {
    const pokemonItem = document.createElement("div");
    pokemonItem.classList.add("pokemon-item");

    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;
    pokemonImage.classList.add("pokemon-image");

    pokemonImage.addEventListener("click", () => {
      fetchPokemon(pokemon.name);
    });

    pokemonItem.appendChild(pokemonImage);
    pokemonListContainer.appendChild(pokemonItem);
  });
}

// Function to fetch Pokémon data from the API
function fetchPokemon(pokemonName) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((pokemonData) => {
      showPokemonDetails(pokemonData);
    })
    .catch((error) => {
      console.error("Error fetching Pokémon data:", error);
    });
}

// Function to fetch a list of Pokémon (for example, first 10 Pokémon)
function fetchPokemonList(page = 1) {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`)
    .then((response) => response.json())
    .then((data) => {
      const pokemonList = data.results;
      const pokemonDetailsPromises = pokemonList.map((pokemon) =>
        fetch(pokemon.url).then((response) => response.json())
      );

      Promise.all(pokemonDetailsPromises).then((pokemonDetails) => {
        createPokemonList(pokemonDetails);
      });
    })
    .catch((error) => {
      console.error("Error fetching Pokémon list:", error);
    });
}

// Event listener for the form submission
document
  .getElementById("addPokemonForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemonName = document
      .getElementById("pokemonName")
      .value.toLowerCase();
    fetchPokemon(pokemonName);
  });

// Event listeners for the pagination buttons
let currentPage = 1;

document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  fetchPokemonList(currentPage);
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchPokemonList(currentPage);
  }
});

// Close modal when clicking outside the modal content
document.querySelector("dialog").addEventListener("click", (event) => {
  if (event.target === document.querySelector("dialog")) {
    document.querySelector("dialog").close();
  }
});

// Fetch the initial list of Pokémon when the page loads
fetchPokemonList();
