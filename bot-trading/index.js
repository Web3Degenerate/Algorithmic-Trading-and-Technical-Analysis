

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
        // CryptoCompareAPI.price('BTC', ['USD', 'EUR'])
        // .then(prices => {
        //     console.log("Current BTC Price in USD and EUR is: ", prices) // { USD: 39417.55, EUR: 36213.33}
        // })
        // .catch(console.error);

// Get Historic Prices
        // CryptoCompareAPI.priceHistorical('BTC', ['USD', 'EUR'], new Date('2017-01-01'))
        // .then(prices => {
        //     console.log("BTC price on 1/1/2017 in USD/EUR was: ", prices) // { USD: 995.44, EUR: 946.47}
        // })
        // .catch(console.error);



//Import our indicators file: 
// const indicators = require("./indicators.js")

import hourlyMovingAverage from './indicators.js'



//Call our function with the desired parameters: 
// movingAverage("BTC", "USD", 100)
// movingAverage("BTC", "USD", 50)

// movingAverage("ETH", "USD", 50)


//After adding the callback to our movingAverage function: 
hourlyMovingAverage("ETH", "USD", 50, function(result){
    console.log("MA is: ", result)
})



