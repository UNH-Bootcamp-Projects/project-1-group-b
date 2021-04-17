// variables
var submitBtn = $(".submitBtn");
var searchInputEl = $(".search-input");
var datePickerEl = $(".date-picker");
var dropDownEl = $(".dropdown-content");

// functions

function getData(event) {
  // fetch both API's
  fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=D9il0k2ZQ5sNHnlsKYHApQEcivKsruvn`
  ).then(function (response) {
    return response.json();
  });
}

getData();
