
//Import our indicators file: 
// const indicators = require("./indicators.js")
import hourlyMovingAverage from './indicators.js'

import dailyMovingAverage from './indicators-daily-ma.js'

import minutelyMovingAverage from './indicators-minutely-ma.js'

// import marketBuy from './exchange.js'
import marketBuyBitcoin from './exchange.js'

import marketSellBitcoin from './exchange-sell.js'

//After adding the callback to our movingAverage function: 
hourlyMovingAverage("ETH", "USD", 50, function(result){
    console.log("Hourly Moving Average is: ", result)
})


//Call Daily Moving Average
dailyMovingAverage("ETH", "USD", 7, function(result){
    let coin = "ETH"
    console.log(`Daily Moving Average of ${coin}`, result)
})

//Call Minutely Moving Average:
minutelyMovingAverage("SOL", "USD", 120, function(result){
    let coin = "SOL"
    console.log(`Minutely Moving Average of ${coin} is:`,result)
})




//Call our marketBuy Function from exchange.js in: https://academy.moralis.io/lessons/creating-exchange-module
// marketBuy("btcusd")
marketBuyBitcoin()
.then(res => console.log(res))
.catch(error => console.error(error))


//Test out sell order: 
marketSellBitcoin()
.then(res => console.log(res))
.catch(error => console.error(error))