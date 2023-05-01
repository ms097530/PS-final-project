import { useState, useEffect } from 'react'
import Friends from '../Friends/Friends'
import { getUserInfo } from '../../utilities/users-service'

export default function ProfileInfo({ loggedInUser, profile })
{
    /* 
        TODO: friend button into component that needs current logged in user ID and another ID as props - could be used
        TODO: in SearchResultsPage to display button to send requests next to users based on relationship with loggedInUser
    */

    const [areFriends, setAreFriends] = useState(null)
    const [friendRequestExists, setFriendRequestExists] = useState(null)

    const isUsersProfile = loggedInUser._id === profile.user._id

    useEffect(() =>
    {
        async function fetchFriendInfo()
        {
            const friendInfo = await getUserInfo(loggedInUser._id, `type=fr&friend=${profile.user._id}`)
            // console.log('friend info:', friendInfo)
            setAreFriends(friendInfo)
        }

        async function fetchFriendRequestInfo()
        {
            const friendRequestInfo = await getUserInfo(loggedInUser._id, `type=freq&user=${profile.user._id}`)
            // console.log('friend request info:', friendRequestInfo)
            setFriendRequestExists(friendRequestInfo)
        }

        // check if users are friends or have friend requests between them
        if (!isUsersProfile)
        {
            fetchFriendInfo()
            fetchFriendRequestInfo()
        }
    }, [loggedInUser, profile, isUsersProfile])

    // console.log(isUsersProfile)
    // button representing current friendship state
    // ? if not friends, show "Add friend"
    // ? if friends already, show "Unfriend"
    // ? if friend request sent, show "Pending"
    // ? if friend request received, show "Accept"
    let btnText
    if (areFriends)
        btnText = 'Unfriend'
    else if (friendRequestExists.status === 'false')
        btnText = 'Add Friend'
    else if (friendRequestExists.from === loggedInUser._id)
        btnText = 'Pending'
    else
        btnText = 'Accept'


    const friendBtn =
        (
            <button>
                {btnText}
            </button>
        )

    return (
        <>
            <div>
                <img src={profile?.profileImgUrl}
                    alt={`${profile?.user.name} profile`} />
            </div>
            <div>
                {!isUsersProfile && friendBtn}
            </div>
            <h2>
                {profile?.user?.name}
            </h2>
            <h2>
                {profile?.headline}
            </h2>
            <Friends userId={profile.user._id} isCompact={true} />
        </>
    )
}
