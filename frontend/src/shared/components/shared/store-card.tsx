import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui';
import Image from 'next/image';
import { PriceText } from '@/shared/components/shared/price-text';
import { Store } from '@/shared/services/stores';
import { Star } from 'lucide-react';
import { Rating } from '@/shared/components/shared/rating';

const OfferType = {
  freeDelivery: 'freeDelivery',
  discount: 'discount',
  mealAsGift: 'mealAsGift',
} as const;

interface StoreCardProps extends Store {
  image?: string;
  imgHeight?: number;
  imgWidth?: number;
}

export const StoreCard = (props: StoreCardProps) => {
  const {
    description,
    imgHeight = 300,
    imgWidth = imgHeight,
    name,
    image,
    averageRating,
  } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          alt={name}
          className='aspect-square w-full rounded-md object-cover'
          height={imgHeight}
          width={imgWidth}
          src={image ?? '/placeholder.svg'}
        />
      </CardContent>
      {description && <CardDescription></CardDescription>}
      <CardFooter className='flex items-center justify-between gap-4'>
        <Rating rating={averageRating || 4.3} reviewsCount={16} />
      </CardFooter>
    </Card>
  );
};
