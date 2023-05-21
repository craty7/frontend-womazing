import React from 'react';
import {Link} from "react-router-dom";
import {useNavbarContext} from "../context/navbarContext";
import about1 from '../../src/assets/png/about-pictures1.jpg'
import about2 from '../../src/assets/png/about-pictures2.jpg'

function About() {
    const {setNavbar} = useNavbarContext()


    return(
        <div className='container'>
            <br/><br/><br/><br/>
            <div className="modal">
                <div className="modal-background"></div>
                <div className="modal-content">
                    123123123
                </div>
                <button>12312</button>
            </div>
            <p style={{fontSize: '55px'}} className='has-text-black has-text-weight-normal'>О бренде</p>
            <br/>
            <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                <ul>
                    <li><Link onClick={_ => setNavbar(prev => ({...prev, main: true, shop: false, about: false, contacts: false}))} to='/' className='texthover has-text-black has-text-weight-normal title is-5'>Главная</Link></li>
                    <li className="is-active "><a><nav className='has-text-weight-normal subtitle is-5' style={{color: '#919191'}} >О бренде</nav></a></li>
                </ul>
            </nav>
            <br/><br/><br/><br/><br/><br/><br/><br/>

            <div className="columns">
                <div className="column is-">
                    <img src={about1}/>
                </div>
                <div className="column">
                    <br/><br/><br/><br/>
                    <div className="block">
                        <p className='title is-4 has-text-black has-text-weight-normal'>Идея и женщина</p>
                    </div>
                    <br/>
                    <div className="block title is-5 has-text-black has-text-weight-normal">
                        <p style={{lineHeight: '120%'}}>Womazing была основана в 2010-ом и стала одной из самых успешных компаний нашей страны. Как и многие итальянские фирмы, Womazing остаётся семейной компанией, хотя ни один из членов семьи не является модельером.</p>
                    </div>
                    <div className="block title is-5 has-text-black has-text-weight-normal">
                        <p style={{lineHeight: '120%'}}>Мы действуем по успешной формуле, прибегая к услугам известных модельеров для создания своих коллекций. Этот метод был описан критиком моды Колином Макдауэллом как форма дизайнерского со-творчества, характерная для ряда итальянских prêt-a-porter компаний.</p>
                    </div>
                </div>
            </div>
            <br/><br/><br/>
            <div className="columns">
                <div className="column is-6">
                    <br/><br/><br/><br/>
                    <div className="block">
                        <p className='title is-4 has-text-black has-text-weight-normal'>Магия в деталях</p>
                    </div>
                    <br/>
                    <div className="block title is-5 has-text-black has-text-weight-normal">
                        <p style={{lineHeight: '120%'}}>Первый магазин Womazing был открыт в маленьком городке на севере страны в 2010-ом году. Первая коллекция состояла из двух пальто и костюма, которые были копиями парижских моделей.</p>
                    </div>
                    <div className="block title is-5 has-text-black has-text-weight-normal">
                        <p style={{lineHeight: '120%'}}>Несмотря на то, что по образованию основательница была адвокатом, ее семья всегда была тесно связана с шитьём (прабабушка основательницы шила одежду для женщин, а мать основала профессиональную школу кроя и шитья). Стремление производить одежду для масс несло в себе большие перспективы, особенно в то время, когда высокая мода по-прежнему доминировала, а рынка качественного prêt-a-porter попросту не существовало.</p>
                    </div>
                </div>
                <div className="column has-text-right">
                    <img src={about2}/>
                </div>

            </div>
            <br/><br/><br/><br/>
            <div className="has-text-centered">
                <Link onClick={_ => setNavbar(prev => ({...prev, shop: true, main: false, about: false, contacts: false}))} to='/shop'>
                    <button style={{width: '260px'}} className='knopka'><nav style={{width: '160px', height: '24px'}}>Перейти в магазин</nav></button>
                </Link>
                <br/><br/><br/><br/><br/><br/><br/>
            </div>
        </div>
    )


    // let width = window.innerWidth

    // if (width > 700) {
    //     return(
    //         <div className='container'>
    //             <br/><br/><br/><br/>
    //             <p style={{fontSize: '55px'}} className='has-text-black has-text-weight-normal'>О бренде</p>
    //             <br/>
    //             <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
    //                 <ul>
    //                     <li><Link onClick={_ => setNavbar(prev => ({...prev, main: true, shop: false, about: false, contacts: false}))} to='/' className='texthover has-text-black has-text-weight-normal title is-5'>Главная</Link></li>
    //                     <li className="is-active "><a aria-current="page"><nav className='has-text-weight-normal subtitle is-5' style={{color: '#919191'}} >О бренде</nav></a></li>
    //                 </ul>
    //             </nav>
    //             <br/><br/><br/><br/><br/><br/><br/><br/>
    //             <div className="columns">
    //                 <div className="column is-">
    //                     <img src="http://womazing.s-host.net/wp-content/uploads/2021/03/about-pictures1.jpg" alt=""/>
    //                 </div>
    //                 <div className="column">
    //                     <br/><br/><br/><br/>
    //                     <div className="block">
    //                         <p className='title is-4 has-text-black has-text-weight-normal'>Идея и женщина</p>
    //                     </div>
    //                     <br/>
    //                     <div className="block title is-5 has-text-black has-text-weight-normal">
    //                         <p style={{lineHeight: '120%'}}>Womazing была основана в 2010-ом и стала одной из самых успешных компаний нашей страны. Как и многие итальянские фирмы, Womazing остаётся семейной компанией, хотя ни один из членов семьи не является модельером.</p>
    //                     </div>
    //                     <div className="block title is-5 has-text-black has-text-weight-normal">
    //                         <p style={{lineHeight: '120%'}}>Мы действуем по успешной формуле, прибегая к услугам известных модельеров для создания своих коллекций. Этот метод был описан критиком моды Колином Макдауэллом как форма дизайнерского со-творчества, характерная для ряда итальянских prêt-a-porter компаний.</p>
    //                     </div>
    //                 </div>
    //             </div>
    //             <br/><br/><br/>
    //             <div className="columns">
    //                 <div className="column is-6">
    //                     <br/><br/><br/><br/>
    //                     <div className="block">
    //                         <p className='title is-4 has-text-black has-text-weight-normal'>Магия в деталях</p>
    //                     </div>
    //                     <br/>
    //                     <div className="block title is-5 has-text-black has-text-weight-normal">
    //                         <p style={{lineHeight: '120%'}}>Первый магазин Womazing был открыт в маленьком городке на севере страны в 2010-ом году. Первая коллекция состояла из двух пальто и костюма, которые были копиями парижских моделей.</p>
    //                     </div>
    //                     <div className="block title is-5 has-text-black has-text-weight-normal">
    //                         <p style={{lineHeight: '120%'}}>Несмотря на то, что по образованию основательница была адвокатом, ее семья всегда была тесно связана с шитьём (прабабушка основательницы шила одежду для женщин, а мать основала профессиональную школу кроя и шитья). Стремление производить одежду для масс несло в себе большие перспективы, особенно в то время, когда высокая мода по-прежнему доминировала, а рынка качественного prêt-a-porter попросту не существовало.</p>
    //                     </div>
    //                 </div>
    //                 <div className="column has-text-right">
    //                     <img src="http://womazing.s-host.net/wp-content/uploads/2021/03/about-pictures2.jpg" alt=""/>
    //                 </div>
    //
    //             </div>
    //             <br/><br/><br/><br/>
    //             <div className="has-text-centered">
    //                 <Link onClick={_ => setNavbar(prev => ({...prev, shop: true, main: false, about: false, contacts: false}))} to='/shop'>
    //                     <button style={{width: '260px'}} className='knopka'><nav style={{width: '160px', height: '24px'}}>Перейти в магазин</nav></button>
    //                 </Link>
    //                 <br/><br/><br/><br/><br/><br/><br/>
    //             </div>
    //         </div>
    //     )
    // } else {
    //     return (
    //         <div>куy</div>
    //     )
    // }



}

export default About;