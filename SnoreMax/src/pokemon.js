/*
const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=10000"; // Adjust limit as needed to fetch all Pokémon
const root = document.getElementById("root"); // For displaying the Pokémon card
const pokemonList = document.getElementById("pokemonList"); // For displaying the Pokémon list
const form = document.getElementById("PokemonForm");
form.addEventListener("submit", (event) => {
  // Prevents the form from submitting and refreshing the page
  event.preventDefault();
});
// Function to fetch and display all Pokémon
async function getAllPokemon() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();

    // Clear the existing list
    pokemonList.innerHTML = "";

    // Create buttons for each Pokémon
    data.results.forEach((pokemon) => {
      const pokemonButton = document.createElement("button");
      pokemonButton.textContent =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      pokemonButton.className = "pokemon-button";

      // Add event listener to display Pokémon info on click
      pokemonButton.addEventListener("click", () => {
        displayPokemonCard(pokemon.name);
      });

      pokemonList.appendChild(pokemonButton);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Function to fetch and display details of a Pokémon
async function displayPokemonCard(pokemonName) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Pokémon details: ${response.statusText}`
      );
    }
    const pokemon = await response.json();

    // Clear only the card display area
    root.innerHTML = "";

    // Create elements for the Pokémon Card
    const div = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("h1");
    div.className = "card";
    image.src = pokemon.sprites.other.dream_world.front_default;
    name.textContent =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    div.appendChild(name);
    div.appendChild(image);
    root.appendChild(div);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Add event listener to the "List Pokémon" button
const listPokemonButton = document.getElementById("listPokemonButton");
listPokemonButton.addEventListener("click", () => {
  getAllPokemon();
});

////

I'm not sure which version is better, the one below is suppoesed to use models, but noooooo of course it won't work, anyway I'm going to push, here's to hoping I don't blow up both our computers :)
*/

// Model: Handles data fetching and storage
class PokemonModel {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.pokemonList = [];
  }

  async fetchAllPokemon() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      this.pokemonList = data.results;
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  }

  async fetchPokemonDetails(pokemonName) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch Pokémon details: ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
      return null;
    }
  }

  getPokemonNames() {
    return this.pokemonList.map((pokemon) => pokemon.name);
  }
}

// View: Manages the DOM
class PokemonView {
  constructor(pokemonListContainerId, cardContainerId) {
    this.pokemonListContainer = document.getElementById(pokemonListContainerId);
    this.cardContainer = document.getElementById(cardContainerId);
  }

  displayPokemonList(pokemonNames, onPokemonClick) {
    this.pokemonListContainer.innerHTML = ""; // Clear existing list
    pokemonNames.forEach((name) => {
      const button = document.createElement("button");
      button.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      button.className = "pokemon-button";
      button.addEventListener("click", () => onPokemonClick(name)); // Attach click event
      this.pokemonListContainer.appendChild(button);
    });
  }

  displayPokemonCard(pokemon) {
    this.cardContainer.innerHTML = ""; // Clear existing card
    if (!pokemon) return;

    const div = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("h1");
    div.className = "card";
    image.src =
      pokemon.sprites.other.dream_world.front_default ||
      pokemon.sprites.front_default;
    name.textContent =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    div.appendChild(name);
    div.appendChild(image);
    this.cardContainer.appendChild(div);
  }
}

// Controller: Connects the Model and View
class PokemonController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async initialize() {
    await this.model.fetchAllPokemon();
    const pokemonNames = this.model.getPokemonNames();
    this.view.displayPokemonList(pokemonNames, (name) =>
      this.showPokemonDetails(name)
    );
  }

  async showPokemonDetails(pokemonName) {
    const pokemon = await this.model.fetchPokemonDetails(pokemonName);
    this.view.displayPokemonCard(pokemon);
  }
}

// Initialize the application
const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=10000";
const model = new PokemonModel(API_URL);
const view = new PokemonView("pokemonList", "root");
const controller = new PokemonController(model, view);
///
document.getElementById("PokemonForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from reloading the page
  const pokemonName = document.getElementById("pokemonName").value.trim();
  if (pokemonName) {
    controller.showPokemonDetails(pokemonName);
  }
});

///
document.getElementById("listPokemonButton").addEventListener("click", () => {
  controller.initialize();
});
