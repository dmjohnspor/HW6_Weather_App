// Global variables

var btn = $(".btn");


// On click function to append the current city on the city list
btn.on("click", function (event) {
    event.preventDefault();
    var currentCity = $(".form-control").val();
    var listEntry = $("<div>");
    listEntry.text(currentCity);
    listEntry.addClass("card listItem");
    $("#pastCitiesList").append(listEntry);

})