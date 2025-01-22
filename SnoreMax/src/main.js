const API_URL = "https://pokeapi.co/api/v2/pokemon";

// Elements
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const form = document.getElementById("addPokemonForm");
const pokemonNameInput = document.getElementById("pokemonName");
const submitBtn = document.getElementById("submitBtn");
const modal = document.getElementById("myModal");
const closeModal = document.getElementById("closeModal");

// Button 1: Show Search Bar and Find Pokemon Button
button1.addEventListener("click", () => {
  form.style.display = "flex"; // Show the form
  button1.style.display = "none"; // Hide button 1
});

// Form Submit: Fetch Pokemon Data
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

  const pokemonName = pokemonNameInput.value;

  fetch(`${API_URL}/${pokemonName.toLowerCase()}`)
    .then((response) => {
      if (!response.ok) throw new Error("Pokemon not found");
      return response.json();
    })
    .then((newPokemon) => {
      // Show modal with Pokemon data
      const pokemonDisplay = document.getElementById("pokemonDisplay");
      const pokemonImage = document.getElementById("pokemonImage");

      pokemonDisplay.textContent = newPokemon.name;
      pokemonImage.src = newPokemon.sprites.other.dream_world.front_default;

      modal.style.display = "flex";
    })
    .catch(() => {
      alert("Pokemon not found! Try again.");
    });
});

// Close Modal
closeModal.onclick = () => {
  modal.style.display = "none"; // Hide the modal
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none"; // Hide the modal
  }
};
