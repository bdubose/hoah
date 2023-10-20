create table Homeowners
(
  Id int identity(1,1) primary key,
  PropertyId int not null constraint FkHomeownerProperty references Properties(Id),
  FullName varchar(150) not null,
  Email varchar(150),
  Phone varchar(10),
  MoveInDate datetime2 not null default getutcdate(),
  MoveOutDate datetime2
)