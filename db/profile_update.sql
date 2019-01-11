update users_info
set
about_me = $2,
twitter =  $3,
instagram = $4
where profileId = $1