import {createContext, useContext} from "react";


export const NavbarContext = createContext(null)
export const useNavbarContext = _ => useContext(NavbarContext)