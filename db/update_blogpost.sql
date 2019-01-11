update blogposts
set 
 date = $2,
 title = $3, 
 image_url=$4, 
 blurb=$5, 
 itinerary=$6
where id = $1;