import React, { useState } from 'react';
import { SendIcon } from '../constants';

interface CommentFormProps {
    onSubmit: (text: string) => void;
    placeholder?: string;
    isReply?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, placeholder = "Escribe tu comentario...", isReply = false }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onSubmit(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`flex items-start gap-3 ${isReply ? 'mt-2' : ''}`}>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={placeholder}
                className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                rows={isReply ? 2 : 3}
                required
            />
            <button
                type="submit"
                className="p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:bg-gray-400"
                disabled={!text.trim()}
                aria-label="Enviar comentario"
            >
                <SendIcon />
            </button>
        </form>
    );
};

export default CommentForm;