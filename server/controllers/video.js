const addVideo = async (req, res) => {
    const {link} = req.body;
    const {id}= req.session.user;
    const db = req.app.get("db");
    const image = db.add_video(link, id)
    res.status(200).json(image)
}


module.exports = {
    addVideo
}