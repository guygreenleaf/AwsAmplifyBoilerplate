import React from 'react'
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import TopBar from './TopBar'
import {useHistory} from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';

// eslint-disable-next-line import/no-webpack-loader-syntax!
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

function Map() {
  
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      });

      const [isLoggedIn, login] = useState(false);

    return (
        <div>
        <TopBar  text = {isLoggedIn ? "Account" : "Sign in/Sign Up" } />
        
        <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onViewportChange={nextViewport => setViewport(nextViewport)}
        >
            <PersonPinCircleIcon style={{fontSize: '100', color: 'black', cursor: 'pointer', position: 'fixed', bottom: '25', right: '20'}} />
        </ReactMapGL>
       
    </div>
    )
}

export default Map
