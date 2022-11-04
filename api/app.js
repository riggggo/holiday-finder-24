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

const example = {
  name: "Iberostar Playa de Muro",
  lat: 39.80012328,
  long: 3.108648156,
  averageRating: 4.0,
  id: 1,
};

const processQuery = (req) => {
  //use req.query
}

app.get("/api/getSearchResults", (req, res) => {

  res.json({"searchResults": [example, example, example]});
})


app.listen(port, () => {
  console.log(`Server running at ${port}/`);
}).keepAliveTimeout = 2 * 60 * 1000;

/*app.use(cors())*/