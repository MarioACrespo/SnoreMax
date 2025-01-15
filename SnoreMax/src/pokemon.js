/*
const API_URL = "https://pokeapi.co/api/v2/pokemon";
const root = document.getElementById("root");
const form = document.getElementById("addPokemonForm");
form.addEventListener("submit", (event) => {
  // Prevents the form from submitting and refreshing the page
  event.preventDefault();
});
//const pokemonName = document.getElementById("pokemonName").value;

//

//event.preventDefault();

const pokemonName = document.getElementById("pokemonName").value;
fetch(`${API_URL}/${pokemonName}`)
  .then((response) => response.json())
  .then((newPokemon) => {
    // create elements for the Pokemon Card
    const div = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("h1");
    // adding class from styles.css for card
    div.className = "card";
    // getting information from fetched pokemon object
    image.src = newPokemon.sprites.other.dream_world.front_default;
    name.textContent = newPokemon.name;

    div.appendChild(name);
    div.appendChild(image);
    // appending to root element
    root.appendChild(div);

    // another image option:
    //image.src = newPokemon.sprites.front_default;

    // other ideas:
    // div.appendChild(pokemonNameLabel);
    // div.appendChild(pokemonAttack);
    // div.appendChild(pokemonHealth);
  });

  */

//////

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const root = document.getElementById("root");
const form = document.getElementById("addPokemonForm");
form.addEventListener("submit", (event) => {
  // Prevents the form from submitting and refreshing the page
  event.preventDefault();
  const pokemonName = document.getElementById("pokemonName").value;
  fetch(`${API_URL}/${pokemonName}`)
    .then((response) => response.json())
    .then((newPokemon) => {
      // create elements for the Pokemon Card
      const div = document.createElement("div");
      const image = document.createElement("img");
      const name = document.createElement("h1");
      div.className = "card";
      image.src = newPokemon.sprites.other.dream_world.front_default;
      name.textContent = newPokemon.name;
      div.appendChild(name);
      div.appendChild(image);
      root.appendChild(div);

      // another image option:
      //image.src = newPokemon.sprites.front_default;
      // other ideas:
      // div.appendChild(pokemonNameLabel);
      // div.appendChild(pokemonAttack);
      // div.appendChild(pokemonHealth);
    });
});
