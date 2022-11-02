import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./style/colorTheme.jsx";
import Results from "./pages/Results";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="root-div">
    <React.StrictMode>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Routes>
            <Route path="/results/:destination/:timeTo/:timeFrom/:adults/:children/:airport" element={<Results />} />
          </Routes>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
          
        </MuiThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  </div>
);
