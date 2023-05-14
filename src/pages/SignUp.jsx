import React from 'react';
import SignUpForm from "../components/SignUpForm/SignUpForm";

function SignUp(props) {
    return (
        <div className='columns is-justify-content-center'>
            <div className='column is-5'>
                <SignUpForm/>
                <br/><br/><br/>
            </div>
        </div>
    );
}

export default SignUp;