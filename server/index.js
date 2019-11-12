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


//garage
app.post("/garage/add", gR.addCar)
app.get("/garage/cars", gR.getUserCars)
app.get("/garage/cars/:car_id", gR.viewCar)
app.delete("/garage/cars/:car_id", gR.deleteCar)
app.put("/garage/cars/:car_id", gR.editCar)

//race
app.post("/races/addRace", rR.addTrack)
app.get("/races/tracks", rR.getUserTracks)
app.post("/races/Addlap", rR.addLap)
app.get("/races/:track_id", rR.getTrackSessions)
app.delete("/races/delete/:session_id", rR.deleteRace)
app.put("/races/EditTrack/:track_id", rR.editTrack)

//session
app.get("/session/:session_id", rR.getSessionDetails)
app.get("/session/bestlap/:session_id", rR.getBestLap),
app.get("/session/length/:session_id", rR.getSessionLength)

//photos
app.post("/photos/addImage", photoR.addImage)

app.listen(4201, () => console.log("Port 4201"))