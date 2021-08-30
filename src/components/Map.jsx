import React from 'react'
import { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import TopBar from './TopBar'
import {useHistory} from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import CircularProgress from '@material-ui/core/CircularProgress';
import { listPins } from '../graphql/queries'
import Fade from '@material-ui/core/Fade';


import '../styles/map.css'

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      cursor: 'default'
    },
  }));


function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

function Map() {
  
    const classes = useStyles();

    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      });

      const [isLoggedIn, login] = useState(false);

      const [userSignup, showSignup] = useState(false);

      const [backDrop, toggleBackDrop] = useState(false);
      
      const [errorText, showErrorText] = useState(false);

      const [successText, showSuccessText] = useState(false);

      const [confirmationPage, showConfirmationPage] = useState(false);
      const [confirmationError, showConfirmationError] = useState(false);
      const [emptyConfirmationError, showEmptyConfirmationError] = useState(false);
      const [confirmationLimitExceeded, showConfirmationLimitExceeded] = useState(false);

      const [confirmOne, setConfirmOne] = useState('');
      const [confirmTwo, setConfirmTwo] = useState('');
      const [confirmThree, setConfirmThree] = useState('');
      const [confirmFour, setConfirmFour] = useState('');
      const [confirmFive, setConfirmFive] = useState('');
      const [confirmSix, setConfirmSix] = useState('');
      const [isConfirmPage, goConfirmPage] = useState(false);
      const [confirmLoader, showConfirmLoader] = useState(false);
      const [resentText, showResentText] = useState(false);

      const [pins, setPins] = useState([]);
      const toggleHandler = () => {
        toggleBackDrop(!backDrop);
    }


      const [userName, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [email, setEmail] = useState('');
      const [error, setError] = useState('');


      const signIn = async () => {
          try {
              showLoginCircle(true);
              const user = await Auth.signIn(userName, password);
              onSignIn(user);
              loadPins();
          } catch (error) {
              
              console.log('sign in error:', error);
              if(error.code === "UserNotConfirmedException"){
                  showLoginCircle(false);
                  showConfirmationPage(true);
                  
              }
              else{
                setUsername('');
                setPassword('');
                showLoginCircle(false);
                showErrorText(true);
              }
          }
      }


      const signUp = async () => {
          try{
              showLoginCircle(true);
              if(password !== confirmPassword){
                  setError("Passwords do not match!");
                  showLoginCircle(false);
                  setPassword("");
                  setConfirmPassword("");
              }
              else{
              await Auth.signUp(userName,password, email);
              showConfirmationPage(true);
              goConfirmPage(true);
              }
          }catch(error){
              console.log(error);
              if(error.code === "UsernameExistsException"){
                setError("Username or email already exists!");
                showLoginCircle(false);
                setPassword("");
                setConfirmPassword("");
            }
              showLoginCircle(false);
          }
      }

      const confirmSignUp = async() => {
          try{
                showConfirmLoader(true);
                const confirmationCode = confirmOne+confirmTwo+confirmThree+confirmFour+confirmFive+confirmSix;
                await Auth.confirmSignUp(userName, confirmationCode);
                
                await signIn();
          }catch(err){
              showConfirmLoader(false);
              console.log(err);
              if(err.code === "CodeMismatchException"){
                if(confirmationLimitExceeded){showConfirmationLimitExceeded(false);}
                if(emptyConfirmationError){showEmptyConfirmationError(false);}

                  showConfirmationError(true);
              }
              if(err == "AuthError: Confirmation code cannot be empty"){
                  if(confirmationError){showConfirmationError(false);}
                  if(confirmationLimitExceeded){showConfirmationLimitExceeded(false);}
                  showEmptyConfirmationError(true);
              }
              if(err.code === 'LimitExceededException'){
                if(confirmationError){showConfirmationError(false);}
                if(emptyConfirmationError){showEmptyConfirmationError(false);}
                showConfirmationLimitExceeded(true);
            }

              setConfirmOne('');
              setConfirmTwo('');
              setConfirmThree('');
              setConfirmFour('');
              setConfirmFive('');
              setConfirmSix('');

              for(let i = 1; i < 7; i++){
              const inputField = document.querySelector(`input[name=fieldConfirm-${i}]`);
              inputField.value = '';
              }
            //Set focus back to first input field
              const firstField = document.querySelector(`input[name=fieldConfirm-1`);
              firstField.focus();


          }
      }


      const onSignIn = (user) => {
          console.log('user signed in successfully!');
          showSuccessText(true); 
          setUsername('');
          setPassword('');
          toggleHandler();
          showLoginCircle(false);
          login(true);
          showSuccessText(false);
          if(confirmationPage){
              showConfirmationPage(false);
          }
          showConfirmLoader(false);
      }


      const handleClose = () => {
          toggleBackDrop(false);
          setUsername('');
          setPassword('');
          showErrorText(false)
          showSuccessText(false);
          showLoginCircle(false);
          showConfirmationPage(false);
          showSignup(false);
          goConfirmPage(false);
          showConfirmationLimitExceeded(false);
          showResentText(false);
      }

      const userClickedSignup = () => {
          showSignup(true);
          showErrorText(false);
      }

      const [progressLogin, showLoginCircle] = useState(false);

      if(userName !== ''){
          if(errorText){
              showErrorText(false);
          }
      }

      const loadPins = async () => {
          try {
              const pinData = await API.graphql(graphqlOperation(listPins));
              const pins = pinData.data.listPins.items;
              setPins(pins);
          } catch (error) {
              console.log(error);
          }
      }

      const signOut = async () =>{
          try{
              await Auth.currentAuthenticatedUser();
              Auth.signOut();
              login(false);
              console.log("user signed out!");
          } catch {
              console.log("User not signed in!");
          }
      }

      const resendConfirmation = async() =>{
          try {
              showConfirmLoader(true);
              await Auth.resendSignUp(userName);
              showResentText(true);
              showConfirmLoader(false);
          } catch (error) {
              console.log(error);
          }
      }
      const userClickedSignIn = () =>{
          
          showSignup(false);
      }

      useEffect(() => {
          
        let checkLoggedIn = async () => {
            try{
                await Auth.currentAuthenticatedUser();
                login(true);
            } catch {
                login(false);
            }
        }
        checkLoggedIn();
      }, [login]);
      

      useEffect(() => {
        let checkDidEnterPw = () =>{
            if(password !== ""){
                setError("");
            }
        }

        checkDidEnterPw();
      }, [password]);


      const checkKeyPress = (e) => {
        const {maxLength, value, name } = e.target;
        
          if(e.keyCode === 8 ){

            if(name === 'fieldConfirm-1'){
              console.log("ZELETE");
              console.log(e.name);
              setConfirmOne('');
            }

          }

     
      }

      const confirmHandler = (boxNumber, input, targ, keyCode) => {

  
          const {maxLength, value, name } = targ;
          const [fieldName, fieldIndex] = name.split("-");

          
          console.log(fieldName, fieldIndex);

          let fieldIntIndex = parseInt(fieldIndex, 10);


          if(input !== undefined && input !== '' && input !== null){
          switch (boxNumber) {
              case 'boxOne':
                  
                    setConfirmOne(input);
                    console.log(confirmOne);
                    if(confirmationError){
                        showConfirmationError(false);
                    }
                    if(emptyConfirmationError){
                        showEmptyConfirmationError(false);
                    }
                    if(confirmationLimitExceeded){
                        showConfirmationLimitExceeded(false);
                    }
                    if(resentText){
                        showResentText(false);
                    }

                    const nextField = document.querySelector(`input[name=fieldConfirm-${fieldIntIndex+1}]`);

                    nextField.focus();
                    
                  break;
          
               case 'boxTwo':
                    setConfirmTwo(input);
                  
                    if(confirmationError === true){
                        showConfirmationError(false);
                    }
                    if(emptyConfirmationError === true){
                        showEmptyConfirmationError(false);
                    }
                    const nextField2 = document.querySelector(`input[name=fieldConfirm-${fieldIntIndex+1}]`);
                    nextField2.focus();
                break;

                case 'boxThree':
                    setConfirmThree(input);    
                    if(confirmationError === true){
                        showConfirmationError(false);
                    }
                    if(emptyConfirmationError === true){
                        showEmptyConfirmationError(false);
                    }              
                    const nextField3 = document.querySelector(`input[name=fieldConfirm-${fieldIntIndex+1}]`);
                    nextField3.focus();
                break;

                case 'boxFour':
                    setConfirmFour(input);
                    if(confirmationError === true){
                        showConfirmationError(false);
                    }
                    if(emptyConfirmationError === true){
                        showEmptyConfirmationError(false);
                    }
                    const nextField4 = document.querySelector(`input[name=fieldConfirm-${fieldIntIndex+1}]`);
                    nextField4.focus();
                break;

                case 'boxFive':
                    setConfirmFive(input); 
                    if(confirmationError === true){
                        showConfirmationError(false);
                    }
                    if(emptyConfirmationError === true){
                        showEmptyConfirmationError(false);
                    }               
                    const nextField5 = document.querySelector(`input[name=fieldConfirm-${fieldIntIndex+1}]`);
                    nextField5.focus();
                break;

                case 'boxSix':
                    setConfirmSix(input);
                    if(confirmationError === true){
                        showConfirmationError(false);
                    }
                    if(emptyConfirmationError === true){
                        showEmptyConfirmationError(false);
                    }                   
                break;
              default:
                  break;
          }
          }
          else{
            switch (boxNumber) {
                case 'boxOne':
                    
                      setConfirmOne('');
                  
                      break;

                case 'boxTwo':
                    setConfirmTwo('');                
                    const prevField2 = document.querySelector(`input[name=fieldConfirm-${fieldIntIndex-1}]`);
                    prevField2.focus();
                    break;

                case 'boxThree':
                        setConfirmThree('');                      
                        const prevField3 = document.querySelector(`input[name=fieldConfirm-${fieldIntIndex-1}]`);
                        prevField3.focus();
                        break;

                case 'boxFour':
                        setConfirmFour('');
                        const prevField4 = document.querySelector(`input[name=fieldConfirm-${fieldIntIndex-1}]`);
                        prevField4.focus();
                        break;

                case 'boxFive':
                        setConfirmFive('');
                        const prevField5 = document.querySelector(`input[name=fieldConfirm-${fieldIntIndex-1}]`);
                        prevField5.focus();
                        break;

                case 'boxSix':
                        setConfirmSix('');
                        const prevField6 = document.querySelector(`input[name=fieldConfirm-${fieldIntIndex-1}]`);
                        prevField6.focus();
                        break;
                default:
                    break;
                
          }
        }
      }

    return (
        //Note for later: To get user info: Auth.currentAuthenticatedUser();
                //TODO: Change Account button to open up a screen for acc management
        <div>
        <TopBar  text = {isLoggedIn ? "Account" : "Sign in/Sign Up" } onPress={isLoggedIn ? signOut : toggleHandler} />
        
        <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onViewportChange={nextViewport => setViewport(nextViewport)}
        >

            <PersonPinCircleIcon style={{fontSize: '100', 
                                            color: 'black', 
                                            cursor: 'pointer', 
                                            position: 'fixed', 
                                            bottom: '25', 
                                            right: '20'}} 
            />

        </ReactMapGL>


        <Backdrop className = {classes.backdrop} open={backDrop} >

            <div className = 'loginForm'>

           

                <CloseIcon style={{color:'black', fontSize: "20px", cursor:'pointer', marginBottom: '40px', marginLeft: isConfirmPage ? "405px" : "215px", marginTop:"5px"}} onClick={handleClose}></CloseIcon>
                
            
            {
            
                confirmationPage ? 


//TODO: Add text here for any error (i.e. error.message in a h2)

                <div className='signup'> 
                    <h2 style={{color:'black', marginLeft: '25%', marginBottom: '20px'}}>Confirm Signup</h2>
                    <CircularProgress style={confirmLoader ? {marginLeft:'45%', marginBottom: '45px'} : {display: 'none'}}  />

                    <h3 style={{color:'black', marginLeft: '5%', marginBottom: '5px', fontSize: '13px'}}>Please enter the confirmation code sent to your email.</h3>
                    <h3 style={{color:'blue', textDecoration:'underline', marginLeft: '28%', marginBottom: '30px', fontSize: '11px', cursor: 'pointer', marginRight: '25%'}} onClick= {resendConfirmation}>Need a new confirmation code?</h3>

                    <h3 style={confirmationError ? {color:'red', marginLeft: '5%', marginBottom: '50px', fontSize: '13px'} : {display: 'none'}}>Invalid confirmation code provide. Please try again.</h3>
                    <h3 style={emptyConfirmationError ? {color:'red', marginLeft: '5%', marginBottom: '50px', fontSize: '13px'} : {display: 'none'}}>Confirmation code cannot be empty. Please try again.</h3>
                    <h3 style={confirmationLimitExceeded ? {color:'red', marginLeft: '5%', marginBottom: '5px', fontSize: '11px'} : {display: 'none'}}>You have failed to enter your confirmation code too many times.</h3>
                    <h3 style={confirmationLimitExceeded ? {color:'red', marginLeft: '5%', marginBottom: '50px', fontSize: '11px'} : {display: 'none'}}>Please try again later.</h3>
                    <h3 style={resentText ? {color:'green', marginLeft: '12%', marginBottom: '50px', fontSize: '13px'} : {display: 'none'}}>Resent confirmation code. Check your email!</h3>


                    <div className='confirmEntry'>

                        <TextField name='fieldConfirm-1' id="outlined-basic"  variant="outlined" style={{width: '40px', margin: '12px'}} onChange={(e) => confirmHandler('boxOne', e.target.value, e.target)} inputProps={{maxLength: 1}} />
                        <TextField name='fieldConfirm-2' id="outlined-basic"  variant="outlined" style={{width: '40px', margin: '12px'}} onKeyDown={checkKeyPress} onChange={(e) => confirmHandler('boxTwo', e.target.value, e.target)} inputProps={{maxLength: 1}}/>
                        <TextField name='fieldConfirm-3' id="outlined-basic"  variant="outlined" style={{width: '40px', margin: '12px'}} onKeyDown={checkKeyPress} onChange={(e) => confirmHandler('boxThree', e.target.value, e.target)} inputProps={{maxLength: 1}}/>
                        <TextField name='fieldConfirm-4' id="outlined-basic"  variant="outlined" style={{width: '40px', margin: '12px'}} onKeyDown={checkKeyPress} onChange={(e) => confirmHandler('boxFour', e.target.value, e.target)} inputProps={{maxLength: 1}}/>
                        <TextField name='fieldConfirm-5' id="outlined-basic"  variant="outlined" style={{width: '40px', margin: '12px'}} onKeyDown={checkKeyPress} onChange={(e) => confirmHandler('boxFive', e.target.value, e.target)} inputProps={{maxLength: 1}}/>
                        <TextField name='fieldConfirm-6' id="outlined-basic"  variant="outlined" style={{width: '40px', margin: '12px'}} onKeyDown={checkKeyPress} onChange={(e) => confirmHandler('boxSix', e.target.value, e.target)} inputProps={{maxLength: 1}}/>
                    
                    </div>
                    <Button size="medium" variant="contained" style={{background:'#1B1C1E', color: 'white'}} onClick={confirmSignUp}>Confirm Signup</Button>

                </div>
                :

                userSignup 
                ? 
                
                <div className="signup">
             
                    <CircularProgress style={progressLogin ? {} : {display: 'none'}} />

                    <h2 style={{color:'black'}}>Sign Up</h2>
                    <h6 style={{color:'red', fontSize:"11px"}}>{error}</h6>
                    <h5 style={errorText ? {color:'red', fontSize: "10px"} : { display:"none" }}>Username or password is incorrect.</h5> 

                    <h5 style={successText ? {color:'green', fontSize: "10px"} : { display:"none" }}>Sign in successful</h5> 

                    <TextField id="username" label="Username" value={userName} onChange = {e => setUsername(e.target.value)} style={{marginTop:"10px"}} />
                    <TextField id = "email" label="Email Address" value={email} onChange = {e => setEmail(e.target.value)} />
                    <TextField id="password" label="Password" type='password' value={password}  onChange = {e => setPassword(e.target.value)}
                        />
                    <TextField id="confirmPassword" label="Confirm Password" type='password' value={confirmPassword}  onChange = {e => setConfirmPassword(e.target.value)}
                        />

                    <div style={{display: 'flex', flexDirection: 'column', marginTop:"10px"}}>
                        <p style={{color:'black', fontSize: "13px", marginTop: "5px"}}>Already have an account? </p>
                        <p style={{color:'dodgerblue', cursor: 'pointer', marginRight: "30px", fontSize:'12px'}} onClick = {userClickedSignIn}>Sign in</p> 
                    </div>  

                    <div style={{marginLeft:"51%", marginTop:"20px"}}>
                        <Button size="medium" variant="contained" style={{background:'#1B1C1E', color: 'white'}} onClick={signUp}>Register</Button>
                    </div>

                </div> 
                
            

                :

                

                    <div className="signer">
                
                        <CircularProgress style={progressLogin ? {} : {display: 'none'}} />

                        

                        <h2 style={{color:'black'}}>Sign In</h2>
                        <h5 style={errorText ? {color:'red', fontSize: "10px"} : { display:"none" }}>Username or password is incorrect.</h5> 
                        
                        <h5 style={successText ? {color:'green', fontSize: "10px"} : { display:"none" }}>Sign in successful</h5> 

                        <TextField id="username" label="Username" value={userName} onChange = {e => setUsername(e.target.value)} style={{marginBottom:"10px", marginTop:"10px"}} />
                        <TextField id="password" label="Password" type='password' value={password}  onChange = {e => setPassword(e.target.value)}
                            />

                        <div style={{display: 'flex', flexDirection: 'column', marginTop:"10px"}}>
                            <p style={{color:'black', fontSize: "13px", marginTop: "5px"}}>No account? </p>
                            <p style={{color:'dodgerblue', cursor: 'pointer', marginRight: "30px", fontSize:'12px'}} onClick = {userClickedSignup}>Sign up</p> 
                        </div>  

                        <div style={{marginLeft:"60%", marginTop:"20px"}}>
                            <Button size="medium" variant="contained" style={{background:'#1B1C1E', color: 'white'}} onClick={signIn}>Login</Button>
                        </div>


                        <div style={{display: 'flex', flexDirection: 'row', marginTop:"5px"}}>
                            <p style={{fontSize: "12px", marginTop: "5px", color:'dodgerblue', cursor: 'pointer', marginLeft:"65px"}}>Forgot your password?</p>
                        </div>  
                       
                </div> 
               
           
}


            

            
            </div>

        </Backdrop>

    </div>
    )
}

export default Map
