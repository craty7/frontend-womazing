import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useNavbarContext} from "../context/navbarContext";
import axios from "axios";
import Product from "./Product";
import svitshoti from "../components/Category/Svitshoti";

function Shop(props) {
    const {setNavbar} = useNavbarContext()
    const [all, setAll] = useState(true)
    const [palto, setPalto] = useState(false)
    const [switshot, setSwitshot] = useState(false)
    const [kardigan, setKardigan] = useState(false)
    const [tolst, setTolst] = useState(false)

    const [data, setData] = useState(null)
    const [data2, setData2] = useState(null)

    useEffect(_ => {
        axios.get(`${process.env.REACT_APP_API_URL}/categories?populate=products&populate=products.Thumbnail`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(
            res => {
                setData(res.data.data)
                console.log(res.data.data)
            }
        ).catch(e => console.log(e))

    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/products?populate=Thumbnail`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        }).then(res => {
            setData2(res.data)
            // console.log(res.data)
        })
    }, [])

    function getNoun(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return five;
        }
        n %= 10;
        if (n === 1) {
            return one;
        }
        if (n >= 2 && n <= 4) {
            return two;
        }
        return five;
    }
    // alert(`4 ${getNoun(4, 'товар', 'товара', 'товаров')}`)

    return (
        <div className='container'>
            <br/><br/><br/><br/>
            <p style={{fontSize: '55px'}} className='has-text-black has-text-weight-normal'>
                {palto && data[0].attributes.title}
                {switshot && data[1].attributes.title}
                {kardigan && data[2].attributes.title}
                {tolst && data[3].attributes.title}
                {all && 'Магазин'}
            </p>
            <br/>
            <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                <ul>
                    <li><Link onClick={_ => setNavbar(prev => ({...prev, main: true, shop: false, about: false, contacts: false}))} to='/' className='texthover has-text-black has-text-weight-normal title is-5'>Главная</Link></li>
                    <li className="is-active "><a aria-current="page"><nav className='has-text-weight-normal subtitle is-5' style={{color: '#919191'}}>
                        {palto && data[0].attributes.title}
                        {switshot && data[1].attributes.title}
                        {kardigan && data[2].attributes.title}
                        {tolst && data[3].attributes.title}
                        {all && 'Магазин'}
                    </nav></a></li>
                </ul>
            </nav>
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <div>
                <div className="ml-5 ">
                    <button className={`${all ? 'black-knopka-after' : 'black-knopka'} mr-3 mt-3`} onClick={_ => {
                        setAll(true)
                        setPalto(false)
                        setKardigan(false)
                        setSwitshot(false)
                        setTolst(false)}}><nav>Все</nav>
                    </button>

                    <button className={`${palto ? 'black-knopka-after' : 'black-knopka'} mr-3 mt-3`} onClick={_ => {
                        setAll(false)
                        setPalto(true)
                        setKardigan(false)
                        setSwitshot(false)
                        setTolst(false)}}><nav>Пальто</nav>
                    </button>

                    <button className={`${switshot ? 'black-knopka-after' : 'black-knopka'} mr-3 mt-3`} onClick={_ => {
                        setAll(false)
                        setPalto(false)
                        setKardigan(false)
                        setSwitshot(true)
                        setTolst(false)}}><nav>Свитшоты</nav>
                    </button>

                    <button className={`${kardigan ? 'black-knopka-after' : 'black-knopka'} mr-3 mt-3`} onClick={_ => {
                        setAll(false)
                        setPalto(false)
                        setKardigan(true)
                        setSwitshot(false)
                        setTolst(false)}}><nav>Кардиганы</nav>
                    </button>

                    <button className={`${tolst ? 'black-knopka-after' : 'black-knopka'} mr-3`} onClick={_ => {
                        setAll(false)
                        setPalto(false)
                        setKardigan(false)
                        setSwitshot(false)
                        setTolst(true)}}><nav>Толстовки</nav>
                    </button>

                    <p style={{fontSize: '17px'}} className='has-text-grey has-text-weight-normal mt-6'>
                        {palto && `Показано: ${data && data[0].attributes.products.data.length} ${getNoun(data && data[0].attributes.products.data.length, 'товар', 'товара', 'товаров')}`}

                        {switshot && `Показано: ${data && data[1].attributes.products.data.length} ${getNoun(data && data[1].attributes.products.data.length, 'товар', 'товара', 'товаров')}`}

                        {kardigan && `Показано: ${data && data[2].attributes.products.data.length} ${getNoun(data && data[2].attributes.products.data.length, 'товар', 'товара', 'товаров')}`}

                        {tolst && `Показано: ${data && data[3].attributes.products.data.length} ${getNoun(data && data[3].attributes.products.data.length, 'товар', 'товара', 'товаров')}`}

                        {all && `Показано: ${data2 && data2.data.length} ${getNoun(data2 && data2.data.length, 'товар', 'товара', 'товаров')}`}
                    </p>
                </div>
                <br/><br/>
                <div className='my-6 columns is-multiline m-auto'>
                    {all && data2 && data2.data.map(value =>
                        <Product key={value.id} value={value}/>
                    )}
                    {palto && data[0].attributes.products.data.map(value =>
                        <Product key={value.id} value={value}/>
                    )}
                    {switshot && data[1].attributes.products.data.map(value =>
                        <Product key={value.id} value={value}/>
                    )}
                    {kardigan && data[2].attributes.products.data.map(value =>
                        <Product key={value.id} value={value}/>
                    )}
                    {tolst && data[3].attributes.products.data.map(value =>
                        <Product key={value.id} value={value}/>
                    )}
                </div>
            </div>
            <br/><br/><br/><br/><br/><br/>

        </div>
    );
}

export default Shop;