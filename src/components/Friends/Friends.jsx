import { useState, useEffect } from 'react'
import { getUserInfo } from '../../utilities/users-service'
import Friend from '../User/User'
import styles from './Friends.module.css'

// baseViewCount = how many friends to show by default
// viewStep = how many more friends get shown when clicking "Show more..."
export default function Friends({ userId, isCompact, baseViewCount, viewStep })
{
    const [friends, setFriends] = useState([])

    useEffect(() =>
    {
        async function fetchFriends()
        {
            const friendPairs = await getUserInfo(userId, 'type=fr')
            console.log('FETCHING FRIENDS INFO')
            console.log(friendPairs)

            const friendsArr = []
            for (let users of friendPairs)
            {
                let friend = users.user_1._id === userId ? users.user_2 : users.user_1
                friendsArr.push(friend)
            }

            setFriends(friendsArr)
        }
        fetchFriends()
    }, [userId])

    return (
        <div className={styles.Friends}>
            {
                friends.length <= 0 ? 'No friends to be found :('
                    : friends.map(friend => <Friend key={friend._id} user={friend} isCompact={isCompact} />)
            }
        </div>
    )
}
