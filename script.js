var apiKey = "c97179c78467aee482929400eb659179";
var currentWeather;
var currentExchangeRate;
// MB - autofill widget for search bar of 100ish most populated global cities
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
          source: globalCities, //MB - pulls from the globalCities array to autofill the search input
        });
      });

function getCityInfo(cityName) {
        
localStorage.setItem('cityName', cityName); // EF - Adding to beginning of function to store cityName
 // EF - Update search history
 var storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
 storedSearchHistory.push(cityName);
 localStorage.setItem('searchHistory', JSON.stringify(storedSearchHistory));

  // EF - Generate <li> element and append it to #searchHistory
  var li = generateSearchHistoryLi(cityName);

  $('#searchHistory').append(li);

        // MB - uses geocode api from openweather to pull lat, lon - which will be passed into two other functions/api calls to get current weather and forecast
        var coordsUrl="https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey;
        fetch(coordsUrl)
        .then(function(response) {
                // MB - error modal: if the input for city name is null, the geocode api call will throw an error and show a hidden modal to the user explaining what went wrong and to please enter a city name
                if (response.status !== 200) {
                $('#modal-empty').show();
                return;
                }
                return response.json();
        })
        .then(function(cityInfo) {
                 // MB - error modal: if user inputs a city that returns 0 results (the api is not able to pull in a city by that name; misspelled, etc), a modal will appear for the user explaining what went wrong and to please check their spelling
                if (cityInfo.length === 0) {
                   $('#modal-invalid').show();
                   return;
                }

                console.log(cityInfo)
                var lat = cityInfo[0].lat;
                var lon = cityInfo[0].lon;
                var countryCode = cityInfo[0].country;
                // MB - calls getCurrentWeather, getForecast (for later development), and getCurrencyCode functions; passes relevant values
                getCurrentWeather(lat, lon);
                // getForecast(lat, lon)
                getCurrencyCode(countryCode)
        })
}
        // MB - hides the modals if the user clicks the close button
        $('.close').on('click', function() {
                if ($('#modal-empty:visible')) {
                        $('#modal-empty').hide();
                }
                if ($('#modal-invalid:visible')) {
                        $('#modal-invalid').hide();
                }
                if ($('#modal-prevSearched:visible')) {
                        $('#modal-prevSearched').hide();
                }
        })

function getCurrencyCode(countryCode) {
        // MB - api call to restcountries.com to get currency code to be used in getExchangeRate function
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
                // MB - calls getExchangeRate function, passes currency code
                getExchangeRate(currencyCode);
        })
}

function getExchangeRate(currencyCode) {
        // MB - api call to exchangerateapi.com to get exchange rate to USD
        var exchangeApiKey = "601f788cd0034538276991d8";
        var exchangeRateUrl = "https://v6.exchangerate-api.com/v6/" + exchangeApiKey + "/pair/USD/" + currencyCode;
        fetch(exchangeRateUrl)
        .then (function (response) {
                return response.json()
        })
        .then (function (rate) {
                console.log(rate);//MB - console logs the retrieved data to be used to display on page
                var conversionRate = rate.conversion_rate;
                var targetCode = rate.target_code;
                console.log('--conversion rate--')
                console.log(conversionRate);
                console.log('--target code--')
                console.log(targetCode);
                localStorage.setItem('converstionRate', conversionRate); // EF - Saving retrieved conversion rate to localStorage

                // value is how much $1(USD) is in selected currency
                // MB/EF - displays currency rate to the page
                $('#currency-exchange').text('Conversion Rate: ' + conversionRate);
        // MB - event listener to multiply the conversion rate by the user input USD amount (if user says they have 20 bucks, will return how much that is in the selected currency) 
        $('#math-submit').on('click', function() {
                var usdUserAmount = $('#userInput2').val();
                var math = usdUserAmount * conversionRate;
                console.log(math.toFixed(3));//MB - console logs the answer to be used to display on page
                // MB/EF - displays math values to the page
                $('#currency-amt').text(math.toFixed(3));
                $('#target-currency').text(targetCode);
        })

                //NICOLE: saving to global variable too
                currentExchangeRate = conversionRate;
        })
}

function getCurrentWeather(lat, lon) {
        // MB - api call to get chosen city's current weather. lat & lon variables will be passed from getCityInfo
        var urlCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
        fetch(urlCurrentWeather)
        .then(function (response) {
                return response.json();
        })
        .then(function (data) {
                console.log('--weather data--')
                console.log(data);//MB - console logs the retrieved data to be used to display on page
                console.log('--current feels like temp--')
                console.log(data.main.feels_like);
        // **MB/EF: displays city name, current date, current weather stats to page
                $('#name').text('City: ' +data.name);
                $('#temp').text('Temp (Feels like): ' +data.main.feels_like + '°F');
                $('#wind').text('Wind Speed: ' +data.wind.speed + ' MPH');
                $('#humidity').text('Humidity: ' +data.main.humidity + '%');
                localStorage.setItem('currentWeather', JSON.stringify(data)); //EF - after retrieving data, store variable in localStorage
                //N.SMITH saving to global storage too. 
                currentWeather= data; 
        })
}

// commented out for now, can add in in later development
// function getForecast(lat, lon) {
//         // MB - api call to get 5 day forecast for chosen city (in 3 hr increments)
//         var urlForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
//         fetch(urlForecast)
//         .then (function (response) {
//                 return response.json();
//         })
//         .then(function (forecast) {
//                 console.log('--forecast data--')
//                 console.log(forecast) //MB - console logs the retrieved data to be used to display on page
                
//                 localStorage.setItem('forecast', JSON.stringify(forecast)); //EF - Adding forecast data to localStorage
//         // **PRINT TO PAGE** city name, forecasted dates, forecasted weather stats ('forecast' console logged above to view data to print)
//         })

// }

// MB - event listeners to call api functions from submit button or one of the pre-set buttons
$('#submit-button').on('click', function(event) {
        event.preventDefault()
        // MB - card 'if' statements remove the current card if user re-submits a new city (otherwise both were appearing if you don't refresh page)
        if ($('#goodCard:visible')) {
                $('#goodCard:visible').hide()
        }
        if ($('#badCard:visible')) {
                $('#badCard:visible').hide()
        }
        // MB - define city var based on user input
        var cityName = $('#userInput1').val();
        // MB - call getCityInfo, passing city var
        getCityInfo(cityName);
})
// MB - event listener for presets
$('#city-tabs').on('click', '.preset-city', function(event) {
        event.preventDefault();
        $('#userInput1').val(''); //MB - clears input
        if ($('#goodCard:visible')) {
                $('#goodCard:visible').hide()
        }
        if ($('#badCard:visible')) {
                $('#badCard:visible').hide()
        }
        // MB - define city var based on button text
        var cityName = $(event.target).text()
        // MB - call getCityInfo, passing city var
        getCityInfo(cityName);
        })

// MB - shows prev searches modal and allows user to click on a prev searched city to re-run the functionality
$('#view-searches').on('click', function() {
        $('#modal-prevSearched').show();
    })
    
    $('#searchHistory').on('click', '.searchHistLink', function (event) {
        event.preventDefault();
        $('#userInput1').val(''); //MB - clears input
    if ($('#modal-prevSearched:visible')) {
            $('#modal-prevSearched').hide();
    }
        if ($('#goodCard:visible')) {
                $('#goodCard:visible').hide()
        }
        if ($('#badCard:visible')) {
                $('#badCard:visible').hide()
        }
    var cityName = $(event.target).text()
    getCityInfo(cityName);
    })

//MB - event listener to set min and max temp variable, call showGoodorBad function, and pass those values
$('#set-temps').on('click', function(e) {
        e.preventDefault();
        if ($('#goodCard:visible')) {
                $('#goodCard:visible').hide()
        }
        if ($('#badCard:visible')) {
                $('#badCard:visible').hide()
        }
        var minTempChoice = $('#minTemp :selected').val();
        var maxTempChoice = $('#maxTemp :selected').val();
        showGoodOrBad(minTempChoice, maxTempChoice);
        var cardsDiv = document.getElementById('cards');
        cardsDiv.scrollIntoView();
})

//EF -- retrieving stored values, printing to searchHistory

function generateSearchHistoryLi(cityName) {
        var li = $('<li>').text(cityName);
        li.addClass('searchHistLink');
        return li;
      }
      
      $(document).ready(function() {
      
        // Retrieve stored search history
        var storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
      
        // Generate <li> elements and append them to #searchHistory
        for (var i = 0; i < storedSearchHistory.length; i++) {
          var cityName = storedSearchHistory[i];
          var li = generateSearchHistoryLi(cityName);
          $('#searchHistory').append(li);
        }
        
      
      });

      //N.SMITH- UPDATING CARDS
function showGoodOrBad(minTempChoice, maxTempChoice) {
        console.log('--user min temp choice--')
        console.log(minTempChoice);
        console.log('--user max temp choice--')
        console.log(maxTempChoice);

        if (currentWeather && currentExchangeRate){
                if (currentWeather.main.feels_like >= minTempChoice && currentWeather.main.feels_like <= maxTempChoice && currentExchangeRate >=1){  //between user selected temps, and >=1. 
                        $("#goodCard").show();
                        //MB - button link to expedia with city name as query parameter
                        var link = document.getElementById('travel-link');
                        link.href= "https://www.expedia.com/Hotel-Search?destination=" + currentWeather.name + " " + currentWeather.sys.country;
                }
                else {
                        $("#badCard").show();
                }
        }

};

      // EF - Clearing search history from local storage
      
   var clearButton = document.getElementById("clear");
      function clearSearchHistory(){
        document.getElementById('searchHistory').innerHTML=""; 
        localStorage.clear();
    }
    $('#clear').on('click', clearSearchHistory);


