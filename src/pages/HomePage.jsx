import React, {useEffect, useState, useTransition} from 'react';
// import {Slider} from "infinite-react-carousel"
import axios from "axios";
import {Link} from "react-router-dom";
import '../assets/script'
import {useNavbarContext} from "../context/navbarContext";
import Product from "./Product";
import {Splide, SplideTrack, SplideSlide} from "@splidejs/react-splide";

function HomePage(props) {
    const [data, setData] = useState(null)
    const {setNavbar} = useNavbarContext()

    // useEffect(() => {
    //     axios.get('http://localhost:1338/api/products?populate=Thumbnail', {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    //         }
    //     }).then(res => {
    //         setData(res.data)
    //         console.log(res.data)
    //     })
    // }, [])


    useEffect(_ => {
        axios.get(`${process.env.REACT_APP_API_URL}/categories?populate=products.Thumbnail`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        }).then(
            res => setData(res.data.data)
        ).catch(e => console.log(e))
    }, [])


    return (
        <div className='section'>
            <div className="columns mb-6">
                <div className="column is-1">
                </div>
                <div className="column is-5 mt-6">
                    <br/><br/><br/><br/>
                    <p style={{fontSize: '53px', width: '585px'}} className='title'>Новые поступления<br/> в этом сезоне</p>
                    <br/>
                    <div style={{width: '385px'}}>
                        <p className='subtitle is-5'>
                            Утонченные сочетания и бархатные оттенки - вот то, что вы искали в этом сезоне. Время исследовать.
                        </p>
                    </div>
                    <br/>
                    <div className="buttons">
                        <a href='#products' className='square-button'></a>
                        <Link to='/shop'>
                            <button onClick={_ => setNavbar(prev => ({
                                ...prev,
                                shop: true,
                                main: false,
                                about: false,
                                contacts: false
                            }))} className='knopka'>
                                <nav>Открыть магазин</nav>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="column is-6 has-text-right mr-3">
                    <img src="http://womazing.s-host.net/wp-content/uploads/2021/04/main-photo.jpg" alt=""/>
                </div>
            </div>

            <div>
                <p id='products' className='title is-1 ml-5 has-text-weight-normal has-text-black'>Новая коллекция</p>
                <br/>

                <div className='my-6 columns is-multiline m-auto'>
                    {data && data[4].attributes.products.data.map(value =>
                        <Product key={value.id} value={value}/>
                    )}
                </div>
                <br/><br/>
                <Link to='/shop'>
                    <div className="has-text-centered">
                        <button
                            onClick={_ => setNavbar(prev => ({...prev, shop: true, main: false, about: false, contacts: false}))}
                            className='knopka-2'>
                            <nav>Открыть магазин</nav>
                        </button>
                    </div>
                </Link>
            </div>
            <br/><br/><br/><br/><br/>

            <div>
                <p className='title is-1 ml-5 has-text-weight-normal has-text-black'>Что для нас важно</p>
                <br/><br/><br/>
                <div className="columns">
                    <div className="column is-0"></div>
                    <div className='column is-4'>
                        <li className='list-none'>
                            <ul>
                                <img src="http://womazing.s-host.net/wp-content/uploads/2021/03/icon1.svg" alt=""/>
                            </ul>
                            <br/>
                            <ul>
                                <p className='title is-3 has-text-weight-normal has-text-black'>Качество</p>
                            </ul>
                            <br/>
                            <ul>
                                <p style={{lineHeight: '24px'}} className='title is-5 has-text-weight-normal has-text-black'>Наши
                                    профессионалы работают на лучшем оборудовании для пошива одежды
                                    беспрецедентного <br/> качества</p>
                            </ul>
                        </li>
                    </div>

                    <div className='column'>
                        <li className='list-none'>
                            <ul>
                                <img src="http://womazing.s-host.net/wp-content/uploads/2021/03/icon2.svg" alt=""/>
                            </ul>
                            <br/>
                            <ul>
                                <p className='title is-3 has-text-weight-normal has-text-black'>Скорость</p>
                            </ul>
                            <br/>
                            <ul>
                                <p style={{lineHeight: '24px'}}
                                   className='title is-5 has-text-weight-normal has-text-black'>Благодаря отлаженной системе в
                                    Womazing мы можем отшивать до 20-ти единиц продукции в наших собственных цехах</p>
                            </ul>
                        </li>
                    </div>

                    <div className='column'>
                        <li className='list-none'>
                            <ul>
                                <img src="http://womazing.s-host.net/wp-content/uploads/2021/03/icon3.svg" alt=""/>
                            </ul>
                            <br/>
                            <ul>
                                <p className='title is-3 has-text-weight-normal has-text-black'>Ответственность</p>
                            </ul>
                            <br/>
                            <ul>
                                <p style={{lineHeight: '24px'}} className='title is-5 has-text-weight-normal has-text-black'>Мы
                                    заботимся о людях и планете. Безотходное производство и комфортные условия труда - все это
                                    Womazing
                                </p>
                            </ul>
                        </li>
                    </div>
                </div>
            </div>
            <br/><br/><br/><br/><br/><br/>

            <div>
                <p className='title is-1 has-text-weight-normal has-text-black'>Команда мечты Womazing</p>
                <br/><br/><br/>
                <div className="columns is-multiline">
                    <div className="column is-8 has-text-centered" >
                        {/*<Slider className='sliderContainer' pauseOnHover={false} autoplay={true} autoplaySpeed={3500}*/}
                        {/*        slidesToShow={1} dots={true} appendDots={(dots) => <ul style={{*/}
                        {/*    display: 'block'*/}
                        {/*}}>*/}
                        {/*    {dots}*/}
                        {/*</ul>}>*/}
                        {/*    <img src='http://womazing.s-host.net/wp-content/uploads/2021/04/slider1.jpg'/>*/}
                        {/*    <img src='http://womazing.s-host.net/wp-content/uploads/2021/04/slider2.jpg'/>*/}
                        {/*    <img src='http://womazing.s-host.net/wp-content/uploads/2021/04/slider3.jpg'/>*/}
                        {/*</Slider>*/}

                        <Splide hasTrack={false} id='spl' aria-label="My Favorite Images" options={{
                            rewind: true,
                            autoplay: false,
                            interval: 3500,
                            type: 'fade',
                            gap: '1rem',
                            speed: 700,
                            padding: '70px',
                        }}>
                            <SplideTrack >
                                <SplideSlide>
                                    <img src="http://womazing.s-host.net/wp-content/uploads/2021/04/slider1.jpg" alt="Image 1"/>
                                </SplideSlide>
                                <SplideSlide>
                                    <img src="http://womazing.s-host.net/wp-content/uploads/2021/04/slider2.jpg" alt="Image 2"/>
                                </SplideSlide>
                                <SplideSlide>
                                    <img src="http://womazing.s-host.net/wp-content/uploads/2021/04/slider3.jpg" alt="Image 3"/>
                                </SplideSlide>
                            </SplideTrack>

                            <div className="splide__arrows">
                                <button className="splide__arrow splide__arrow--prev"></button>
                                <button className="splide__arrow splide__arrow--next"></button>
                            </div>

                            <ul className="splide__pagination splide__pagination--ltr" role="tablist"
                                aria-label="Select a slide to show">
                                <li role="presentation">
                                    <button
                                        className="splide__pagination__page is-active"
                                        type="button"
                                        role="tab"
                                        aria-controls="splide01-slide01"
                                        aria-label="Go to slide 1"
                                        aria-selected="true">
                                    </button>
                                </li>
                                <li role="presentation">
                                    <button
                                        className="splide__pagination__page"
                                        type="button"
                                        role="tab"
                                        aria-controls="splide01-slide02"
                                        aria-label="Go to slide 2"
                                        tabIndex="-1"
                                        style={{ backgroundColor: 'black' }}
                                    >
                                    </button>
                                </li>
                            </ul>

                        </Splide>
                    </div>
                    <div className="column is-0"></div>
                    <div className="column is-3">
                        <div className='mt-6'>
                            <br/>
                            <p className='title is-3 has-text-weight-normal has-text-black'>Качество</p>

                            <p className='mb-4' style={{lineHeight: '24px'}}
                               className='title is-5 has-text-weight-light has-text-black'>Каждая девушка уникальна. Однако, мы
                                схожи в миллионе мелочей.</p>

                            <p style={{lineHeight: '24px'}} className='title is-5 has-text-weight-light has-text-black'>Womazing
                                ищет эти мелочи и создает прекрасные вещи, которые выгодно подчеркивают достоинства каждой
                                девушки.</p>

                            <Link onClick={_ => setNavbar(prev => ({
                                ...prev,
                                about: true,
                                main: false,
                                shop: false,
                                contacts: false
                            }))} to='/about'>
                                <p style={{lineHeight: '24px', color: '#6E9C9F'}}
                                   className='title is-5 has-text-weight-normal texthover'>Подробнее о бренде</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default HomePage;