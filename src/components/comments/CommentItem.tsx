import React, { useState } from 'react';
import { Comment, User } from '../../../types';
import { MOCK_AUTHORS } from '../../../constants';
import CommentForm from './CommentForm';
import CommentThread from './CommentThread';

interface CommentItemProps {
    comment: Comment;
    onAddNewComment: (projectId: number, text: string, parentId?: string) => void;
    projectId: number;
    currentUser: User | null;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onAddNewComment, projectId, currentUser }) => {
    const [isReplying, setIsReplying] = useState(false);
    const author = MOCK_AUTHORS.find(a => a.name === comment.author);

    const handleReplySubmit = (text: string) => {
        onAddNewComment(projectId, text, comment.id);
        setIsReplying(false);
    };
    
    const timeAgo = (date: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return `hace ${Math.floor(interval)} años`;
        interval = seconds / 2592000;
        if (interval > 1) return `hace ${Math.floor(interval)} meses`;
        interval = seconds / 86400;
        if (interval > 1) return `hace ${Math.floor(interval)} días`;
        interval = seconds / 3600;
        if (interval > 1) return `hace ${Math.floor(interval)} horas`;
        interval = seconds / 60;
        if (interval > 1) return `hace ${Math.floor(interval)} minutos`;
        return `hace ${Math.floor(seconds)} segundos`;
    };

    return (
        <div className="flex items-start gap-3">
            <img 
                src={author?.avatarUrl || 'https://via.placeholder.com/150'}
                alt={comment.author}
                className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm text-gray-800 dark:text-white">{comment.author}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(comment.timestamp)}</p>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{comment.text}</p>
                </div>
                <div className="mt-1 flex items-center gap-3">
                     <button 
                        onClick={() => setIsReplying(!isReplying)}
                        className="text-xs font-semibold text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                     >
                        Responder
                    </button>
                </div>
                {isReplying && (
                    <div className="mt-2">
                         <CommentForm 
                            onSubmit={handleReplySubmit} 
                            placeholder={`Respondiendo a ${comment.author}...`}
                            isReply={true}
                        />
                    </div>
                )}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-slate-200 dark:border-slate-600">
                        <CommentThread 
                            comments={comment.replies}
                            onAddNewComment={onAddNewComment}
                            projectId={projectId}
                            currentUser={currentUser}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentItem;