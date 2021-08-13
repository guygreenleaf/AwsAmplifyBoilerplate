import React from 'react'
import { useState } from 'react';
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

      const toggleHandler = () => {
          toggleBackDrop(!backDrop);
      }

      const handleClose = () => {
          toggleBackDrop(false);
      }

      const userClickedSignup = () => {
          showSignup(true);
      }

    return (
        <div>
        <TopBar  text = {isLoggedIn ? "Account" : "Sign in/Sign Up" } onPress={toggleHandler} />
        
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

                <CloseIcon style={{color:'black', fontSize: "20px", cursor:'pointer', marginBottom: '40px', marginLeft: "215px", marginTop:"5px"}} onClick={handleClose}></CloseIcon>
                
                <div style={{display: 'flex', flexDirection: 'column', marginBottom:"50px", marginLeft: "20px", marginRight: "20px"}}>

                   
                    <h2 style={{color:'black'}}>Sign In</h2>
                    <TextField id="standard-basic" label="Username" />
                    <TextField id="standard-basic" label="Password" />

                    <div style={{display: 'flex', flexDirection: 'row', marginTop:"10px"}}>
                        <p style={{color:'black', fontSize: "14px", marginTop: "5px"}}>No account? <p style={{color:'dodgerblue', cursor: 'pointer', marginRight: "30px"}} onClick = {userClickedSignup}>Sign up</p> </p>
                    </div>  

                    <div style={{marginLeft:"60%", marginTop:"20px"}}>
                     <Button size="medium" variant="contained" style={{background:'#1B1C1E', color: 'white'}}>Login</Button>
                    </div>


                    <div style={{display: 'flex', flexDirection: 'row', marginTop:"5px"}}>
                        <p style={{fontSize: "12px", marginTop: "5px", color:'dodgerblue', cursor: 'pointer', marginLeft:"65px"}}>Forgot your password?</p>
                    </div>  

                </div>

            </div>

        </Backdrop>

    </div>
    )
}

export default Map
