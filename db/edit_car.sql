UPDATE cars
SET make = $1, model = $2, year = $3 , image = $4
WHERE car_id = $5;