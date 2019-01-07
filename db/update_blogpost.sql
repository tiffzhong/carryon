update blogposts
set user_id=$2, 
 date = $3,
 title = $4, 
 image_url=$5, 
 blurb=$6, 
 itinerary=$7
where id = $1;