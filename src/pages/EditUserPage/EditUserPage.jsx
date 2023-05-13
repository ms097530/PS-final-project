import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
// import 'react-quill/dist/quill.bubble.css'
import Parser from 'html-react-parser'


export default function EditProfilePage({ loggedInUser })
{
    const [value, setValue] = useState('')
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
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            {Parser(value)}
        </>
    )
}