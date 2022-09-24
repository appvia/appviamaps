INSERT into area_of_interest ("id","zoom","aoi_name","display") values 
(1, 14, 'myhouse', 'My House'),
(2, 14, 'pubsnearme', 'Pubs Near Me')
(3, 12, 'ICL', 'Imperial College Campus Locations');

INSERT into coordinate ("id","lat","long", "coordinate_name", "label") values 
(1, '51.4344876', '-2.0655287', 'landsdownearms', 'Lansdowne Arms'),
(2, '51.4389801', '-2.0748424', 'thepewsham',  'The Pewsham'),
(3, '51.437603', '-2.072247', 'graemeliveshere', 'Graeme lives here'),
(4, '51.487639', '-0.218768', 'ICL1', 'Imperial College Charing Cross Hospital'),
(5, '51.48455', '-0.18172', 'ICL2', 'Imperial College Chelsea and Westminster Hospital'),
(6, '51.51756', '-0.23468', 'ICL3', 'Imperial College Hammersmith Hospital'),
(7, '51.57553', '-0.32201', 'ICL4', 'Imperial College North West London Hospitals'),
(8, '51.48735', '-0.17077', 'ICL5', 'Imperial College Royal Brompton'),
(9, '51.40923', '-0.63988', 'ICL6', 'Imperial College Silverwood Park'),
(10, '51.49845', '-0.17694', 'ICL7', 'Imperial College South Kensington'),
(11, '51.51782', '-0.17331', 'ICL8', 'Imperial College St Marys'),
(12, '51.51595', '-0.22402', 'ICL9', 'Imperial College White City');

insert into markers ("aoi_name", "coordinate_name") values
('myhouse','graemeliveshere'),
('pubsnearme','landsdownearms'),
('pubsnearme','thepewsham'),
('ICL','ICL1'),
('ICL','ICL2'),
('ICL','ICL3'),
('ICL','ICL4'),
('ICL','ICL5'),
('ICL','ICL6'),
('ICL','ICL7'),
('ICL','ICL8'),
('ICL','ICL9');


