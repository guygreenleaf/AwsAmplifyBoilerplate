import React from 'react'
// import {useHistory} from 'react-router-dom';
// import { Authenticator, SignIn, SignUp, ConfirmSignUp, Greetings } from 'aws-amplify-react';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import { alpha, makeStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import TopBar from './TopBar'
import {useHistory} from 'react-router-dom';
import fancy from '../assets/fancy.gif'
import '../styles/background.css'
import '../styles/landing.css'
import { useState } from 'react'

// const AlwaysOn = (props) => {
//     return (
//         <div>
//             <div>I am always here to show current auth state: {props.authState}</div>
//             <button onClick={() => props.onStateChange('signUp')}>Show Sign Up</button>
//         </div>
//     )
// }


function Landing() {

    const history = useHistory();
      
    const routeChange = () => {
        let path = `map`;
        history.push(path);
        };
    
    const handleAuthStateChange = (state) => {
        if (state === 'signedIn') {
            /* Do something when the user has signed-in */
        }
    }

    const [imageLoaded, setImageLoaded] = useState(false);
    
    const handleImageLoad = () => {
        setImageLoaded(true);
    }

    return (
    // <Authenticator hideDefault={true} onStateChange={handleAuthStateChange}>
    //     <SignIn/>
    //     <SignUp/>
    //     <ConfirmSignUp/>
    //     <Greetings/>
    //     <AlwaysOn/>
    // </Authenticator>
 
    //  might want to replace address with this for image: https://thumbs.gfycat.com/FelineAgreeableAmmonite-size_restricted.gif
    // backgroundImage: `url("https://thumbs.gfycat.com/FelineAgreeableAmmonite-size_restricted.gif")`
    <>
        <div className='outerContainer'>
        
        
        <TopBar onPress = {routeChange} text = "Go To Maps" />

        <div className = 'logoContainer'>
        <img src={fancy} alt="" style = {{width: "250px"}} onLoad = {handleImageLoad} />

            <h2 className= {imageLoaded ? "mapplerLogo" : "mapplerTextHide"} >TrlBlzr</h2>
            <h3 className={imageLoaded ? "mapplerBottomText" : "mapplerTextHide" } >Open Source Mapping <br></br> <div style={{marginLeft: '25px'}}>and Social Media</div></h3>
        
        </div>
        

    
        </div>
        
    </>
    )
}

export default Landing
