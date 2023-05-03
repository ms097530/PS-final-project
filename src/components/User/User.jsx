import { Link } from 'react-router-dom'
import styles from './User.module.css'

export default function User({ user, isCompact })
{
    const content = (
        <div className={styles.User}>
            <div>
                <Link to={`/users/${user._id}`}>
                    <img className={`${styles.userImg} ${isCompact ? styles.compact : styles.normal}`}
                        src={user.profile.profileImgUrl}
                        alt={`${user.name} profile`}
                        title={`${user.name}`} />
                    {
                        !isCompact &&
                        <h3>{user.name}</h3>
                    }
                </Link>
            </div>
        </div>
    )

    return (
        <div>
            {content}
        </div>
    )
}
