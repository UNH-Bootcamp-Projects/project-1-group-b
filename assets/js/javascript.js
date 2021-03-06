// variables
var submitBtn = $(".submitBtn");
var genreSearch = $("#genre-input");
var citySearch = $("#city-input");
var daysDiv = $(".days-div");
var weatherDivs = $(".weather-div");
var dropdownBtn = $(".dropdown-content");
var genreSelect = $(".genre-select");
var dropdownSelection = $("#dropdown-selection");

const api_url =
  "https://app.ticketmaster.com/discovery/v2/events.json?{id}/images&countryCode=US&apikey=D9il0k2ZQ5sNHnlsKYHApQEcivKsruvn&sort=date,asc&size=5";

const weatherURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`;

const weatherKey = "3AP2W24SGPFQY452VWE3UJ6UD";

let history = JSON.parse(localStorage.getItem('searchHistory'));
if(history != null) {
    citySearch.val(history[0])
    genreSelect.val(history[1])
    getData();
};

async function getData() {
    history = [];
    history.push(citySearch.val());
    history.push(genreSelect.val());
    localStorage.setItem('searchHistory', JSON.stringify(history));
    const response = await fetch(
        `${api_url}&city=${citySearch.val()}&classificationName=${genreSelect.val()}`
    );
    const ticketData = await response.json();

    if (ticketData.page.totalElements === 0 || citySearch.val() === "") {
      var target = $(this).data("target");
      $("html").addClass("is-clipped");
      $(target).addClass("is-active");
    return
  }
    
    var events = ticketData._embedded.events;

    daysDiv.empty();

    daysDiv.each((index, element) => {
        element = $(element);

        element.empty();

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
            sorryDiv.text("No additional concerts available");
            element.append(sorryDiv);
            return;
        }


        var nameDiv = $("<div>");
        nameDiv.css({ "font-size": "large", "font-weight": "bold" });
        nameDiv.text(events[index].name);
        element.append(nameDiv);

        var concertDiv = $("<img>");
        concertDiv.css({ "margin-top": "12px", "margin-bottom": "12px" });
        concertDiv.attr("src", `${events[index].images[index].url}`);
        element.append(concertDiv);

        var dateDiv = $("<div>");
        dateDiv.text(dayjs(events[index].dates.start.dateTime).format("ddd MMM D, YYYY"));
        element.append(dateDiv);

        var timeDiv = $("<div>");
        timeDiv.text(dayjs(events[index].dates.start.dateTime).format("h:mm a"));
        element.append(timeDiv);

        var venueDiv = $("<div>");
        venueDiv.text(events[index]._embedded.venues[0].name);
        element.append(venueDiv);

        var ticketDiv = $("<a>");
        ticketDiv.text("TICKETS");
        ticketDiv.attr("href", events[index].url);
        ticketDiv.attr("target", "_blank");
        ticketDiv.css({
          backgroundColor: "brown",
          color: "beige",
          margin: "10px",
          borderRadius: "7%",
          padding: "10px",
          marginLeft: "auto",
          marginRight: "auto",
          width: "8em",
        })
        element.append(ticketDiv);

        fetch(
                `${weatherURL}/${encodeURIComponent(citySearch.val())}/${events[index].dates.start.localDate}?key=${weatherKey}`
            )
            .then(function(weatherResponse) {
                return weatherResponse.json();
            })
            .then(function(forecast) {

                var weatherDiv = $("<div>").css({"margin-top": "auto"});
                var weatherEl = $("<p>").text(`Dress for ${forecast.days[0].temp} \u00B0F and ${forecast.days[0].conditions}`).css({ "font-style": "italic", "font-size": "1.25rem"});
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

// close Modal
$(".modal-close").click(function() {
  $("html").removeClass("is-clipped");
  $(this).parent().removeClass("is-active");
});

submitBtn.on("click", getData);


