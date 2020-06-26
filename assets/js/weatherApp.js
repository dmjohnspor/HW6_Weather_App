// Render past cities buttons from local storage:
let pastCities = localStorage.getItem("city");
if (pastCities !== null) {
    pastCities = JSON.parse(pastCities);
    for (let i = 0; i < pastCities.length; i++) {
        $("#search_history").append(`<a class="waves-effect waves-light-blue btn-flat">${pastCities[i]}</a>
        <br>`);
    }
}

// Functions:

// Adding city names to the City History list
const addToSearchHistory = () => {
    const cityName = $("#city_search").val().trim();
    $("#search_history").prepend(`<a class="waves-effect waves-light-blue btn-flat">${cityName}</a>
    <br>`);
}
// Empty search input field
const emptySearchInput = () => {
    $("#city_search").val("");
}
// Storing cities in local storage:
const storeToLocalStorage = () => {
    const cityName = $("#city_search").val().trim();
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
}

// First ajax call:
function ajaxCall(cityName) {
    var APIkey = "031f158b8aa6738886dd6a6cbc74318e";
    var queryURL1 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + APIkey;

    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response1) {
        console.log(response1);
        // Collect data and store it into variables:
        var name = response1.city.name;
        var description = response1.list[0].weather[0].description;
        var icon = response1.list[0].weather[0].icon;
        var temp = response1.list[0].main.temp;
        var hum = response1.list[0].main.humidity;
        var wind = response1.list[0].wind.speed;

        // Display data on the page:
        // City name date and icon:
        $("<div>").addClass("resHeader");
        $(".resHeader").text(name);
        // Brief weather description:
        $("<div>").addClass("description");
        $(".description").text(description);
        // Temperature:
        $("<div>").addClass("resTemp");
        $(".resTemp").text("Temperature: " + temp + " F");
        // Humidity:
        $("<div>").addClass("resHum");
        $(".resHum").text("Humidity: " + hum + "%");
        // Wind Speed:
        $("<div>").addClass("resWind");
        $(".resWind").text("Wind speed: " + wind + " MPH");

        // Use the call to display the 5-day forecast:
        // Day 1
        var date = response1.list[8].dt_txt;
        var date1 = date.slice(0, 10);
        var icon1 = response1.list[8].weather[0].icon;
        var temp1 = response1.list[8].main.temp;
        var hum1 = response1.list[8].main.humidity;
        $("#day1").addClass("card day forecastBox")
        $("#day1Date").text(date1);
        $("#day1Temp").text("Temp: " + temp1 + " F");
        $("#day1Hum").text("Humidity: " + hum1 + "%");
        // Day 2
        $("#day2").addClass("card day forecastBox")
        var date = response1.list[16].dt_txt;
        var date2 = date.slice(0, 10);
        var icon2 = response1.list[16].weather[0].icon;
        var temp2 = response1.list[16].main.temp;
        var hum2 = response1.list[16].main.humidity;
        $("#day2Date").text(date2);
        $("#day2Temp").text("Temp: " + temp2 + " F");
        $("#day2Hum").text("Humidity: " + hum2 + "%");
        // Day 3
        $("#day3").addClass("card day forecastBox")
        var date = response1.list[24].dt_txt;
        var date3 = date.slice(0, 10);
        var icon3 = response1.list[24].weather[0].icon;
        var temp3 = response1.list[24].main.temp;
        var hum3 = response1.list[24].main.humidity;
        $("#day3Date").text(date3);
        $("#day3Temp").text("Temp: " + temp3 + " F");
        $("#day3Hum").text("Humidity: " + hum3 + "%");
        // Day 4
        $("#day4").addClass("card day forecastBox")
        var date = response1.list[32].dt_txt;
        var date4 = date.slice(0, 10);
        var icon4 = response1.list[32].weather[0].icon;
        var temp4 = response1.list[32].main.temp;
        var hum4 = response1.list[32].main.humidity;
        $("#day4Date").text(date4);
        $("#day4Temp").text("Temp: " + temp4 + " F");
        $("#day4Hum").text("Humidity: " + hum4 + "%");
        // Day 5
        $("#day5").addClass("card day forecastBox")
        var date = response1.list[39].dt_txt;
        var date5 = date.slice(0, 10);
        var icon5 = response1.list[39].weather[0].icon;
        var temp5 = response1.list[39].main.temp;
        var hum5 = response1.list[39].main.humidity;
        $("#day5Date").text(date5);
        $("#day5Temp").text("Temp: " + temp5 + " F");
        $("#day5Hum").text("Humidity: " + hum5 + "%");

        //Second ajax call (by coordinates):
        var lat = response1.city.coord.lat;
        var lon = response1.city.coord.lon;
        var querryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: querryURL2,
            method: "GET"
        })
            // Display  UV data on the page
            .then(function (response2) {
                var UV = response2.value;
                $("<div>").addClass("resUV");
                $(".resUV").text("UV Index: " + UV);
            })
    })
}
// On click functions:

// Search button:
const searchBtn = $("#searchBtn");
searchBtn.on("click", event => {
    event.preventDefault();
    addToSearchHistory();
    storeToLocalStorage();
    emptySearchInput();
    // ajaxCall($(".form-control").val());
})

// Reset button:
const resetBtn = $("#resetBtn");
resetBtn.on("click", function () {
    $("#search_history").empty();
    $("#search_res").empty();
    localStorage.clear();
})

// Past city names list:
var searchHistoryEntries = [$(".listItem")]
console.log(searchHistoryEntries[0]);
// for (var k = 0; k < historyBtn.length; k++) {
//     historyBtn[k].on("click", function (event) {
//         event.preventDefault();
//         ajaxCall(historyBtn[k].text())
//     })
// }



