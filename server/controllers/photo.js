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

const deletePhoto = async (req, res) => {
    const photo_id = +req.params.photo_id;
    const db = req.app.get("db")
    const results = db.delete_photo(photo_id)
    res.status(200).json("Deleted Image")
}

const editPhoto = async (req, res) => {
    const {link, description, title} = req.body;
    const photoId = +req.params.photo_id
    const db = req.app.get("db")
    console.log(photoId)
    const results = db.edit_photo(link, description, title, photoId)
    res.status(200).json("Photo Edited")
}

const addComment = async (req, res) => {
    const {content} = req.body;
    const photo_id = +req.params.photo_id;
    const {id} = req.session.user;
    const db = req.app.get("db");
    const post = await db.add_photo_comment(photo_id, id, content)
    res.status(200).json("Comment Added")
}

module.exports = {
    addImage,
    getUserImages,
    getPhoto,
    deletePhoto,
    editPhoto,
    addComment
}