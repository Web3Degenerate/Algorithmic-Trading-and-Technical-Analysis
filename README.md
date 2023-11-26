# Algorithmic-Trading-and-Technical-Analysis

## Introduction to Technical Analysis

1. Candlesticks

- - x

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
  
