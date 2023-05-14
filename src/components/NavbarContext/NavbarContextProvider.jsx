import React, {useState} from 'react';
import {NavbarContext} from "../../context/navbarContext"
import Navbar from "../Navbar/Navbar";
import HomePage from "../../pages/HomePage";
import Shop from "../../pages/Shop";
import About from "../../pages/About";
import Footer from "../Footer/Footer";


function NavbarContextProvider({children}) {
    const [navbar, setNavbar] = useState({
        main: false,
        shop: false,
        about: false,
        contacts: false,

    })

    return (
        <React.StrictMode>
            <NavbarContext.Provider value={ {navbar, setNavbar} }>
                {children}
            </NavbarContext.Provider>
        </React.StrictMode>
    );
}

export default NavbarContextProvider;