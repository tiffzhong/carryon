insert into admin (username, password) values ($1, $2)
returning *;
