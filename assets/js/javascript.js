// variables
var submitBtn = $(".submitBtn");
var genreSearch = $("#genre-input");
var citySearch = $("#city-input");
var daysDiv = $(".days-div");
var weatherDivs = $(".weather-div");
var dropdownBtn = $(".dropdown-content");
var genreSelect = $(".genre-select");
var dropdownSelection = $("#dropdown-selection");

// function handleSaveEvent() {
// 	const event = JSON.parse(this.getAttribute('data-event'));
// 	savedEvents.push(event);
// 	localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
// }

const api_url =
  "https://app.ticketmaster.com/discovery/v2/events.json?{id}/images&countryCode=US&apikey=D9il0k2ZQ5sNHnlsKYHApQEcivKsruvn&sort=date,asc&size=5";

const weatherURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`;

const weatherKey = "3AP2W24SGPFQY452VWE3UJ6UD"

async function getData() {

  const response = await fetch(
    `${api_url}&city=${citySearch.val()}&classificationName=${genreSelect.val()}`
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
      sorryDiv.css({
        display: "flex",
        "flex-direction": "column",
        "justify-content": "start",
        "text-align": "center",
        padding: "30px",
        width: "100%",
        height: "fit-content",
        color: "grey",
        "background-color": "rgb(245, 240, 233)",
      });
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

    var nameDiv = $("<div>");
    nameDiv.css({ "font-size": "large", "font-weight": "bold" });
    nameDiv.text(events[index]._embedded.attractions[0].name);
    element.append(nameDiv);

    var concertDiv = $("<img>");
    concertDiv.css({ "margin-top": "12px", "margin-bottom": "12px" });
    concertDiv.attr("src", `${events[index].images[index].url}`);
    console.log(concertDiv);
    element.append(concertDiv);

    var dateDiv = $("<div>");
    var date = new Date(events[index].dates.start.dateTime);
    dateDiv.text(date.toString().split(" ").slice(0, 4).join(" "));
    element.append(dateDiv);

    var timeDiv = $("<div>");
    timeDiv.text(events[index].dates.localTime);
    element.append(timeDiv);

    var venueDiv = $("<div>");
    venueDiv.text(events[index]._embedded.venues[0].name);
    element.append(venueDiv);

    var ticketDiv = $("<a>");
    ticketDiv.text("TICKETS");
    ticketDiv.attr("href", events[index].url);
    ticketDiv.attr("target", "_blank");
    element.append(ticketDiv);

    fetch(
      `${weatherURL}/${encodeURIComponent(citySearch.val())}/${events[index].dates.start.localDate}?key=${weatherKey}`
    )
      .then(function (weatherResponse) {
        if (!weatherResponse.ok) {
          alert("City not found... Try again");
        }
        return weatherResponse.json();
      })
      .then(function (forecast) {

        var weatherDiv = $("<div>");
        var weatherEl = $("<p>").text(`Dress for ${forecast.days[0].temp} \u00B0F and ${forecast.days[0].conditions}`).css({ "font-style": "italic"});
        element.append(weatherDiv);
        weatherDiv.append(weatherEl);

      })
    
  });
  //content is now displayed with the response we received after on click event handler
  $(".results").show();
  $(".weather-results").show();  
}

//hides the content when page loads.
$(".results").hide();
$(".weather-results").hide();

submitBtn.on("click", getData);

// displayEvents(savedEvents);
// document.querySelector('#seardchInput')
// 	.addEventListener('keydown', function (event) {
// 		if (event.keyCode == 13) {
// 			getApi();
// 		}
// 	});

///// search results arent matching with genre