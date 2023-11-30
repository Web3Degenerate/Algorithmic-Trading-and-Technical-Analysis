# Algorithmic-Trading-and-Technical-Analysis

## Introduction to Technical Analysis

1. Candlesticks

- - x

**NOTE on git merges**
To remove local uncommitted changes (even if staged) run. From this [Stackoverflow Article](https://stackoverflow.com/questions/1125968/how-do-i-force-git-pull-to-overwrite-local-files)

- `git reset --hard HEAD`
- `git pull`

## Pine Script

0. [**Strategy Tester - First Pine Script Test in Trading View**](https://academy.moralis.io/lessons/strategy-tester)

- **NOTE:** Examples shown in Version 3. Currently (Fall 2023) on Version 5.

1. [**Variables**](https://academy.moralis.io/lessons/variables)

   - open - _opening price of the current candle_
   - close - _closing price etc._
   - high - _high of wick_
   - low - _low of wick_

   - Access opening, closing, high or low price of previous candle:

     - `open[1]`, `close[1]`, `high[1]`, `low[1]`
     - For two candles back, `open[2]`, etc.

   - **n** - is the **id** of the candle in your time-frame.
     - `n==1` (_first candle_), `n==1000` (_1000th candle_)

2. [**Functions**](https://academy.moralis.io/lessons/functions)

   - Two main ones we'll focus on:
     - `strategy.entry()` - [See \*\*strategy.entry() Docs Here](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy.entry)
     - `strategy.close()` - [See \*\*strategy.exit() Docs Here](https://www.tradingview.com/pine-script-reference/v5/#fun_strategy.exit)
   -

3. [**Indicators**](https://academy.moralis.io/lessons/indicators)
   - Examples: **SMA()**, **macd()**, **vwap()**.
   - **plot()** - Ex: To plot the simple moving average on to the graph in tradingview we'd:
     - (1) Define variable to `SMA()`
     - (2) plot it inside `plot()`

```js
//SMA Strategy Example:
my_sma = ta.sma(close, 10) // open/close etc, # of candles
plot(my_sma)

//Completed first version:
strategy(title="MAStrategy")

m=ta.sma(close, 10) //10 candles
buy=close > m //buy when close is above 10 day simple moving average
sell=close < m //sell when close is below 10 day simple moving average

if buy
    // strategy.entry("buy", true, 5, when=buy)
    //first param is just your preferred name
    //second param is long or short. Deprecated version true for long, false for short.
    //third is amount to buy.
    strategy.entry("buy", strategy.long, 5, comment = "buy mofo")
if sell
    strategy.close("buy", qty_percent = 50, comment = "close buy entry for 50% when close below 10-day SMA")

```

4. [**Pine Script Basics**](https://academy.moralis.io/lessons/reading-assignment-pinescript) _See_ [**Pine Script Docs**](https://www.tradingview.com/pine-script-reference/v5/)

   - (1) _What does the language operator **[]** do? (It's not for regular arrays)_

     - **`[ ]` history-referencing operator. It is possible to refer to past values of time series using the [] history-referencing operator.** [_See [] Docs_](https://www.tradingview.com/pine-script-reference/v5/#op_[])

   - (2) _What does the input function do?_
   - **input function Adds an input to the Inputs tab of your script's Settings, which allows you to provide configuration options to script users..** [_See input() Docs_](https://www.tradingview.com/pine-script-reference/v5/#fun_input)

   - (3) _What_

5. Plan out our [**50-20 Model**](https://academy.moralis.io/lessons/model)

   - shortMa = `ta.sma(close, 20)`
   - longMa = `ta.sma(close, 50)`

   - **longSignal** = _boolean, true whenever we are going to open long position_

     - come up with a statement evaluates to true or false, depending on whether or not we have a **crossover** b/t the 50 & 20 day moving average. So we will use the **crossover() function**
     - Only true when the short SMA moves up over the longer SMA.
       - **Use `longSignal = crossover(shortMa, longMa)`**

   - **shortSignal** = _boolean, true whenever we are going to close a long position (and enter into a short position)_

     - **Use `shortSignal = crossover(longMa, shortMa)`**

   - Format of **crossover(SMA moving up, SMA moving down)**

```js
//set up our SMA variables:
shortMa = ta.sma(close, 20)
longMa = ta.sma(close, 50)

//set up our crossover variables:
longSignal = crossover(shortMa, longMa)
shortSignal = crossover(longMa, shortMa)

//Set up when to enter longSignal
if(longSignal) => close short position(?) and enter long

//Set up when to enter shortSignal
if(shortSignal) => close long position(?) and enter short

```

6. [**Add Our 50-20 Model to Pine Script in Trading View**](https://academy.moralis.io/lessons/programming)

- v5 version added.

7. [**Back testing Part 1 - Enabling Datasets Selection**](https://academy.moralis.io/lessons/back-testing-part-1-enabling-datasets-selection)

-
- We need to add the ability to change the date range for our back testing.
- By default, Trading View does not offer that in their settings (_as of 2019_)
- Key changes:

```js
                            // (year, month, day, hours, mins)
timeInRange = (time > timestamp(fromYear, fromMonth, fromDay, 00, 00)) and (time < timestamp(toYear, toMonth, toDay, 23, 59))

    // v5 added ta.crossover()
longSignal = ta.crossover(shortMa, longMa) and timeInRange
shortSignal = ta.crossover(longMa, shortMa) and timeInRange

```

8. [**Back testing Part 2 - Selecting Datasets**](https://academy.moralis.io/lessons/back-testing-part-2-selecting-datasets)

   - Define our Datasets before optimizing the 50-20 theory.
   - We will find **two different datasets**
   - Example Dataset 1: Mid Feb 2018 (2/15/2018) to May 2018 (5/15/2018)
   - Example Dataset 2: 5/15/2018 to 8/15/2018
   - The default values can be upddated to a desired dataset you are working with.

9. [**Back testing Part 3 - Tweaking**](https://academy.moralis.io/lessons/back-testing-part-3-tweaking)

   - Improve trading strategy on dataset.
   - define **initial_capital** setting with `strategy(title="50 and 20 SMA Crossing", overlay=true, initial_capital = 2000)`
   - Add in the trading fee on each trade with two additional settings on **strategy()**
     - Add in `commission_type="strategy.commission.percent", commission_value=0.2`
     - So it becomes: `strategy(title="50 and 20 SMA Crossing", overlay=true, initial_capital = 2000, commission_type="strategy.commission.percent", commission_value=0.2)`
   - In our first dataset, adjust the variables to see which provides the best return in the **Strategy Tester** tab.
   - We will later test the best results we find on another dataset to make sure we are not just **curve fitting**.
   - In one example, the 45 & 50 SMA worked better than 20 & 50 SMA, so that is the theory we can test on the next dataset.

10. [**Back testing Part 4 - Testing on New Data**](https://academy.moralis.io/lessons/back-testing-part-4-testing-on-new-data)

    - Test strategy on other dataset.

11. [**Connect Pine Script with existing indicators (_Future Inspiration_)**](https://academy.moralis.io/lessons/future-inspiration)

    - (3:25) - Connect RSI indicator to our script.
    -

12. [**Risk Management Formula**](https://academy.moralis.io/lessons/risk-management-formula)

    - size x stoploss = 1% of portfolio
      - portfolio size: $2,000
      - 1% of portfolio: $20
      - stoploss: $100 / $50 / $200
    - size x $100 = $20
    - **0.2** x $100 = $20
      - so size = `0.2`
    -

13. [**Stop Loss & Position Size Applied to Pine Script**](https://academy.moralis.io/lessons/stop-loss-position-size)

    - Portfolio size dynamically changes as you make or lose money.
    - Trading View has a function to help us with updating the portfolio size as it changes.
      - use `strategy.equity`
      - Use this to trade 1% of portfolio on every trade:
        - definition: `max_risk = strategy.equity * 0.01`
    - x

14. [**Setting Up NodeJS**](https://academy.moralis.io/lessons/npm-initializing-project)

    - Initialize new project: `npm init`
      - **package name:** `tradingbot`
      - **version: (1.0.0)** _enter_
      - **description:** _crypto trading bot tutorial_
      - **entry point: (index.js)** - _Now that we are creating a package, npm will set up a specific js file for us that it will use to start execution of our program. Previously, `npm bot.js` triggered a single file_
        - Now we are creating a WHOLE package, so tell node, which file it should start when we fire up program.
        - We'll use **index.js** as the entry point.

15. [**Gemini Exchange**](https://academy.moralis.io/lessons/why-gemini-exchange)

- Review: initialize npm. Use it to download relevant packages to our project.
- **Choosing an Exchange**
  - Must have a **sandbox mode**.
  - Excluded Binance (in 2019)
  - Bitmex API was very easy, but not legal in the good ole' USA.
  - Coinbase had sandbox mode. (2019). Sandbox market is separate from real market. Testnet prices are very different from real prices.
  - So **for testing, _in 2019_, Gemini was the best fit**.
    - Sandbox mode, easy API, play money with real prices. Legal in USA.

16. [**Gemini Yarn Install**](https://academy.moralis.io/lessons/gemini-yarn-install)

- Install Gemini Package with:

  - `yarn add gemini-api`

    - Gemini wants us to use yarn. Very popular. Created by FB.
    - (Not `npm i gemini-api`).
    - Using an npm package like `gemini-api-node`, is like using a **wrapper**. It structures, formats web request for you, in gemini compliant form. Receive response and formats a response that is easy to understand.

  - **Install Yarn**.
    - `npm install yarn --global`
  - **Clone Repository**

    - `yarn install`

  - REST - _interact through web requests_.
  - Make request. Receive and parase request.

17. [**Using Gemini - BUY ORDER**](https://academy.moralis.io/lessons/using-gemini-buy-order)

- Set up a **sandbox account:**
  - Go to [`exchange.sandbox.gemini.com`](https://exchange.sandbox.gemini.com)
    - Get API Key for authentication.
      - Copy the (1) **API Key**, and (2) **API Secret**.
  - Back in `bot-trading/index.js` add:
    - x
