create table Liens
(
  Id int identity(1,1) primary key,
  HomeownerId int not null constraint FkLienHomeowner references Homeowners(Id),
  LienStatusId int not null default 1 constraint FkLienLienStatus references LienStatuses(Id),
  Amount money not null,
  LienYear int not null default datepart(year, getdate())
)