import React from 'react'
import { useState } from 'react';
// import ReactMapGL from 'react-map-gl';
import TopBar from './TopBar'
import {useHistory} from 'react-router-dom';

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
        {/* <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onViewportChange={nextViewport => setViewport(nextViewport)}
        /> */}
    </div>
    )
}

export default Map
