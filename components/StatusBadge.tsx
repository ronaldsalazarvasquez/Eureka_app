
import React from 'react';
import { Status } from '../types';

interface StatusBadgeProps {
    status: Status;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusStyles: Record<Status, string> = {
        [Status.Approved]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        [Status.InReview]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        [Status.Uploaded]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    };

    return (
        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusStyles[status]}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
