const addImage = async (req, res) => {
    const {link, description, title} = req.body;
    const {id}= req.session.user;
    const db = req.app.get("db");
    const photoId = Math.random() * 25997888
    const image = db.add_photo(link, description, title, id, photoId)
    res.status(200).json(image)
}

module.exports = {
    addImage
}