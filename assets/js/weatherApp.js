// Render search history from local storage:
let pastCities = localStorage.getItem("city");
if (pastCities !== null) {
    pastCities = JSON.parse(pastCities);
    for (let i = 0; i < pastCities.length; i++) {
        $("#search_history").append(`<a class="waves-effect waves-light-blue btn-flat">${pastCities[i]}</a>
        <br>`);
    }
}

// Functions:

// Adding city names to the search history:
const addToSearchHistory = () => {
    const cityName = $("#city_search").val().trim();
    $("#search_history").prepend(`<a class="waves-effect waves-light-blue btn-flat">${cityName}</a>
    <br>`);
}

// Empty search input field:
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

const ajaxCall = (cityName) => {
    const APIkey = "031f158b8aa6738886dd6a6cbc74318e";
    const queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIkey;
    console.log(cityName);
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (res1) {

        // Collect data and store it into variables:
        const weather = {
            city_name: res1.name,
            des: res1.weather[0].description,
            icon: res1.weather[0].icon,
            temp: res1.main.temp,
            hum: res1.main.humidity,
            wind: res1.wind.speed
        }

        // Display data on the page:
        $(".city_name").text(weather.city_name);
        $(".des").text(weather.des);
        $(".temp").text(`Temperature: ${weather.temp} F`);
        $(".hum").text(`Humidity: ${weather.hum}%`);
        $(".wind").text(`Wind speed: ${weather.wind} MPH`);

        //Collect lat and lon and make the second API call:
        const lat = res1.coord.lat;
        const lon = res1.coord.lon;
        const querryURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={minutely,hourly}&appid=${APIkey}`
        $.ajax({
            url: querryURL2,
            method: "GET"
        })
            .then(function (res2) {
                console.log(res2)
                // Display  UV data on the page
                const UV = res2.current.uvi;
                $(".UV").text(`UV: ${UV}`);

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
    ajaxCall($("#city_search").val());
    emptySearchInput();
})

// Reset button:
const resetBtn = $("#resetBtn");
resetBtn.on("click", function () {
    $("#search_history").empty();
    $("#search_res").empty();
    localStorage.clear();
})

// Search history buttons:
// var searchHistoryEntries = [$(".listItem")]
// console.log(searchHistoryEntries[0]);
// for (var k = 0; k < historyBtn.length; k++) {
//     historyBtn[k].on("click", function (event) {
//         event.preventDefault();
//         ajaxCall(historyBtn[k].text())
//     })
// }



