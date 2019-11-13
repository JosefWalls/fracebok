DELETE FROM tracks WHERE track_id =$1;
DELETE FROM laps WHERE track_id = $1;