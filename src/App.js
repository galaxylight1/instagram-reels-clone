import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import AuthProvider from './Context/AuthProvider';
import Main from './Material-UI/Main';
import PrivateRoute from './Components/PrivateRoute';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <AuthProvider>
          <Switch>
            <PrivateRoute exact path='/' component={Main} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
          </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
