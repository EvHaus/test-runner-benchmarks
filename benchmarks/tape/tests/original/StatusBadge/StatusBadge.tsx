import Badge from '../Badge';
import React from 'react';

type PropsType = {
	status: 'DRAFTED' | 'COMPLETED',
};

const STATUSES = [
	{color: 'green' as const, value: 'DRAFTED'},
	{color: 'orange'  as const, value: 'COMPLETED'}
]

const StatusBadge = ({
	status,
}: PropsType) => {
	const record = STATUSES.find(({value}) => value === status);

	return (
		<Badge color={record?.color || 'neutral'}>
			{status}
		</Badge>
	);
};

export default StatusBadge;
