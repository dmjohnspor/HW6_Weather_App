var btn = $(".btn");

// On click functions:
btn.on("click", function (event) {
    event.preventDefault();

    // Adding cities to the cities list:
    var listEntry = $("<div>");
    var cityName = $(".form-control").val();
    listEntry.text(cityName);
    listEntry.addClass("card listItem");
    $("#pastCitiesList").append(listEntry);

    // Storing cities in local storage:
    currentList = localStorage.getItem("city");
    if (currentList === null) {
        localStorage.setItem("city", cityName);
    }
    else {
        currentList = [localStorage.getItem("city")];
        currentList.push(cityName);
        localStorage.setItem("city", JSON.stringify(currentList))
        console.log(currentList);
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
                    console.log(response2);
                    // Display  UV data on the page
                    var UV = response2.value;
                    $("<div>").addClass("resUV");
                    $(".resUV").text("UV Index: " + UV);
                })
        })



})
