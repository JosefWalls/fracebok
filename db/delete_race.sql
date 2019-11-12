DELETE FROM session WHERE session_id =  $1;
DELETE FROM laps WHERE session_id =  $1