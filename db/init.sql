
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

select * from "session";


---


drop table if exists users;
drop table if exists blogposts;
drop table if exists admin;
drop table if exists newsletter;
drop table if exists users_info;
drop table if exists products cascade;

select * from admin;
select * from users;
select * from blogposts order by date desc;
select * from blogposts where auth0_id='github|39362114' ORDER BY date desc;
select * from newsletter;
select * from users_info;
select * from products;



-- ADMIN
create table admin(
id serial primary key,
username varchar unique,
password varchar);

-- USERS (LOG IN)
create table if not exists users (
id SERIAL primary key,
name varchar(50) not null,
email varchar(50) not null,
picture text,
auth0_id text
);

-- BLOGPOSTS
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

-- USERS_INFO (PROFILE PAGE)
create table users_info(
user_id serial primary key,
city text,
about text,
twitter text,
instagram text
);

-- NEWSLETTER
create table newsletter (
newsletter_id serial primary key,
email text
);

-- PRODUCTS
create table products (
product_id serial primary key,
product_name text,
product_description text,
product_price decimal not null check (product_price >= 0),
product_picture text[],
product_quantity int not null
);




insert into blogposts(auth0_id, date, title, image_url, blurb, itinerary, name)
values
('github|28162481', '2017-12-22 19:10:25', 'Patagonia', '{https://s25910.pcdn.co/wp-content/uploads/2016/10/Budget-Travel-In-Patagonia-Feature-Glacier.jpg, https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/02/fitzroy.jpg}','this trip was so much fun', 'this is my suggested itinerary', 'tiffz'),
('github|28162481', '2018-05-22 20:14:26', 'Tokyo', '{https://cdn.japantimes.2xx.jp/wp-content/uploads/2015/07/n-kinki-z-20150725-870x581.jpg, https://c-lj.gnst.jp/public/article/detail/a/00/02/a0002644/img/basic/a0002644_main.jpg?20181011145022}', 'tokyo was amazing', 'my mock itinerary!', 'tiffz'),
('github|28162481', '2016-12-29 06:47:54', 'Budapest', '{https://www.nationalgeographic.com/content/dam/travel/Guide-Pages/europe/budapest-travel.adapt.1900.1.jpg, http://adventuredaze.com/wp-content/uploads/2016/07/Travel-Budapest-Hungary.jpg}', 'sparty was wild!!', 'heres what i did for 3 days in budapest', 'tiffz'),
('github|39362114', '2018-12-29 14:29:22', 'Maine', '{https://i.ytimg.com/vi/R4wKm8OiEWw/maxresdefault.jpg, https://assets.vogue.com/photos/5b7df6b572286a04fe978eaf/master/pass/05-travle-guide-to-mount-desert-island-in-maine.jpg, http://adventuresportsjournal.com/wp-content/uploads/2012/10/EarthTalkMaineNationalPark.jpg}', 'it was alright', 'we did nothing', 'Sam R.'),
('github|39362114', '2019-01-03 17:34:35', 'Phoenix', '{https://odis.homeaway.com/odis/destination/49c069bb-8a54-4ded-81f0-e463ef6c66da.hw1.jpg, https://static.dezeen.com/uploads/2017/12/phoenix-arizona-metropolitan-sprawl-desert_dezeen_hero1-852x479.jpg, https://www.cousinsmainelobster.com/wp-content/uploads/2017/06/phoenix_new.png}', 'weekend trip and excited to share with you all', 'here is the itinerary we did. feel free to follow', 'Sam R.');

insert into users_info(user_id, city, about, twitter, instagram)
values(1, 'San Francisco', 'Hello my name is Tiffany and I love to travel', 'twitter.com/tiffz__', 'instagram.com/tiffz_')

insert into newsletter(email) values ('tiff@gmail')


insert into products (product_id, product_name, product_description, product_price, product_picture, product_quantity)
values(1, 'Carry On Logo Sticker', 'Share our brand with the world. These look good on your laptop, water bottles, or furniture!', 2.00, '{https://i.imgur.com/wTAzqTP.png, https://i.imgur.com/7opiRPe.png}', 800 ),
(2,'Large Duffel Bag', 'This all-weather large duffel bag is made to hold anything and everything. Durable for your short and long term travel trips.', 22.00, '{https://i.imgur.com/3uJGyP8.png, https://i.imgur.com/WOQBzoV.png}', 300),
(3, 'Insulated Water Bottle', 'A 17oz Cooper Vacuum water bottle that adds style to your travel journey and keeps your beverage hot or cold for up to 12 hours.', 14.00, '{https://i.imgur.com/RnVgced.png, https://i.imgur.com/NeEgdcc.png, https://i.imgur.com/8sN0vOZ.png}', 400);



--Some hardcoded data
drop table if exists products cascade;
create table products (
product_id serial primary key,
product_name text,
product_description text,
product_price decimal not null check (product_price >= 0),
product_picture text[],
product_quantity int not null
);
insert into products (product_id, product_name, product_description, product_price, product_picture, product_quantity)
values(1, 'Carry On Logo Sticker', 'Share our brand with the world. These look good on your laptop, water bottles, or furniture!', 2.00, '{https://i.imgur.com/wTAzqTP.png, https://i.imgur.com/7opiRPe.png}', 800 ),
(2,'Large Duffel Bag', 'This all-weather large duffel bag is made to hold anything and everything. Durable for your short and long term travel trips.', 22.00, '{https://i.imgur.com/3uJGyP8.png, https://i.imgur.com/WOQBzoV.png}', 300),
(3, 'Insulated Water Bottle', 'A 17oz Cooper Vacuum water bottle that adds style to your travel journey and keeps your beverage hot or cold for up to 12 hours.', 14.00, '{https://i.imgur.com/RnVgced.png, https://i.imgur.com/NeEgdcc.png, https://i.imgur.com/8sN0vOZ.png}', 400);

drop table if exists blogposts;
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
('github|39362114', '2018-12-29 14:29:22', 'Maine', '{https://i.ytimg.com/vi/R4wKm8OiEWw/maxresdefault.jpg, https://assets.vogue.com/photos/5b7df6b572286a04fe978eaf/master/pass/05-travle-guide-to-mount-desert-island-in-maine.jpg, http://adventuresportsjournal.com/wp-content/uploads/2012/10/EarthTalkMaineNationalPark.jpg}', 'it was alright', 'we did nothing', 'Sam Rosenthal'),
('github|39362114', '2019-01-03 17:34:35', 'Phoenix', '{https://odis.homeaway.com/odis/destination/49c069bb-8a54-4ded-81f0-e463ef6c66da.hw1.jpg, https://static.dezeen.com/uploads/2017/12/phoenix-arizona-metropolitan-sprawl-desert_dezeen_hero1-852x479.jpg, https://www.cousinsmainelobster.com/wp-content/uploads/2017/06/phoenix_new.png}', 'weekend trip and excited to share with you all', 'here is the itinerary we did. feel free to follow', 'Sam Rosenthal'),

insert into blogposts(auth0_id, date, title, image_url, blurb, itinerary, name)
values
('github|44471899', '2014-04-01 17:34:35', 'Chicago',
'{http://indusinstruments.com/wp-content/uploads/2018/01/chicago-header-dg1115.jpg, https://cbschicago.files.wordpress.com/2016/09/gettyimages-465237708.jpg?w=640&h=0&crop=1, https://static.dezeen.com/uploads/2017/09/vista-tower-studio-gang-chicago_dezeen_hero-852x479.jpg}', 
'it was alright', 'Lorem', 'Chris Garcia'),
('github|44471899', '2016-04-01 17:34:35', 'Banff',
'{https://handluggageonly.co.uk/wp-content/uploads/2016/09/Hand-Luggage-Only-5.jpg, https://discover.rbcroyalbank.com/wp-content/uploads/banner-small-banff-national-park_402x-1.jpg, https://cdn4.tropicalsky.co.uk/images/800x600/moraine-lake-banff.jpg}',
'it was alright', 'Lorem', 'Chris Garcia');

insert into blogposts(auth0_id, date, title, image_url, blurb, itinerary, name)
values
('auth0|5c45f98e4528822e59db85f5', '2015-04-05 17:34:35', 'Cambodia', '{https://www.intrepidtravel.com/sites/intrepid/files/styles/low-quality/public/elements/product/hero/TVSKC_cambodia_angkor-ta-prohm-temple-ruin-overgrown.jpg, https://www.intrepidtravel.com/sites/intrepid/files/styles/low-quality/public/elements/product/hero/TVSKC_cambodia_angkor-ta-prohm-temple-ruin-overgrown.jpg}',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis hendrerit dolor magna eget est lorem ipsum dolor. Mauris in aliquam sem fringilla ut morbi tincidunt. Iaculis urna id volutpat lacus laoreet non curabitur. Pellentesque dignissim enim sit amet venenatis urna. Proin libero nunc consequat interdum. Orci eu lobortis elementum nibh. Pulvinar elementum integer enim neque volutpat ac tincidunt. Vulputate odio ut enim blandit volutpat maecenas. Aliquam ut porttitor leo a. Eu facilisis sed odio morbi quis commodo.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis hendrerit dolor magna eget est lorem ipsum dolor. Mauris in aliquam sem fringilla ut morbi tincidunt. Iaculis urna id volutpat lacus laoreet non curabitur. Pellentesque dignissim enim sit amet venenatis urna. Proin libero nunc consequat interdum. Orci eu lobortis elementum nibh. Pulvinar elementum integer enim neque volutpat ac tincidunt. Vulputate odio ut enim blandit volutpat maecenas. Aliquam ut porttitor leo a. Eu facilisis sed odio morbi quis commodo.', 'Thomas Thongsan');

insert into blogposts(auth0_id, date, title, image_url, blurb, itinerary, name)
values
('auth0|5c45f98e4528822e59db85f5', '2017-04-05 17:34:35', 'Toronto', 
'{http://www.mcsrealestatewebsites.com/Assets/Neighbourhoods/Toronto-Smaller-Pic.jpg, https://i.ytimg.com/vi/aHWxPTH9f0w/maxresdefault.jpg, http://media.natgeotraveller.in/wp-content/uploads/2016/04/horseshoe-niagara-falls-canada.jpg}',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis hendrerit dolor magna eget est lorem ipsum dolor. Mauris in aliquam sem fringilla ut morbi tincidunt. Iaculis urna id volutpat lacus laoreet non curabitur. Pellentesque dignissim enim sit amet venenatis urna. Proin libero nunc consequat interdum. Orci eu lobortis elementum nibh. Pulvinar elementum integer enim neque volutpat ac tincidunt. Vulputate odio ut enim blandit volutpat maecenas. Aliquam ut porttitor leo a. Eu facilisis sed odio morbi quis commodo.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis hendrerit dolor magna eget est lorem ipsum dolor. Mauris in aliquam sem fringilla ut morbi tincidunt. Iaculis urna id volutpat lacus laoreet non curabitur. Pellentesque dignissim enim sit amet venenatis urna. Proin libero nunc consequat interdum. Orci eu lobortis elementum nibh. Pulvinar elementum integer enim neque volutpat ac tincidunt. Vulputate odio ut enim blandit volutpat maecenas. Aliquam ut porttitor leo a. Eu facilisis sed odio morbi quis commodo.', 'Thomas Thongsan');



select * from blogposts;
order by date desc;
select * from products;
select * from users;
select * from users_info;

update users set name = 'Thomas Thongsan' where name = 'thomas24@aim.com';
update blogposts set name = 'Tommy H.' where name = 'thuynh629@gmail.com';

delete from blogposts where title = 'TEST TITLE';



---
drop table if exists blogpost_comments

create table blogpost_comments (
comment_id serial primary key,
user_id int references users(id),
comment_body text,
blogpost_id int references blogposts(id)
);

select * from blogpost_comments;


select * from blogposts