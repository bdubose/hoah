create table Fees
(
  Id int identity(1,1) primary key,
  FeeTypeId int not null foreign key references FeeTypes(Id),
  HomeownerId int not null foreign key references Homeowners(Id),
  Amount money not null,
  FeeYear int not null default datepart(year, getdate())
)