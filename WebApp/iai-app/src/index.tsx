import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./context-store";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import AppConfig from "./config";

const appUrl = AppConfig.appBaseUrl.replace(/\/$/, "");
const basePath = "";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={basePath}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();