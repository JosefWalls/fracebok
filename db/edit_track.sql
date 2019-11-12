UPDATE tracks
SET track_name = $1, turns = $2, length = $3
WHERE track_id = $4