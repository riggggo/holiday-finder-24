const http = require('http');
const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 8000;
const airports = [
  "Munich", "Vienna", "Cologne"
]


app.get("/api/getAirports", (req, res) => {
  res.json({"airports": airports});
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})

/*app.use(cors())*/