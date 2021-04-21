// variables
var submitBtn = $(".submitBtn");
var genreSearch = $("#genre-input");
var citySearch = $("#city-input");
var daysDiv = $(".days-div");
var dropdownBtn = $(".dropdown-content");
var genreSelect = "";
var dropdownSelection = $("#dropdown-selection");

var tempAr = [];

// function handleSaveEvent() {
// 	const event = JSON.parse(this.getAttribute('data-event'));
// 	savedEvents.push(event);
// 	localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
// }

//DOMContentLoaded - it fires when initial HTML document has been completely loaded
document.addEventListener("DOMContentLoaded", function () {
  // querySelector - it returns the element within the document that matches the specified selector
  var dropdown = document.querySelector(".dropdown");
  //addEventListener - attaches an event handler to the specified element.
  dropdown.addEventListener("click", function (event) {
    //event.stopPropagation() - it stops the bubbling of an event to parent elements, by preventing parent event handlers from being executed
    event.stopPropagation();
    //classList.toggle - it toggles between adding and removing a class name from an element
    dropdown.classList.toggle("is-active");
  });
});

const api_url =
  "https://app.ticketmaster.com/discovery/v2/events.json?{id}/images&countryCode=US&apikey=D9il0k2ZQ5sNHnlsKYHApQEcivKsruvn&sort=date,asc";

dropdownBtn.on("click", "a", function () {
  genreSelect = $(this).text();
});
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";

const oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?";

const weatherKey = "0b34c0c779002825da1931b61289722d";

async function getData() {
  tempAr = [];
  await getWeather();
  const response = await fetch(
    `${api_url}&city=${citySearch.val()}&classificationName=${genreSelect.trim()}`
  );
  const ticketData = await response.json();
  console.log(ticketData);
  console.log(response);
  var events = ticketData._embedded.events;

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
      "justify-content": "start",
      "text-align": "center",
      padding: "30px",
      width: "100%",
      height: "auto",
      color: "grey",
      "background-color": "rgb(245, 240, 233)",
    });

    var dateDiv = $("<div>");
    var dateEl = $("<p>").css({"font-size": "large", "font-weight": "bold"})
    dateEl.text(dayjs().add((index+1),'day').format('MMMM D, YYYY'));
    element.append(dateDiv)
    dateDiv.append(dateEl)

    var weatherDiv = $("<div>");
    var tempEl = $("<p>")
    tempEl.text(tempAr[index]);
    element.append(weatherDiv)
    dateDiv.append(tempEl)

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

  
}

function getWeather() {
  return new Promise((resolve,reject) => {
    console.log(
      `${weatherURL}${encodeURIComponent(
        citySearch.val()
      )}&appid=${weatherKey}&units=imperial`
    );
    fetch(
      `${weatherURL}${encodeURIComponent(
        citySearch.val()
      )}&appid=${weatherKey}&units=imperial`
    )
      .then(function (weatherResponse) {
        if (!weatherResponse.ok) {
          alert("City not found... Try again");
        }
        return weatherResponse.json();
      })
      .then(function (geoParse) {
        console.log(
          `${oneCallURL}lat=${geoParse.coord.lat}&lon=${geoParse.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${weatherKey}&units=imperial`
        );
        fetch(
          `${oneCallURL}lat=${geoParse.coord.lat}&lon=${geoParse.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${weatherKey}&units=imperial`
        )
          .then(function (forecastResponse) {
            return forecastResponse.json();
          })
          .then(function (forecast) {
            console.log(forecast.daily)
            for (let i = 1; i < forecast.daily.length; i++) {
              console.log(forecast.daily[i].temp.eve + " \u00B0F");
              console.log(forecast.daily[i].pop + "%");
              console.log(forecast.daily[i].pop * 100 + "%");
              console.log(forecast.daily[i].weather[0].id);
              tempAr.push(forecast.daily[i].temp.eve + " \u00B0F")
            }
            console.log(tempAr)
            resolve();
          });
      });

  })
};

submitBtn.on("click", getData);

// displayEvents(savedEvents);
// document.querySelector('#seardchInput')
// 	.addEventListener('keydown', function (event) {
// 		if (event.keyCode == 13) {
// 			getApi();
// 		}
// 	});

///// search results arent matching with genre
