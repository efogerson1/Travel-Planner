var apiKey = "c97179c78467aee482929400eb659179";
function getCityInfo(cityName) {
        // uses geocode api from openweather to pull lat, lon - which will be passed into two other functions/api calls to get current weather and forecast
        var coordsUrl="https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey;
        fetch(coordsUrl)
        .then(function(response) {
                return response.json();
        })
        .then(function(cityInfo) {
                console.log(cityInfo)
                var lat = cityInfo[0].lat;
                var lon = cityInfo[0].lon;
                var countryCode = cityInfo[0].country;
                getCurrentWeather(lat, lon);
                getForecast(lat, lon)
                getCurrencyCode(countryCode)
        })
        // will call getCurrentWeather, getForecast, and getCurrencyCode functions
        // will pass 'country' variable to getCurrencyCode()
}
function getCurrencyCode(countryCode) {
        var countryUrl="https://restcountries.com/v3.1/alpha/" + countryCode;
        fetch(countryUrl)
        .then(function (response) {
                return response.json();
        })
        .then(function (countryInfo) {
                console.log(countryInfo);
                console.log(code[0].currencies)
                var currencyCodeString = JSON.stringify(code[0].currencies);
                console.log(currencyCodeString);
                var currencyCode = currencyCodeString.substring(2,5);
                console.log(currencyCode);
                getExchangeRate(currencyCode);
        })
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
$('#submit-button').on('click', function(event) {
        event.preventDefault()
        // define city var based on user input
        var cityName = $('#userInput1').val();
        // call getCityInfo, passing city var
        getCityInfo(cityName);
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