import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";

import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./style/colorTheme.jsx";
import ResultsView from "./pages/ResultsView";
import HotelView from "./pages/OfferView";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="root-div">
    <React.StrictMode>
      <Router>
        <MuiThemeProvider theme={theme}>
          <Routes>
            <Route path="/results/:destination/:timeTo/:timeFrom/:adults/:children/:airport" element={<ResultsView />} />   
            <Route path="/hotel/:id/:hotelname/:destination/:timeTo/:timeFrom/:adults/:children/:airport" element={<HotelView />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
          
        </MuiThemeProvider>
      </Router>
    </React.StrictMode>
  </div>
);
