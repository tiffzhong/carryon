drop table if exists users;
drop table if exists blogposts;
drop table if exists admin;

create table admin(
id serial primary key,
auth0_id text unique,
email text);

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
user_id integer references users (id),
date date not null, 
title text not null,
image_url text[],
blurb text not null,
itinerary text
); 

insert into blogposts(user_id, date, title, image_url, blurb, itinerary)
values(1, '2017-12-30', 'Patagonia', '{https://s25910.pcdn.co/wp-content/uploads/2016/10/Budget-Travel-In-Patagonia-Feature-Glacier.jpg, https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/02/fitzroy.jpg}','this trip was so much fun', 'this is my suggested itinerary'),
(1, '2018-05-18', 'Tokyo', '{https://cdn.japantimes.2xx.jp/wp-content/uploads/2015/07/n-kinki-z-20150725-870x581.jpg, https://c-lj.gnst.jp/public/article/detail/a/00/02/a0002644/img/basic/a0002644_main.jpg?20181011145022}', 'tokyo was amazing', 'my mock itinerary!'),
(1, '2016-01-02', 'Budapest', '{https://www.nationalgeographic.com/content/dam/travel/Guide-Pages/europe/budapest-travel.adapt.1900.1.jpg, http://adventuredaze.com/wp-content/uploads/2016/07/Travel-Budapest-Hungary.jpg}', 'sparty was wild!!', 'heres what i did for 3 days in budapest');

select * from blogposts;

---


CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

select * from "session";


---


