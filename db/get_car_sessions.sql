SELECT DISTINCT C.make, C.model, C.year, C.car_id, L.session_id, L.header , S.session_id, L.user_id
FROM laps L
INNER JOIN session AS S ON L.session_id = S.session_id
INNER JOIN cars AS C ON L.car_id = C.car_id
WHERE C.car_id = $1
AND L.user_id = $2