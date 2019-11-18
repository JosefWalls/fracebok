const getUser = async (req, res) => {
    const {id} = req.session.user
    const db = req.app.get("db")
    // console.log(id)
    const userProfile = await db.get_user_profile([id])
    .then(response => {
        res.status(200).json(response)
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
    // console.log(userProfile)
}

const editProfile = async(req, res) => {
    const {username, firstname, profile, header} = req.body;
    const {id} = req.session.user
    const db = req.app.get("db")
    const results = await db.edit_profile(username, firstname, profile, header, id)
    res.status(200).json("Profile Edited")
}

const deleteProfile = async (req, res) => {
    const {id} = req.session.user
    const db = req.app.get("db")
    const results = await db.delete_profile(id)
    res.status(200).json("Profile Deleted")
}

const getProfileFriends = async (req, res) => {
    const {id} = req.session.user
    const db = req.app.get("db")
    const friends = await db.get_user_friends(id)
    console.log(friends)
    res.status(200).json(friends)
}

module.exports = {
    getUser,
    editProfile,
    deleteProfile,
    getProfileFriends
}