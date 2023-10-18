create table Notes
(
  Id int identity(1,1) primary key,
  PropertyId int not null foreign key references Properties(Id),
  Content varchar(max) not null,
  NoteDate date not null default getdate()
)