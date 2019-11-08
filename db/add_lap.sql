BEGIN;
INSERT INTO laps (time, track_id, car_id , header, session_id, user_id)
    VALUES ($1, $2, $3, $4, $5, $6);
COMMIT;