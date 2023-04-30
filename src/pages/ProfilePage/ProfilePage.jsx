import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserInfo } from '../../utilities/users-service'


export default function ProfilePage({ loggedInUser })
{
    // TODO: fetch profile page data and conditionally render different portions based on whether it matches the currently logged in user
    const [profile, setProfile] = useState(null)
    const { userId } = useParams()

    useEffect(() =>
    {
        async function fetchProfileInfo()
        {
            const thisUserProfile = await getUserInfo(userId)
            console.log('FETCHING PROFILE INFO')
            console.log(thisUserProfile)
            setProfile(thisUserProfile)
        }
        fetchProfileInfo()
    }, [userId])

    const userProfile = (
        <h2>{profile?.user?.name}</h2>
    )

    const loader = <h2>Loading...</h2>

    return (
        <div>
            <h1>Profile Page</h1>
            {
                profile ? userProfile : loader
            }
        </div>
    )
}
