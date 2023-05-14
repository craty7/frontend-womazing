import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import 'bulma/css/bulma.min.css';
import 'bulma/css/bulma.css';
import '@splidejs/splide/dist/css/splide.min.css';
import NavbarContextProvider from "./components/NavbarContext/NavbarContextProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <NavbarContextProvider>
            <App/>
        </NavbarContextProvider>
    </React.StrictMode>
);