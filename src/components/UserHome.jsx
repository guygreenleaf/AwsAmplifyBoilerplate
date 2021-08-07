import React from 'react'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function UserHome() {
    return (
        <div>
<div> time to login! </div>
        <AmplifySignOut />    
        </div>
        
    )
}

export default withAuthenticator(UserHome)
