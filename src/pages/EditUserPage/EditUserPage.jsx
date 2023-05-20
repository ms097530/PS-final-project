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

    const handleChange = (val, name) =>
    {
        setProfileInfo(prevInfo => { return { ...prevInfo, [name]: val } })
    }

    const submitChanges = (e) =>
    {

    }

    return (
        <>
            <div>Edit Profile Page</div>
            <Quill theme="snow" name="headline" value={profileInfo.headline} onChange={(value) => handleChange(value, 'headline')} style={{ marginBottom: '2rem' }} placeholder='Your headline here...' modules={{ toolbar: { link: false } }} />
            {Parser(profileInfo.headline)}
            <Quill theme="snow" name="about" value={profileInfo.about} onChange={(value) => handleChange(value, 'about')} style={{ marginBottom: '2rem' }} placeholder='All about you...' modules={{ toolbar: { link: false } }} />

            <button onClick={submitChanges}>Update</button>
        </>
    )
}