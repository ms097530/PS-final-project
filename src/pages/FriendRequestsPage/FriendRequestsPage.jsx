import React from 'react'
import { useState, useEffect } from 'react'
import { getUserInfo } from '../../utilities/users-service'
import Friend from '../../components/Friend/Friend'

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
                    : friendRequests.map(friendRequest => <Friend key={friendRequest.from._id} friend={friendRequest.from} isCompact={false} />)
            }
        </div>
    )
}
