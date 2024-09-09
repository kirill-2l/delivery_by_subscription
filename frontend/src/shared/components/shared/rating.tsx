import { Star } from 'lucide-react';
import colors from 'tailwindcss/colors';

const green = colors.green[600];

interface Props {
  reviewsCount?: number;
  rating?: number;
}

export const Rating = (props: Props) => {
  const { reviewsCount, rating } = props;
  return (
    <div className='flex gap-1 text-sm leading-none'>
      <Star width={14} height={14} color={green} />
      {rating && <span>{rating}</span>}
      {reviewsCount && <span>({reviewsCount})</span>}
    </div>
  );
};
