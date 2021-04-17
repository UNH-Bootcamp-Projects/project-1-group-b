// variables
var submitBtn = $(".submitBtn");
var searchInputEl = $(".searchInput");
var datePickerEl = $(".datePicker");
var dropDownEl = $(".dropdownContent");

// functions

function getData(event) {
  event.preventDefault()
  // fetch both API's
  fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=D9il0k2ZQ5sNHnlsKYHApQEcivKsruvn`
  ).then(function (responseTicket) {
    return responseTicket.json();
  }).then(ticketData) {

  }

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
