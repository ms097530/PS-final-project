import { Link } from 'react-router-dom'
import styles from './User.module.css'

export default function User({ user, isCompact })
{
    const content = (
        <>
            <Link to={`/users/${user._id}`}>
                <img className={`${styles.userImg} ${isCompact ? styles.compact : styles.normal}`}
                    src={user.profile.profileImgUrl}
                    alt={`${user.name} profile`}
                    title={`${user.name}`} />
            </Link>
            {
                !isCompact &&
                <h3>{user.name}</h3>
            }
        </>
    )

    return (
        <div>
            {content}
        </div>
    )
}
