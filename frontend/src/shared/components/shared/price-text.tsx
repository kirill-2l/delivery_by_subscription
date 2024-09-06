interface Props {
  price: number;
  currency: string;
  oldPrice?: number;
}

export const PriceText = (props: Props) => {
  const { price, currency, oldPrice } = props;
  return (
    <div>
      <div className='flex items-center'>
        <div className='text-md font-bold'>₾{price}</div>
      </div>
      {oldPrice && <div className='flex items-center'>{oldPrice}</div>}
    </div>
  );
};
