import fetch from 'node-fetch';
global.fetch = fetch;

// const CCAPIKey = "0xg-CryptoCompare_KEY_HERE";
const CCAPIKey = "a43666c8e9baceac70508ba0b8ec090000c3ecfa4234277e37cf718acedea95a";

import pkg from 'cryptocompare';
const CryptoCompareAPI = pkg;

CryptoCompareAPI.setApiKey(CCAPIKey);


function dailyMovingAverage(cryptoAsset, fiatCurrency, days, callback){
    //Check that days parameter is not greater than 365
    if(days>365){
        console.log("Days must be 365 or less")
        return
    }

    //Call CryptoCompare's histoDay() function
    CryptoCompareAPI.histoDay(cryptoAsset, fiatCurrency)
    .then(data => {

        //Reverse so the first element is the current day:
        data = data.reverse()

        let sum = 0
        for(let i=0; i<days; i++){
            sum+=data[i].close
        }

        let movingAverageDaily = sum/days
        callback(movingAverageDaily)
    })
    .catch(console.error)
}

export default dailyMovingAverage