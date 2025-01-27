let currentPage = 1;
const pokemonPerPage = 3;

// Fetches a list of Pokémon and their details for the current page
function fetchPokemonList(page = 1) {
  fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${
      (page - 1) * pokemonPerPage
    }`
  )
    .then((response) => response.json())
    .then((data) => {
      const pokemonDetailsPromises = data.results.map((pokemon) =>
        fetch(pokemon.url).then((response) => response.json())
      );
      Promise.all(pokemonDetailsPromises).then(createPokemonList);
    })
    .catch((error) => console.error("Error fetching Pokémon list:", error));
}

// Creates and displays Pokémon list
function createPokemonList(pokemonList) {
  const pokemonListContainer = document.getElementById("pokemonList");
  pokemonListContainer.innerHTML = "";
  pokemonList.forEach((pokemon) => {
    const pokemonItem = document.createElement("div");
    pokemonItem.classList.add("pokemon-item");

    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;
    pokemonImage.classList.add("pokemon-image");

    const pokemonName = document.createElement("div");
    pokemonName.classList.add("pokemon-name");
    pokemonName.textContent = pokemon.name;

    pokemonItem.appendChild(pokemonImage);
    pokemonItem.appendChild(pokemonName);
    pokemonItem.addEventListener("click", () => fetchPokemon(pokemon.name));

    pokemonListContainer.appendChild(pokemonItem);
  });
}

// Fetches Pokémon details by name for modal
function fetchPokemon(pokemonName) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then(showPokemonDetails)
    .catch((error) => console.error("Error fetching Pokémon data:", error));
}

// Displays Pokémon details in the modal
function showPokemonDetails(pokemonData) {
  const modal = document.getElementById("pokemonDialog");
  document.getElementById("pokemonDisplay").textContent = pokemonData.name;
  document.getElementById("pokemonImage").src =
    pokemonData.sprites.front_default;

  const { feet, inches } = convertHeightToFeetInches(pokemonData.height / 10);
  const weightInPounds = convertWeightToPounds(pokemonData.weight / 10);

  document.getElementById(
    "pokemonHeight"
  ).textContent = `Height: ${feet}' ${inches}"`;
  document.getElementById(
    "pokemonWeight"
  ).textContent = `Weight: ${weightInPounds.toFixed(2)} lbs`;
  document.getElementById(
    "pokemonTypes"
  ).textContent = `Types: ${pokemonData.types
    .map((type) => type.type.name)
    .join(", ")}`;

  modal.showModal();
}

// Converts height to feet and inches
function convertHeightToFeetInches(heightInMeters) {
  const heightInInches = heightInMeters * 39.3701;
  return {
    feet: Math.floor(heightInInches / 12),
    inches: Math.round(heightInInches % 12),
  };
}

// Converts weight to pounds
function convertWeightToPounds(weightInKilograms) {
  return weightInKilograms * 2.20462;
}

// Event listener for form submission
document
  .getElementById("addPokemonForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    fetchPokemon(document.getElementById("pokemonName").value.toLowerCase());
  });

// Event listeners for pagination
document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  fetchPokemonList(currentPage);
  scrollList(300);
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchPokemonList(currentPage);
    scrollList(-300);
  }
});

// Function to scroll the list smoothly
function scrollList(distance) {
  document
    .getElementById("pokemonList")
    .scrollBy({ top: 0, left: distance, behavior: "smooth" });
}

// Event listener to close the modal when clicked outside
document.getElementById("pokemonDialog").addEventListener("click", (event) => {
  if (event.target === document.getElementById("pokemonDialog")) {
    document.getElementById("pokemonDialog").close();
  }
});

// Initial fetch on page load
fetchPokemonList(currentPage);
