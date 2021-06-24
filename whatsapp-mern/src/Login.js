import React from 'react';
import './login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';

function Login() {
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => console.log(result))
                .catch((error) => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://previews.123rf.com/images/ekaterinachvileva/ekaterinachvileva1903/ekaterinachvileva190300125/124746692-three-friends-talking-illustration-with-cute-marshmallow-and-speech-bubbles-cartoon-minimalism.jpg" alt=""/>
                <div className="login__text">
                    <h1>Chitter</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login;