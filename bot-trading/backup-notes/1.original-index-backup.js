//Created (4:30): https://academy.moralis.io/lessons/npm-initializing-project
// console.log("Welcome to index.js file. Baaaam!");

// Added (1:00): https://academy.moralis.io/lessons/getting-market-data-from-cryptocompare
// global.fetch = require("./node_modules/node-fetch/index.js");
// import NodeFetch from "./node_modules/node-fetch/index.js";
// global.fetch = require("node-fetch");

import fetch from 'node-fetch';
global.fetch = fetch;

// Resumed (3:50): https://academy.moralis.io/lessons/using-gemini-buy-order
// require the gemini package
// import GeminiAPI from "./node_modules/gemini-api/dist/index.js";
import gem from 'gemini-api';
const GeminiAPI = gem;

// Initialize the secret and the key
const secret = '0xe-SECRET-HERE'; 
const key = "0xf-KEY_HERE";
// Added Crypto Compare API KEY (2:55): https://academy.moralis.io/lessons/cryptocompare-setup
// const CCAPIKey = "0xg-CryptoCompare_KEY_HERE";
const CCAPIKey = "a43666c8e9baceac70508ba0b8ec090000c3ecfa4234277e37cf718acedea95a";

// Import Crypto Compare: https://academy.moralis.io/lessons/importing-cryptocompare
// import { setApiKey } from "./node_modules/cryptocompare/index.js";
import pkg from 'cryptocompare';
const CryptoCompareAPI = pkg;

// import CryptoCompareAPI from "./cryptocompare";
// Initialize CryptoCompare with the API key
CryptoCompareAPI.setApiKey(CCAPIKey);

            // Gemini API is a rest API. A web API. 
// const restClient = new GeminiAPI({key, secret, sandbox:true});

            // Create an order (7:05): https://academy.moralis.io/lessons/using-gemini-buy-order
            // Make a limit order: 
            // gemini package will create the new order and send it.
            // THEN console log the response (Call from terminal with `node index.js`):
// restClient.newOrder({amount:10, price:100, side:"buy", symbol: "btcusd" })
            // .then(response => console.log(response))
            // .then(response => console.log(response.order_id))
// .then(response => restClient.cancelOrder({order_id: response.order_id}))
// .then(response => console.log(response))
// .catch(error => console.log("Error in newOrder() located in index.js was: ",error));



// Work through the REST API documentation on gemini-api github: 

// getAllSymbols().then(response => console.log(response));
// restClient.getAllSymbols().then(response => console.log(response));  // returns updated symbol pairs available on gemini

// get latest price of ticker
// timestamp seconds after unix epoch
// restClient.getTicker("btcusd").then(response => console.log(response));

// restClient.getOrderBook("symbol_here", params={}) //often params optional


// Work through CoinCompare's API: (1:30): https://academy.moralis.io/lessons/getting-market-data-from-cryptocompare
// Example from: https://www.npmjs.com/package/cryptocompare
// Returns huge list of coins, id, etc. 
    // CryptoCompareAPI.coinList()
    // .then(coinList => {
    //     console.log(coinList)
    // })
    // .catch(console.error);

// Get the price of BTC: (3:00):
CryptoCompareAPI.price('BTC', ['USD', 'EUR'])
.then(prices => {
    console.log("Current BTC Price in USD and EUR is: ", prices) // { USD: 39417.55, EUR: 36213.33}
})
.catch(console.error);

// Get Historic Prices
CryptoCompareAPI.priceHistorical('BTC', ['USD', 'EUR'], new Date('2017-01-01'))
.then(prices => {
    console.log("BTC price on 1/1/2017 in USD/EUR was: ", prices) // { USD: 995.44, EUR: 946.47}
})
.catch(console.error);



  // *************************** STEP 1 - GET DATA FROM CryptoCompare ************************************//
                //Set up function (15:45): https://academy.moralis.io/lessons/creating-hourly-ma-indicator
                function movingAverage(cryptoAsset, fiatCurrency, hours, callback){

                    //Only 169 hours allowed: 
                    if(hours>169){
                        console.log("Only up to 169 hours allowed!")
                        return
                    }
            
                    // Add histoHour() in (4:00): https://academy.moralis.io/lessons/creating-hourly-ma-indicator
                    // CryptoCompareAPI.histoHour('BTC', 'USD')
                    CryptoCompareAPI.histoHour(cryptoAsset, fiatCurrency)
                    .then(data => {
                    //   console.log(data)
                                // -> [ { time: 1487448000,
                                //        close: 1060.34,
                                //        high: 1061.44,
                                //        low: 1058.85,
                                //        open: 1059.24,
                                //        volumefrom: 739.6,
                                //        volumeto: 790019.22 },
                                //        ... ]
                    
                    //get size of data returned 169 hours in the list.
                    // console.log("Size of list is: ",data.length)  
            
                    //We want the first element to the the current hour, then count back. 
                    data = data.reverse()
                    //Use for loop
                    var sum = 0;
                    for(var i = 0; i<hours; i++){
                            // console.log(i);
                            // console.log(data[i].close)
                        //sum all of the close' together
                        sum+=data[i].close  
                    }
                    var movingAverage = sum/hours;
            
                //We want a callback b/c this function should not print anything. (18:35): https://academy.moralis.io/lessons/creating-hourly-ma-indicator
                    // console.log(`${hours} hr Moving Average of ${cryptoAsset} is: `, movingAverage);
            
                    //this function should just calculate the MA and return when called
                    callback(movingAverage);
            
                // Gives current hour time, high, low, open, volume, close etc.
                    // console.log("Current Hour Should Be: ", data[0]) // returned '1701828000' which was Wed Dec 06 2023 02:00:00 GMT.
            
                    })
                    .catch(console.error)
            
                }



//Call our function with the desired parameters: 
// movingAverage("BTC", "USD", 100)
// movingAverage("BTC", "USD", 50)

// movingAverage("ETH", "USD", 50)


//After adding the callback to our movingAverage function: 
movingAverage("ETH", "USD", 50, function(result){
    console.log("MA is: ", result)
})



