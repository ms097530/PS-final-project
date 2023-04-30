import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUserInfo } from '../../utilities/users-service'

export default function Friend({ friendId, isCompact })
{
    const [friendProfile, setFriendProfile] = useState(null)

    useEffect(() =>
    {
        async function fetchProfileInfo()
        {
            const thisFriendProfile = await getUserInfo(friendId)
            console.log('FETCHING PROFILE INFO')
            console.log(thisFriendProfile)
            setFriendProfile(thisFriendProfile)
        }
        fetchProfileInfo()
    }, [friendId])

    const content = (
        <>
            <Link to={`/users/${friendId}`}>
                <img src={friendProfile?.bannerImgUrl}
                    alt={`${friendProfile?.user?.name} profile`}
                    title={`${friendProfile?.user?.name}`} />
            </Link>
            {!isCompact && 'INFO'}
        </>
    )

    return (
        <div>
            {
                friendProfile && content
            }
        </div>
    )
}
