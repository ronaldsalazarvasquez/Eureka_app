

import React, { useState } from 'react';
import { StarIcon } from '../constants';

interface StarRatingProps {
    rating: number;
    count: number;
    isLarge?: boolean;
    onRate?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, count, isLarge = false, onRate }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleMouseEnter = (index: number) => {
        if (onRate) setHoverRating(index);
    };

    const handleMouseLeave = () => {
        if (onRate) setHoverRating(0);
    };

    const handleClick = (index: number) => {
        if (onRate) onRate(index);
    };

    const starsToDisplay = hoverRating > 0 ? hoverRating : rating;
    const fullStars = Math.floor(starsToDisplay);
    const halfStar = !Number.isInteger(starsToDisplay) && starsToDisplay % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            <div 
                className={`flex items-center ${onRate ? 'cursor-pointer' : ''}`}
                onMouseLeave={handleMouseLeave}
            >
                {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    let starClass = 'text-gray-300 dark:text-gray-600';
                    if (starValue <= (hoverRating || rating)) {
                        starClass = 'text-amber-400';
                    }
                    
                    return (
                        <div
                            key={`star-${i}`}
                            onMouseEnter={() => handleMouseEnter(starValue)}
                            onClick={() => handleClick(starValue)}
                        >
                            <StarIcon 
                                className={`${isLarge ? 'h-6 w-6' : 'h-5 w-5'} ${starClass} transition-colors`} 
                            />
                        </div>
                    );
                })}
            </div>
            {count > 0 && (
                 <span className={`${isLarge ? 'text-base ml-2' : 'text-xs ml-1.5'} text-gray-600 dark:text-gray-400`}>
                    {rating.toFixed(1)} ({count})
                 </span>
            )}
            {count === 0 && !onRate && (
                <span className="text-xs ml-1.5 text-gray-500 dark:text-gray-400">Sin calificar</span>
            )}
             {count === 0 && onRate && !hoverRating && (
                <span className="text-xs ml-1.5 text-gray-500 dark:text-gray-400">Calificar</span>
            )}
        </div>
    );
};

export default StarRating;