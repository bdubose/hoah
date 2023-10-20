create table Fees
(
  Id int identity(1,1) primary key,
  FeeTypeId int not null constraint FkFeeFeeType references FeeTypes(Id),
  HomeownerId int not null constraint FkFeeHomeowner references Homeowners(Id),
  Amount money not null,
  FeeYear int not null default datepart(year, getdate())
)