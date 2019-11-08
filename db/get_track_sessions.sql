SELECT DISTINCT l.session_id, l.header, l.car_id, c.make, c.year ,l.user_id
FROM laps l
INNER JOIN cars AS c ON c.car_id = l.car_id
WHERE track_id = $1
AND l.user_id = $2