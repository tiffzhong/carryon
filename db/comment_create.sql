insert into blogpost_comments 
(comment_id, user_id, comment_body, blogpost_id)
values ($1, $2, $3, $4);