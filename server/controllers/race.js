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

const addLap = async(req, res) => {
    const {id} = req.session.user;
    const {time, track_id, car_id, session_id} =  req.body;
    const db = req.app.get("db")
    const lap = await db.add_lap(time, track_id, car_id, session_id, id)
    res.status(200).json(lap)
}

module.exports = {
    addTrack,
    getUserTracks,
    addLap
}