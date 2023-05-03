// * The users-service.js module will definitely need to make AJAX requests to the Express server.

import sendRequest from "./sendRequest";

//* SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)

//* handleSubmit <--> [signUp]-users-service <--> [signUp]-users-api <-Internet-> server.js (Express)


const BASE_URL = '/api/users';

//* SignUp
export function signUp(userData)
{
  return sendRequest(BASE_URL, 'POST', userData);
}


//* Login
export function login(credentials)
{
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

//* Retrieve user info
export function getUserInfo(userId, query = '')
{
  query = query ? '?' + query : ''
  return sendRequest(`${BASE_URL}/${userId}${query}`)
}

export function addFriend(userId, friendId)
{
  return sendRequest(`${BASE_URL}/${userId}/friends/${friendId}`, 'POST')
}

export function removeFriend(userId, friendId)
{
  return sendRequest(`${BASE_URL}/${userId}/friends/${friendId}`, 'DELETE')
}

export function sendFriendRequest(userId, friendId)
{
  return sendRequest(`${BASE_URL}/${userId}/requests/${friendId}`, 'POST')
}

export function removeFriendRequest(userId, friendId)
{
  return sendFriendRequest(`${BASE_URL}/${userId}/requests/${friendId}`, 'DELETE')
}

export function userSearch(name)
{
  return sendRequest(`${BASE_URL}?name=${name}`)
}


//* Check Token
export function checkToken()
{
  return sendRequest(`${BASE_URL}/check-token`)
}

