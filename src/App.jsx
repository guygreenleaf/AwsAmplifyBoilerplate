import './styles/App.css';
import  Landing  from './components/Landing';
import  UserHome  from './components/UserHome';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Switch>

      <Route path="/home" component={UserHome} />
      <Route path="/" exact component={Landing} />

    </Switch>
    
    </div>
  );
}

export default App;
