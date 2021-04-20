// variables
var submitBtn = $(".submitBtn");
var datePicker = $("#search-date");
var genreSearch = $("#genre-input");
var citySearch = $("#city-input");
var daysDiv = $(".days-div");

const api_url =
  "https://app.ticketmaster.com/discovery/v2/events.json?{id}/images&countryCode=US&apikey=D9il0k2ZQ5sNHnlsKYHApQEcivKsruvn&classificationName=music&sort=date,desc";

const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
  
const oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?"

const weatherKey = "0b34c0c779002825da1931b61289722d"

async function getData() {
  const response = await fetch(
    `${api_url}&city=${citySearch.val()}&classificationName=${genreSearch.val()}`
  );
  const ticketData = await response.json();
  console.log(ticketData);
  console.log(response);
  var events = ticketData._embedded.events;
  if (datePicker.val()) {
    events = events.filter(function (event) {
      return new Date(event.dates.start.dateTime) >= new Date(datePicker.val());
    });
  }
  console.log(events.length);

  daysDiv.empty();

  daysDiv.each((index, element) => {
    element = $(element);

    element.empty();

    if (events.length <= index) {
      var sorryDiv = $("<div>");
      sorryDiv.text("NOT AVAILABLE");
      element.append(sorryDiv);
      return;
    }
    element.css({
      display: "flex",
      "flex-direction": "column",
      "justify-content": "center",
      "text-align": "center",
      padding: "30px",
      width: "100%",
      height: "auto",
      color: "grey",
      "background-color": "rgb(245, 240, 233)",
    });

    var nameDiv = $("<div>");
    nameDiv.text(events[index]._embedded.attractions[0].name);
    element.append(nameDiv);

    var concertDiv = $("<img>");
    concertDiv.attr("src", `${events[index].images[index].url}`);
    console.log(concertDiv);
    element.append(concertDiv);

    var dateDiv = $("<div>");
    var date = new Date(events[index].dates.start.dateTime);
    dateDiv.text(date.toString().split(" ").slice(0, 4).join(" "));
    element.append(dateDiv);

    var venueDiv = $("<div>");
    venueDiv.text(events[index]._embedded.venues[0].name);
    element.append(venueDiv);

    var ticketDiv = $("<a>");
    ticketDiv.text("TICKETS");
    ticketDiv.attr("href", events[index].url);
    ticketDiv.attr("target", "_blank");
    element.append(ticketDiv);
  });

  getWeather()

}

function getWeather() {
  console.log(`${weatherURL}${encodeURIComponent(citySearch.val())}&appid=${weatherKey}&units=imperial`)
  fetch(`${weatherURL}${encodeURIComponent(citySearch.val())}&appid=${weatherKey}&units=imperial`)
  .then(function(weatherResponse) {
    if (!weatherResponse.ok) {
      alert('City not found... Try again')
    }
    return weatherResponse.json();
  })
  .then (function (geoParse){
    console.log(`${oneCallURL}lat=${geoParse.coord.lat}&lon=${geoParse.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${weatherKey}&units=imperial`)
    fetch(`${oneCallURL}lat=${geoParse.coord.lat}&lon=${geoParse.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${weatherKey}&units=imperial`)
    .then(function(forecastResponse) {
      return forecastResponse.json();
    })
    .then (function (forecast) {
      console.log(datePicker.val())
      let today = dayjs().startOf('date');
      let searchDate = dayjs(datePicker.val()).startOf('date')
      let dateVal = searchDate.diff(today,'d')

      console.log(dateVal)

      console.log(forecast.daily[dateVal].temp.eve+' \u00B0F')
      console.log(forecast.daily[dateVal].pop+'%')
      console.log(forecast.daily[dateVal].pop*100+'%')
      console.log(forecast.daily[dateVal].weather[0].id)

      if(forecast.daily[dateVal].weather[0].id<600) {
        console.log('its rainy')
        $("#weatherImg").attr("style", "width: 100%; background-image: url(./assets/css/images/rain.jpg)")
      } else if(forecast.daily[dateVal].weather[0].id<700) {
        console.log('its snowing')
        $("#weatherImg").attr("style", "width: 100%; background-image: url(./assets/css/images/snow.jpg)")
      } else if(forecast.daily[dateVal].weather[0].id<800) {
        console.log('its weird')
        $("#weatherImg").attr("style", "width: 100%; background-image: url(./assets/css/images/cloudy.jpg)")
      } else if(forecast.daily[dateVal].weather[0].id<803) {
        console.log('its clear')
        $("#weatherImg").attr("style", "width: 100%; background-image: url(./assets/css/images/clear.jpg)")
      } else {
        console.log('its cloudy')
        $("#weatherImg").attr("style", "width: 100%; background-image: url(./assets/css/images/cloudy.jpg)")
      }

      
      
    
    })
  })
}

submitBtn.on("click", getData);

///// search results arent matching with genre
