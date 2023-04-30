import React from 'react'
import Friend from '../Friend/Friend'

// baseViewCount = how many friends to show by default
// viewStep = how many more friends get shown when clicking "Show more..."
export default function Friends({ friends, isCompact, baseViewCount, viewStep })
{
    return (
        <div>
            {
                friends.length <= 0 ? 'No friends to be found :('
                    : friends.map(friendId => <Friend key={friendId} friendId={friendId} isCompact={isCompact} />)
            }
        </div>
    )
}
