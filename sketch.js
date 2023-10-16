//This is my week 5 work where I illustrated the minimum and maximum temperature and plot lines to indicate a graph plot.

let maxTemps;
let minTemps;

function setup() {
  createCanvas(600, 600);
  apiRequest();
}

function draw() {
  background('white');

  if (maxTemps != undefined) {
    for (let i = 0; i < maxTemps.length; i++) {
      let h = map(maxTemps[i], -88, 58, height, 0);
      fill("#f7c092");
      ellipse(i * width / maxTemps.length, h, 20, 20);

      // I have drawn the line connecting the ellipses (except for the first one)
      if (i > 0) {
        let prevH = map(maxTemps[i - 1], -88, 58, height, 0);
        line((i - 1) * width / maxTemps.length, prevH, i * width / maxTemps.length, h);
      }
    }
  }

  if (minTemps != undefined) {
    for (let i = 0; i < minTemps.length; i++) {
      let h = map(minTemps[i], -88, 58, height, 0);
      fill("#92d2f7");
      ellipse(i * width / minTemps.length, h, 20, 20);

      // here again, I have drawn the line connecting the ellipses (except for the first one)
      if (i > 0) {
        let prevH = map(minTemps[i - 1], -88, 58, height, 0);
        line((i - 1) * width / minTemps.length, prevH, i * width / minTemps.length, h);
      }
    }
  }
}

async function apiRequest() {
  let request = await fetch("https://api.open-meteo.com/v1/forecast?latitude=13.0878&longitude=80.2785&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto");
  console.log(request);

  let data = await request.json(); // to get message and status in the form of JSON
  console.log(data);

  let dailyTemps = data.daily;
  console.log(dailyTemps);

  maxTemps = dailyTemps.temperature_2m_max;
  console.log(maxTemps);

  minTemps = dailyTemps.temperature_2m_min;
  console.log(minTemps);
}

