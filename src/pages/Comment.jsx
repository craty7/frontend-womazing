import React, {useContext, useState} from 'react';
import {UserContext} from "../App";
import axios from "axios";

function Comment({value, text}) {
    const [checked, setChecked] = useState(false)
    const [edited, setEdited] = useState(`${text}`)
    const {setIsLoading, ref} = useContext(UserContext)
    const user = JSON.parse(localStorage.getItem('user'))


    async function deleteComment(value) {
        await axios.delete(`${process.env.REACT_APP_API_URL}/comments/${value.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
            .then(res => {
                console.log(res.data)
            }).catch(e => console.log(e))
        setIsLoading(prev => !prev)
    }

    async function editComment(value) {
        // e.preventDefault()
        await axios.put(`${process.env.REACT_APP_API_URL}/comments/${value.id}`, {
            data: {
                text: edited,
            },
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
            }
        }).then(res => {
            console.log(res.data)
            console.log(value.attributes.user)
        }).catch(e => console.log(e))
        setIsLoading(prev => !prev)
    }


    return (
        <>
            <div className='box'>
                <div className="columns">
                    <div className="column">
                        <nav className="level">
                            <div className="level-left">
                                <div className="level-item">
                                    <div style={{width: '700px'}}>
                                        <nav
                                            className={'title is-6 m-0 has-text-black has-text-weight-semibold heading'}>{value.attributes.user.data.attributes.username}:
                                        </nav>
                                        {!checked
                                            ? <nav className='ml-1'>{value.attributes.text}</nav>
                                            : <>
                                                <div className='is-inline-block'>
                                                    <input type="text"
                                                           className='bordd ml-0 mb-1'
                                                           onInput={event => setEdited(event.target.value)}
                                                           value={edited}/>
                                                    <nav className='has-text-right'>
                                                        <button
                                                            onClick={_ => {
                                                                editComment(value)
                                                                setChecked(false)}}
                                                            className='button is-success is-small p-1 mb-3'
                                                            style={{height: '21px'}}>Изменить
                                                        </button>
                                                    </nav>
                                                </div>

                                            </>
                                        }
                                        <nav className='subtitle is-7 mt-5'>{value.attributes.createdAt}</nav>
                                    </div>
                                </div>

                            </div>
                        </nav>
                    </div>

                    {ref === true && value.attributes.user.data.id === user.id &&
                        <div className="column is-1">
                            <div className="level-item ml-4">
                                <div className="level-item ml-2">
                                    <button onClick={_ => deleteComment(value)}
                                            className='button is-rounded p-1 is-small is-danger'>delete
                                    </button>
                                </div>
                                <div className="level-item ml-2">
                                    <button onClick={_ => setChecked(!checked)}
                                            className='button is-rounded p-1 is-small is-info'>edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Comment;