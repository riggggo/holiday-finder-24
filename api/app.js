const http = require("http");
const express = require("express");
const app = express();
const db = require("./database");
const mysql = require("mysql2");
const port = 8000;
const airports = [
  "AMS",
  "BER",
  "BLL",
  "BRE",
  "BRN",
  "BRS",
  "BRU",
  "BSL",
  "CGN",
  "DRS",
  "DTM",
  "DUS",
  "EIN",
  "ERF",
  "FDH",
  "FKB",
  "FMM",
  "FMO",
  "FRA",
  "GRQ",
  "GRZ",
  "GVA",
  "GWT",
  "HAJ",
  "HAM",
  "INN",
  "KLU",
  "KRK",
  "KSF",
  "LBC",
  "LEJ",
  "LNZ",
  "LUX",
  "MUC",
  "NRN",
  "NUE",
  "PAD",
  "PMI",
  "PRG",
  "SCN",
  "STR",
  "SXB",
  "SZG",
  "VIE",
  "WAW",
  "ZRH",
];




app.get("/api/getAirports", (_, res) => {
  res.json({ airports: airports });
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

const getQueryParams = (req) => {
  const airports_string = req.query.airport
    .split(",")
    .map((airport) => mysql.escape(airport))
    .toString();
  return {
    destination: mysql.escape(req.query.destination),
    timeTo: mysql.escape(req.query.timeTo),
    timeFrom: mysql.escape(req.query.timeFrom),
    adults: mysql.escape(req.query.adults),
    children: mysql.escape(req.query.children),
    airport: airports_string,
  };
};


const processQueryResults = (req, from, to) => {
  const filters = getQueryParams(req);
  const db_query = `SELECT distinct hotelname, id, latitude, latitude, hotelstars FROM hotels, offers WHERE 
      hotels.id = offers.hotelid AND
      countadults=${filters.adults} AND 
      countchildren=${filters.children} AND 
      outbounddepartureairport in (${filters.airport})  AND
      departuredate >= "${formatDate(filters.timeFrom)}" AND 
      returndate <= "${formatDate(filters.timeTo)}"
      LIMIT ${from} OFFSET ${to}
      `;

  return db.promise().query(db_query);
};

const processQueryOffers = (req, from, to) => {
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
    LIMIT ${from} OFFSET ${to}`);
};

app.get("/api/getOffers", async (req, res) => {
  console.log("Handling offer Request");
  try {
    const offers = await processQueryOffers(req, 10, 0);
    res.json({ offers: offers[0] });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      searchResults: e
    });
  }
  console.log("Finished offer Request " + new Date());
  
});

app.get("/api/getSearchResults", async (req, res) => {
  console.log("Handlich offer Request");
  try {
    const hotels = await processQueryResults(req, 10, 10);
    res.json({ searchResults: hotels[0] });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      searchResults: e
    });
  }
  console.log("Finished result Request " + new Date());
  
});

app.listen(port, () => {
  console.log(`Server running at ${port}/`);
}).keepAliveTimeout = 2 * 60 * 1000;

/*app.use(cors())*/
