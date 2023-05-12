import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditProfilePage({ loggedInUser })
{
    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() =>
    {
        if (loggedInUser._id !== userId)
            navigate('/')
    }, [])

    return (
        <div>Edit Profile Page</div>
    )
}