var beaches = ["Kapalua Bay Beach, Maui, Hawaii", "Ocracoke Lifeguarded Beach, Outer Banks, North Carolina", "Grayton Beach State Park, Florida Panhandle",
    "Coopers Beach, Southampton, New York", "Coast Guard Beach, Cape Cod, Massachusetts", "Lighthouse Beach, Buxton, Outer Banks, North Carolina",
    "Caladesi Island State Park, Dunedin/Clearwater, Florida", "Hapuna Beach State Park, Big Island, Hawaii", "Coronado Beach, San Diego, California",
    "Beachwalker Park, Kiawah Island, South Carolina"];

var beachrandom = beaches[Math.floor(Math.random() * beaches.length)];

function displayCityData(city) {


    var clientID = "-_-qsu9VN_Mu1cRQ_CEfbA"
    var apikey = "eGyFYoGa3oYrHwELLpuXsE9A1l9W6d6AoJszCKMPa3M9SNgR2kx1md-nelFS1jJdfOb1sCD3knBmuWA7kDTZSoZMehkn0-Avx1VDY6QMhAX45RpIuKyxSBZ53eTsW3Yx"
    var queryURL = "https://developers.zomato.com/api/v2.1/locations?query=" + city + "&apikey=937d785cc1c1b2ac1098e43a13b9cf22";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(JSON.stringify(response));
        var entityID = response.location_suggestions[0].entity_id;
        var entityType = response.location_suggestions[0].entity_type;
        console.log(entityID, entityType);
        var locationDetailQueryURL = "https://developers.zomato.com/api/v2.1/location_details?entity_id=" + entityID + "&entity_type=" + entityType + "&apikey=937d785cc1c1b2ac1098e43a13b9cf22"

        $.ajax({
            url: locationDetailQueryURL,
            method: "GET"
        }).then(function (response) {
            console.log(JSON.stringify(response));
            var cityPopularity = response.popularity;
            var nightlifePopularity = response.nightlife_index;
            var topRestaurant = response.best_rated_restaurant[0].restaurant.name;
            var topRestaurantURL = response.best_rated_restaurant[0].restaurant.url;
            var topRestaurantAddress = response.best_rated_restaurant[0].restaurant.location.address;
            var avgCostForTwo = response.best_rated_restaurant[0].restaurant.average_cost_for_two


            console.log(cityPopularity, nightlifePopularity, topRestaurant, avgCostForTwo)
            $('tbody').append(
                `<tr><td><a href="${topRestaurantURL}" target="blank">${topRestaurant}</a></td>
                     <td>${topRestaurantAddress}</td>
                     <td>$${avgCostForTwo}</td>                        
                     <td>#</td>
                     <td>#</td></tr>`)


            var restaurantID = response.best_rated_restaurant[0].restaurant.R.res_id;
            var restaurantDetailQueryURL = "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + restaurantID + "&apikey=937d785cc1c1b2ac1098e43a13b9cf22"

            $.ajax({
                url: restaurantDetailQueryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                var userRating = response.user_rating.aggregate_rating;
                var userVotes = response.user_rating.votes;
                var restaurantLocation = response.location.address
                var avgCost = response.average_cost_for_two;
                var cuisines = response.cuisines;

                console.log(userRating, userVotes, restaurantLocation, avgCost, cuisines);

            })
        })
    })

}

$('#vacation-button').on("click", function () {
    console.log(beachrandom)
    displayCityData(beachrandom)
    beachrandom = beaches[Math.floor(Math.random() * beaches.length)];

})
<<<<<<< HEAD

/*var queryFlightURL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?"
var apiFlightKey = "apikey=HEbMkphMv3ReciH7JfBcCzGQLfGG2UCk"
var departureDate = $("#flightStartDate").val()


$.ajax({
    url: "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=HEbMkphMv3ReciH7JfBcCzGQLfGG2UCk&origin=BOS&destination=LON&departure_date=2018-12-25", //+ departureDate,
    method: "GET"
}).then(function (response) {
    console.log(JSON.stringify(response));
    
    var FlightPrice = response.results[0].fare.total_price;
    console.log(FlightPrice);
    var FlightName = response.results[0].itineraries[]flights.airport;
    console.log(FlightName);
    
    
    
}) */
=======
>>>>>>> master
