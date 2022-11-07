const http = require('http');
const express = require('express');
const app = express();
const db = require("./database");

const port = 8000;
const airports =  ['AMS', 'BER', 'BLL', 'BRE', 'BRN', 'BRS', 'BRU', 
'BSL', 'CGN', 'DRS', 'DTM', 'DUS', 'EIN', 'ERF', 'FDH', 
'FKB', 'FMM', 'FMO', 'FRA', 'GRQ', 'GRZ', 'GVA', 'GWT', 
'HAJ', 'HAM', 'INN', 'KLU', 'KRK', 'KSF', 'LBC', 'LEJ', 
'LNZ', 'LUX', 'MUC', 'NRN', 'NUE', 'PAD', 'PMI', 'PRG', 
'SCN', 'STR', 'SXB', 'SZG', 'VIE', 'WAW', 'ZRH'];




app.get("/api/getAirports", (req, res) => {

  /*const airports = db.promise().query("SELECT distinct * from (select inboundarrivalairport from offers union select outbounddepartureairport from offers limit 10000000) as mmoin order by 1 asc")
  
  */

  /*
  const airports = db.promise().query(`SELECT distinct * from (SELECT inbounddepartureairport FROM offers UNION 
  SELECT inboundarrivalairport FROM offers UNION
  SELECT outbounddepartureairport FROM offers UNION 
  SELECT outboundarrivalairport FROM offers) as moin order by 1 asc`);
  */


  res.json({"airports": airports});
})

const example = {
  hotelname: "Iberostar Playa de Muro",
  latitude: 39.80012328,
  longitude: 3.108648156,
  hotelstars: 4.0,
  id: 1,
};

const exampleOffer = {
  departuredate: "2022-10-05T09:30:00+02:00",
  returndate: "2022-10-12T08:35:00+02:00",
  countadults: 1,
  countchildren: 1,
  price: 1243,
  inbounddepartureairport: "PMI",
  inboundarrivalairport: "DUS",
  inboundairline: "LH",
  inboundarrivaldatetime:"2022-10-12T14:40:00+02:00",
  outbounddepartureairport: "DUS",
  outboundarrivalairport: "PMI",
  outboundairline: "LH",
  outboundarrivaldatetime: "2022-10-05T14:25:00+02:00",
  mealtype: "halfboard",
  oceanview: "FALSE",
  roomtype: "double"
}

const getAllHotels = (req) => {
  return db.promise().query(`SELECT * FROM hotels`);
}

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
  return year + "." + month + "." + day  + " " + hour + ":" + min;
};


const getQueryParams = (req) => {
  return {
    destination: req.query.destination,
    timeTo: req.query.timeTo,
    timeFrom: req.query.timeFrom,
    adults:req.query.adults,
    children: req.query.children,
    airport: req.query.airport,
  }
}

const processQueryResults = (req, number) => {
  console.log("Handling result Request")
  const filters = getQueryParams(req);
  console.log(`SELECT hotelname, id, latitude, latitude, hotelstars FROM hotels, offers WHERE 
  hotelid = id AND
  countadults=${filters.adults} AND 
  countchildren=${filters.children} AND 
  departuredate >= "${formatDate(filters.timeFrom)}" AND 
  returndate <= "${formatDate(filters.timeTo)}" AND
  outbounddepartureairport in (${filters.airport.split(",").map(airport => "'" + airport + "'").toString()})  LIMIT
   ${number}`)
  /*return db.promise().query(`SELECT distinct * from (SELECT hotelname, id, latitude, latitude, hotelstars FROM hotels, offers WHERE 
    hotels.id = offers.hotelid AND
    countadults=${filters.adults} AND 
    countchildren=${filters.children} AND 
    departuredate >= "${formatDate(filters.timeFrom)}" AND 
    returndate <= "${formatDate(filters.timeTo)}" AND
    outbounddepartureairport in (${filters.airport.split(",").map(airport => "'" + airport + "'").toString()}))as Results LIMIT 
     ${number}`);*/
     return db.promise().query(`SELECT hotelname, id, latitude, latitude, hotelstars FROM hotels, offers WHERE 
      hotels.id = offers.hotelid AND
      countadults=${filters.adults} AND 
      countchildren=${filters.children} AND 
      outbounddepartureairport in (${filters.airport.split(",").map(airport => "'" + airport + "'").toString()})  AND
      departuredate >= "${formatDate(filters.timeFrom)}" AND 
      returndate <= "${formatDate(filters.timeTo)}"
      LIMIT 
       ${number}`);
  
}


const processQueryOffers = (req, number) => {
  console.log("Handlich offer Request")
  const filters = {
    ...getQueryParams(req),
    id: req.query.id
  }
  return db.promise().query(`SELECT * FROM offers WHERE 
  hotelid=${filters.id} AND
  countadults=${filters.adults} AND 
  countchildren=${filters.children} AND 
  outbounddepartureairport in (${filters.airport.split(",").map(airport => "'" + airport + "'").toString()}) AND
  departuredate >= "${formatDate(filters.timeFrom)}" AND 
  returndate <= "${formatDate(filters.timeTo)}"
  
   LIMIT ${number}`)
}


app.get("/api/getOffers", async (req, res) => {
  const offers = await processQueryOffers(req, 10);
  res.json({"offers": offers[0]});
})


app.get("/api/getSearchResults", async (req, res) => {
  
  const hotels = await processQueryResults(req, 10); 
  console.log(hotels[0])
  res.json({"searchResults": hotels[0]});

})


app.listen(port, () => {
  console.log(`Server running at ${port}/`);
}).keepAliveTimeout = 2 * 60 * 1000;

/*app.use(cors())*/