INSERT into area_of_interest ("id","zoom","aoi_name","display") values 
(1, 14, 'myhouse', 'My House'),
(2, 14, 'pubsnearme', 'Pubs Near Me');

INSERT into coordinate ("id","lat","long", "coordinate_name", "label") values 
(1, '51.4344876', '-2.0655287', 'landsdownearms', 'Lansdowne Arms'),
(2, '51.4389801', '-2.0748424', 'thepewsham',  'The Pewsham'),
(3, '51.437603', '-2.072247', 'graemeliveshere', 'Graeme lives here');

insert into markers ("aoi_name", "coordinate_name") values
('myhouse','graemeliveshere'),
('pubsnearme','landsdownearms'),
('pubsnearme','thepewsham');


