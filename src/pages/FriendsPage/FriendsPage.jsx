import Friends from '../../components/Friends/Friends'

export default function FriendsPage({ loggedInUser })
{
    return (
        <Friends userId={loggedInUser._id} isCompact={false} baseViewCount={10} viewStep={10} />
    )
}
