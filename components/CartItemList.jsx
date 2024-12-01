import CartItemCard from '@/components/CartItemCard';
import { useRouter } from 'next/navigation';

const CartItemList = ({ groupedItems }) => {
   const router = useRouter();

   return (
      <div className='flex flex-col gap-8'>
         {groupedItems.map((item) => (
            <CartItemCard
               key={item.product._id}
               item={item}
               onClick={() =>
                  router.push(`/product/${item.product.slug?.current}`)
               }
            />
         ))}
      </div>
   );
};

export default CartItemList;
