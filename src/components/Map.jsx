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

      const [backDrop, toggleBackDrop] = useState(false);

      const toggleHandler = () => {
          toggleBackDrop(!backDrop);
      }

      const handleClose = () => {
          toggleBackDrop(false);
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

                <CloseIcon style={{color:'black', cursor:'pointer'}} onClick={handleClose}></CloseIcon>
                <h2 style={{color:'black'}}>Login</h2>
                <TextField id="standard-basic" label="Username" />
                <TextField id="standard-basic" label="Password" />

            </div>

        </Backdrop>

    </div>
    )
}

export default Map
