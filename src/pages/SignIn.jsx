import React from 'react';
import SignInForm from "../components/SignInForm/SignInForm";

function SignIn(props) {
    return (
        <div>
            <div className='columns is-justify-content-center'>
                <div className='column is-5'>
                    <SignInForm/>
                    <br/><br/><br/>
                </div>
            </div>
        </div>
    );
}

export default SignIn;