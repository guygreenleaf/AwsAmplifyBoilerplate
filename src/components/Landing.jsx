import React from 'react'
import {useHistory} from 'react-router-dom';



function Landing() {
    
    const history = useHistory();

    const routeChange = () => {
    let path = `home`;
    history.push(path);
    };

    return (
        <div>
            This is the landing page!
            <button color="primary" className="px-4" onClick={routeChange}>Login</button>
        </div>
    )
}

export default Landing
