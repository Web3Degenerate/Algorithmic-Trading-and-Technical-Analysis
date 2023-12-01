//Created (4:30): https://academy.moralis.io/lessons/npm-initializing-project
// console.log("Welcome to index.js file. Baaaam!");

// Resumed (3:50): https://academy.moralis.io/lessons/using-gemini-buy-order
// require the gemini package
const GeminiAPI = require("gemini-api").default;

// Initialize the secret and the key
const secret = '0xe-SECRET-HERE'; 
const key = "0xf-KEY_HERE";



// Gemini API is a rest API. A web API. 
const restClient = new GeminiAPI({key, secret, sandbox:true});

// Create an order (7:05): https://academy.moralis.io/lessons/using-gemini-buy-order
// Make a limit order: 
// gemini package will create the new order and send it.
// THEN console log the response (Call from terminal with `node index.js`):
restClient.newOrder({amount:10, price:100, side:"buy", symbol: "btcusd" })
// .then(response => console.log(response))
// .then(response => console.log(response.order_id))
.then(response => restClient.cancelOrder({order_id: response.order_id}))
.then(response => console.log(response))
.catch(error => console.log("Error in newOrder() located in index.js was: ",error));





// Work through the REST API documentation on gemini-api github: 

// getAllSymbols().then(response => console.log(response));
// restClient.getAllSymbols().then(response => console.log(response));  // returns updated symbol pairs available on gemini

// get latest price of ticker
// timestamp seconds after unix epoch
// restClient.getTicker("btcusd").then(response => console.log(response));


// restClient.getOrderBook("symbol_here", params={}) //often params optional



