const addTrack = async(req, res) => {
    const {track_name, turns, length} = req.body;
    const {id} = req.session.user;
    const db = req.app.get("db")
    const tracks = await db.add_track(track_name, turns, id, length);
    res.status(200).json(tracks)
}

const getUserTracks = async(req, res) => {
    const {id} = req.session.user;
    const db = req.app.get("db")
    const tracks = await db.get_user_tracks(id)
    res.status(200).json(tracks)
}

module.exports = {
    addTrack,
    getUserTracks
}