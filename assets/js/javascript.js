// variables
var submitBtn = $(".submitBtn");
var searchInputEl = $(".search-input");
var datePickerEl = $(".date-picker");
var dropDownEl = $(".dropdown-content");

// functions

function getData(event) {
  // fetch both API's
  return new Promise(function (resolve, reject) {
    fetch(
      //TicketMaster API for concerts
      `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=D9il0k2ZQ5sNHnlsKYHApQEcivKsruvn`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (forecastData) {
        var lat = forecastData.city.coord.lat;
        var lon = forecastData.city.coord.lon;

        fetch(
          //Weather API for...well, weather
          `http://api.weatherstack.com/43c0e4c4f816398c7b97a3b59817de2b`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (oneCallData) {
            resolve({
              forecastData: forecastData,
              oneCallData: oneCallData,
            });
          });
      });
  });
}

submitBtn.on("click", getData);
