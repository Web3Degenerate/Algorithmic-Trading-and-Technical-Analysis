import gem from 'gemini-api';
const GeminiAPI = gem;
const restClient = new GeminiAPI({key, secret, sandbox:true})

// TO-DO on Gemini: Initialize the secret and the key
const secret = '0xe-SECRET-HERE'; 
const key = "0xf-KEY_HERE";


//Place Market Order on Gemini: https://academy.moralis.io/lessons/creating-market-order-at-gemini
// function marketBuy(symbol){
//     return restClient.newOrder({amount:1,
//                         price:100000,
//                         side:"buy",
//                         symbol:symbol,
//                         options:["immediate-or-cancel"]})
//     .then(res => console.log(res))
//     .catch(error => console.error(error))
// }


//Example, hardcoded BTC as the only symbol: 
function marketBuyBitcoin(){
    return restClient.newOrder({amount:1,
                        price:200000,
                        side:"buy",
                        symbol:"btcusd",
                        options:["immediate-or-cancel"]})
    .then(res => console.log(res))
    .catch(error => console.error(error))
}

export default marketBuyBitcoin