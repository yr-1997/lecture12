const planets = document.querySelector(".planets");
const heroesList = document.querySelector(".heroes_list");
const heroBtn = document.querySelector(".hero_btn");
const arrows = document.querySelector(".arrows");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

async function getHero() {
  const response = await fetch("http://swapi.dev/api/films/2/");
  const json = await response.json();
  const heroes = json.characters;
  heroes.forEach((e) => {
    fetch(e)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const heroes = document.createElement("div");
        heroes.classList.add("hero_item");
        heroes.innerHTML = `<h2>Name: <br> <span>${data.name}</span></h2>
            <h3>Birth year: <span>${data.birth_year}</span></h3>
            <h4>Gender: <br> <span>${data.gender}</span></h4>`;
        heroesList.append(heroes);
      });
  });
}
getHero();

function displayHeroes() {
  heroesList.classList.toggle("heroes_list-flex");
}
heroBtn.addEventListener("click", displayHeroes);

function page() {
  getPlanets(1);
  let counter = 1;
  prev.addEventListener("click", () => {
    if (counter <= 1) {
      return (counter = 1);
    } else {
      counter--;
      return getPlanets(counter);
    }
  });
  next.addEventListener("click", () => {
    if (counter >= 6) {
      return (counter = 6);
    } else {
      counter++;
      return getPlanets(counter);
    }
  });
}
page();

async function getPlanets(counter) {
  planets.innerHTML = "";
  const response = await fetch(
    `https://swapi.dev/api/planets/?page=${counter}`
  );
  const json = await response.json();
  console.log(json);
  const namePlanet = json.results;
  namePlanet.forEach((e) => {
    planetsList = document.createElement("div");
    planetsList.classList.add("planets_list");
    planetsList.innerHTML = `<h2>${e.name}</h2>`;
    planets.append(planetsList);
  });
}
