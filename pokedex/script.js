async function fetchPokemon() {
  const pokemonName = document
    .getElementById("pokemonName")
    .value.toLowerCase()
    .trim();
  const url = `https://pokemon-api3.p.rapidapi.com/pokemon?name=${pokemonName}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "YOUR-API-KEY",
      "x-rapidapi-host": "pokemon-api3.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    console.log(result);
    if (result.length === 0) {
      throw new Error("Pokémon not found");
    }
    displayPokemon(result);
  } catch (error) {
    console.error(error);
    document.getElementById("pokemonData").innerHTML =
      "<p>Pokémon not found. Please check the name and try again.</p>";
  }
}

function displayPokemon(pokemon) {
  const pokemonData = document.getElementById("pokemonData");
  pokemonData.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Type:</strong> ${pokemon.types
          .map((type) => type.type.name)
          .join(", ")}</p>
        <p><strong>Height:</strong> ${pokemon.height} decimetres</p>
        <p><strong>Weight:</strong> ${pokemon.weight} hectograms</p>
        <p><strong>Abilities:</strong> ${pokemon.abilities
          .map((ability) => ability.ability.name)
          .join(", ")}</p>
        <h3>Base Stats</h3>
        <ul>
            ${pokemon.stats
              .map(
                (stat) =>
                  `<li><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>`
              )
              .join("")}
        </ul>
    `;
}
