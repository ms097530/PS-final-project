import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ loggedInUser })
{
    const navigate = useNavigate()
    const inputRef = useRef(null)

    const handleSubmit = (e) =>
    {
        e.preventDefault()
        console.log('SEARCHING')
        navigate(`/users/search?find=${inputRef.current.value}`)
    }
    return (
        <form action="" onSubmit={handleSubmit}>
            <input type="search" name="" id="" ref={inputRef} />
        </form>
    )
}
