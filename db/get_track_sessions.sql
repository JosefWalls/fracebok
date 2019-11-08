SELECT l.track_id, l.car_id, l.user_id, t.track_name, l.session_id
FROM laps AS l
INNER JOIN tracks AS t ON l.track_id = t.track_id
WHERE l.track_id = $1;