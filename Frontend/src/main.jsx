// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";
// import App from "./App";
// import "./index.css";
// import { Toaster } from "./components/retroui/Sonner";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <App />
//     <Toaster />
//   </Provider>
// );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import  { store } from "./redux/store";
// import App from "./App";
// import "./index.css";
// import { Toaster } from "./components/retroui/Sonner";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";

// let persistor = persistStore(store)
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <App />
//       <Toaster />
//     </PersistGate>
//   </Provider>
// );


// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store"; // Import both
import App from "./App";
import "./index.css";
import { Toaster } from "./components/retroui/Sonner";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <Toaster />
    </PersistGate>
  </Provider>
);