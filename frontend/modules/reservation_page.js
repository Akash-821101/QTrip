import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let res = await fetch(`${config.backendEndpoint}/reservations`);
    let data = await res.json();
    console.log(data)
    return data
  } catch(err) {
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020

    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm

  */
 if(reservations.length > 0) {
  document.getElementById("reservation-table-parent").style.display = "block"
  document.getElementById("no-reservation-banner").style.display = "none"
  
  let tBody = document.getElementById("reservation-table")

  reservations.forEach(reservation => {
    let tr = document.createElement("tr");


    let d = new Date(reservation.time);
    let date = d.toLocaleString("en-IN", {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'

    }).split(' at ').join(', ');
    //const dateParts = date.split(' ');


    let bookingDate = new Date(reservation.date);
 
    tr.innerHTML = `<td><b>${reservation.id}</b></td>
    <td>${reservation.name}</td>
    <td>${reservation.adventureName}</td>
    <td>${reservation.person}</td>
    <td>${bookingDate.toLocaleDateString("en-IN")}</td>
    <td>${reservation.price}</td>
    <td>${date}</td>
    <td id="${reservation.id}"><a class="btn btn-warning rounded-pill text-white" href="/pages/adventures/detail/?adventure=${reservation.adventure}">Visit Adventure</a></td>
    `;
    tBody.append(tr);

  })
 } else {
   document.getElementById("no-reservation-banner").style.display = "block"
   document.getElementById("reservation-table-parent").style.display = "none"
 }

}

export { fetchReservations, addReservationToTable };
