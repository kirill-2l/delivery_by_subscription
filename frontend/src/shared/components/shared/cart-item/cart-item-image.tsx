import { cn } from '@/shared/utils';
import { ImgHTMLAttributes } from 'react';

interface CartItemImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  className?: string;
  alt: string;
}

export const CartItemImage = ({ src, className, alt }: CartItemImageProps) => {
  return (
    <img
      className={cn('h-[60px] w-[60px] rounded-xl object-cover', className)}
      src={src}
      alt={alt}
    />
  );
};
