import React from 'react';
import {Link} from "react-router-dom";
import {useNavbarContext} from "../context/navbarContext";

function CheckoutSuccess(props) {
    const {setNavbar} = useNavbarContext()

    return (
        <div className='container'>
            <br/><br/><br/><br/>
            <p style={{fontSize: '55px'}} className='has-text-black has-text-weight-normal'>
                Заказ получен
            </p>
            <br/>
            <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <Link onClick={_ => setNavbar(prev => ({...prev, main: true, shop: false, about: false, contacts: false}))} to='/' className='texthover has-text-black has-text-weight-normal title is-5'>Главная</Link>
                    </li>
                    <li>
                        <Link onClick={_ => setNavbar(prev => ({...prev, main: true, shop: false, about: false, contacts: false}))} to='/cart' className='texthover has-text-black has-text-weight-normal title is-5'>Оформление заказа</Link>
                    </li>

                    <li className="is-active ">
                        <a aria-current="page">
                            <nav className='has-text-weight-normal subtitle is-5' style={{color: '#919191'}}>
                                Заказ получен
                            </nav>
                        </a>
                    </li>
                </ul>
            </nav>
            <br/><br/><br/><br/><br/><br/><br/><br/>

            <div className="columns">
                <div className="column is-9">
                    <div className="columns">
                        <div style={{width: '110px'}} className="column is-2">
                            <img src="http://womazing.s-host.net/wp-content/themes/womazing/img/icon-success.svg" alt=""/>
                        </div>
                        <div className="column">
                            <p className='has-text-black  mb-4' style={{fontSize: '25px'}}>Заказ успешно оформлен</p>
                            <p className='has-text-black' style={{fontSize: '17px'}}>Мы свяжемся с вами в ближайшее время!</p>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <Link to='/'>
                        <button style={{width: '260px', whiteSpace: 'nowrap'}} className='knopka-2'>
                            <nav>
                                Перейти на главную
                            </nav>
                        </button>
                    </Link>
                </div>
            </div>
            <br/><br/><br/><br/>
        </div>
    );
}

export default CheckoutSuccess;