-- This file contains SQL statements that will be executed after the build script.

merge FeeTypes as tgt using
( values
	('Dues'),
	('Closing'),
	('Fine'),
	('Late')
) src(Name)
on src.Name = tgt.Name
when not matched by target then
	insert (Name) values (src.Name)
;

merge LienStatuses as tgt using
( values
	('Submitted'),
	('Active'),
	('Paid'),
	('Satisfaction Sent'),
	('Closed')
) src(Name)
on src.Name = tgt.Name
when not matched by target then
	insert (Name) values (src.Name)
;