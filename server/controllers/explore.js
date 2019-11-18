const searchAllUsers = async (req, res) => {
    const {username} = req.body;
    const db = req.app.get("db")
    const results = await db.retrieve_specific_users(username)
    res.status(200).json(results)
}

const getAllUsers = async (req, res) => {
    const db = req.app.get("db")
    const users = await db.retrieve_all_users()
    res.status(200).json(users)
}

const getUserProfile = async (req, res) => {
    const user_id = +req.params.user_id;
    const db = req.app.get("db")
    const profile = await db.retrieve_user_profile(user_id)
    res.status(200).json(profile)
}

const addFriend = async (req, res) => {
    const {id} = req.session.user
    console.log(id)
    const friend_id = +req.params.user_id;
    const db = req.app.get("db");
    db.add_friend(id, friend_id)
    res.status(200).json("Friend Added")
}

const userGarage = async (req, res) => {
    const user_id = +req.params.user_id;
    const db = req.app.get("db");
    const userGarage = await db.retrieve_user_garage(user_id);
    res.status(200).json(userGarage)
}

module.exports = {
    searchAllUsers,
    getAllUsers,
    getUserProfile,
    addFriend,
    userGarage
}