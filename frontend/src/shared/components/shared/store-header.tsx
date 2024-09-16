'use client';

import Image from 'next/image';
import { Button } from '@/shared/components/ui';
import { Info, Star } from 'lucide-react';

interface StoreHeaderProps {
  name: string;
  averageRating?: number;
  reviewsCount?: number;
  image?: string;
}

export const StoreHeader = (props: StoreHeaderProps) => {
  const { name, averageRating, reviewsCount = 0, image } = props;
  const ratingText =
    reviewsCount < 5 ? 'Few ratings' : `${averageRating} (${reviewsCount})`;
  return (
    <div className='relative flex h-[300px] flex-col justify-end rounded-3xl px-8 py-10'>
      <div className='absolute left-0 top-0 size-full overflow-hidden'>
        <Image
          className='size-full rounded-3xl object-cover'
          width={1200}
          height={300}
          src={image ?? '/placeholder.svg'}
          alt={name}
        />
      </div>
      <div className='absolute left-0 top-0 size-full rounded-3xl bg-gradient-to-r from-slate-900 to-transparent opacity-65'></div>
      <h1 className='relative text-4xl font-bold text-white'>{name}</h1>
      <div className='relative mt-4 flex items-center gap-2'>
        <Button>
          <Star />
          {ratingText}
        </Button>
        <Button size={'icon'}>
          <Info />
        </Button>
      </div>
    </div>
  );
};
