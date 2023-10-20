create table Payments
(
  Id int identity(1,1) primary key,
  HomeownerId int not null constraint FkPaymentHomeowner references Homeowners(Id),
  Amount money not null,
  DatePaid date not null default getdate(),
  Reference varchar(20),
  DepositDate date
)