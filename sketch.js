
// WEEK 5

//API KEY - AIzaSyDe7104VSBB8BuDyNpkxQTurVcWTi9xgto

//I decided to go ahead to Google Maps API for time zone to display both local(city users enter) and current time(NYC time).

//This is displayed in two separate cards with random background colors

//the problem I am facing right now is even though local time is displayed, I am not able to get that into the card.

let apiKey = 'AIzaSyDe7104VSBB8BuDyNpkxQTurVcWTi9xgto';

function setup() {
  createCanvas(800,800);
  noLoop();
  
  let cityInput = select('#cityInput');
  let getTimeButton = select('#getTimeButton');
  let resultDiv = select('#result');
  let currentTimeDiv = select('#currentTime');

  getTimeButton.mousePressed(() => {
    let city = cityInput.value();
    getTimeForCity(city, resultDiv);
    displayCurrentTime(currentTimeDiv);
  });
  
}

  function getCurrentTime() {
  let currentTime = new Date();
  return currentTime.toLocaleTimeString();
}

function getLocalTime() {
  let localTime = new Date();
  return localTime.toLocaleTimeString();
}

async function getTimeForCity(city, resultDiv) {
  // Since not many people would know a city by its coordinates, I used geocoding API to determine coordinates based on the name of the city entered
  let geocodingURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;
  let geocodingResponse = await fetch(geocodingURL);
  let geocodingData = await geocodingResponse.json();
  let location = geocodingData.results[0].geometry.location;

  // here we are setting the the time zone for the coordinates
  let timeZoneURL = `https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=${Math.floor(Date.now() / 1000)}&key=${apiKey}`;
  let timeZoneResponse = await fetch(timeZoneURL);
  let timeZoneData = await timeZoneResponse.json();

  // as per reference, I am calculating the local time of the place we entered
  let localTime = new Date(Date.now() + (timeZoneData.rawOffset + timeZoneData.dstOffset)*1700);

  resultDiv.html(`Local Time in ${city}: ${localTime.toLocaleTimeString()}`);
  
   let formattedLocalTime = localTime.toLocaleTimeString();
  resultDiv.html(`Local Time in ${city}: ${formattedLocalTime}`);
  
   let currentTime = new Date();
  let formattedCurrentTime = currentTime.toLocaleTimeString();
  currentTimeDiv.html(`Current Time: ${formattedCurrentTime}`);
  
}


function displayCard(title, content, x, y) {
    // Generate a random value between 0 and 255 for red
  let randomRed = random(255); 

// Generate a random value between 0 and 255 for green
  let randomGreen = random(255);

// Generate a random value between 0 and 255 for blue
  let randomBlue = random(255); 

  // Create a random color using the random red, green, and blue components
  let randomColor = color(randomRed, randomGreen, randomBlue);
  
  stroke(0);
  fill(randomColor);
  rect(x, y+20, 300, 70, 10);

  fill(0);
  textSize(16);
  text(title, x + 20, y + 50);
  textSize(24);
  text(content, x + 25, y + 70);
}


function draw() {
  
    let currentTime = new Date();
  let formattedCurrentTime = currentTime.toLocaleTimeString();

  let localTime = new Date();
  let formattedLocalTime = localTime.toLocaleTimeString();

  displayCard("Current Time", formattedCurrentTime, 50, 50);
  displayCard("Local Time", formattedLocalTime, 50, 100);

  
}