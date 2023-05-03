import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SearchBar.module.css'

export default function SearchBar({ loggedInUser })
{
    const navigate = useNavigate()
    const inputRef = useRef(null)

    const handleSubmit = (e) =>
    {
        e.preventDefault()
        if (inputRef.current.value.length > 0)
        {
            navigate(`/users/search?name=${inputRef.current.value}`)
            console.log('SEARCHING')
        }
    }
    return (
        <form action="" onSubmit={handleSubmit} className={styles.SearchBar}>
            <input type="search" name="searchUser" id="searchUser" ref={inputRef} />
        </form>
    )
}
