import React from 'react'
import { useNavigate } from 'react-router-dom'
import { addFriend, sendFriendRequest, removeFriend, removeFriendRequest } from '../../utilities/users-service'

export default function FriendActionButton({ loggedInUser, profileId, friendRequestStatus })
{
    const { areFriends, requestStatus, from } = friendRequestStatus
    const navigate = useNavigate()

    // ? if not friends, show "Add friend"
    // ? if friends already, show "Unfriend"
    // ? if friend request sent, show "Pending"
    // ? if friend request received, show "Accept"
    let btnText, btnAction
    if (areFriends)
    {
        btnText = 'Unfriend'
        btnAction = removeFriend
    }
    else if (requestStatus === false)
    {
        btnText = 'Add Friend'
        btnAction = sendFriendRequest
    }
    else if (from === loggedInUser._id)
    {
        btnText = 'Pending'
        btnAction = removeFriendRequest
    }
    else
    {
        btnText = 'Accept'
        btnAction = addFriend
    }

    const handleClick = async () =>
    {
        const result = await btnAction(loggedInUser._id, profileId)
        console.log(result)
        navigate(0)
    }

    // onClick functionality should vary based on determined status - change what is sent to sendRequest
    return (
        <button onClick={handleClick}>
            {btnText}
        </button>
    )
}
