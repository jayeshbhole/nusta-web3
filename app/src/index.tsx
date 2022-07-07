import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { MoralisProvider } from "react-moralis";

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Application = () => {
    const isServerInfo = APP_ID && SERVER_URL ? true : false;
    //Validate
    if (!APP_ID || !SERVER_URL)
        throw new Error(
            "Missing Moralis Application ID or Server URL. Make sure to set your .env file."
        );
    if (isServerInfo)
        return (
            <MoralisProvider
                appId={APP_ID}
                serverUrl={SERVER_URL}
                initializeOnMount={true}
            >
                <App />
            </MoralisProvider>
        );
    else {
        return (
            <div>Error loading Moralis. Make sure to set your .env file.</div>
        );
    }
};

ReactDOM.render(
    <React.StrictMode>
        <ColorModeScript />
        <Application />
    </React.StrictMode>,

    document.getElementById("root")
);

reportWebVitals();
