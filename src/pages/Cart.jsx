import React, {useContext} from 'react';
import 'bulma/css/bulma.css'
import {useState, useEffect} from "react";
import CartProduct from "./CartProduct";
import axios from "axios";
import {UserContext} from "../App";
import {Link} from "react-router-dom";
import {useNavbarContext} from "../context/navbarContext";


function Cart() {
    const [data, setData] = useState(null)
    const [isLoadings, setIsLoadings] = useState(true)
    const [totalp, setTotalp] = useState(0)
    const {user, isLoading, ref} = useContext(UserContext)
    const {setNavbar} = useNavbarContext()
    const active = JSON.parse(localStorage.getItem('active'))


    useEffect(_ => {
        const user = JSON.parse(localStorage.getItem('user'))
        axios.get(`${process.env.REACT_APP_API_URL}/users?populate=baskets.product.Thumbnail&filters[id]=${user.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        })
            .then(result => {
                setData(result.data[0].baskets)
                setIsLoadings(false)
                console.log('get data', result)
                let total = 0
                for (let i of result.data[0].baskets) {
                    total += i.total_price
                }
                setTotalp(total)

            }).catch(err => console.log('error', err))
    }, [isLoading])

    console.log('tot', totalp)


    // function total_price() {
    //     let total = 0
    //     for (let value of data) {
    //         total += value.total_price
    //     }
    //     return total
    // }
    //
    // total_price()
    console.log('dat', data)


    return (
        <div className='container'>
            <br/><br/><br/><br/>
            <p style={{fontSize: '55px'}} className='has-text-black has-text-weight-normal'>Корзина</p>
            <br/>
            <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                <ul>
                    <li><Link onClick={_ => setNavbar(prev => ({...prev, main: true, shop: false, about: false, contacts: false}))} to='/' className='texthover has-text-black has-text-weight-normal title is-5'>Главная</Link></li>
                    <li className="is-active "><a aria-current="page"><nav className='has-text-weight-normal subtitle is-5' style={{color: '#919191'}}>Корзина</nav></a></li>
                </ul>
            </nav>
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <div className="">
                <div className="content">
                    <table className="table has-text-centered">
                        <thead>
                        <tr className=''>
                            <th style={{width: '500px'}} className='has-text-left title is-4'>
                                <nav className='mb-3'>Товар</nav></th>
                            <th className='has-text-left title is-4'>Цена</th>
                            <th className='title is-4 has-text-left'>Количество</th>
                            <th className='title is-4 has-text-left'>Всего</th>
                        </tr>

                        </thead>

                        {data && active ? data.map((value) => <CartProduct key={value.id} product={value}/>)
                        : <p className="title is-3 has-text-left ml-3"><br/>Корзина пуста.</p>
                        }
<br/>
                    </table>
                    <br/>


                    <div className='has-text-right'>
                        <button onClick={_ => window.location.reload()} style={{width: '260px'}} className='knopka-2'>
                            <nav style={{width: '151px'}} >Обновить корзину</nav>
                        </button>
                    </div>
                    <br/><br/>

                    <div className="columns">
                        <div className="column"></div>
                        <div className="column is-3">
                            <div style={{background: '#F1EADC', width: '287px', height: '68px', display: 'flex', alignItems: 'center', }}>
                                <div className='has-text-black' style={{marginLeft: '11%', fontSize: '24px'}}>Итого: </div>
                                <div className='has-text-black' style={{marginLeft: '33%', fontSize: '24px'}}>${ref && user.jwt ? totalp : 0}</div>
                            </div>
                        </div>
                        <div className="column is-3 has-text-right ">
                            {user.active && data && data.length !== 0
                                ? <Link to='/checkout'>
                                    <button style={{width: '260px'}} className='knopka'>
                                        <nav className='has-text-weight-light' style={{width: '151px'}}>
                                            Оформить заказ
                                        </nav>
                                    </button>
                                </Link>
                                : <button style={{width: '260px'}} className='knopka'>
                                    <nav className='has-text-weight-light' style={{width: '151px'}}>
                                        Оформить заказ
                                    </nav>
                                </button>
                            }
                        </div>
                    </div>
                    {/*{data && data.length !== 0 && <Link to='/checkout' className='button is-success is-fullwidth'>*/}
                    {/*    Checkout*/}
                    {/*</Link> }*/}

                </div>
            </div>
            <br/><br/><br/><br/><br/>
        </div>
    );
}
export default Cart;