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

const viewCar = async (req, res) => {
    const car_id = +req.params.car_id;
    const db = req.app.get("db");
    console.log(req.params)
    const car = await db.view_car(car_id);
    res.status(200).json(car[0])
}

const deleteCar = async (req, res) => {
    const car_id = +req.params.car_id;
    const db = req.app.get("db")
    const car = await db.delete_car(car_id);
    res.status(200).json("Deleted")
}

const editCar = async (req, res) => {
    const {make, model, year, image} = req.body;
    const car_id = +req.params.car_id;
    const db = req.app.get("db")
    const car = await db.edit_car(make, model, year, image, car_id);
    res.status(200).json("success")
}

module.exports = {
    addCar,
    getUserCars,
    viewCar,
    deleteCar,
    editCar
}