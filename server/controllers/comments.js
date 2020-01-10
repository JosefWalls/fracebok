const addPhotoComment = async (req, res) => {
    const db = req.app.get("db");
    const currentTime = new Date();
    const commentorId = +req.session.user.id;
    const photoId = +req.params.photo_id;
    const {body} = req.body;
    const category = "Photo"
    await db.comment_add_photos(commentorId, body, category, photoId, currentTime)
    res.status(200).json("Photo added ")
}

const viewPhotoComments = async (req, res) => {
    const db = req.app.get("db");
    const photoId = +req.params.photo_id;
    console.log(photoId)
    const comments = await db.comment_view_photos([photoId])
    res.status(200).json(comments)
}

const addRaceComment = async (req, res) => {
    const db = req.app.get("db");
    const raceId = +req.params.session_id;
    const commentorId = +req.session.user.id;
    const {body} = req.body;
    const category = "Race";
    const date = new Date();
    await db.comment_add_race(commentorId, body, category, raceId, date);
    res.status(200).json("Comment posted")
}

const viewRaceComments = async (req, res) => {
    const db = req.app.get("db");
    const raceId = +req.params.session_id;
    console.log(raceId)
    const comments = await db.comment_view_races(raceId);
    res.status(200).json(comments)
}

module.exports = {
    addPhotoComment,
    viewPhotoComments,
    addRaceComment,
    viewRaceComments
}