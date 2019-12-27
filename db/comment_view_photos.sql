SELECT U.username, U.profile, C.body, C.date
FROM users U 
INNER JOIN comments AS C ON U.user_id = C.commentor
WHERE C.category = 'Photo' AND postId = $1