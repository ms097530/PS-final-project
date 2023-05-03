import { Link } from 'react-router-dom'

export default function User({ user, isCompact })
{
    const content = (
        <>
            <Link to={`/users/${user._id}`}>
                <img src={user.profile.profileImgUrl}
                    alt={`${user.name} profile`}
                    title={`${user.name}`} />
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
