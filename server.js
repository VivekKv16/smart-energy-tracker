const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

let sensorData1 = {};
let sensorData2 = {};

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/data', (req, res) => {
  const { port, value, watt, power } = req.body;

  if (port === 1) {
    sensorData1 = { value, watt, power };
  } else if (port === 2) {
    sensorData2 = { value, watt, power };
  }

  console.log(`Received data on port ${port}:`, req.body);
  res.sendStatus(200);
});

app.get('/data', (req, res) => {
  res.json({ port1: sensorData1, port2: sensorData2 });
});

app.get('/data/html', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sensor Data</title>
      <link rel="stylesheet" href="/style.css">
      <meta http-equiv="refresh" content="5">
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .sensor-container {
          margin-bottom: 20px;
        }
        .sensor-title {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h1>Sensor Data</h1>
      <div class="sensor-container">
        <div class="sensor-title"></div>
        <div id="port1">
          <h1>Appliance 1</h1>
          <div>Value: ${sensorData1.value || 'N/A'}</div>
          <div>Power: ${sensorData1.power || 'N/A'}</div>
        </div>
      </div>
      <div class="sensor-container">
        <div class="sensor-title"></div>
        <div id="port2">
        <h1>Appliance 2</h1>
          <div>Value: ${sensorData2.value || 'N/A'}</div>
          <div>Power: ${sensorData2.power || 'N/A'}</div>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
