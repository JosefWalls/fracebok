const getUser = async (req, res) => {
    const {id} = req.session.user
    const db = req.app.get("db")
    // console.log(id)
    const userProfile = await db.get_user_profile([id])
    .then(response => {
        res.status(200).json(response)
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
    // console.log(userProfile)
}


module.exports = {
    getUser
}