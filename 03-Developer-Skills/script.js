/*
/// Developer Skills ///
'use strict';

//////////////////////////////////////////////
/// Using Google, MDN, and Stack Overflow ///

// PROBLEM 1
// We work for a company building a smart home thermometer. Our most recent task is this:
// "Given an array of temperatures of one day, calculate the temperature amplitude.
// in mind that sometimes there might be a sensor error."

// 1) Array of temperature in one day
// 2) Function of max, min, and amplitude of temperature
// 3) Test the function
// 4) Debugging the 'error' sensor

// 1)
const temperature = ['error', -3, 0, 1, -2.5, 'error', 6];
// 2)
const calcTemperature = function (temps) {
  let maxTemp;
  let minTemp;
  // Debugging for error in first element
  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] !== 'number') continue;
    if (typeof temps[i] === 'number') {
      maxTemp = temps[i];
      minTemp = temps[i];
      break;
    }
  }
  for (let i = 0; i < temps.length; i++) {
    let curTemp = temps[i];
    // Bug's here!
    if (typeof curTemp !== 'number') continue;
    if (curTemp > maxTemp) maxTemp = curTemp;
    if (curTemp < minTemp) minTemp = curTemp;
  }
  // Bug's here!
  console.log(maxTemp, minTemp);
  return maxTemp - minTemp;
};
// 3)
console.log(calcTemperature(temperature));
// 4)
// use debugger from Sources tab from browser
// bug: not a number
// preventng the bug for any possibility it exists
// try the error elemnt in the first element

// PROBLEM 2
// Function should now receive 2 arrays of temps

// 1) How to merge 2 arrays? => Do a research

const temperature2 = [9, 3, -0.5, 'error', 2];
// 1)
const temperatures = temperature.concat(temperature2);
console.log(temperatures);
console.table(temperatures);
console.log(calcTemperature(temperatures));

///////////////////////////////////////////////////////
/// Using Debugger with the Console and Breakpoint ///

// PROBLEM 3
// Formula to change celcius degree into absolute degree

// 1) Temperature from input in prompt
// 2) Return the value into the function
// 3) Return the absolute from function

// 1) and 2)
const conTemp = function () {
  const measurement = {
    type: 'temperature',
    unit: 'celcius',
    value: prompt('Your temperature in degree celcius'),
  };
  // Bug's here!
  const absTemp = Number(measurement.value) + 273;
  return absTemp;
};
// 3)
console.log(conTemp());

// Oops! There is a bug!
// Identify, Find(trace), Fix, and Prevent
// Prompt return a String!

/////////////////////////
/// CODING CHALLANGE ///

// Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.
// Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

// Understand the problem
// 1) Transfrom Array into String
// 2) String started and ended by ...
// 3) ... also in between
// 4) Element is followed by ºC
// 5) X days = index + 1 days

// Answer
// 1) Use a function, build a for loop inside it
// 2) Concate the String inside loop
// 3) Call the function, console to the log

const temp1 = [17, 21, 23];
const temp2 = [12, 5, -5, 0, 4];
// 1)
const printForecast = function (arr) {
  let des = '... ';
  // 2)
  for (let i = 0; i < arr.length; i++) {
    des += `${arr[i]}ºC in ${arr.indexOf(arr[i]) + 1} days ... `;
  }
  return `${des}`;
};
// 3)
console.log(printForecast(temp1));
console.log(printForecast(temp2));
*/
