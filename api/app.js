const http = require("http");
const express = require("express");
const app = express();
const cors = require('cors')
const db = require("./database");
const mysql = require("mysql2");
const port = 8000;
const Cache = require("./cache");
require('dotenv').config()
const MAX_ELMENTS_CACHE = 20;
const cache_results = new Cache(MAX_ELMENTS_CACHE);
const airports = {
  Amsterdam: 'AMS',
  Berlin: 'BER',
  Billund: 'BLL',
  Bremen: 'BRE',
  Berne: 'BRN',
  Bristol: 'BRS',
  Brussels: 'BRU',
  Basel: 'BSL',
  Cologne: 'CGN',
  Dresden: 'DRS',
  Dortmund: 'DTM',
  Duesseldorf: 'DUS',
  Eindhoven: 'EIN',
  Erfurt: 'ERF',
  Friedrichshafen: 'FDH',
  'Frankfurt(Main)': 'FRA',
  Groningen: 'GRQ',
  Graz: 'GRZ',
  Geneva: 'GVA',
  Hanover: 'HAJ',
  Hamburg: 'HAM',
  Innsbruck: 'INN',
  Karlsruhe: 'FKB',
  Klagenfurt: 'KLU',
  Krakow: 'KRK',
  Kassel: 'KSF',
  Luebeck: 'LBC',
  Leipzig: 'LEJ',
  Linz: 'LNZ',
  Luxembourg: 'LUX',
  Munich: 'MUC',
  Memmingen: 'FMM',
  'Muenster(Osnabrueck)': 'FMO',
  Nuremberg: 'NUE',
  Paderborn: 'PAD',
  Palma: 'PMI',
  Prague: 'PRG',
  Saarbruecken: 'SCN',
  Stuttgart: 'STR',
  Strasbourg: 'SXB',
  Salzburg: 'SZG',
  Vienna: 'VIE',
  Warsaw: 'WAW',
  Weeze: 'NRN',
  Westerland: 'GWT',
  Zurich: 'ZRH'
}

if (process.env.MODE && process.env.MODE === "DEVELOPMENT"){
  app.use(cors())
}
app.get("/api/getAirports", (_, res) => {
  res.json({ airports: Object.keys(airports) });
});

const getAllHotels = () => {
  return db.promise().query(`SELECT * FROM hotels`);
};

const formatDate = (date) => {
  date = new Date(date);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  let hour = date.getHours();
  let min = date.getMinutes();
  if (hour < 10) hour = "0" + hour;
  if (min < 10) min = "0" + min;
  return year + "." + month + "." + day + " " + hour + ":" + min;
};

const createAirportString = (airportStringReq) => {
  
  return mysql.escape(airportStringReq)
  .replaceAll("'", "")
  .split(",")
  .map((airport) => {
    return "'" + airports[airport] + "'"})
  .toString();
}

const getQueryParams = (req) => {
  
  const airports_string = createAirportString(req.query.airport);
  return {
    destination: mysql.escape(req.query.destination),
    timeTo: mysql.escape(req.query.timeTo),
    timeFrom: mysql.escape(req.query.timeFrom),
    adults: mysql.escape(req.query.adults),
    children: mysql.escape(req.query.children),
    airport: airports_string,
    start: parseInt(mysql.escape(req.query.start).replace("'", "")),
    numberToLoad: parseInt(
      mysql.escape(req.query.numberToLoad).replace("'", "")
    ),
  };
};

const processQueryResults = (req, filters) => {
  const db_query = `SELECT distinct hotelname, id, latitude, latitude, hotelstars FROM hotels, offers WHERE 
      hotels.id = offers.hotelid AND
      countadults=${filters.adults} AND 
      countchildren=${filters.children} AND 
      outbounddepartureairport in (${filters.airport})  AND
      departuredate >= "${formatDate(filters.timeFrom)}" AND 
      returndate <= "${formatDate(filters.timeTo)}"
      LIMIT ${filters.numberToLoad} OFFSET ${filters.start}`;
  return db.promise().query(db_query);
};

const processQueryOffers = (req) => {
  const filters = {
    ...getQueryParams(req),
    id: mysql.escape(req.query.id),
  };
  return db.promise().query(`SELECT * FROM offers WHERE 
    hotelid=${filters.id} AND
    countadults=${filters.adults} AND 
    countchildren=${filters.children} AND 
    outbounddepartureairport in (${filters.airport}) AND
    departuredate >= "${formatDate(filters.timeFrom)}" AND 
    returndate <= "${formatDate(filters.timeTo)}"
    LIMIT ${filters.numberToLoad} OFFSET ${filters.start}`);
};

app.get("/api/getOffers", async (req, res) => {
  console.log("Handling offer Request");
  try {
    const offers = await processQueryOffers(req);
    res.json({ offers: offers[0] });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      searchResults: e,
    });
  }
  console.log("Finished offer Request " + new Date());
});

app.get("/api/getSearchResults", async (req, res) => {
  console.log("Handling results request");
  try {
    const filters = getQueryParams(req);
    const element = cache_results.getElement(filters);
    if (element != null) {
      console.log("Using cache ...");
      res.json({ searchResults: element });
    } else {
      const hotels = await processQueryResults(req, filters);
      cache_results.addElement({ filters: filters, results: hotels[0] });
      res.json({ searchResults: hotels[0] });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      searchResults: e,
    });
  }
  console.log("Finished result Request " + new Date());
});

app.listen(port, () => {
  console.log(`Server running at ${port}/`);
}).keepAliveTimeout = 2 * 60 * 1000;


