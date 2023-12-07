import fetch from 'node-fetch';
global.fetch = fetch;

        import hourlyMovingAverage from './indicators.js'
        import dailyMovingAverage from './indicators-daily-ma.js'
        import minutelyMovingAverage from './indicators-minutely-ma.js'

//Uncomment import statements when Gemini API information added: 
        // import marketBuyBitcoin from './exchange.js'    // import marketBuy from './exchange.js'
        // import marketSellBitcoin from './exchange-sell.js'
        import bitcoinPrice from './exchange-get-ticker.js'


// Set our position boolean (13:17): https://academy.moralis.io/lessons/building-ma-strategy
let hasPosition = false;


//Added in final video: https://academy.moralis.io/lessons/building-ma-strategy
function strategy(){

    console.log("                 ")

    console.log("====================================")
    console.log("**** Executing strategy ****")

    hourlyMovingAverage("BTC", "USD", 100, function(ma){
//Move CryptoCompare's 100 HR MA down inside the Gemini bitcoinPrice() call (11:55)
        // console.log("CryptoCompare 100 HR MA is now: ", ma)

        //Now get the BTC price from Gemini exchange in exchange-get-ticker.js
        bitcoinPrice()
        .then(res => {
            //returns last price object, bid, ask and last.
                // console.log(res)  

            // We only want the LAST BTC price: 
                var price = res.last;

                console.log("CryptoCompare 100 HR MA is now: ", ma)
                console.log("Gemini Bitcoin Price is: ",price);

// (11:30) - Move setTimeout() here, so that we make sure to get both CryptoCompare and Gemini:
            setTimeout(strategy, 5000);
        })
    })

        // (5:45) To do this over and over again, use setTimeout()
            // Do this function, and in this case, after we have finished all of our strategy for all of the tick. 
            // After the tick has ended, we run it again. 
// (9:30) - Pro-tip: only restart timer after we have a result from the CryptoCompare Servers.
    // setTimeout(strategy, 5000)
}

strategy();

