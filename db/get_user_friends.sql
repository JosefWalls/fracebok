SELECT DISTINCT U.user_id, U.username, F.friend_id, F.user_id, U.profile
FROM users U
INNER JOIN friends AS F ON U.user_id = F.user_id
WHERE U.user_id = $1
ORDER BY u.username DESC