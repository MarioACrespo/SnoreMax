let currentPage = 1;
const pokemonPerPage = 3; // Limit to 3 Pokémon per page

// Function to fetch a list of Pokémon with a limit of 3 per page
function fetchPokemonList(page = 1) {
  fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${
      (page - 1) * pokemonPerPage
    }`
  )
    .then((response) => response.json())
    .then((data) => {
      const pokemonList = data.results;
      const pokemonDetailsPromises = pokemonList.map((pokemon) =>
        fetch(pokemon.url).then((response) => response.json())
      );

      Promise.all(pokemonDetailsPromises).then((pokemonDetails) => {
        // Clear the current list and create a new one for the current page
        const pokemonListContainer = document.getElementById("pokemonList");
        pokemonListContainer.innerHTML = ""; // Clear the current list
        createPokemonList(pokemonDetails);
      });
    })
    .catch((error) => {
      console.error("Error fetching Pokémon list:", error);
    });
}

// Function to create Pokémon list
function createPokemonList(pokemonList) {
  const pokemonListContainer = document.getElementById("pokemonList");

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

    pokemonItem.addEventListener("click", () => {
      fetchPokemon(pokemon.name);
    });

    pokemonListContainer.appendChild(pokemonItem);
  });
}

// Function to fetch Pokémon details for the modal
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

// Function to show Pokémon details in the modal
function showPokemonDetails(pokemonData) {
  const modal = document.getElementById("pokemonDialog");

  const pokemonName = pokemonData.name;
  document.getElementById("pokemonDisplay").textContent = pokemonName;

  const pokemonImage = document.getElementById("pokemonImage");
  pokemonImage.src = pokemonData.sprites.front_default;

  const heightInMeters = pokemonData.height / 10;
  const weightInKilograms = pokemonData.weight / 10;

  const { feet, inches } = convertHeightToFeetInches(heightInMeters);
  const weightInPounds = convertWeightToPounds(weightInKilograms);
// Handle modal close when clicked outside the modal content
pokemonDialog.addEventListener("click", (e) => {
  if (e.target === pokemonDialog) {
    pokemonDialog.close();
  }
});

  document.getElementById(
    "pokemonHeight"
  ).textContent = `Height: ${feet}' ${inches}"`;
  document.getElementById(
    "pokemonWeight"
  ).textContent = `Weight: ${weightInPounds.toFixed(2)} lbs`;

  const types = pokemonData.types
    .map((typeInfo) => typeInfo.type.name)
    .join(", ");
  document.getElementById("pokemonTypes").textContent = `Types: ${types}`;

  modal.showModal();
}

// Functions to convert height and weight
function convertHeightToFeetInches(heightInMeters) {
  const heightInInches = heightInMeters * 39.3701;
  const feet = Math.floor(heightInInches / 12);
  const inches = Math.round(heightInInches % 12);
  return { feet, inches };
}

function convertWeightToPounds(weightInKilograms) {
  return weightInKilograms * 2.20462;
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
document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  fetchPokemonList(currentPage);
  scrollListRight();
  if ((currentPage + 1) * pokemonPerPage < totalPokemonCount) {
    currentPage++;
    fetchPokemonPage(currentPage);
  }
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchPokemonList(currentPage);
    scrollListLeft();
  }
});

// Function to smoothly scroll the list to the right
function scrollListRight() {
  const pokemonListContainer = document.getElementById("pokemonList");
  pokemonListContainer.scrollBy({ top: 0, left: 300, behavior: "smooth" });
}

// Function to smoothly scroll the list to the left
function scrollListLeft() {
  const pokemonListContainer = document.getElementById("pokemonList");
  pokemonListContainer.scrollBy({ top: 0, left: -300, behavior: "smooth" });
}

// Event listener to close the modal when clicked outside
document.getElementById("pokemonDialog").addEventListener("click", (event) => {
  if (event.target === document.getElementById("pokemonDialog")) {
    document.getElementById("pokemonDialog").close();
  }
});

// Initial fetch of Pokémon list when the page loads
fetchPokemonList(currentPage);
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

submitBtn.addEventListener("click", () => getPokemonData(pokemonName.value));
//
