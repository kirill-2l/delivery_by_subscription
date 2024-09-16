import { Button } from '@/shared/components/ui';

interface Props {
  menuItems?: Record<string, string>[];
}

export const StoreCategories = ({ menuItems }: Props) => {
  return (
    <div>
      <h2 className='text-xl'>Menu</h2>
      <ul>
        {menuItems?.map((menuItem) => (
          <li key={menuItem.name}>
            <Button variant={'outline'}>{menuItem.name}</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
