create table Liens
(
  Id int identity(1,1) primary key,
  HomeownerId int not null foreign key references Homeowners(Id),
  Amount money not null,
  LienYear int not null default datepart(year, getdate()),
  IsPaid bit not null default 0
)