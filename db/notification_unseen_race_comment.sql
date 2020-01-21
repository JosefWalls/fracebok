SELECT  s.session_id, c.category, c.postid, c.date, c.body
FROM session S
INNER JOIN comments AS c ON c.postid = s.session_id
WHERE seen = 'False' AND s.user_id = $1 AND category = 'Race'