import { imageUrl } from '@/lib/utils';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

const CartItemCard = ({ item, onClick }) => {
   const { product, quantity } = item;
   const totalPrice = (product.price ?? 0) * quantity;

   return (
      <div className='mb-4 p-4 border rounded flex items-center justify-between'>
         <div
            className='flex items-center cursor-pointer flex-1 min-w-0'
            onClick={onClick}
         >
            <div className='w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4'>
               {product.image && (
                  <Image
                     src={imageUrl(product.image).url()}
                     alt={product.name ?? 'Product image'}
                     className='w-full h-full object-cover rounded'
                     width={96}
                     height={96}
                     priority // To optimize image loading
                  />
               )}
            </div>
            <div className='min-w-0'>
               <h2 className='text-lg sm:text-xl font-semibold truncate'>
                  {product.name}
               </h2>
               <p className='text-sm sm:text-base'>
                  Price: £{totalPrice.toFixed(2)}
               </p>
            </div>
         </div>

         <div className='flex items-center ml-4 flex-shrink-0'>
            <AddToCartButton product={product} />
         </div>
      </div>
   );
};

export default CartItemCard;
