
import React from 'react';
import { ApprovalHistory, Status } from '../../../types';

interface TimelineProps {
    history: ApprovalHistory[];
}

const Timeline: React.FC<TimelineProps> = ({ history }) => {
    const statusIcon: Record<Status, React.ReactNode> = {
        [Status.Uploaded]: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L6.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
        ),
        [Status.InReview]: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z"></path>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.414l2.26-2.26A4 4 0 1011 5z" clipRule="evenodd"></path>
            </svg>
        ),
        [Status.Approved]: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
        ),
    };

    const statusColor: Record<Status, string> = {
        [Status.Uploaded]: 'bg-blue-500',
        [Status.InReview]: 'bg-yellow-500',
        [Status.Approved]: 'bg-green-500',
    };

    return (
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
            {history.map((item, index) => (
                <li key={index} className="mb-6 ml-6">
                    <span className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 text-white ${statusColor[item.status]}`}>
                        {statusIcon[item.status]}
                    </span>
                    <h3 className="flex items-center mb-1 text-md font-semibold text-gray-900 dark:text-white">
                        {item.status}
                    </h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        {new Date(item.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                </li>
            ))}
        </ol>
    );
};

export default Timeline;
