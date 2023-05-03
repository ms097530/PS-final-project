import React from 'react'
import { useState, useEffect } from 'react'
import { getUserInfo } from '../../utilities/users-service'
import User from '../../components/User/User'

export default function FriendRequestsPage({ loggedInUser })
{
    const [friendRequests, setFriendRequests] = useState([])

    useEffect(() =>
    {
        async function getFriendRequests()
        {
            const foundRequests = await getUserInfo(loggedInUser._id, 'type=freq')
            const requestsToUser = foundRequests.filter(request => request.to === loggedInUser._id)
            setFriendRequests(requestsToUser)
        }
        getFriendRequests()
    }, [loggedInUser])

    return (
        <div>
            {
                friendRequests.length <= 0 ? <h2>No friend requests found</h2>
                    : friendRequests.map(friendRequest => <User key={friendRequest.from._id} user={friendRequest.from} isCompact={false} />)
            }
        </div>
    )
}
