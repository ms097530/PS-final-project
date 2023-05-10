import React from 'react'
import { useNavigate } from 'react-router-dom'
import { addFriend, sendFriendRequest, removeFriend, removeFriendRequest } from '../../utilities/users-service'

export default function FriendActionButton({ loggedInUser, profileId, friendRequestStatus })
{
    const { areFriends, requestStatus, from } = friendRequestStatus
    const navigate = useNavigate()

    // onClick functionality should vary based on determined status - change what is sent to sendRequest
    // ? if not friends, show "Add friend"
    // ? if friends already, show "Unfriend"
    // ? if friend request sent, show "Pending"
    // ? if friend request received, show "Accept"
    let btnText, btnAction
    // if (loggedInUser._id === profileId)
    // {
    //     btnText = 'Edit'
    //     btnAction = editUser
    // }
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

    const reject = async () =>
    {
        const result = await removeFriendRequest(profileId, loggedInUser._id)
        console.log(result)
        navigate(0)
    }


    return (
        <div>
            <button onClick={handleClick}>
                {btnText}
            </button>

            {
                btnText === 'Accept' &&
                <button onClick={reject}>
                    Decline
                </button>
            }

        </div>
    )
}
