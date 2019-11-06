require("dotenv").config();
const express = require ("express");
const sessions = require("express-session");
const massive = require("massive");
const app = express();

//controllers
const lR = require("./controllers/loginRegister")
const pR = require("./controllers/profile")
const gR = require("./controllers/garage")

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

app.listen(4201, () => console.log("Port 4201"))