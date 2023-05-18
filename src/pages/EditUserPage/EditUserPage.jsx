import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Quill from 'react-quill'
// import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
// import 'react-quill/dist/quill.bubble.css'
import Parser from 'html-react-parser'


export default function EditProfilePage({ loggedInUser })
{
    const [profileInfo, setProfileInfo] = useState({ headline: '', about: '' })
    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() =>
    {
        if (loggedInUser._id !== userId)
        {
            console.log('redirecting')
            navigate('/')
        }
    }, [loggedInUser, userId, navigate])

    return (
        <>
            <div>Edit Profile Page</div>
            <Quill theme="snow" value={profileInfo.headline} onChange={setProfileInfo} style={{ marginBottom: '2rem' }} placeholder='Your headline here...' modules={{ toolbar: { link: false } }} />
            {Parser(profileInfo.headline)}
            <Quill theme="snow" value={profileInfo.about} onChange={setProfileInfo} style={{ marginBottom: '2rem' }} placeholder='All about you...' modules={{ toolbar: { link: false } }} />
        </>
    )
}