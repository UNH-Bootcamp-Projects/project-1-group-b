// variables
var submitBtn = $(".submitBtn");
var searchInputEl = $(".searchInput");

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
  });

var datePickerEl = $(".datePicker");
var dropDownEl = $(".dropdownContent");

  fetch(
    'http://api.weatherstack.com/forecast?access_key=43c0e4c4f816398c7b97a3b59817de2b&query='+encodeURIComponent('New York')+'&forecast_days=1'
  )
  .then(function (responseWeather) {
    return responseWeather.json();
  })
  .then(function (weatherData){
    console.log(weatherData);
  }) 
}

// getData();

submitBtn.on('click',getData)
