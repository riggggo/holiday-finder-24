const http = require('http');
const express = require('express');
const app = express();


const port = 8000;
const airports = [
  "Munich", "Vienna", "Cologne"
]


app.get("/api/getAirports", (req, res) => {
  res.json({"airports": airports});
})

app.get("/api/", (req, res) => {
  res.json({"airports": airports});
})

app.get("/getAirports", (req, res) => {
  res.json({"airports": airports});
})


app.listen(port, () => {
  console.log(`Server running at ${port}/`);
}).keepAliveTimeout = 2 * 60 * 1000;

/*app.use(cors())*/