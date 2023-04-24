import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  return params.get('adventure');
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
   
    const result = await response.json();
    console.log(result)

    return result;
  } catch(err) {
    return null;
  }
 
}


  
  


//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let hEle = document.getElementById("adventure-name");
  let pEle = document.getElementById("adventure-subtitle");
  let dEle = document.getElementById("adventure-content");
  let dRowEle = document.getElementById("photo-gallery");

 

  hEle.textContent = adventure.name;
  pEle.textContent = adventure.subtitle;

  adventure.images.forEach(image => {

    let divEle = document.createElement("div");
    

    let img = document.createElement("img");
    img.setAttribute("src", image);
    img.className = "activity-card-image";

    divEle.append(img);
    dRowEle.append(divEle);

    
  });



  dEle.textContent = adventure.content;

}




//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  //1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.getElementById('photo-gallery');

  const caroselImages = images.map((image, index) => {
    return `
    <div class="carousel-item ${index === 0 ?  'active' : ''}">
      <img src="${image}" class="d-block w-100">
    </div>
    `
  });

  const carosel = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      ${caroselImages.join('')}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  `

  photoGallery.innerHTML = carosel;

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  

  if(adventure.available) {
  

    let divCost = document.getElementById("reservation-person-cost");
  
    divCost.textContent = adventure.costPerHead;
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    
    

  }else {
   
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
  
  

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let divCost = document.getElementById("reservation-person-cost");
  
  divCost.textContent = adventure.costPerHead;

  let total = adventure.costPerHead * persons

  let divTotal = document.getElementById("reservation-cost");

  divTotal.textContent = total;
  

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm");

 
  form.addEventListener('submit',(e) => {

    e.preventDefault();
    const formData = new FormData(form);
    formData.set('adventure', `${adventure.id}`)
 
  
    console.log(formData.get("date"));
    let  data = Object.fromEntries(formData);
    

    fetch(`${config.backendEndpoint}/reservations/new`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    } )
    .then(res => res.json())
    .then(status => {
      if(status.success){
        alert("success")
        location.reload();
       
      }
    })

    

  } )
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  //let divRes = document.getElementById("reserved-banner");
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block"
  }else {
    document.getElementById("reserved-banner").style.display = "none"
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
