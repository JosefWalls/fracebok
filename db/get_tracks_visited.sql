SELECT DISTINCT T.track_name
FROM laps L
INNER JOIN tracks AS T ON L.track_id = T.track_id
WHERE car_id = $1