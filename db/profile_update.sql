update users_info
set
city = $2,
about = $3,
twitter = $4,
instagram = $5
where user_id = $1