import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useNavbarContext} from "../context/navbarContext";
import {toast} from "react-toastify";

function Contacts(props) {
    const {setNavbar} = useNavbarContext()
    const [send, setSend] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [message, setMessage] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (name && email && number && message && emailValid) {
            setSend(true)
            setName('')
            setEmail('')
            setNumber('')
            setMessage('')
        }
    }

    return (
        <div className='container'>
            <br/><br/><br/><br/>
            <p style={{fontSize: '55px'}} className='has-text-black has-text-weight-normal'>Контакты</p>
            <br/>
            <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                <ul>
                    <li><Link onClick={_ => setNavbar(prev => ({...prev, main: true, shop: false, about: false, contacts: false}))} to='/' className='texthover has-text-black has-text-weight-normal title is-5'>Главная</Link></li>
                    <li className="is-active "><a aria-current="page"><nav className='has-text-weight-normal subtitle is-5' style={{color: '#919191'}}>Контакты</nav></a></li>
                </ul>
            </nav>
            <br/><br/><br/><br/><br/><br/><br/><br/>

            <iframe width="1109" height="478" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=37.51924932003022%2C55.68150879204967%2C37.52224266529084%2C55.68237074206359&amp;layer=mapnik&amp;marker=55.68193976943114%2C37.52074599266052"
                    style={{border: '0'}}></iframe>
            <br/><br/><br/><br/><br/><br/><br/>

            <div className="columns">
                <div className="column is-3">
                    <p style={{fontSize: '18px', marginBottom: '4%', color: 'black'}}>
                        Телефон
                    </p>
                    <p style={{fontSize: '20px', color: 'black'}}>
                        +7 (495) 823-54-12
                    </p>
                </div>
                <div className="column is-3">
                    <p style={{fontSize: '18px', marginBottom: '4%', color: 'black'}}>
                        E-mail
                    </p>
                    <p style={{fontSize: '20px', color: 'black'}}>
                        hello@womazing.com
                    </p>
                </div>
                <div className="column">
                    <p style={{fontSize: '18px', marginBottom: '1.5%', color: 'black'}}>
                        Адрес
                    </p>
                    <p style={{fontSize: '20px', color: 'black'}}>
                        г. Москва, улица Марии Ульяновой 25
                    </p>
                </div>
            </div>

            <br/><br/><br/><br/>

            <p style={{fontSize: '26px', color: 'black'}}>Напишите нам</p>
            <form >
                <br/><br/>
                <div className="block">
                    <input
                        placeholder='Имя'
                        className='shop-input'
                        type="text"
                        required={true}
                        onInput={e => setName(e.target.value)}
                        value={name}
                    />
                </div>

                <div className="block">
                    <input
                        placeholder='E-mail'
                        className='shop-input'
                        type="email"
                        required={true}
                        onInput={e => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className="block">
                    <input
                        placeholder='Телефон'
                        className='shop-input'
                        type="text"
                        required={true}
                        onInput={e => setNumber(e.target.value)}
                        value={number}
                    />
                </div>

                <div className="block">
                    <input
                        style={{height: '114px'}}
                        placeholder="Сообщение"
                        className='shop-input'
                        type="text"
                        required={true}
                        onInput={e => setMessage(e.target.value)}
                        value={message}
                    />
                </div>

                <button onClick={handleSubmit} style={{width: '186px'}} className="knopka mt-2">
                    <nav style={{width: '89px'}}>Отправить</nav>
                </button>
            </form>
            <br/><br/><br/>

            {send &&
            <>
                <div style={{
                    background: '#F1EADC',
                    width: '457px',
                    height: '84px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div className='has-text-black' style={{marginLeft: '6%', fontSize: '20px'}}>
                        Сообщение успешно отправлено
                    </div>
                </div>
            </>}
            <br/><br/><br/><br/><br/>
        </div>
    );
}

export default Contacts;