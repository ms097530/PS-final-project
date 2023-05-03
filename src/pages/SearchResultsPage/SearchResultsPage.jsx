import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import User from '../../components/User/User'
import { userSearch } from '../../utilities/users-service'

export default function SearchResultsPage()
{
    const [users, setUsers] = useState(null)
    const searchParams = useSearchParams()[0]

    useEffect(() =>
    {
        async function searchUsers()
        {
            // start chain to request data from search
            const searchResults = await userSearch(searchParams.get('name'))
            console.log(searchResults)
            setUsers(searchResults)
        }
        searchUsers()
    }, [searchParams])

    return (
        <div>
            <h2>Search results for "{searchParams.get('name')}"</h2>
            {
                users === null ? <p>Loading...</p> :
                    users.length <= 0 ? <p>No results found</p> :
                        users.map(user => <User key={user._id} user={user} isCompact={false} />)
            }
        </div>
    )
}
