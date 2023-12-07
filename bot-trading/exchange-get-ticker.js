import gem from 'gemini-api';
const GeminiAPI = gem;
const restClient = new GeminiAPI({key, secret, sandbox:true})

// TO-DO on Gemini: Initialize the secret and the key
const secret = '0xe-SECRET-HERE'; 
const key = "0xf-KEY_HERE";


function bitcoinPrice(){
    return restClient.getTicker("btcusd")
}

export default bitcoinPrice