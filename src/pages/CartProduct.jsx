import React, {useContext, useEffect, useState} from 'react';
import deleteVector from '../assets/svg/delete.svg'
import 'bulma/css/bulma.css'
import {Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {UserContext} from "../App";



function CartProduct(props) {
    const [count, setCount] = useState(props.product.quantity)
    const [data, setData] = useState(null)
    const [cart, setCart] = useState(false)
    const {setIsLoading} = useContext(UserContext)

    // console.log('p', props.product)
    async function deleteBasket(product) {
        await axios.delete(`${process.env.REACT_APP_API_URL}/baskets/${product.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => {
            console.log(res)
            toast.error('Товар успешно удалён.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true
            })
            setIsLoading(prev => !prev)
            // window.location.reload()
            }
        ).catch(e => console.log(e))
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/baskets/${props.product.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        }).then(res => {
            // console.log('q', res)
        })
    }, [])

    function plusQuantity() {
        axios.put(`${process.env.REACT_APP_API_URL}/baskets/${props.product.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            data: {
                quantity: props.product.quantity += 1,
                total_price: props.product.product.Price * (props.product.quantity)
            }
        }).then(res => console.log('res', res)).catch(err => console.log(err))
        setIsLoading(prev => !prev)
    }

    function minusQuantity() {
        axios.put(`${process.env.REACT_APP_API_URL}/baskets/${props.product.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            data: {
                quantity: props.product.quantity -= 1,
                total_price: props.product.product.Price * (props.product.quantity)
            }
        }).then(res => console.log(res)).catch(err => console.log(err))
        setIsLoading(prev => !prev)
    }

    return (
        <>
            <br/>
            <div className="columns">
                <div className="column is-12">
                    <div className="columns">
                        <div className="column is-1 mr-5">
                            <div onClick={_ => deleteBasket(props.product)} style={{position: 'relative', top: '50%', cursor: 'pointer'}} className='delete-button'>
                                <img src={deleteVector} alt=""/>
                            </div>
                        </div>
                        <div className="column is-4" style={{ width: '147px', height: '189px' }}>
                            <Link to={`/product/${props.product.product.id}`}>
                                <figure className='image has-text-left ml-0'>
                                    {props.product.product.Thumbnail.map(
                                        value => <img style={{ width: '147px', height: '189px' }} src={`${process.env.REACT_APP_UPLOAD_URL}${value.url}`} />
                                    ) }
                                </figure>
                            </Link>
                        </div>
                        <div className="column has-text-left is-7">
                            <p style={{position: 'relative', top: '50%'}} className='has-text-weight-normal title is-6 has-text-black'>
                                {props.product.product.Title} - {props.product.size}, {props.product.color}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-10">
                        <p className='has-text-weight-normal has-text-left title is-5 has-text-black' style={{position: 'relative', top: '50%', marginLeft: '7%'}}>
                            ${props.product.product.Price}
                        </p>
                    </div>
                    <div className="column is-12 has-text-left">
                        <p className='ml-3' style={{position: 'relative', top: '37%'}}>
                            <div style={{position: 'relative'}} className="buttons ">
                                <button style={{width: '68px', height: '68px'}} className='quantity-button '>
                                    <li  className='list-none m-0'>
                                        <block onClick={ () => {
                                            setCart(true)
                                            setCount(prevState => prevState + 1)
                                        }}>
                                            <p onClick={_ => plusQuantity()}
                                                style={{border: 'none', background: 'none', fontSize: '15px', color: '#509498', cursor: 'pointer' }}
                                                className=' has-text-weight-bold'>
                                                +
                                            </p>
                                        </block>

                                        <block className='is-inline-block'>
                                            <p style={{color: '#abb8c3'}} className='subtitle is-5'>
                                                {count}
                                            </p>
                                        </block>

                                        <block onClick={ () =>
                                            setCount( prevState => prevState > 1 ? prevState - 1 : prevState)}>

                                            {count > 1
                                            ? <p onClick={_ => {minusQuantity()}}
                                                 style={{border: 'none', background: 'none',fontSize: '15px', color: '#509498', cursor: 'pointer'}}
                                                 className=' has-text-weight-bold'>
                                                    –
                                                </p>
                                            : <p
                                                 style={{border: 'none', background: 'none',fontSize: '15px', color: '#509498', cursor: 'pointer'}}
                                                 className=' has-text-weight-bold'>
                                                    –
                                                </p>
                                            }
                                        </block>
                                    </li>
                                </button>
                            </div>
                        </p>
                    </div>
                    <div className="column is-3"></div>
                    <div className="column is-12">
                        <p className='has-text-weight-normal title is-5 has-text-black ml-1' style={{position: 'relative', top: '50%'}}>
                            ${count > 0 ? count * props.product.product.Price : props.product.total_price}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartProduct;