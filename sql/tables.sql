
create table if not exists properties
( property_id serial not null primary key
, street_number smallint not null
, street text not null
, lot_num text
, sector text
, map_book smallint
, map_book_page smallint
, parcel_id text
);

create table if not exists property_owners
( property_owner_id serial not null primary key
, property_id int not null references properties(property_id)
, full_name text not null
, email text not null
, phone text
, move_in_date date
, move_out_date date
);

create table if not exists fee_types
( fee_type_id serial not null primary key
, fee_type_name text not null unique
);

create table if not exists fees
( fee_id serial not null primary key
, fee_type_id int not null references fee_types(fee_type_id)
, property_owner_id int not null references property_owners(property_owner_id)
, amount money not null
, fee_year int not null
);

create table if not exists payments
( payment_id serial not null primary key
, property_owner_id int not null references property_owners(property_owner_id)
, amount money not null
, date_paid date
, reference text
, deposit_date date
);

create table if not exists liens
( lien_id serial not null primary key
, property_owner_id int not null references property_owners(property_owner_id)
, amount money not null
, lien_year int not null
, is_paid boolean not null default false
);

create table comments
( comment_id serial not null primary key
, property_id int not null references properties(property_id)
, content text not null
, comment_date date not null default getdate()
);