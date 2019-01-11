
select * from users
join users_info 
on users_info.user_id = users.id
where users.id = $1;