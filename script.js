var apiKey = "c97179c78467aee482929400eb659179";

// autofill widget for search bar of 100ish most populated global cities
// drop down list will need to be styled - can add .ui-autocomplete .ui-menu-item to css to style
$(function () {
        var globalCities = [
                "Tokyo",
                "Delhi",
                "Shanghai",
                "Dhaka",
                "Sao Paulo",
                "Mexico City",
                "Cairo",
                "Beijing",
                "Mumbai",
                "Osaka",
                "Chongqing",
                "Karachi",
                "Kinshasa",
                "Lagos",
                "Istanbul",
                "Buenos Aires",
                "Kolkata",
                "Manila",
                "Guangzhou",
                "Tianjin",
                "Lahore",
                "Rio de Janeiro",
                "Bangalore",
                "Shenzhen",
                "Moscow",
                "Chennai",
                "Bogota",
                "Jakarta",
                "Paris",
                "Lima",
                "Bangkok",
                "Hyderabad",
                "Seoul",
                "Nanjing",
                "Chengdu",
                "London",
                "Nagoya",
                "Tehran",
                "Ho Chi Minh City",
                "Luanda",
                "Xi-an Shaanxi",
                "Wuhan",
                "Ahmedabad",
                "Kuala Lumpur",
                "Hangzhou",
                "Suzhou",
                "Surat",
                "Dar es Salaam",
                "Baghdad",
                "Hong Kong",
                "New York",
                "Riyadh",
                "Shenyang",
                "Foshan",
                "Dongguan",
                "Pune",
                "Santiago",
                "Haerbin",
                "Madrid",
                "Toronto",
                "Khartoum",
                "Belo Horizonte",
                "Johannesburg",
                "Singapore",
                "Dalian",
                "Qingdao",
                "Zhengzhou",
                "Ji-nan Shandong",
                "Barcelona",
                "Abidjan",
                "Yangon",
                "Alexandria",
                "Saint Petersburg",
                "Fukuoka",
                "Addis Ababa",
                "Guadalajara",
                "Ankara",
                "Chittagong",
                "Nairobi",
                "Hanoi",
                "Melbourne",
                "Sydney",
                "Monterrey",
                "Changsha",
                "Cape Town",
                "Brasilia",
                "Urumqi",
                "Jiddah",
                "Kunming",
                "Changchun",
                "Hefei",
                "Kabul",
                "Shantou",
                "Ningbo",
                "Yaounde",
                "Xinbei",
                "Tel Aviv",
                "Shijiazhuang",
                "Kano",
                "Rome",
                "Montreal",
        ];
        $('#userInput1').autocomplete({
          source: globalCities,
        });
      });

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
                // calls getCurrentWeather, getForecast, and getCurrencyCode functions; passes relevant values
                getCurrentWeather(lat, lon);
                getForecast(lat, lon)
                getCurrencyCode(countryCode)
        })
}

function getCurrencyCode(countryCode) {
        // api call to restcountries.com to get currency code to be used in getExchangeRate function
        var countryUrl="https://restcountries.com/v3.1/alpha/" + countryCode;
        fetch(countryUrl)
        .then(function (response) {
                return response.json();
        })
        .then(function (countryInfo) {
                console.log(countryInfo);
                console.log(countryInfo[0].currencies)
                var currencyCodeString = JSON.stringify(countryInfo[0].currencies);
                console.log(currencyCodeString);
                var currencyCode = currencyCodeString.substring(2,5);
                console.log(currencyCode);
                // calls getExchangeRate function, passes currency code
                getExchangeRate(currencyCode);
        })
}

function getExchangeRate(currencyCode) {
        var exchangeApiKey = "601f788cd0034538276991d8";
        var exchangeRateUrl = "https://v6.exchangerate-api.com/v6/" + exchangeApiKey + "/pair/USD/" + currencyCode;
        // api call to exchangerateapi.com to get exchange rate to USD
        fetch(exchangeRateUrl)
        .then (function (response) {
                return response.json()
        })
        .then (function (rate) {
                console.log(rate);
                console.log(rate.conversion_rate);
                // value is how much $1(USD) is in selected currency
        // **PRINT TO PAGE** exchange rate for $1USD compared to given country currency
        })
}

function getCurrentWeather(lat, lon) {
        // api call to get chosen city's current weather. lat & lon variables will be passed from getCityInfo
        var urlCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
        fetch(urlCurrentWeather)
        .then(function (response) {
                return response.json();
        })
        .then(function (data) {
                console.log(data);
        // **PRINT TO PAGE** city name, current date, current weather stats
        })
}

function getForecast(lat, lon) {
        // api call to get 5 day forecast for chosen city (in 3 hr increments)
        var urlForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
        fetch(urlForecast)
        .then (function (response) {
                return response.json();
        })
        .then(function (forecast) {
                console.log(forecast)
        // **PRINT TO PAGE** city name, forecasted dates, forecasted weather stats
        })

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
        var cityName = $(event.target).text()
        // call getCityInfo, passing city var
        getCityInfo(cityName);
})

// Order of operation:
// 1. Miranda is making calls to APIs, pulling values
// 2. Eric is handling call output, putting pulled information into local storage for future use
// 3. Jason printing local storage to page, weather results & currecy comparisons
// 4. Nicole is creating javascript logic to conditionally show cards, either all conditions are good for travel, OR one condition is not favorable, 'think about it'
//         -Nicole will be styling HTML with CSS framework other than Bootstrap (make sure page is responsive)

// Good luck everyone! Go team!