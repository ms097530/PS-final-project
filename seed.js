require('dotenv').config();
require('./config/database');

const User = require('./models/user');
const Profile = require('./models/profile');
const Friend = require('./models/friend');
const FriendRequest = require('./models/friendRequest');

(async function ()
{
    const BANNER_DEFAULT = 'https://www.gravitasgroup.com.sg/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBKzBiQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--a75c21e39787f4cd3f6f664b4bc568012b4e691c/banner-default.jpg'

    // clean up DB
    await User.deleteMany()
    await Profile.deleteMany()
    await Friend.deleteMany()
    await FriendRequest.deleteMany()

    const users = await User.create([
        { name: 'Bob Dob', email: 'bob@dob.com', password: '123' },
        { name: 'Test Testerson', email: 'test@test.com', password: '123' },
        { name: 'George of the Jungle', email: 'watchout@forthattree.com', password: '123' },
        { name: 'Kamina', email: 'whodoyou@thinkiam.com', password: '123' },
        { name: 'Rick Astley', email: 'old@time.com', password: '123' },
        { name: 'Optimus Prime', email: 'oprime@rollout.com', password: '123' },
        { name: 'Saeko Mukoda', email: 'sacchan@muko.com', password: '123' },
        { name: 'Simon', email: 'drill@heavens.com', password: '123' },
        { name: 'Ichiban Kasuga', email: 'arakawa4ever@hero.com', password: '123' }
    ])

    const profiles = await Profile.create([
        { user: users[0]._id, profileImgUrl: 'https://www.pngkit.com/png/detail/399-3999228_random-guy-pixel-art.png', bannerImgUrl: BANNER_DEFAULT },
        { user: users[1]._id, profileImgUrl: 'https://www.shutterstock.com/image-photo/male-scientist-doing-scientific-experiment-260nw-163057715.jpg', bannerImgUrl: BANNER_DEFAULT },
        { user: users[2]._id, profileImgUrl: 'https://www.usmagazine.com/wp-content/uploads/2022/12/Brendan-Fraser-Reveals-He-Starved-Himself-While-Filming-George-of-the-Jungle-My-Brain-Was-Misfiring-749.jpg?w=1200&quality=86&strip=all', bannerImgUrl: BANNER_DEFAULT },
        { user: users[3]._id, profileImgUrl: 'https://ih1.redbubble.net/image.325497984.2626/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg', bannerImgUrl: BANNER_DEFAULT },
        { user: users[4]._id, profileImgUrl: 'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2Fe6496bba-3356-11ec-91da-063c6e372e74.jpg?crop=2667%2C1500%2C0%2C0', bannerImgUrl: BANNER_DEFAULT },
        { user: users[5]._id, profileImgUrl: 'https://heroichollywood.com/wp-content/uploads/2018/12/Optimus-Prime-Transformers.jpg', bannerImgUrl: BANNER_DEFAULT },
        { user: users[6]._id, profileImgUrl: 'https://pbs.twimg.com/media/FluQSYAWYAE9inQ.jpg', bannerImgUrl: BANNER_DEFAULT },
        { user: users[7]._id, profileImgUrl: 'https://static.wikia.nocookie.net/gurennlagann/images/8/8e/Simon_the_Digger_001.jpeg/revision/latest?cb=20150803204959', bannerImgUrl: BANNER_DEFAULT },
        { user: users[8]._id, profileImgUrl: 'https://www.gamespot.com/a/uploads/original/1601/16018044/4006454-ichiban-1.jpg', bannerImgUrl: BANNER_DEFAULT }
    ])

    users[0].profile = profiles[0]._id
    users[1].profile = profiles[1]._id
    users[2].profile = profiles[2]._id
    users[3].profile = profiles[3]._id
    users[4].profile = profiles[4]._id
    users[5].profile = profiles[5]._id
    users[6].profile = profiles[6]._id
    users[7].profile = profiles[7]._id
    users[8].profile = profiles[8]._id

    await users[0].save()
    await users[1].save()
    await users[2].save()
    await users[3].save()
    await users[4].save()
    await users[5].save()
    await users[6].save()
    await users[7].save()
    await users[8].save()

    const friends = await Friend.create([
        { user_1: users[0]._id, user_2: users[1]._id },
        { user_1: users[3]._id, user_2: users[7]._id },
        { user_1: users[3]._id, user_2: users[5]._id },
        { user_1: users[4]._id, user_2: users[0]._id },
        { user_1: users[4]._id, user_2: users[1]._id },
        { user_1: users[8]._id, user_2: users[6]._id }
    ])

    // Bob Dob wants to be friends with everyone
    const friendRequests = await FriendRequest.create([
        { from: users[0]._id, to: users[2]._id },
        { from: users[0]._id, to: users[3]._id },
        { from: users[0]._id, to: users[4]._id },
        { from: users[0]._id, to: users[5]._id },
        { from: users[0]._id, to: users[6]._id },
        { from: users[0]._id, to: users[7]._id },
        { from: users[0]._id, to: users[8]._id },
    ])

    console.log(users)
    console.log(profiles)
    console.log(friends)
    console.log(friendRequests)

    console.log('end of seed')
    process.exit()
})()