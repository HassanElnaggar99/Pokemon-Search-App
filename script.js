const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const outputDiv = document.querySelector(".output");

const cleanInput = (str) => {
  let inp = str || searchInput.value;
  inp = inp.toLowerCase();
  inp = inp.replace("♀", "-m");
  inp = inp.replace("♂", "-f");
  inp = inp.replace(/[ ]+/g, "-"); //\u0020
  inp = inp.replace(/[^A-Za-z0-9-]/g, "");
  console.log(inp);
  return inp;
}

const handleQuery = async () => {
  try {
    let res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${cleanInput()}`);
    let data = await res.json();
    console.log(data);

    pokemonName.textContent = data.name;
    pokemonId.textContent = '#' + data.id;
    weight.textContent = 'Weight: ' + data.weight;
    height.textContent = 'Height: ' + data.height;
    const spriteImg = document.getElementById("sprite");
    if (spriteImg) {
      spriteImg.src = data.sprites.front_default;
    } else {
      // outputDiv.innerHTML += `<img id="sprite" src="${data.sprites.front_default}">`;
      const img = document.createElement("img");
      img.id = "sprite";
      img.src = data.sprites.front_default;
      types.before(img);
    }
    types.innerHTML = "";
    data.types.forEach(item => {
      const span = document.createElement("span");
      span.textContent = item.type.name;
      span.className = item.type.name;
      types.append(span);
    })
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;
  } catch (err) {
    alert("Pokémon not found");
    console.log(`Error: ${err}`);
  }
}

searchBtn.addEventListener("click", handleQuery);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleQuery();
  }
})
