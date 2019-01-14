
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

select * from "session";


---


-- V2
drop table if exists users;
drop table if exists blogposts;
drop table if exists admin;

create table admin(
id serial primary key,
username varchar unique,
password varchar);

select * from admin;

create table if not exists users (
id SERIAL primary key,
name varchar(50) not null,
email varchar(50) not null,
picture text,
auth0_id text
);

select * from users;

create table if not exists blogposts(
id serial primary key,
auth0_id text,
date TIMESTAMP,
title text,
image_url text[],
blurb text,
itinerary text,
name text
); 

insert into blogposts(auth0_id, date, title, image_url, blurb, itinerary, name)
values
('github|28162481', '2017-12-22 19:10:25', 'Patagonia', '{https://s25910.pcdn.co/wp-content/uploads/2016/10/Budget-Travel-In-Patagonia-Feature-Glacier.jpg, https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/02/fitzroy.jpg}','this trip was so much fun', 'this is my suggested itinerary', 'tiffz'),
('github|28162481', '2018-05-22 20:14:26', 'Tokyo', '{https://cdn.japantimes.2xx.jp/wp-content/uploads/2015/07/n-kinki-z-20150725-870x581.jpg, https://c-lj.gnst.jp/public/article/detail/a/00/02/a0002644/img/basic/a0002644_main.jpg?20181011145022}', 'tokyo was amazing', 'my mock itinerary!', 'tiffz'),
('github|28162481', '2016-12-29 06:47:54', 'Budapest', '{https://www.nationalgeographic.com/content/dam/travel/Guide-Pages/europe/budapest-travel.adapt.1900.1.jpg, http://adventuredaze.com/wp-content/uploads/2016/07/Travel-Budapest-Hungary.jpg}', 'sparty was wild!!', 'heres what i did for 3 days in budapest', 'tiffz'),
('github|39362114', '2018-12-29 14:29:22', 'Maine', '{https://i.ytimg.com/vi/R4wKm8OiEWw/maxresdefault.jpg, https://assets.vogue.com/photos/5b7df6b572286a04fe978eaf/master/pass/05-travle-guide-to-mount-desert-island-in-maine.jpg, http://adventuresportsjournal.com/wp-content/uploads/2012/10/EarthTalkMaineNationalPark.jpg}', 'it was alright', 'we did nothing', 'Sam R.'),
('github|39362114', '2019-01-03 17:34:35', 'Phoenix', '{https://odis.homeaway.com/odis/destination/49c069bb-8a54-4ded-81f0-e463ef6c66da.hw1.jpg, https://static.dezeen.com/uploads/2017/12/phoenix-arizona-metropolitan-sprawl-desert_dezeen_hero1-852x479.jpg, https://www.cousinsmainelobster.com/wp-content/uploads/2017/06/phoenix_new.png}', 'weekend trip and excited to share with you all', 'here is the itinerary we did. feel free to follow', 'Sam R.');


select * from blogposts order by date desc;
select * from blogposts where auth0_id='github|39362114' ORDER BY date desc;


drop table if exists users_info;

create table users_info(
user_id serial primary key,
city text,
about text,
twitter text,
instagram text
);

insert into users_info(user_id, city, about, twitter, instagram)
values(1, 'San Francisco', 'Hello my name is Tiffany and I love to travel', 'twitter.com/tiffz__', 'instagram.com/tiffz_')


select * from users_info;
