const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=10"; // Fetch a smaller number for testing
const pokemonList = document.getElementById("pokemonList");

async function getAllPokemon() {
  console.log("getAll");
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data); // Log the fetched data to check if it works
    pokemonList.innerHTML = ""; // Clear existing list
    data.results.forEach((pokemon) => {
      const pokemonButton = document.createElement("button");
      pokemonButton.textContent =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      pokemonButton.className = "pokemon-button";
      pokemonButton.addEventListener("click", () => {
        displayPokemonCard(pokemon.name);
      });
      pokemonList.appendChild(pokemonButton);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function displayPokemonCard(pokemonName) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon data: ${response.statusText}`);
    }
    const pokemon = await response.json();

    // instead of creating a div
    // hard code a <dialog> modal element into the html
    // fill it with an image, h1, and anything else you want to show,
    // but make each of these elements empty, but make sure to add ids to them all
    // here, use javascript to target those elements and fill them with the appropriate data
    // also, you will need to use the dialog.showModal() function to revveal the modal
    const div = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("h1");
    div.className = "card";
    image.src = pokemon.sprites.other.dream_world.front_default;
    name.textContent =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    div.appendChild(name);
    div.appendChild(image);
    document.getElementById("root").appendChild(div);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Trigger to load Pokémon list
// document
//   .getElementById("listPokemonButton")
//   .addEventListener("click", getAllPokemon);

getAllPokemon();
// async function getAllPokemon() {
//   try {
//     const response = await fetch(API_URL);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch data: ${response.statusText}`);
//     }
//     const data = await response.json();
//     console.log(data); // Log the fetched data to check if it works
//     pokemonList.innerHTML = ""; // Clear existing list
//     data.results.forEach((pokemon) => {
//       const pokemonButton = document.createElement("button");
//       pokemonButton.textContent =
//         pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
//       pokemonButton.className = "pokemon-button";
//       pokemonButton.addEventListener("click", () => {
//         displayPokemonCard(pokemon.name);
//       });
//       pokemonList.appendChild(pokemonButton);
//     });
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// }

// async function displayPokemonCard(pokemonName) {
//   try {
//     const response = await fetch(
//       `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
//     );
//     if (!response.ok) {
//       throw new Error(`Failed to fetch Pokémon data: ${response.statusText}`);
//     }
//     const pokemon = await response.json();
//     const div = document.createElement("div");
//     const image = document.createElement("img");
//     const name = document.createElement("h1");
//     div.className = "card";
//     image.src = pokemon.sprites.other.dream_world.front_default;
//     name.textContent =
//       pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
//     div.appendChild(name);
//     div.appendChild(image);
//     document.getElementById("root").appendChild(div);
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// }

// // Trigger to load Pokémon list
// document
//   .getElementById("listPokemonButton")
//   .addEventListener("click", getAllPokemon);
