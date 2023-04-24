
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const searchTokens = search.split('&');
  const city = searchTokens.find(key => key.indexOf('city='))
  if(city){
    return city.split('=')[1]
  }
  return null

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const res = await fetch(`${config.backendEndpoint}/adventures?city=${city}`)
    const data = await res.json();
    return data
  
  } catch(err) {
    return null;
  }
  

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  console.log(adventures)
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const dRow = document.getElementById("data");
  dRow.innerHTML = "";
  
  
  adventures.forEach((key)=> {
    addAdventuresCards(key.id, key.category, key.name, key.duration, key.costPerHead, key.image, key.currency);

  })

  function addAdventuresCards(id, category, name, duration, costPerHead, image, currency) {
    
    let a = document.createElement("a");
    a.id = `${id}`;
    a.className = "position-relative";
    a.setAttribute("href", `detail/?adventure=${id}`)

    let dCol = document.createElement("div");
    dCol.className = "col-6 col-sm-6 col-lg-3";

    // create card and add to col

    let dCard = document.createElement("div");
    dCard.className = "activity-card mb-3";

    let img = document.createElement("img");
    img.setAttribute("src", `${image}`)

    let dBanner = document.createElement("div");
    dBanner.className = "category-banner";
    dBanner.innerHTML = `${category}`

    let dText = document.createElement("div");
    dText.className = "w-100 p-2"
    dText.innerHTML = `<div class="d-flex justify-content-between">
    <div class="d-flex">${name}</div>
    <div class="d-flex">${currency} ${costPerHead}</div>
    </div>
    <div class="d-flex justify-content-between ">
    <div>Duration</div>
    <div>${duration} Hours</div>
    </div>
    `
    dCol.append(a);
    dCard.append(img, dText);
    a.append(dCard, dBanner);
    dRow.append(dCol);


    // const adventureCardHTML = `
    //   <div class="col-6 col-sm-6 col-lg-3">
    //     <a id="${id}" class="position-relative" href="detail/?adventure=${id}">
    //       <div class="activity-card mb-3">
    //         <img src="${image}">
    //         <div class="w-100 p-2">
    //           <div class="d-flex justify-content-between">
    //             <div class="d-flex">${name}</div>
    //             <div class="d-flex">${currency} ${costPerHead}</div>
    //           </div>
    //           <div class="d-flex justify-content-between">
    //             <div>Duration</div>
    //             <div>${duration} Hours</div>
    //           </div>
    //         </div>
    //       </div>
    //       <div class="category-banner">${category}</div>
    //     </a>
    //   </div>
    // `;

    //HTML += adventureCardHTML;

  }

  //dRow.innerHTML = HTML;

 
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter((key) => {
    if(key.duration > low && key.duration <= high){
      return true;
    }
    return false;
  })
  


}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter((key) => {
    if(categoryList.includes(key.category)){
      return true
    }
    return false
  });
  

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // let result = [...list];
  // if(filters.category && filters.category.length > 0){
  //   result = filterByCategory(result, filters.category);
  // }
  // if(filters.duration && filters.duration.length > 0){
  //   let str = filters.duration.split("-");
  //   result = filterByDuration(result, str[0], str[1]);
  // }

  // return result;

  // return result;
  if(filters.category && filters.category.length > 0 && filters.duration){
    let str = filters.duration.split("-");
    let newCategory = filterByCategory(list, filters.category);
    console.log(newCategory)
    return filterByDuration(newCategory, str[0], str[1]);

  }else if(filters.category && filters.category.length > 0){
    return filterByCategory(list, filters.category);

  }else if(filters.duration){
    let str = filters.duration.split("-");
    return filterByDuration(list, str[0], str[1]);
  } 

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let data = JSON.parse(localStorage.getItem('filters'));


  // Place holder for functionality to work in the Stubs
  return data;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  
  
  let divSection = document.getElementById("category-section");
  let divCategory = document.getElementById("category-list");
  //let div = document.createElement("div");
  filters.category.forEach((key) => {
    
    let div = document.createElement("div");
    div.className = "m-2 p-2 border border-info rounded-3"
    div.innerText = `${key}`;

    divCategory.appendChild(div);
    
  })


  divSection.append(divCategory);

  

  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
