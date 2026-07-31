import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { Review } from '../../types';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-[#F8F8F8] p-8 md:p-10 flex flex-col justify-between border border-[#EBEBEB] transition-all duration-300 hover:border-[#EADBC8] hover:shadow-sm">
      <div>
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating ? 'fill-[#111111] text-[#111111]' : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Comment Quote */}
        <p className="font-serif italic text-base md:text-lg text-[#333333] leading-relaxed mb-8">
          "{review.comment}"
        </p>
      </div>

      {/* Author Details */}
      <div className="flex items-center gap-4 pt-6 border-t border-[#E5E5E5]">
        <img
          src={review.avatar}
          alt={review.author}
          className="w-12 h-12 rounded-full object-cover object-center ring-2 ring-[#EADBC8]"
        />
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="font-sans font-semibold text-sm text-[#111111]">{review.author}</h4>
            {review.verified && (
              <span title="Verified Patron">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#111111]" />
              </span>
            )}
          </div>
          <p className="text-xs text-[#777777] font-sans">{review.location}</p>
        </div>
      </div>
    </div>
  );
};
