import React, {useContext, useEffect, useState} from 'react';
import '../../assets/index.css'
import {Link, NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../../App";
import {toast} from "react-toastify";
import {NavbarContext, useNavbarContext} from "../../context/navbarContext";
import logo from '../../assets/svg/logo.svg'
import cart from '../../assets/svg/shopping-bags 1.svg'


function Navbar(props) {
    const [active, setActive] = useState(false)
    const [bcount, setBcount] = useState(0)
    const [data, setData] = useState(null)
    const {user, setUser, isLoading, setIsLoading, setRef, ref} = useContext(UserContext)
    const {navbar, setNavbar} = useNavbarContext()

    console.log(isLoading, 'change')

    function logOut() {
        axios.put(`${process.env.REACT_APP_API_URL}/users/${user.user.id}`, {
            role: 2, // 2 - Public
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        }).then(r => console.log()).catch(err => console.log(err))
        localStorage.setItem('active', 'false')
        localStorage.setItem('jwt', '')
        document.cookie = `jwt=null`
        setUser(prev => {
            return {...prev, active: false}
        })
        toast.error('Вы вышли со своего аккаунта!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true
        })
        setRef(false)
    }

        // let url = window.location.pathname
        let paramsString = document.location.pathname; // ?page=4&limit=10&sortby=desc
        let searchParams = new URLSearchParams(paramsString);


    // useEffect(_ => {
    //     const user = JSON.parse(localStorage.getItem('user'))
    //     axios.get(`${process.env.REACT_APP_API_URL}/users?populate=baskets.owner.product.Thumbnail&filters[id]=${user.id}`, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    //         }
    //     })
    //         .then(result => {
    //             console.log(result.data[0].baskets.length, 'result')
    //             // console.log('get data', result)
    //             setData(result)
    //             setBcount(result.data[0].baskets.length)
    //         }).catch(err => console.log('error', err))
    // }, [isLoading])





    return (
        <div className='section'>
            <nav style={{height: '11%'}} className="box navbar is-fixed-top" role="navigation" aria-label="dropdown navigation">
                <div style={{marginLeft: '5%'}} className="navbar-brand ">
                    <Link onClick={_ => setNavbar(prev => ({...prev, main: true, shop: false, about: false, contacts: false}))} to='/'>
                        <div className="navbar-item ">
                            <img src={logo}/>
                        </div>
                    </Link>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                       data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div style={{marginRight: '5%'}} id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start ">

                        <div className="navbar-item"></div>
                        <div className="navbar-item"></div>
                        <div className="navbar-item"></div>
                        <div className="navbar-item"></div>
                        <div className="navbar-item"></div>

                        <div className="navbar-item">
                            <Link onClick={_ => setNavbar(prev => ({...prev, main: true, shop: false, about: false, contacts: false}))} to='/'>
                                {
                                    searchParams.has("/")
                                        ? <nav className='texthover has-text-weight-medium color-blue'>Главная</nav>
                                        : <nav className={`texthover ${navbar.main && 'has-text-weight-medium color-blue'}`}>Главная</nav>
                                }
                            </Link>
                        </div>

                        <div className="navbar-item"></div>


                        <div className="navbar-item">
                            <Link onClick={_ => setNavbar(prev => ({...prev, shop: true, main: false, about: false, contacts: false}))} to='/shop'>
                                {
                                    searchParams.has("/shop") || searchParams.has("/shop/")
                                        ? <nav className='texthover has-text-weight-medium color-blue'>Магазин</nav>
                                        : <nav className={`texthover ${navbar.shop && 'has-text-weight-medium color-blue'}`}>Магазин</nav>
                                }
                            </Link>
                        </div>

                        <div className="navbar-item"></div>

                        <div className="navbar-item">
                            <Link onClick={_ => setNavbar(prev => ({...prev, about: true, main: false, shop: false, contacts: false}))} to='/about'>
                                {
                                    searchParams.has("/about") || searchParams.has("/about/")
                                        ? <nav className='texthover has-text-weight-medium color-blue'>О бренде</nav>
                                        : <nav className={`texthover ${navbar.about && 'has-text-weight-medium color-blue'}`}>О бренде</nav>
                                }
                            </Link>
                        </div>

                        <div className="navbar-item"></div>

                        <div className="navbar-item ">
                            <Link onClick={_ => setNavbar(prev => ({...prev, contacts: true, main: false, shop: false, about: false}))} to='/contact'>
                                {
                                    searchParams.has("/contact") || searchParams.has("/contact/")
                                        ? <nav className='texthover has-text-weight-medium color-blue'>Контакты</nav>
                                        : <nav className={`texthover ${navbar.contacts && 'has-text-weight-medium color-blue'}`}>Контакты</nav>
                                }
                            </Link>
                        </div>

                        <div className="navbar-item"></div>

                        {user.active === true && user.jwt.length !== 0
                            ?
                            <>
                                {/*<button className='button navbar-item is-danger' onClick={logOut}>*/}
                                {/*    Log out | <nav className='has-text-weight-bold ml-1'>{user.user.username}</nav>*/}
                                {/*</button>*/}

                                <div onClick={_ => logOut()} className="navbar-item " style={{width: '130px'}}>
                                    <nav style={{color: 'red'}} className='texthover has-text-centered'>Log out, <nav
                                        className='has-text-weight-bold ml-1'>{user.user.username}</nav></nav>
                                </div>
                            </>
                            :
                            <div onClick={_ => setActive(!active)} className={`navbar-item has-dropdown ${active && 'is-active'}`}
                                 style={{userSelect: 'none'}}>
                                <div className="navbar-link s">
                                    <nav className='texthover'>Аккаунт</nav>
                                </div>
                                <div className="navbar-dropdown">
                                    <NavLink onClick={_ => setNavbar(prev => ({...prev, main: false, shop: false, about: false, contacts: false}))} to='/sign_in' className="navbar-item">
                                        Login
                                    </NavLink>
                                    <NavLink onClick={_ => setNavbar(prev => ({...prev, main: false, shop: false, about: false, contacts: false}))} to='/sign_up' className="navbar-item">
                                        Register
                                    </NavLink>
                                </div>
                            </div>}
                    </div>


                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="navbar-item ">
                                <div className=' navbar-item zakaz mr-3 mt-1'></div>
                                <Link onClick={_ => setNavbar(prev => ({...prev, main: false, shop: false, about: false, contacts: false}))} to='/contact'>
                                    <nav className='texthover'>+7 (495) 823-54-12</nav>
                                </Link>
                            </div>
                            <Link onClick={_ => setNavbar(prev => ({...prev, main: false, shop: false, about: false, contacts: false}))} to='/cart'>
                                <div className="navbar-item ml-5">
                                    <img src={cart}/>
                                    {bcount !== 0 && ref && user.jwt &&
                                        <button className='basket-count mb-5'>
                                            <nav className='has-text-white has-text-weight-light'>
                                                {bcount && bcount}
                                            </nav>
                                        </button>
                                    }
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;