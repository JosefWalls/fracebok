let counter = []
let track = 0

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
    const {time, track_id, car_id, session_id, header, firstTime} =  req.body;
    const db = req.app.get("db")
    const lap = await db.add_lap(time, track_id, car_id, header, session_id, id);
    if(firstTime) {
        await db.add_session(session_id, id)
    }
    res.status(200).json(lap)
}

const getTrackSessions = async (req, res) => {
    const track_id = +req.params.track_id;
    const {id} = req.session.user
    const db = req.app.get("db");
    console.log(id)
    const trackSessions = await db.get_track_sessions(track_id, id)
    res.status(200).json(trackSessions)
}


const getSessionDetails = async (req, res) => {
    const session_id = +req.params.session_id
    const db = req.app.get("db")
    const details = await db.get_session_details(session_id)
    res.status(200).json(details)
    counter = []
    track = 0
}

const getSessionLength = async (req, res) => {
    const session_id = +req.params.session_id
    const db = req.app.get("db")
    const details = await db.get_session_details(session_id)
    for( i = 0; i < details.length; i++){
        track++
        counter.push("Lap " + track)
    }
    res.status(200).json(counter)
}

const getBestLap = async (req, res) => {
    const session_id = +req.params.session_id;
    const db = req.app.get("db")
    const results = await db.best_lap(session_id)
    res.status(200).json(results)
    
}

module.exports = {
    addTrack,
    getUserTracks,
    addLap,
    getTrackSessions,
    getSessionDetails,
    getBestLap,
    getSessionLength
}


