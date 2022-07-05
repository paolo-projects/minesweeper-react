import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { ServicesContext } from "./services/ServicesContext";
import ServicesInterface from "./services/ServicesContainer";
import MinesweeperService from "./services/minesweeper/MinesweeperService";

const container = document.getElementById("root")!;
const root = createRoot(container);
const context: ServicesInterface = {
    minesweeper: new MinesweeperService(),
};

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ServicesContext.Provider value={context}>
                <App />
            </ServicesContext.Provider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
