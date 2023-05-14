import React, {useContext, useState} from 'react';
import axios from "axios"
import {UserContext} from "../../App";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function SignUpForm(props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [data, setData] = useState(null)
    const navigate = useNavigate()
    const {setUser, setRef} = useContext(UserContext)

    async function handleSubmit(event) {
        event.preventDefault()
        if (password === cpassword) {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/local/register`, {
                        username: username,
                        email: email,
                        password: password
                    })
                .then(result => {
                        // document.cookie = `jwt=${result.data.jwt}` // document.cookie - внутри куки создает ключ 'jwt'
                        // document.cookie = `active=${true}`

                        localStorage.setItem('active', 'true')
                        localStorage.setItem('jwt', result.data.jwt)
                        localStorage.setItem('user', JSON.stringify(result.data.user)) // так как внутри user хранится объект (массив), нужно хранить в JSON

                        // npm i react-toastify --legacy-peer-deps

                        toast.success('Вы успешно зарегистрировали новый аккаунт!', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true
                        })

                        navigate('/')
                        setRef(true)
                        setUser(prev => {
                            return {
                                ...prev,
                                jwt: result.data.jwt,
                                active: true,
                                username: result.data.username,
                                id: result.data.id
                            }
                        })
                    console.log(result)
                    setData(result)
                }).catch(e => {
                    console.log(e)
                })
            console.log(data)

            setUsername('')
            setEmail('')
            setPassword('')
            setCpassword('')
            return
        }
        alert('Ваши пароли не совпадают')
    }


    return (
        <div className='box px-6 py-4'>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='Username...'
                        className='input my-1'
                        value={username}
                        onInput={e => setUsername(e.target.value)}
                        required={true}/>

                    <input type="email"
                           placeholder='Email...'
                           className='input my-1'
                           value={email}
                           onInput={e => setEmail(e.target.value)}
                           required={true}/>

                    <input type="password"
                           placeholder='Password...'
                           className='input my-1'
                           value={password}
                           onInput={e => setPassword(e.target.value)}
                           required={true}/>

                    <input type="password"
                           placeholder='Confirm password...'
                           className='input my-1'
                           value={cpassword}
                           onInput={e => setCpassword(e.target.value)}
                           required={true}/>
                    <button style={{backgroundColor: '#509498'}} className='button mt-4 has-text-white'>Register</button>
                </form>
            </div>
    );
}

export default SignUpForm;