import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { auth, firestore } from './firebase/firebaseConfig';

import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Facilities from './components/Facilities';
import Reservation from './pages/Reservation';
import RoomList from './components/RoomList';

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
          <Route exact path="/rooms" component={RoomList} />
          <Route exact path="/facilities" component={Facilities} />
          <Route exact path="/favorites">
            <Favorites user={user} />
          </Route>
          <Route exact path="/reservation">
            {user ? <Reservation user={user} /> : <p>Please log in to make a reservation.</p>}
          </Route>
          <Route path="*" component={() => <h1>404 Not Found</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
