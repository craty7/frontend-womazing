import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import CartProduct from "./CartProduct";
import {UserContext} from "../App";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import {useNavbarContext} from "../context/navbarContext";

function Checkout(props) {
    const [data, setData] = useState(null)
    const [dat, setDat] = useState(null)
    const navigate = useNavigate()
    const {setNavbar} = useNavbarContext()
    const [totalp, setTotalp] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [info, setInfo] = useState({
        name: '',
        email: '',
        telephone: '',
        country: '',
        city: '',
        street: '',
        house: '',
        flat: '',
        comments: ''
    })
    let title = ''


    useEffect(_ => {
        const user = JSON.parse(localStorage.getItem('user'))
        axios.get(`${process.env.REACT_APP_API_URL}/users?populate=baskets.product.Thumbnail&filters[id]=${user.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        })
            .then(result => {
                setData(result.data[0].baskets)
                setDat(result.data[0].baskets[0].product.Title)

                setIsLoading(false)
                console.log('check-data', result.data[0].baskets)
            }).catch(e => console.log(e))
    }, [])

    console.log('d', data)

    async function createCheckout(e) {
        e.preventDefault()
        let check = false
        // e.preventDefault()
        await axios.post(`${process.env.REACT_APP_API_URL}/checkouts`, {
            data: {
                ...info,
                user: JSON.parse(localStorage.getItem('user')),
                products: data
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        }).then(res => {
            toast.success('Ваши товары успешно оформлены!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true
            })
            setInfo({
                ...info,
                name: '',
                email: '',
                telephone: '',
                country: '',
                city: '',
                street: '',
                house: '',
                flat: '',
                comments: ''
            })
            navigate('/checkout/thanks')
            check = true
            console.log('check-res', res)
        }).catch(_ => {
            // toast.error('Заполните все поля!', {
            //     position: "top-center",
            //     autoClose: 1000,
            //     hideProgressBar: true
            // })
        })
        if (check) {
            for (const item of data) {
                await axios.delete(`${process.env.REACT_APP_API_URL}/baskets/${item.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    }
                })
            }
        }
    }


    useEffect(_ => {
        const user = JSON.parse(localStorage.getItem('user'))
        axios.get(`${process.env.REACT_APP_API_URL}/users?populate=baskets.product.Thumbnail&filters[id]=${user.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        })
            .then(result => {
                let total = 0
                for (let i of result.data[0].baskets) {
                    total += i.total_price
                }
                setTotalp(total)
            })
    }, [])

    return (
        <div className='container'>
            <br/><br/><br/><br/>
            <p style={{fontSize: '55px'}} className='has-text-black has-text-weight-normal'>
                Оформление заказа
            </p>
            <br/>
            <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <Link to='/'
                              onClick={_ => setNavbar(prev => ({
                                  ...prev,
                                  main: true,
                                  shop: false,
                                  about: false,
                                  contacts: false
                              }))}
                              className='texthover has-text-black has-text-weight-normal title is-5'>
                            Главная
                        </Link>
                    </li>
                    <li className="is-active">
                        <a aria-current="page">
                            <nav className='has-text-weight-normal subtitle is-5' style={{color: '#919191'}}>Оформление заказа
                            </nav>
                        </a>
                    </li>
                </ul>
            </nav>
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <form onSubmit={createCheckout}>
                <div className="columns" style={{marginLeft: '3%', marginRight: '3%'}}>
                    <div className="column is-7">
                        <div className="block has-text-black has-text-weight-normal">
                            <nav style={{fontSize: '25px'}}>
                                Данные покупателя
                            </nav>
                        </div>

                        <div className="block">
                            <input
                                placeholder='Имя'
                                className='shop-input'
                                type="text"
                                required={true}
                                value={info.name}
                                onInput={i => setInfo({
                                    ...info,
                                    name: i.target.value
                                })}
                            />
                        </div>

                        <div className="block">
                            <input
                                placeholder='E-mail'
                                className='shop-input'
                                type="email"
                                required={true}
                                value={info.email}
                                onInput={i => setInfo({
                                    ...info,
                                    email: i.target.value
                                })}
                            />
                        </div>

                        <div className="block">
                            <input
                                placeholder='Телефон'
                                className='shop-input'
                                type="text"
                                required={true}
                                value={info.telephone}
                                onInput={i => setInfo({
                                    ...info,
                                    telephone: i.target.value
                                })}
                            />
                        </div>

                        <br/><br/>

                        <div className="block has-text-black has-text-weight-normal">
                            <nav style={{fontSize: '25px'}}>
                                Адрес получателя
                            </nav>
                        </div>

                        <div className="block">
                            <input
                                placeholder='Страна'
                                className='shop-input'
                                type="text"
                                required={true}
                                value={info.country}
                                onInput={i => setInfo({
                                    ...info,
                                    country: i.target.value
                                })}
                            />
                        </div>

                        <div className="block">
                            <input
                                placeholder='Город'
                                className='shop-input'
                                type="text"
                                required={true}
                                value={info.city}
                                onInput={i => setInfo({
                                    ...info,
                                    city: i.target.value
                                })}
                            />
                        </div>

                        <div className="block">
                            <input
                                placeholder='Улица'
                                className='shop-input'
                                type="text"
                                required={true}
                                value={info.street}
                                onInput={i => setInfo({
                                    ...info,
                                    street: i.target.value
                                })}
                            />
                        </div>

                        <div className="block">
                            <input placeholder='Дом'
                                   className='shop-input'
                                   type="text"
                                   required={true}
                                   value={info.house}
                                   onInput={i => setInfo({
                                       ...info,
                                       house: i.target.value
                                   })}
                            />
                        </div>

                        <div className="block">
                            <input
                                placeholder='Квартира'
                                className='shop-input'
                                type="text"
                                required={true}
                                value={info.flat}
                                onInput={i => setInfo({
                                    ...info,
                                    flat: i.target.value
                                })}
                            />
                        </div>

                        <br/><br/>

                        <div className="block has-text-black has-text-weight-normal">
                            <nav style={{fontSize: '25px'}}>
                                Комментарии
                            </nav>
                        </div>

                        <div className="block">
                            <input
                                style={{height: '114px'}}
                                placeholder='Дополнительная информация'
                                className='shop-input'
                                type="text"
                                required={false}
                                value={info.comments}
                                onInput={i => setInfo({
                                    ...info,
                                    comments: i.target.value
                                })}
                            />
                        </div>

                    </div>
                    <div className="column is-3">
                        <div className="block has-text-black has-text-weight-normal">
                            <nav style={{fontSize: '25px'}}>
                                Ваш заказ
                            </nav>
                        </div>
                        <br/>
                        <div className="block title is-5 has-text-black has-text-weight-normal">
                            <div className="columns">
                                {data && data.length >= 2
                                    ? <div className="column">Товары</div>
                                    : <div className="column is-11">Товар</div>
                                }
                                {/*<div className="column has-text-">Всего</div>*/}
                            </div>
                        </div>

                        <div className="block title is-5 has-text-black has-text-weight-normal">
                            <div className="columns">
                                {data && data &&
                                    <div className="column is-11">
                                        <p style={{lineHeight: '137%'}}>
                                            {data && data.length !== 1
                                                ?
                                                `${data[0].product.Title} (x${data[0].quantity}), ${data && data[1].product.Title} (x${data[1].quantity}) и др.`
                                                :
                                                `${data && data[0].product.Title} (x${data[0].quantity})`}
                                        </p>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="block title is-5 has-text-black has-text-weight-normal">
                            <div className="columns">
                                <div style={{
                                    background: '#F1EADC',
                                    width: '245px',
                                    height: '57px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <div className='has-text-black' style={{marginLeft: '6%', fontSize: '20px'}}>Итого:</div>
                                    <div className='has-text-black' style={{marginLeft: '40%', fontSize: '20px'}}>
                                        ${totalp}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br/><br/><br/><br/>

                        <div className="block has-text-black has-text-weight-normal">
                            <nav style={{fontSize: '25px'}}>
                                Способы оплаты
                            </nav>
                        </div>

                        <div className="block">
                            <div className="columns">
                                <div className="column is-1">
                                    <div className="checkbox-wrapper" style={{marginTop: '0.1rem'}}>
                                        <label htmlFor="modern-checkbox"></label>
                                        <input type="checkbox" id="modern-checkbox"/>
                                        <span></span>
                                    </div>
                                </div>
                                <div className="column ml-2 has-text-black">
                                    Оплата наличными
                                </div>
                            </div>
                            <br/>
                            <div className="block">
                                <button type={"submit"} style={{width: '240px'}} className='knopka'>
                                    <nav>Разместить заказ</nav>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </form>

            <br/><br/><br/><br/>
        </div>
    );
}

export default Checkout;