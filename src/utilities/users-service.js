// * We will use a src/utilities/users-service.js module to organize functions used to sign-up, log in, log out, etc.

//* SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)

//* handleSubmit <--> [signUp]-users-service <--> [signUp]-users-api <-Internet-> server.js (Express)

import * as usersApi from './users-api';

//* Get Token
export function getToken()
{
    const token = localStorage.getItem('token');
    // if there is no token
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    // console.log(payload);

    // if token is expired
    if (payload.exp < Date.now() / 1000)
    {
        localStorage.removeItem('token');
        return null;
    }

    // token is valid
    return token;

}

//* Get User
export function getUser()
{
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

//* SignUp
export async function signUp(userData)
{
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    // console.log('[From SignUP function]', userData);
    const token = await usersApi.signUp(userData);
    // saves token to localStorage
    localStorage.setItem('token', token);

    return getUser();
}

//* LogOut
export function logOut()
{
    localStorage.removeItem('token')
}

export async function login(credentials)
{
    const token = await usersApi.login(credentials)
    localStorage.setItem('token', token);
    return getUser();
}

export function getUserInfo(userId, query = '')
{
    return usersApi.getUserInfo(userId, query)
}

export function editUser(userId, payload)
{
    console.log('EDITING USER')
    console.log(userId, payload)
}

export function addFriend(userId, friendId)
{
    return usersApi.addFriend(userId, friendId)
}

export function removeFriend(userId, friendId)
{
    return usersApi.removeFriend(userId, friendId)
}

export function sendFriendRequest(userId, friendId)
{
    return usersApi.sendFriendRequest(userId, friendId)
}

export function removeFriendRequest(userId, friendId)
{
    return usersApi.removeFriendRequest(userId, friendId)
}

export function userSearch(name)
{
    return usersApi.userSearch(name)
}


export async function checkToken()
{
    return usersApi.checkToken().then(dateStr => new Date(dateStr))
}