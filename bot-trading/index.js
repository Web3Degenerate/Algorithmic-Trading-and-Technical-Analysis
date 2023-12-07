import fetch from 'node-fetch';
global.fetch = fetch;

import hourlyMovingAverage from './indicators.js'
import dailyMovingAverage from './indicators-daily-ma.js'
import minutelyMovingAverage from './indicators-minutely-ma.js'
// import marketBuy from './exchange.js'
import marketBuyBitcoin from './exchange.js'
import marketSellBitcoin from './exchange-sell.js'
import bitcoinPrice from './exchange-get-ticker.js';

