create table FeeTypes
(
  Id int identity(1,1) primary key,
  Name varchar(15) not null unique
)