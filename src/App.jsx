import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import  Landing  from './components/Landing';
import  UserHome  from './components/UserHome';
import Map from './components/Map';

import './styles/app.css'
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config);


function App() {
  return (
    <div className="App" style={{margin: 0}}>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/home" component={UserHome} />
      <Route path="/map" component={Map} />
    </Switch>
    
    </div>
  );
}

export default App;
