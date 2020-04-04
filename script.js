var btn = $(".btn");

// On click functions:
btn.on("click", function (event) {
    event.preventDefault();

    // Variables used for the cities list:
    var listEntry = $("<div>");
    var cityName = $(".form-control").val();

    // Adding cities to the search list
    listEntry.text(cityName);
    listEntry.addClass("card listItem");
    $("#pastCitiesList").append(listEntry);

    // First ajax call (by city name):
    var APIkey = "031f158b8aa6738886dd6a6cbc74318e";
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;


    $.ajax({
        url: queryURL1,
        method: "GET"
    })
        .then(function (response1) {
            console.log(response1)
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
            $(".resHeader").text(name);
            $(".resHeader").append(icon);
            $(".description").text(description);
            $(".resTemp").text("Temperature: " + tempF);
            $(".resHum").text("Humidity: " + hum + "%");
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

                    // Display data on the page
                    var UV = response2.value;
                    $(".resUV").text("UV Index: " + UV);
                })
        })



})
