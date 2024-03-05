// frontend/src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "./App";
import "../index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// The Provider wraps the whole application in Redux, so everything can access the store
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);