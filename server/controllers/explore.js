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

const userTracks = async (req, res) => {
    const user_id = +req.params.user_id;
    const db = req.app.get("db")
    const tracks = await db.retrieve_user_tracks(user_id);
    res.status(200).json(tracks)
}

const userTrackSessions = async (req, res) => {
    const user_id = +req.params.user_id
    const track_id = +req.params.track_id
    const db = req.app.get("db")
    const sessions = await db.retrieve_user_track_sessions( track_id, user_id)
    console.log(sessions)
    res.status(200).json(sessions)
}

const sessionDetails = async (req, res) => {
    const session_id = +req.params.session_id;
    const db = req.app.get("db")
    const details = await db.get_session_details(session_id)
    res.status(200).json(details)
}

const userPhotos = async (req, res) => {
    const user_id = +req.params.user_id
    console.log(user_id)
    const db = req.app.get("db")
    const photos = await db.retrieve_user_photos(user_id);
    res.status(200).json(photos)
}

const userFriends = async (req, res) => {
    const user_id = +req.params.user_id;
    const db = req.app.get("db")
    const friends = await db.retrieve_user_friends(user_id)
    res.status(200).json(friends)
}

module.exports = {
    searchAllUsers,
    getAllUsers,
    getUserProfile,
    addFriend,
    userGarage,
    userTracks,
    userTrackSessions,
    sessionDetails,
    userPhotos,
    userFriends
}