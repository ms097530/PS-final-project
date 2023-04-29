import { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import NewOrderPage from './pages/NewOrderPage';
import AuthPage from './pages/AuthPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import NavBar from './components/NavBar/NavBar';
import ProfilePage from './pages/ProfilePage/ProfilePage';

import { getUser } from './utilities/users-service';

import './App.css';

function App()
{
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ?
        // * rather than immediately navigating to NewOrderPage after login, navigate to logged in user's profile
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/*
             Profile Page will need to know who current user is, provided by props, and then fetch appropriate user profile info based on provided id 
            */}
            <Route path='/users/:id' element={<ProfilePage currUser={user} />} />
            <Route path='/orders/new' element={<NewOrderPage />} />
            <Route path='/orders' element={<OrderHistoryPage />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

export default App;
