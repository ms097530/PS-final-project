import { Link } from 'react-router-dom'

export default function Friend({ friend, isCompact })
{
    const content = (
        <>
            <Link to={`/users/${friend._id}`}>
                <img src={friend.profile.profileImgUrl}
                    alt={`${friend.name} profile`}
                    title={`${friend.name}`} />
            </Link>
            {!isCompact && 'INFO'}
        </>
    )

    return (
        <div>
            {content}
        </div>
    )
}
