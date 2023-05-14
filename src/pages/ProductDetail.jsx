import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../App";
import {useNavbarContext} from "../context/navbarContext";
import {toast} from "react-toastify";
import Comment from "./Comment";


function ProductDetail(props) {
    const {user, isLoading, setIsLoading, ref} = useContext(UserContext)
    let [data, setData] = useState(0)
    const {setNavbar} = useNavbarContext()
    const [product, setProduct] = useState(null)
    const [count, setCount] = useState(1)
    const [cart, setCart] = useState(false)
    const {id} = useParams()
    const [text, setText] = useState('')
    const [liked, setLiked] = useState(false)
    const [size, setSize] = useState(null)
    const [color, setColor] = useState(null)


    // function check(data) {
    //     data.attributes.likes.data.forEach(value => {
    //         if (value.attributes.user.data.attributes.username === JSON.parse(localStorage.getItem('user')).username) {
    //             setLiked(true)
    //         }
    //     })
    // }


    useEffect(_ => {
        axios.get(`${process.env.REACT_APP_API_URL}/products/${id}?populate=Thumbnail&populate=basket&populate=category.products&populate=comments.user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        })
            .then(result => {
                setProduct(result.data.data)
                // check(result.data.data)
                console.log('product', result.data.data)
                return result.data.data
            })
    }, [isLoading])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/products?populate=Thumbnail`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        }).then(res => {
            // setData(res.data)
            console.log(res.data)
        })
    }, [])

    async function addToCart(product) {
        const active = JSON.parse(localStorage.getItem('active'))
        if (active) {
            if (color && size) {
                const user = JSON.parse(localStorage.getItem('user'))
                let carts = []
                await axios.get(`${process.env.REACT_APP_API_URL}/users?populate=baskets.product.Thumbnail&filters[id]=${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    }
                }).then(result => {
                    setData(result.data[0].baskets)
                    console.log('data', result)
                    carts = result.data[0].baskets
                    setIsLoading(prev => !prev)
                    // console.log(result.data[0].baskets[0].quantity)
                })
                let check = false

                for (const value of carts) {
                    // console.log('value', value)
                    if (value.product.id === product.id) {
                        await axios.put(`${process.env.REACT_APP_API_URL}/baskets/${value.id}`, {  // передаем в basket всю инфу ниже
                            data: {
                                quantity: value.quantity += count,
                                total_price: product.attributes.Price * (value.quantity + 1),
                                size: size,
                                color: color
                            },
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                            }
                        }).then(res => {
                            toast.success(`Обновление товара в корзине!`, {
                                position: "top-center",
                                autoClose: 1000,
                                hideProgressBar: true
                            })
                            setIsLoading(prev => !prev)
                            setCount(1)
                            setSize(null)
                            setColor(null)
                            // setTimeout(_ => window.location.reload(), 100)
                            check = true
                        })
                        break
                    }
                }

                if (!check) {
                    await axios.post(`${process.env.REACT_APP_API_URL}/baskets/`, {  // передаем в basket всю инфу ниже
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                        },
                        data: {
                            owner: JSON.parse(localStorage.getItem('user')),
                            product: product,
                            quantity: count,
                            size: size,
                            color: color,
                            total_price: product.attributes.Price * count
                        }
                    }).then(res => {
                            toast.success('Товар добавлен в корзину!', {
                                position: "top-center",
                                autoClose: 1000,
                                hideProgressBar: true
                            })
                            setIsLoading(prev => !prev)
                            setCount(1)
                            setSize(null)
                            setColor(null)
                            // setTimeout(_ => window.location.reload(), 100)
                        }
                    )
                }
            } else if (!color && !size) {
                toast.error('Укажите параметры одежды!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true
                })
            } else if (size) {
                toast.error('Выберите цвет одежды!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true
                })
            } else if (color) {
                toast.error('Выберите размер одежды!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true
                })
            }
        } else {
            toast.error('Войдите в аккаунт!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }


    async function createComment(e) {
        e.preventDefault()
        await axios.post(`${process.env.REACT_APP_API_URL}/comments`, {
            data: {
                text: text,
                user: JSON.parse(localStorage.getItem('user')),
                product: product,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => {
            console.log('cr', res.data)
        }).catch(e => console.log(e))
        setIsLoading(prev => !prev)
    }

    //
    // async function like() {
    //     await axios.post('http://localhost:1338/api/likes', {
    //         data: {
    //             user: JSON.parse(localStorage.getItem('user')),
    //             product: product,
    //         },
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    //     }
    //     }).then(res => console.log(res)).catch(error => console.log(error))
    // }

    // async function dislike() {
    //
    // }

    if (product) {
        return (
            <div className='container'>
                <br/><br/><br/><br/>
                <p style={{fontSize: '55px'}} className='has-text-black has-text-weight-normal'>
                    {product.attributes.Title}
                </p>
                <br/>
                <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                    <ul>
                        <li>
                            <Link onClick={_ => setNavbar(prev => ({
                                ...prev,
                                main: true,
                                shop: false,
                                about: false,
                                contacts: false
                            }))} to='/' className='texthover has-text-black has-text-weight-normal title is-5'>Главная</Link>
                        </li>
                        <li>
                            <Link onClick={_ => setNavbar(prev => ({
                                ...prev,
                                main: true,
                                shop: false,
                                about: false,
                                contacts: false
                            }))} to='/shop'
                                  className='texthover has-text-black has-text-weight-normal title is-5'>{product.attributes.category.data.attributes.title}</Link>
                        </li>

                        <li className="is-active ">
                            <a aria-current="page">
                                <nav className='has-text-weight-normal subtitle is-5' style={{color: '#919191'}}>
                                    {product.attributes.Title}
                                </nav>
                            </a>
                        </li>
                    </ul>
                </nav>
                <br/><br/><br/>
                <div className="columns is-multiline">
                    <div className="column">
                        <img style={{width: '536px', height: '729px'}}
                             src={`${process.env.REACT_APP_UPLOAD_URL}${product.attributes.Thumbnail.data[0].attributes.url}`}/>
                    </div>
                    <div className="column is-0"></div>
                    <div className="column is-0"></div>
                    <div className="column">
                        <div style={{position: 'relative', top: '15%'}}>
                            <div className="block">
                                <p style={{color: '#9C9C9C', fontSize: '35px'}}>${product.attributes.Price}</p>
                                <br/>
                            </div>
                            <div className="block">
                                <p style={{color: 'black', fontSize: '20px'}}>Выберите размер</p>
                            </div>

                            <div className="block">
                                <div className="">
                                    <button
                                        className={`${size === 'S' ? 'black-knopka-size-after' : 'black-knopka-size'} mr-3 mt-3`}
                                        onClick={_ => {
                                            setSize('S')
                                            console.log(size)
                                        }}>
                                        <nav>S</nav>
                                    </button>

                                    <button
                                        className={`${size === 'M' ? 'black-knopka-size-after' : 'black-knopka-size'} mr-3 mt-3`}
                                        onClick={_ => {
                                            size === 'M' ? setSize(null) : setSize('M')
                                        }}>
                                        <nav>M</nav>
                                    </button>

                                    <button
                                        className={`${size === 'L' ? 'black-knopka-size-after' : 'black-knopka-size'} mr-3 mt-3`}
                                        onClick={_ => {
                                            size === 'L' ? setSize(null) : setSize('L')
                                        }}>
                                        <nav>L</nav>
                                    </button>

                                    <button
                                        className={`${size === 'XL' ? 'black-knopka-size-after' : 'black-knopka-size'} mr-3 mt-3`}
                                        onClick={_ => {
                                            size === 'XL' ? setSize(null) : setSize('XL')
                                        }}>
                                        <nav>XL</nav>
                                    </button>

                                    <button
                                        className={`${size === 'XXL' ? 'black-knopka-size-after' : 'black-knopka-size'} mr-3 mt-3`}
                                        onClick={_ => {
                                            size === 'XXL' ? setSize(null) : setSize('XXL')
                                        }}>
                                        <nav>XXL</nav>
                                    </button>
                                    <br/><br/>
                                </div>
                            </div>

                            <div className="block">
                                <p style={{color: 'black', fontSize: '20px'}}>Выберите цвет</p>
                            </div>
                            <div className="block">
                                <button
                                    className={`brown ${color === 'Коричневый' ? 'choose-color' : 'choose-color-after'} mr-3 mt-3`}
                                    onClick={_ => {
                                        color === 'Коричневый' ? setColor(null) : setColor('Коричневый')
                                    }}>
                                </button>

                                <button style={{background: '#D5D5D5'}}
                                        className={`${color === 'Серый' ? 'choose-color' : 'choose-color-after'} mr-3 mt-3`}
                                        onClick={_ => {
                                            color === 'Серый' ? setColor(null) : setColor('Серый')
                                        }}>
                                </button>

                                <button style={{background: '#FD9696'}}
                                        className={`${color === 'Розовый' ? 'choose-color' : 'choose-color-after'} mr-3 mt-3`}
                                        onClick={_ => {
                                            color === 'Розовый' ? setColor(null) : setColor('Розовый')
                                        }}>
                                </button>

                                <button style={{background: '#FDC796'}}
                                        className={`${color === 'Бежевый' ? 'choose-color' : 'choose-color-after'} mr-3 mt-3`}
                                        onClick={_ => {
                                            color === 'Бежевый' ? setColor(null) : setColor('Бежевый')
                                        }}>
                                </button>
                                <br/>
                            </div>
                            <div className="block">
                                <br/>
                                <div>
                                    <div className="buttons">
                                        <button className='quantity-button mr-3'>
                                            <li className='list-none'>
                                                <ul onClick={() => {
                                                    setCart(true)
                                                    setCount(prevState => prevState + 1)
                                                }
                                                }>
                                                    <p
                                                        style={{
                                                            border: 'none',
                                                            background: 'none',
                                                            fontSize: '15px',
                                                            color: '#509498',
                                                            cursor: 'pointer'
                                                        }}
                                                        className='p-0 m-0 has-text-weight-bold'>
                                                        +
                                                    </p>
                                                </ul>

                                                <ul>
                                                    <p style={{color: '#abb8c3'}} className='subtitle is-5'>
                                                        {count}
                                                    </p>
                                                </ul>


                                                <ul onClick={() => {
                                                    setIsLoading(prev => !prev)
                                                    setCount(prevState => prevState > 1 ? prevState - 1 : prevState)
                                                }}>
                                                    <p
                                                        style={{
                                                            border: 'none',
                                                            background: 'none',
                                                            fontSize: '15px',
                                                            color: '#509498',
                                                            cursor: `${count !== 1 ? 'pointer' : 'default'}`
                                                        }}
                                                        className='p-0 m-0 has-text-weight-bold'>
                                                        –
                                                    </p>
                                                </ul>
                                            </li>
                                        </button>

                                        <button onClick={_ => {
                                            addToCart(product)
                                        }} style={{width: '260px'}} className='knopka'>
                                            <nav style={{width: '163px', height: '24px'}}>
                                                Добавить в корзину
                                            </nav>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br/><br/><br/><br/>

                <div className="container">
                    {user.jwt && ref &&
                        <form onSubmit={createComment}>
                            <textarea onInput={e => setText(e.target.value)} required={true} className='textarea t-area'
                              placeholder='Составьте отзыв' rows="5"></textarea>
                            <button className='button is-info is-fullwidth'>Создать отзыв</button>
                        </form>
                    }
                    <br/>
                    <p style={{fontSize: '45px'}} className='has-text-black has-text-weight-normal'>Отзывы:</p>
                    <br/>
                    {product.attributes.comments.data.length !== 0 ? product.attributes.comments.data.map(value =>
                            <Comment value={value} text={text} setText={setText} key={value.id}/>
                        )
                        :  <><br/><br/><p className='title is-4 has-text-centered'>Нет отзывов.</p></>
                    }
                    <br/><br/><br/><br/>


                </div>
            </div>
        )
    }

    return (
        <h1 className='title has-text-centered'>Loading...</h1>
    )
}

export default ProductDetail;