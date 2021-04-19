// variables
var submitBtn = $(".submitBtn");
var searchInputEl = $(".searchInput");
var datePickerEl = $(".datePicker");
var dropDownEl = $(".dropdownContent");
var daysDiv = $(".days-div");

const api_url =
  "https://app.ticketmaster.com/discovery/v2/events.json?{id}/images&countryCode=US&city&radius&genre&apikey=D9il0k2ZQ5sNHnlsKYHApQEcivKsruvn";

async function getData() {
  const response = await fetch(api_url);
  const ticketData = await response.json();
  console.log(ticketData);
  console.log(response);

  daysDiv.empty();

  daysDiv.each((index, element) => {
    daysDiv.css("background-color", "rgb(245, 240, 233)");
    element = $(element);
    index = index;

    element.empty();

    element.css("width", "100%");
    element.css("height", "300px");

    var promoter = $("<div>");
    promoter.text(ticketData._embedded.events[index].promoter.name);

    promoter.css("color", "grey");
    element.append(promoter);

    var dateDiv = $("<div>");
    dateDiv.text(ticketData._embedded.events[index].dates.timezone);
    dateDiv.css("color", "grey");
    element.append(dateDiv);

    var nameDiv = $("<div>");
    nameDiv.text(ticketData._embedded.events[index].name);
    nameDiv.css("color", "grey");
    element.append(nameDiv);

    var venueDiv = $("<div>");
    venueDiv.text(ticketData._embedded.events[index]._embedded.venues[0].name);
    venueDiv.css("color", "grey");
    element.append(venueDiv);
  });
}

submitBtn.on("click", getData);
