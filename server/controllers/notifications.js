const unseenPhotoCommentNotification = async (req, res) => {
    const db = req.app.get("db");
    const {id} = req.session.user;
    const comments = await db.notification_unseen_photo_comment(id)
    res.status(200).json(comments)
}

const seenPhotoCommentNotifications = async (req, res) => {
    const db = req.app.get("db");
    const postId = +req.params.post_id;
    const addSeen = await db.notifications_seen_photo_comments(postId);
    res.json("Post updated to seen")
}

const unseenRaceCommentNotification = async (req, res) => {
    const db = req.app.get("db");
    console.log(req.session.user.id)
    const {id} = req.session.user;
    const comments = await db.notification_unseen_race_comment(id);
    res.status(200).json(comments)
}

const seenRaceCommentNotifications = async (req, res) => {
    const db = req.app.get("db")
    const postId = +req.params.post_id;
    const addSeen = await db.notifications_seen_race_comments(postId);
    res.json("Comments seen ")
}

module.exports = {
    unseenPhotoCommentNotification,
    seenPhotoCommentNotifications,
    unseenRaceCommentNotification,
    seenRaceCommentNotifications
}