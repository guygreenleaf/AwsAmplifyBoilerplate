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

      <Route path="/" exact component={Landing} />
      <Route path="/home" component={UserHome} />

    </Switch>
    
    </div>
  );
}

export default App;
