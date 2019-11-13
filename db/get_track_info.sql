SELECT DISTINCT T.length
FROM tracks T
INNER JOIN laps AS L on T.track_id = L.track_id
WHERE session_id = $1