import React from 'react';

interface Props {}
export const Logo = (props: Props) => {
  return (
    <div className='flex items-center gap-4'>
      <div>
        <h1 className='text-2xl font-black uppercase'>Delivery</h1>
      </div>
    </div>
  );
};
