// variables
var submitBtn = $(".submitBtn");
var searchInputEl = $(".searchInput");
var datePickerEl = $(".date-picker");
var dropDownEl = $(".dropdown-content");

// functions

function getData(cityName) {
  // fetch both API's
  return new Promise(function (resolve, reject) {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city=${cityName}&apikey=D9il0k2ZQ5sNHnlsKYHApQEcivKsruvn`
    )
      .then(function (responseTicket) {
        return responseTicket.json();
      })
      .then(function (ticketData) {
        console.log(ticketData._embedded.events[0]);
      });

    // fetch(`http://api.weatherstack.com/43c0e4c4f816398c7b97a3b59817de2b`)
    //   .then(function (responseWeather) {
    //     return responseWeather.json();
    //   })
    //   .then(function (weatherData) {
    //     console.log(weatherData);
    //   });
  });
}

getData();
