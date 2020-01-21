SELECT  p.photo_id, p.title, c.category, c.postid, p.user_id, c.date, c.body
FROM photos P
INNER JOIN comments AS c ON c.postid = p.photo_id
WHERE seen = 'False' AND p.user_id = $1 AND category = 'Photo'