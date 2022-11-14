const http = require("http");
const express = require("express");
const app = express();
const db = require("./database");
const mysql = require("mysql2");
const port = 8000;
const Cache = require("./cache");
const MAX_ELMENTS_CACHE = 20;
const cache_results = new Cache(MAX_ELMENTS_CACHE);
const airports = {
  AMS: "Amsterdam (NL)",
  BER: "Berlin (DE)",
  BLL: "Billund (DK)",
  BRE: "Bremen (DE)",
  BRN: "Berne (CH)",
  BRS: "Bristol (GB)",
  BRU: "Brussels (BE)",
  BSL: "Basel (CH)",
  CGN: "Cologne (DE)",
  DRS: "Dresden (DE)",
  DTM: "Dortmund (DE)",
  DUS: "Duesseldorf (DE)",
  EIN: "Eindhoven (NL)",
  ERF: "Erfurt (DE)",
  FDH: "Friedrichshafen (DE)",
  FRA: "Frankfurt/Main (DE)",
  GRQ: "Groningen (NL)",
  GRZ: "Graz (AT)",
  GVA: "Geneva (CH)",
  HAJ: "Hanover (DE)",
  HAM: "Hamburg (DE)",
  INN: "Innsbruck (AT)",
  FKB: "Karlsruhe (DE)",
  KLU: "Klagenfurt (AT)",
  KRK: "Krakow (PL)",
  KSF: "Kassel (DE)",
  LBC: "Luebeck (DE)",
  LEJ: "Leipzig (DE)",
  LNZ: "Linz (AT)",
  LUX: "Luxembourg (LU)",
  MUC: "Munich (DE)",
  FMM: "Memmingen (DE)",
  FMO: "Muenster/Osnabrueck (DE)",
  NUE: "Nuremberg (DE)",
  PAD: "Paderborn (DE)",
  PMI: "Palma Mallorca (ES)",
  PRG: "Prague (CZ)",
  SCN: "Saarbruecken (DE)",
  STR: "Stuttgart (DE)",
  SXB: "Strasbourg (FR)",
  SZG: "Salzburg (AT)",
  VIE: "Vienna (AT)",
  WAW: "Warsaw (PL)",
  NRN: "Weeze (DE)",
  GWT: "Westerland (DE)",
  ZRH: "Zurich (CH)",
};


app.get("/api/getAirports", (_, res) => {
  for ()
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

/*app.use(cors())*/
