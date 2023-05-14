import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Policy from "./pages/Policy";
import Oferta from "./pages/Oferta";


export const UserContext = createContext(null)

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [ref, setRef] = useState(true)
    const [user, setUser] = useState({
        jwt: '',
        active: false,
        user: {}
    })


    useEffect(_ => {
        setUser(prev => {
            return {
                ...prev,
                jwt: localStorage.getItem('jwt'),
                active: Boolean(localStorage.getItem('active')),
                user: JSON.parse(localStorage.getItem('user'))
            }
        })
    }, [])

    return (
        <React.StrictMode>
            <BrowserRouter>
                <UserContext.Provider value={ {user, setUser, isLoading, setIsLoading, ref, setRef} }>
                    <ToastContainer></ToastContainer>
                    <Navbar/>
                        <Routes>
                            <Route path='/' element={<HomePage/>} />
                            <Route path='/sign_up' element={<SignUp/>}/>
                            <Route path='/sign_in' element={<SignIn/>}/>
                            <Route path='/product/:id' element={<ProductDetail/>}/>
                            <Route path='/shop' element={<Shop/>}/>
                            <Route path='/about' element={<About/>}/>
                            <Route path='/contact' element={<Contacts/>}/>
                            <Route path='/cart' element={<Cart/>}/>
                            <Route path='/checkout' element={<Checkout/>}/>
                            <Route path='/checkout/thanks' element={<CheckoutSuccess/>}/>
                            <Route path='/privacy-policy' element={<Policy/>}/>
                            <Route path='/publichnaya-oferta' element={<Oferta/>}/>
                        </Routes>
                    <Footer/>
                </UserContext.Provider>
            </BrowserRouter>
        </React.StrictMode>
    );
}

export default App;