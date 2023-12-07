import fetch from 'node-fetch';
global.fetch = fetch;

// const CCAPIKey = "0xg-CryptoCompare_KEY_HERE";
const CCAPIKey = "a43666c8e9baceac70508ba0b8ec090000c3ecfa4234277e37cf718acedea95a";

import pkg from 'cryptocompare';
const CryptoCompareAPI = pkg;

CryptoCompareAPI.setApiKey(CCAPIKey);


function minutelyMovingAverage(cryptoAsset, fiatCurrency, minutes, callback){
    //Check that minutes parameter is not greater than 1440 (24 hours)
    if(minutes>1440){
        console.log("minutes must be less than 1440 (24 hours)")
        return
    }

    //Call CryptoCompare's histoMinute() function:
    CryptoCompareAPI.histoMinute(cryptoAsset, fiatCurrency)
    .then(data => {

        //Reverse so the first element is the current day:
        data = data.reverse()

        let sum = 0
        for(let i=0; i<minutes; i++){
            sum+=data[i].close
        }

        let movingAverageMinutely = sum/minutes
        callback(movingAverageMinutely)
    })
    .catch(console.error)
}

export default minutelyMovingAverage