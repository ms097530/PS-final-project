import { useState, useEffect } from 'react'
import Friends from '../Friends/Friends'
import FriendActionButton from '../FriendActionButton/FriendActionButton'
import { getUserInfo } from '../../utilities/users-service'
import styles from './ProfileInfo.module.css'

export default function ProfileInfo({ loggedInUser, profile })
{
    /* 
        TODO: friend button into component that needs current logged in user ID and another ID as props - could be used
        TODO: in SearchResultsPage to display button to send requests next to users based on relationship with loggedInUser
    */

    const [areFriends, setAreFriends] = useState(null)
    const [friendRequestExists, setFriendRequestExists] = useState(null)
    // const [isUsersProfile, setIsUsersProfile] = useState(loggedInUser._id === profile.user._id)

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

    return (
        <>
            <div className={styles.imgContainer}>
                <img className={styles.profileImg}
                    src={profile?.profileImgUrl}
                    alt={`${profile?.user.name} profile`} />
            </div>
            <div>
                {
                    // only render if not on users own profile and request data has been retrieved
                    !isUsersProfile && friendRequestExists &&
                    <FriendActionButton
                        loggedInUser={loggedInUser}
                        profileId={profile.user._id}
                        friendRequestStatus={{ ...friendRequestExists, areFriends, requestStatus: friendRequestExists.status }} />
                }
                {
                    // if on own profile, enable editing mode
                    isUsersProfile && <button>Edit</button>
                }
            </div>
            <h2>
                {profile?.user?.name}
            </h2>
            <h2>
                {profile?.headline}
            </h2>

            {/* <div>
                {profile?.faveSongUrl && <audio src={profile.faveSongUrl} type="audio/mpeg" />}
            </div> */}

            <div>
                <h3>FRIENDS</h3>
                <Friends userId={profile.user._id} isCompact={true} />
            </div>
        </>
    )
}
