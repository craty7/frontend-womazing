import React from 'react';
import telep from "../../assets/svg/tel.svg";
import {Link, NavLink} from "react-router-dom";
import {useNavbarContext} from "../../context/navbarContext";

function Footer(props) {
    const {setNavbar} = useNavbarContext()

    return (
        <div className='m-0 p-0'>
            <div style={{backgroundColor: '#F1EADC'}} className='section'>
                <div className="container">
                    <br/>
                    <nav style={{backgroundColor: '#F1EADC', height: '130px'}} className="navbar" role="navigation" aria-label="main navigation">
                        <div className="navbar-brand">
                            <NavLink onClick={_ => setNavbar(prev => ({...prev, main: true, shop: false, about: false, contacts: false}))} to='/' className="navbar-item" >
                                <img src="http://womazing.s-host.net/wp-content/uploads/2021/02/logo.svg" width="139" height="25"/>
                            </NavLink>
                        </div>

                        <div className="navbar-start ">

                            <div className="navbar-item"></div>
                            <div className="navbar-item"></div>
                            <div className="navbar-item"></div>
                            <div className="navbar-item"></div>
                            <div className="navbar-item"></div>

                            <div className="navbar-item">
                                <Link onClick={_ => setNavbar(prev => ({...prev, main: true, about: false, shop: false, contacts: false}))} to='/'>
                                    <nav className='texthover'>Главная</nav>
                                </Link>
                            </div>

                            <div className="navbar-item"></div>

                            <div  className="navbar-item">
                                <Link onClick={_ => setNavbar(prev => ({...prev, shop: true, main: false, about: false, contacts: false}))} to='/shop'>
                                    <nav className='texthover'>Магазин</nav>
                                </Link>
                            </div>

                            <div className="navbar-item"></div>

                            <div className="navbar-item">
                                <Link onClick={_ => setNavbar(prev => ({...prev, about: true, main: false, shop: false, contacts: false}))} to='/about'>
                                    <nav className='texthover'>О бренде</nav>
                                </Link>
                            </div>

                            <div className="navbar-item"></div>

                            <div className="navbar-item">
                                <Link onClick={_ => setNavbar(prev => ({...prev, contacts: true, main: false, shop: false, about: false}))} to='/contacts'>
                                    <nav className='texthover'>Контакты</nav>
                                </Link>
                            </div>
                        </div>

                        <div style={{marginTop: '10%'}} className="navbar-end">
                            <div className="navbar-item">
                                <li className='mt-5 list-none'>
                                    <Link to='/contact'>
                                        <ul className='texthover has-text-right mb-2'>+7 (495) 823-54-12</ul>
                                    </Link>
                                    <a href="https://mail.google.com/mail/">
                                        <ul className='texthover'><nav className=''>hello@womazing.com</nav>
                                        </ul>
                                    </a>
                                    <br/>
                                    <ul className='has-text-right'>
                                        <a href='https://www.instagram.com'>
                                            <img className='mr-3' src="http://womazing.s-host.net/wp-content/uploads/2021/02/instagram.svg" alt=""/>
                                        </a>
                                        <a href='https://facebook.com'>
                                            <img className='mr-3' src="http://womazing.s-host.net/wp-content/uploads/2021/02/facebook.svg" alt=""/>
                                        </a>
                                        <a href='https://twiter.com'>
                                            <img className='mr-0' src="http://womazing.s-host.net/wp-content/uploads/2021/02/twitter.svg" alt=""/>
                                        </a>
                                    </ul>
                                    <br/>
                                    <ul className='has-text-right'>
                                        <img className='mr-0' src="http://womazing.s-host.net/wp-content/uploads/2021/02/visa-mastercard.svg" alt=""/>
                                    </ul>
                                </li>

                            </div>
                        </div>
                    </nav>

                    <div className="columns">
                        <div className="column is-3 ml-3 mt-4" style={{fontSize: '13px'}} >
                            <ul className='has-text-black mb-1'>© Все права защищены</ul>

                            <Link onClick={_ => setNavbar(prev => ({...prev, main: false, shop: false, about: false, contacts: false}))} to='/privacy-policy'>
                                <ul className='texthover mb-1'>Политика конфиденциальности</ul>
                            </Link>

                            <Link onClick={_ => setNavbar(prev => ({...prev, main: false, shop: false, about: false, contacts: false}))} to='/publichnaya-oferta'>
                                <ul className='texthover'>Публичная оферта</ul>
                            </Link>

                        </div>

                        <div className="column is-6 ml-6">
                            <div style={{fontSize: '13px'}} className="column ml-3">
                                <Link to='/shop'>
                                    <ul className='texthover mb-2'>Пальто</ul>
                                </Link>
                                <Link to='/shop'>
                                    <ul className='texthover mb-2'>Свитшоты</ul>
                                </Link>
                                <Link to='/shop'>
                                    <ul className='texthover mb-2'>Кардиганы</ul>
                                </Link>
                                <Link to='/shop'>
                                    <ul className='texthover'>Толстовки</ul>
                                </Link>
                            </div>
                        </div>
                        <div className="column is-0"></div>
                        <div className="column is-0"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;