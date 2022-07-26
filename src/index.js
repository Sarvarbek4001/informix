import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthenticationContext";
import { BlockContextProvider } from "./context/SingleBlock";
import { LocalizationContextProvider } from "./context/LocalizationContext";
ReactDOM.render(
  <React.StrictMode>
    <LocalizationContextProvider>
      <AuthContextProvider>
        <BlockContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BlockContextProvider>
      </AuthContextProvider>
    </LocalizationContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
