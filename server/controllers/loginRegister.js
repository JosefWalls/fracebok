const bcrypt = require("bcryptjs")

const registerUser = async(req, res) => {
    const {username, password, firstname, profile, header} = req.body;
    const db = req.app.get("db");
    const checkUser = await db.get_user([username])
    if(checkUser.length === 0){
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await db.register_user([username, hashedPassword, firstname, profile, header]);
        console.log(user)
        req.session.user = {
            username,
            firstname
        }
        res.status(200).json(user)
    } else {
        res.status(409).json("Error: The username is already taken")
    }

}

const loginUser = async(req, res) => {
    const {username, password} = req.body;
    const db = req.app.get("db");

    const checkedUser = await db.get_user([username])
    if(checkedUser.length === 0){
        res.status(403).json("Invalid credentials")
    }

    const isMatching = await bcrypt.compare(password, checkedUser[0].password)
    if(isMatching){
        req.session.user = {
            id: checkedUser[0].user_id,
            username: checkedUser[0].username,
            firstname: checkedUser[0].firstname,
        }
         res.status(200).json(req.session.user);
        //  console.log(req.session.user);
         console.log(req.session.user)
        //  res.json(req.session.user)
    } else {
         res.status(402).json("Wrong username or password")
    }
}

const logoutUser = (req, res) => {
    // console.log(req.session.user)
    req.session.destroy();
    res.sendStatus(200)
    console.log(req.session);
    
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser
}