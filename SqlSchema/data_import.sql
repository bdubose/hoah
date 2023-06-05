drop table if exists ss;
create temporary table ss
( lot_num text
, sector text
, map_book text
, page text
, email text
, homeowner text
, last text
, first text
, add_1 text
, add_2 text
, add_3 text
, home_phone text
);

\copy ss from './import_ss.tsv' with delimiter E'\t' csv  header

insert into properties (street_number, street, lot_num, sector, map_book, page)
select
  add_1::smallint
, add_2
, lot_num
, sector
, map_book
, page
from ss
;

insert into homeowners(property_id, full_name, email, phone)
select
  p.property_id
, ss.homeowner
, ss.email
, ss.home_phone
from ss
join properties p on p.street_number::text = ss.add_1
and p.street = ss.add_2
;