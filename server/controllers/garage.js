const addCar = async (req, res) => {
    const {make, model, image, year} = req.body;
    const {id} = req.session.user;
    const db =  req.app.get("db");
    db.add_car(make, model, image, id, year)
    .then(response => {
        console.log(response)
        res.status(200).json(response)
    })
    .catch(error => {
        console.log(error)
    })
}

const getUserCars = async (req, res) => {
    const {id} = req.session.user;
    const db = req.app.get("db");
    db.get_user_cars(id)
    .then(response => {
        console.log(response)
        res.status(200).json(response)
    })
    .catch(error => {
        console.log(error)
    })
}

// const viewCar = async (req, res) => {
//     const {car_id} = req.[a]
// }

module.exports = {
    addCar,
    getUserCars
}