import './styles/App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <div className="App">
    <header>
      <h1>This is Amplify Auth</h1>
    </header>
    <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
