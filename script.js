var apiKey = "c97179c78467aee482929400eb659179";
function getCityInfo(cityName) {
        // uses geocode api from openweather to pull lat, lon - which will be passed into two other functions/api calls to get current weather and forecast
        // will call getCurrentWeather, getForecast, and getCurrencyCode functions
        // will pass 'country' variable to getCurrencyCode()
}
function getCurrencyCode(countryCode) {
        // api call to restcountries.com to get currency code to be used in getExchangeRate function
        // will call getExchangeRate function, passes currency code
}
function getExchangeRate(currencyCode) {
        // api call to exchangerateapi.com to get exchange rate

        // **PRINT TO PAGE** exchange rate for USD compared to given country currency
}
function getCurrentWeather(lat, lon) {
        // api call to get chosen city's current weather. lat & lon variables will be passed from getCityInfo

        // **PRINT TO PAGE** city name, current date, current weather stats
}
function getForecast(lat, lon) {
        // api call to get 5 day forecast for chosen city

        // **PRINT TO PAGE** city name, forecasted dates, forecasted weather stats
}

// event listeners to call api functions
$('#userInput1').on('submit', function(event) {
        event.preventDefault()
        // define city var based on user input
        // call getCityInfo, passing city var
})

$('.city-tabs').on('click', function(event) {
        event.preventDefault()
        // define city var based on button text
        // call getCityInfo, passing city var
})

// Order of operation:
// 1. Miranda is making calls to APIs, pulling values
// 2. Eric is handling call output, putting pulled information into local storage for future use
// 3. Jason printing local storage to page, weather results & currecy comparisons
// 4. Nicole is creating javascript logic to conditionally show cards, either all conditions are good for travel, OR one condition is not favorable, 'think about it'
//         -Nicole will be styling HTML with CSS framework other than Bootstrap (make sure page is responsive)

// Good luck everyone! Go team!