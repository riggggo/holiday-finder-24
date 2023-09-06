/*rsync -avzh hotels.csv  root@x.x.x.x:/root/
rsync -avzh offers.csv  root@x.x.x.x:/root/
*/

CREATE DATABASE holiday; 
use holiday;
CREATE TABLE hotels (id SMALLINT not null, hotelname VARCHAR (255), latitude FLOAT, longitude FLOAT, hotelstars FLOAT, Primary key (id));


load data infile "/var/lib/mysql-files/hotels.csv" into table hotels COLUMNS TERMINATED BY ','     OPTIONALLY
ENCLOSED BY '"'     ESCAPED BY '"'     LINES TERMINATED BY '\n'     IGNORE 1 LINES;




create table offers (hotelid SMALLINT, 
departuredate DATETIME, 
returndate DATETIME, 
countadults TINYINT, 
countchildren TINYINT, 
price MEDIUMINT, 
inbounddepartureairport ENUM ('AMS', 'BER', 'BLL', 'BRE', 'BRN', 'BRS', 'BRU', 
'BSL', 'CGN', 'DRS', 'DTM', 'DUS', 'EIN', 'ERF', 'FDH', 
'FKB', 'FMM', 'FMO', 'FRA', 'GRQ', 'GRZ', 'GVA', 'GWT', 
'HAJ', 'HAM', 'INN', 'KLU', 'KRK', 'KSF', 'LBC', 'LEJ', 
'LNZ', 'LUX', 'MUC', 'NRN', 'NUE', 'PAD', 'PMI', 'PRG', 
'SCN', 'STR', 'SXB', 'SZG', 'VIE', 'WAW', 'ZRH'), 
inboundarrivalairport ENUM ('AMS', 'BER', 'BLL', 'BRE', 'BRN', 'BRS', 'BRU', 
'BSL', 'CGN', 'DRS', 'DTM', 'DUS', 'EIN', 'ERF', 'FDH', 
'FKB', 'FMM', 'FMO', 'FRA', 'GRQ', 'GRZ', 'GVA', 'GWT', 
'HAJ', 'HAM', 'INN', 'KLU', 'KRK', 'KSF', 'LBC', 'LEJ', 
'LNZ', 'LUX', 'MUC', 'NRN', 'NUE', 'PAD', 'PMI', 'PRG', 
'SCN', 'STR', 'SXB', 'SZG', 'VIE', 'WAW', 'ZRH'), 
inboundairline VARCHAR (10), 
inboundarrivaldatetime DATETIME, 
outbounddepartureairport ENUM ('AMS', 'BER', 'BLL', 'BRE', 'BRN', 'BRS', 'BRU', 
'BSL', 'CGN', 'DRS', 'DTM', 'DUS', 'EIN', 'ERF', 'FDH', 
'FKB', 'FMM', 'FMO', 'FRA', 'GRQ', 'GRZ', 'GVA', 'GWT', 
'HAJ', 'HAM', 'INN', 'KLU', 'KRK', 'KSF', 'LBC', 'LEJ', 
'LNZ', 'LUX', 'MUC', 'NRN', 'NUE', 'PAD', 'PMI', 'PRG', 
'SCN', 'STR', 'SXB', 'SZG', 'VIE', 'WAW', 'ZRH'), 
outboundarrivalairport ENUM ('AMS', 'BER', 'BLL', 'BRE', 'BRN', 'BRS', 'BRU', 
'BSL', 'CGN', 'DRS', 'DTM', 'DUS', 'EIN', 'ERF', 'FDH', 
'FKB', 'FMM', 'FMO', 'FRA', 'GRQ', 'GRZ', 'GVA', 'GWT', 
'HAJ', 'HAM', 'INN', 'KLU', 'KRK', 'KSF', 'LBC', 'LEJ', 
'LNZ', 'LUX', 'MUC', 'NRN', 'NUE', 'PAD', 'PMI', 'PRG', 
'SCN', 'STR', 'SXB', 'SZG', 'VIE', 'WAW', 'ZRH'), 
outboundairline VARCHAR (10), 
outboundarrivaldatetime DATETIME, 
mealtype VARCHAR (127), 
oceanview ENUM ('FALSE', 'TRUE'), 
roomtype VARCHAR (127));

load data infile "/var/lib/mysql-files/offers.csv" into table offers COLUMNS TERMINATED BY ','     OPTIONALLY
ENCLOSED BY '"'     ESCAPED BY '"'     LINES TERMINATED BY '\n'     IGNORE 1 LINES;



create index id_index on hotels(id)
create index full_index on offers (hotelid, countadults, countchildren, outbounddepartureairport, departuredate, returndate)