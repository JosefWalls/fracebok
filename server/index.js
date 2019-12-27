
require("dotenv").config();
const express = require ("express");
const sessions = require("express-session");
const massive = require("massive");
const app = express();

//controllers
const lR = require("./controllers/loginRegister")
const pR = require("./controllers/profile")
const gR = require("./controllers/garage")
const rR = require("./controllers/race")
const photoR = require("./controllers/photo")
const eR = require("./controllers/explore")
const vR = require("./controllers/video")
const cR = require("./controllers/comments")

app.use( express.static( `${__dirname}/../build` ) );
// app.use(express.static ("./../build"));

massive(process.env.CONNECTION_STRING)
.then(dbInstance => {
    app.set("db", dbInstance)
    console.log("DB Connected")
})
.catch(error => {
    console.log(error)
})

app.use(sessions({
    secret: "Henlo fam",
    resave: false,
    saveUninitialized: true
}))

app.use(express.json());
//auth
app.post("/auth/register", lR.registerUser)
app.post("/auth/login", lR.loginUser)
app.post("/auth/logout", lR.logoutUser)


//profile
app.get("/api/profile", pR.getUser)
app.put("/api/Editprofile", pR.editProfile)
app.delete("/api/DeleteProfile", pR.deleteProfile)
app.get("/api/Friends", pR.getProfileFriends)


//garage
app.post("/garage/add", gR.addCar)
app.get("/garage/cars", gR.getUserCars)
app.get("/garage/cars/:car_id", gR.viewCar)
app.delete("/garage/cars/:car_id", gR.deleteCar)
app.put("/garage/cars/:car_id", gR.editCar)

//race
app.post("/races/addRace", rR.addTrack)
app.get("/races/tracks", rR.getUserTracks)
app.get("/races/trackInfo/:session_id", rR.trackDetails)
app.post("/races/Addlap", rR.addLap)
app.get("/races/:track_id", rR.getTrackSessions)
app.get("/races/cars/:car_id", rR.getCarSessions)
app.delete("/races/delete/:session_id", rR.deleteRace)
app.put("/races/EditTrack/:track_id", rR.editTrack)
app.delete("/races/DeleteTrack/:track_id", rR.deleteTrack)
app.get("/races/cars/sessions/:car_id", rR.getVisitedTracks)


//session
app.get("/session/:session_id", rR.getSessionDetails)
app.get("/session/bestlap/:session_id", rR.getBestLap),
app.get("/session/length/:session_id", rR.getSessionLength)

//photos
app.put("/photos/EditPhoto/:photo_id", photoR.editPhoto)
app.post("/photos/addImage", photoR.addImage)
app.get("/photos/UserImages", photoR.getUserImages)
app.get("/photos/getImage/:photo_id", photoR.getPhoto)
app.delete("/photos/DeleteImage/:photo_id", photoR.deletePhoto)



//explore
app.get("/Explore/Search/AllUsers", eR.searchAllUsers)
app.get("/Explore/All", eR.getAllUsers)
app.get("/Explore/User/:user_id", eR.getUserProfile)
app.post("/Explore/AddFriend/:user_id", eR.addFriend)
app.get("/Explore/User/Garage/:user_id", eR.userGarage)
app.get("/Explore/User/Tracks/:user_id", eR.userTracks)
app.get("/Explore/User/Sessions/:user_id/:track_id", eR.userTrackSessions)
app.get("/Explore/User/Session/:session_id", eR.sessionDetails)
app.get("/Explore/User/Photos/:user_id", eR.userPhotos)
app.get("/Explore/User/Friends/:user_id", eR.userFriends)
app.get("/Explore/User/Videos/:user_id", eR.userVideos)
app.get("/Explore/User/Video/:video_id", eR.userVideo)

//video
app.post("/Videos/Add", vR.addVideo)
app.get("/Videos", vR.getVideos)
app.get("/Video/:video_id", vR.getVideo)
app.delete("/Videos/Delete/:video_id", vR.deleteVideo)


//comments
app.post("/Comment/Add/Photo/:photo_id", cR.addPhotoComment)
app.get("/Comment/View/Photo/:photo_id", cR.viewPhotoComments)
app.post("/Comment/Add/Race/:session_id", cR.addRaceComment)
app.get("/Comment/View/Race/:session_id", cR.viewRaceComments)

app.listen(4201, () => console.log("Port 4201"))