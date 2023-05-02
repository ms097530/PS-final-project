module.exports = function (req, res, next)
{
    if (req.params.userId === req.params.friendId)
    {
        return res.json('You can not do this operation on yourself')

    }
    else
    {
        next()
    }
}