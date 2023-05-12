import { useState } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './pages/AuthPage/AuthPage';
import NavBar from './components/NavBar/NavBar';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import FriendRequestsPage from './pages/FriendRequestsPage/FriendRequestsPage'
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import EditUserPage from './pages/EditUserPage/EditUserPage'

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
            <Route path='/users/:userId/friends' element={<FriendsPage loggedInUser={user} />} />
            <Route path='/users/:userId/requests' element={<FriendRequestsPage loggedInUser={user} />} />
            <Route path='/users/:userId' element={<ProfilePage loggedInUser={user} />} />
            <Route path='/users/search' element={<SearchResultsPage />} />
            <Route path='/users/:userId/edit' element={<EditUserPage loggedInUser={user} />} />

            <Route path="*" element={<Navigate to={`/users/${user._id}`} />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

export default App;
