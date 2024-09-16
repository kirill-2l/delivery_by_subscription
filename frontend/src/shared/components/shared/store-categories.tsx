import { Button, Title } from '@/shared/components/ui';
import Link from 'next/link';

interface MenuItem {
  id: number;
  name: string;
  link: string;
}

interface Props {
  categories?: MenuItem[];
}

export const StoreCategories = ({ categories }: Props) => {
  return (
    <div className='flex w-full flex-col'>
      <Title size='md' className='mb-4' text='Menu' />
      <ul className='flex flex-col gap-3'>
        {categories?.map((category) => (
          <li key={category.name}>
            <Button
              asChild
              variant={'ghost'}
              className={'w-full justify-start'}
            >
              <Link href={category.link}>{category.name}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
