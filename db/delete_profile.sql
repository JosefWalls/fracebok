DELETE FROM cars WHERE user_id = $1;
DELETE FROM laps WHERE user_id = $1;
DELETE FROM photos WHERE user_id = $1;
DELETE FROM session WHERE user_id = $1;
DELETE FROM tracks WHERE user_id = $1;
DELETE FROM users WHERE user_id = $1