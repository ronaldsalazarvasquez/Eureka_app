import React from 'react';
import { Comment, User } from '../../../types';
import CommentItem from './CommentItem';

interface CommentThreadProps {
  comments: Comment[];
  onAddNewComment: (projectId: number, text: string, parentId?: string) => void;
  projectId: number;
  currentUser: User | null;
  onSelectAuthor: (authorName: string) => void; 
}

const CommentThread: React.FC<CommentThreadProps> = ({
  comments,
  onAddNewComment,
  projectId,
  currentUser,
  onSelectAuthor,
}) => {
  if (!comments || comments.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
        Aún no hay comentarios. ¡Sé el primero en iniciar la conversación!
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onAddNewComment={onAddNewComment}
          projectId={projectId}
          currentUser={currentUser}
          onSelectAuthor={onSelectAuthor} // ✅ pasa el handler
        />
      ))}
    </div>
  );
};

export default CommentThread;