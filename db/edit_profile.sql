UPDATE users
SET username = $1, firstname = $2, profile = $3, header = $4
WHERE user_id = $5