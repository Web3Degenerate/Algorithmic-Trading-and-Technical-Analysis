
//Import our indicators file: 
// const indicators = require("./indicators.js")
import hourlyMovingAverage from './indicators.js'



//After adding the callback to our movingAverage function: 
hourlyMovingAverage("ETH", "USD", 50, function(result){
    console.log("MA is: ", result)
})



