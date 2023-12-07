import fetch from 'node-fetch';
global.fetch = fetch;

// const CCAPIKey = "0xg-CryptoCompare_KEY_HERE";
const CCAPIKey = "a43666c8e9baceac70508ba0b8ec090000c3ecfa4234277e37cf718acedea95a";

import pkg from 'cryptocompare';
const CryptoCompareAPI = pkg;

CryptoCompareAPI.setApiKey(CCAPIKey);


function hourlyMovingAverage(cryptoAsset, fiatCurrency, hours, callback){
    //Only 169 hours allowed: 
        if(hours>169){
            console.log("Only up to 169 hours allowed!")
            return
        }

    // CryptoCompareAPI.histoHour('BTC', 'USD')
        CryptoCompareAPI.histoHour(cryptoAsset, fiatCurrency)
        .then(data => {

    //We want the first element to the the current hour, then count back. 
        data = data.reverse()
    //Use for loop
        var sum = 0;

        for(var i = 0; i<hours; i++){
            sum+=data[i].close  
        }

        var movingAverageHourly = sum/hours;

        callback(movingAverageHourly);

        })
        .catch(console.error)
}



export default hourlyMovingAverage 