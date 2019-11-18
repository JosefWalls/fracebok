SELECT DISTINCT L.session_id, L.header, L.car_id, C.make, C.year, L.user_id
FROM laps L
INNER JOIN cars AS C ON c.car_id = l.car_id
WHERE track_id = $1
AND l.user_id = $2