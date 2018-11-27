//Random Beach Array
var beaches = ["Kapalua Bay Beach, Maui, Hawaii", "Ocracoke Lifeguarded Beach, Outer Banks, North Carolina", "Grayton Beach State Park, Florida Panhandle",
    "Coopers Beach, Southampton, New York", "Coast Guard Beach, Cape Cod, Massachusetts", "Lighthouse Beach, Buxton, Outer Banks, North Carolina",
    "Caladesi Island State Park, Dunedin/Clearwater, Florida", "Hapuna Beach State Park, Big Island, Hawaii", "Coronado Beach, San Diego, California",
    "Beachwalker Park, Kiawah Island, South Carolina"];

// Airport Array - order matches beach array (substituted major airports as hotel API did not recognize some smaller airports)
var destinationCode = ["OGG", "EWN", "ECP", "JFK", "MVY", "EWN", "PIE", "KOA", "SAN", "HHH"]

//Generates Random Beach Location
var beachrandom = beaches[Math.floor(Math.random() * beaches.length)];

//Creates a variable for the appropriate Airport code to match beach location
var selectedDestinationCode = "";

function generateAirportCode() {
    for (var i = 0; i < beaches.length; i++) {
        if (beachrandom === beaches[i]) {
            selectedDestinationCode = destinationCode[i];
            console.log(selectedDestinationCode)            
        }
    }
}
generateAirportCode();

//This function runs the whole application... parameters are used to provide the data from user.
function displayCityData(beachLocation, depDate, returnDate, userAirportCode) {
    //Lines 25-68 are for Restaurant API
    var clientID = "-_-qsu9VN_Mu1cRQ_CEfbA"
    var apikey = "eGyFYoGa3oYrHwELLpuXsE9A1l9W6d6AoJszCKMPa3M9SNgR2kx1md-nelFS1jJdfOb1sCD3knBmuWA7kDTZSoZMehkn0-Avx1VDY6QMhAX45RpIuKyxSBZ53eTsW3Yx"
    var queryURL = "https://developers.zomato.com/api/v2.1/locations?query=" + beachLocation + "&apikey=937d785cc1c1b2ac1098e43a13b9cf22";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var entityID = response.location_suggestions[0].entity_id;
        var entityType = response.location_suggestions[0].entity_type;
        var locationDetailQueryURL = "https://developers.zomato.com/api/v2.1/location_details?entity_id=" + entityID + "&entity_type=" + entityType + "&apikey=937d785cc1c1b2ac1098e43a13b9cf22"

        $.ajax({
            url: locationDetailQueryURL,
            method: "GET"
        }).then(function (response) {
            var topRestaurant = response.best_rated_restaurant[0].restaurant.name;
            var topRestaurantURL = response.best_rated_restaurant[0].restaurant.url;
            var topRestaurantAddress = response.best_rated_restaurant[0].restaurant.location.address;
            var avgCostForTwo = response.best_rated_restaurant[0].restaurant.average_cost_for_two
            $('.ResName').html(`<a href="${topRestaurantURL}" target="blank">${topRestaurant}</a>`)
            $('.ResforTwo').append("$" + avgCostForTwo);
            $('.ResAddress').append(topRestaurantAddress);

            var restaurantID = response.best_rated_restaurant[0].restaurant.R.res_id;
            console.log(restaurantID)
            var restaurntDetailQueryURL = "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + restaurantID + "&apikey=937d785cc1c1b2ac1098e43a13b9cf22"



            $.ajax({
                url: restaurntDetailQueryURL,
                method: "GET"
            }).then(function (response) {
                var restaurantLocation = response.location.address
                var avgCost = response.average_cost_for_two;
                var cuisines = response.cuisines;
                console.log(restaurantLocation, avgCost, cuisines);
                $('.Cuisines').append(cuisines);

            })
        })
    })

    //Lines 70-95 are hotel API
    var hotelQueryURL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport/?apikey=KWxHu3JXbSfuZ0ZfU5AmxbNfkmVaKQTX&location=" + selectedDestinationCode + "&check_in=" + depDate + "&check_out=" + returnDate;
    // var hotelQueryURL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport/?apikey=KWxHu3JXbSfuZ0ZfU5AmxbNfkmVaKQTX&location=" + selectedDestinationCode + "&check_in=2019-01-02&check_out=2019-01-09"
    $.ajax({
        url: hotelQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(JSON.stringify(response));
        // var hotelName = response.results[0].property_name;
        // var hotelPrice = response.results[0].total_price.amount;
        // var hotelStreet = response.results[0].address.line1;
        // var hotelCity = response.results[0].address.city;
        // var hotelState = response.results[0].address.region;
        // var hotelPostal = response.results[0].address.postal_code;
        // var fullAddress = hotelStreet + "" + hotelCity + "" + hotelState + "" + hotelPostal;
        // var roomType = response.results[0].rooms[0].room_type_info.room_type;

        // $(".HoName").append(hotelName);
        // $(".HoPrice").append("$" + hotelPrice);
        // $(".HoAddress").append(fullAddress);
        // $(".HoRoomType").append(roomType);
    })


    $(".ArrivalAirport").append(`<a href="https://en.wikipedia.org/wiki/List_of_airports_by_IATA_code:_A" target="blank">${selectedDestinationCode}</a>`)
    //Lines 95-112 are Flight API
    $.ajax({
        url: "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=HEbMkphMv3ReciH7JfBcCzGQLfGG2UCk&origin=" + userAirportCode + "&destination=" + selectedDestinationCode + "&departure_date=" + depDate + "&return_date=" + returnDate + "&number_of_results=1",
        method: "GET"
    }).then(function (response) {
        var flightPrice = response.results[0].fare.total_price;
        var departsAt = moment(response.results[0].itineraries[0].outbound.flights[0].departs_at).format("MM/DD/YYYY hh:mm a ");
        var arrivesAt = moment(response.results[0].itineraries[0].outbound.flights[(response.results[0].itineraries[0].outbound.flights.length - 1)].arrives_at).format("MM/DD/YYYY hh:mm a");
        var duration = response.results[0].itineraries[0].outbound.duration;
        var airlineCode = response.results[0].itineraries[0].outbound.flights[0].operating_airline;
        $(".Airline").append(`<a href="https://www.airfarewatchdog.com/airline-codes/" target="blank">${airlineCode}</a>`)
        $(".FlightPrice").append("$" + flightPrice);
        $(".LeaveDate").append(departsAt);
        $(".FlightArrival").append(arrivesAt);        
        $(".Duration").append(duration);
    })
}

//Button click event which sets EVERYTHING in motion.
$('#vacation-button').on("click", function () {
    $('td').empty();   
    depDate = $("#departure-date").val();
    returnDate = $("#returnDate").val();
    userAirportCode = $("#user-airport").val().trim();
    displayCityData(beachrandom, depDate, returnDate, userAirportCode);
    beachrandom = beaches[Math.floor(Math.random() * beaches.length)];
    generateAirportCode();
})