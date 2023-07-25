import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { auth } from './firebase/config';
import Home from './pages/Home';
import Facilities from './components/Facilities';
import Rooms from './pages/Rooms';
import RoomCard from './components/RoomCard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';
import SuccessReserv from './components/SuccessReserv';
import PageDontExist from './components/PageDontExist';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Facilities" component={Facilities} />
          <Route path="/Rooms" component={Rooms} />
          <Route path="/RoomCard" component={RoomCard}/>
          <Route path="/SignUp" component={SignUp}/>
          <Route path="/SuccessReserv" componet={SuccessReserv}/>
          <Route path="/Login" component={Login}/>
          <Route path="/ResetPassword" component={ResetPassword}/>
          <Route path="/PageDontExist" component={PageDontExist}/>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
