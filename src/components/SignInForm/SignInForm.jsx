import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {UserContext} from "../../App";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


function SignInForm(props) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const {user, setUser, setRef} = useContext(UserContext)

    useEffect(() => {
        error && alert('Неправильные данные')
    }, [error])

    async function handleSubmit(e) {
        e.preventDefault()
        if (username && password) {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/local`, {
                identifier: username,
                password: password,
            }).then(
                res => {
                    toAuth()
                    document.cookie = `jwt=${res.data.jwt}` // document.cookie - внутри куки создает ключ 'jwt'
                    document.cookie = `active=${true}`
                    localStorage.setItem('jwt', res.data.jwt)
                    localStorage.setItem('active', 'true')
                    localStorage.setItem('user', JSON.stringify(res.data.user))

                    toast.success('Вы успешно вошли в аккаунт!', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true
                    })

                    setUser(prev => {
                        return {
                            ...prev,
                            jwt: res.data.jwt,
                            active: true
                        }
                    })
                    navigate('/')
                    setRef(true)
                }
            ).catch(e => setError(true))
            setEmail('')
            setUsername('')
            setPassword('')
            return
       }
       alert('Заполните поля')
    }

    async function toAuth() {
        await axios.put(`${process.env.REACT_APP_API_URL}/users/${user.user.id}`, {
            role: 1
        })
    }

    return (
        <div className='section'>
            <div className='box px-6 py-4'>
                <form action="" onSubmit={handleSubmit}>
                    <input className='input my-1' type="text" onInput={event => setUsername(event.target.value)} value={username} placeholder='Username...'/>
                    <input className='input my-1' type="password" onInput={event => setPassword(event.target.value)} value={password} placeholder='Password...'/>
                    <button style={{backgroundColor: '#509498'}} className='button mt-4 has-text-white'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default SignInForm;

// чтобы хранил jwt при регистрации