create table Properties
(
  Id int identity(1,1) primary key,
  StreetNumber smallint not null,
  Street varchar(32) not null,
  LotNum varchar(10),
  Sector varchar(10),
  MapBook int,
  MapPage int
);