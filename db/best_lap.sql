SELECT time 
FROM laps 
WHERE session_id = $1
ORDER BY time ASC
LIMIT 1