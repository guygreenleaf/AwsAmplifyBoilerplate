import React from 'react'
import {useHistory} from 'react-router-dom';
import { Authenticator, SignIn, SignUp, ConfirmSignUp, Greetings } from 'aws-amplify-react';

const AlwaysOn = (props) => {
    return (
        <div>
            <div>I am always here to show current auth state: {props.authState}</div>
            <button onClick={() => props.onStateChange('signUp')}>Show Sign Up</button>
        </div>
    )
}



function Landing() {

    const handleAuthStateChange = (state) => {
        if (state === 'signedIn') {
            /* Do something when the user has signed-in */
        }
    }

    const history = useHistory();

    const routeChange = () => {
    let path = `home`;
    history.push(path);
    };

    return (
    <Authenticator hideDefault={true} onStateChange={handleAuthStateChange}>
        <SignIn/>
        <SignUp/>
        <ConfirmSignUp/>
        <Greetings/>
        <AlwaysOn/>
    </Authenticator>

        // <div>
        //     This is the landing page!
        //     <button color="primary" className="px-4" onClick={routeChange}>Login</button>
        // </div>
    )
}

export default Landing
