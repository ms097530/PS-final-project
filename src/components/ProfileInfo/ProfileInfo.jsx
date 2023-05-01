import React from 'react'
import Friends from '../Friends/Friends'

export default function ProfileInfo({ profile })
{
    return (
        <>
            <div>
                <img src={profile?.profileImgUrl}
                    alt={`${profile?.user.name} profile`} />
            </div>
            <h2>
                {profile?.user?.name}
            </h2>
            <h2>
                {profile?.headline}
            </h2>
            <Friends userId={profile.user._id} isCompact={true} />
        </>
    )
}
