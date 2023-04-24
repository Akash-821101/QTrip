import config from "../conf/index.js";

console.log(config.backendEndpoint)

async function init() {
  //Fetches list of all cities along with their images and description
  console.log('loading init daata')
  let cities = await fetchCities();
  console.log(cities)

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  try {
    // TODO: MODULE_CITIES
    // 1. Fetch cities using the Backend API and return the data
    const cities = await fetch(`${config.backendEndpoint}/cities`);
    let data = await cities.json();
    return data;

  }catch(err){
    
    return null
  }
  
 

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let divRow = document.getElementById("data");

  // create a anchor tag with id 
  let a = document.createElement("a")
  a.id = `${id}`;
  a.setAttribute("href", `pages/adventures/?city=${id}`)
  

  // create div with class col
  let divCol = document.createElement("div")
  divCol.className = "col-6 col-sm-6 col-lg-3 mt-4";
 

  

  // create card 0f class tile append it to divCol
  let div = document.createElement("div");
  div.className = "tile";
  
  let img = document.createElement("img");
  img.setAttribute("src", `${image}`)
  
  let divText = document.createElement("div");
  divText.className = "tile-text";
  divText.innerHTML = `<h3>${city}</h3>
  <p>${description}</p>
  `
  div.append(img, divText);
  divRow.append(divCol);
  a.appendChild(div)
  divCol.appendChild(a)


}

export { init, fetchCities, addCityToDOM };
