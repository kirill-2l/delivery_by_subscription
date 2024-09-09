import Image from 'next/image';
import { Button } from '@/shared/components/ui';
import { Info, Star } from 'lucide-react';

interface StoreHeaderProps {
  name: string;
  averageRating?: number;
  reviewsCount?: number;
}

export const StoreHeader = (props: StoreHeaderProps) => {
  const { name, averageRating, reviewsCount = 0 } = props;
  const ratingText =
    reviewsCount < 5 ? 'Few ratings' : `${averageRating} (${reviewsCount})`;
  return (
    <div className='relative flex justify-end border-r-2 px-8 py-10'>
      <div className='absolute left-0 top-0'>
        <Image className='size-full object-cover' src={''} alt={''} />
        <h1 className='text-xl'>{name}</h1>
        <div className='flex items-center gap-2'>
          <Button>
            <Star />
            {ratingText}
          </Button>
          <Button size={'icon'}>
            <Info />
          </Button>
        </div>
      </div>
    </div>
  );
};
