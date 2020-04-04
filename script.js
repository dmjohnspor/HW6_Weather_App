// Render past cities buttons from local storage:

var pastCities = localStorage.getItem("city");
if (pastCities !== null) {
    pastCities = JSON.parse(pastCities);
    for (var i = 0; i < pastCities.length; i++) {
        var newDiv = $("<div>").text(pastCities[i]);
        newDiv.addClass("card listItem");
        $("#pastCitiesList").append(newDiv);
    }
}

// On click functions:
// Reset:
var resetBtn = $("#resetBtn");
resetBtn.on("click", function () {
    $("#pastCitiesList").empty();
})

// Search:
var searchBtn = $("#searchBtn");
searchBtn.on("click", function (event) {
    event.preventDefault();

    // Adding cities to the cities list:
    var listEntry = $("<div>");
    var cityName = $(".form-control").val();
    listEntry.text(cityName);
    listEntry.addClass("card listItem");
    $("#pastCitiesList").prepend(listEntry);

    // Storing cities in local storage:
    currentList = localStorage.getItem("city");
    if (currentList === null) {
        currentList = [cityName]
        localStorage.setItem("city", JSON.stringify(currentList));
    }
    else {
        currentList = JSON.parse(currentList);
        currentList.push(cityName);
        localStorage.setItem("city", JSON.stringify(currentList));
    }

    // First ajax call (by city name):
    var APIkey = "031f158b8aa6738886dd6a6cbc74318e";
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;

    $.ajax({
        url: queryURL1,
        method: "GET"
    })
        .then(function (response1) {
            // Collect data and store it into variables:
            var name = response1.name;
            var description = response1.weather.description;
            var icon = response1.weather.icon;
            var tempK = response1.main.temp;
            var temp = ((tempK - 273.15) * 1.8) + 32
            var tempF = temp.toFixed(1);
            var hum = response1.main.humidity;
            var windMeters = response1.wind.speed;
            var wind = windMeters * 2.237;
            var windMiles = wind.toFixed(1);

            // Display data on the page:
            // City name date and icon:
            $("<div>").addClass("resHeader");
            $(".resHeader").text(name);
            $(".resHeader").append(icon);
            // Brief weather description:
            $("<div>").addClass("description");
            $(".description").text(description);
            // Temperature:
            $("<div>").addClass("resTemp");
            $(".resTemp").text("Temperature: " + tempF);
            // Humidity:
            $("<div>").addClass("resHum");
            $(".resHum").text("Humidity: " + hum + "%");
            // Wind Speed:
            $("<div>").addClass("resWind");
            $(".resWind").text("Wind speed: " + windMiles + "MPH");

            //Second ajax call (by coordinates):
            var lat = response1.coord.lat;
            var lon = response1.coord.lon;
            var querryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + lat + "&lon=" + lon;
            $.ajax({
                url: querryURL2,
                method: "GET"
            })
                .then(function (response2) {
                    // Display  UV data on the page
                    var UV = response2.value;
                    $("<div>").addClass("resUV");
                    $(".resUV").text("UV Index: " + UV);
                })



        })

})
