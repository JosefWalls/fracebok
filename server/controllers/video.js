const addVideo = async (req, res) => {
    const {link, description, title} = req.body;
    const {id}= req.session.user;
    const db = req.app.get("db");
    console.log(description)
    const image = db.add_video(link, id, description, title)
    res.status(200).json(image)
}

const getVideos = async (req, res) => {
    const {id} = req.session.user
    const db = req.app.get("db")
    const videos = await db.get_user_videos(id)
    res.status(200).json(videos)
}

const getVideo = async (req, res) => {
    const video_id = +req.params.video_id;
    const db = req.app.get("db")
    const video = await db.get_video(video_id)
    res.status(200).json(video)
}

const deleteVideo = async (req, res) => {
    const video_id = +req.params.video_id;
    const db = req.app.get("db")
    const video = await db.delete_video(video_id)
    res.status(200).json("Video Deleted")
}

module.exports = {
    addVideo,
    getVideos,
    getVideo,
    deleteVideo
}