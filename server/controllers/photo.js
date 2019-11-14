const addImage = async (req, res) => {
    const {link, description, title} = req.body;
    const {id}= req.session.user;
    const db = req.app.get("db");
    const photoId = Math.random() * 25997888
    const image = db.add_photo(link, description, title, id, photoId)
    res.status(200).json(image)
}

const getUserImages = async (req, res) => {
    const {id} = req.session.user
    const db = req.app.get("db")
    const results = await db.get_user_photos(id)
    res.status(200).json(results)
}

const getPhoto = async (req, res) => {
    const photo_id = +req.params.photo_id;
    const db = req.app.get("db")
    const image = await db.get_photo(photo_id)
    res.status(200).json(image)
}

module.exports = {
    addImage,
    getUserImages,
    getPhoto
}