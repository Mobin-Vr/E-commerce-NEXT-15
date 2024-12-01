import { SignInButton } from '@clerk/nextjs';
import useCartStore from '@/app/store';

const OrderSummary = ({ groupedItems, isSignedIn, onCheckout, isLoading }) => {
   return (
      <div className='w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto'>
         <h3 className='text-xl font-semibold'>Order Summary</h3>
         <div className='mt-4 space-y-2'>
            <div className='flex justify-between'>
               <span>Items:</span>
               <span>
                  {groupedItems.reduce(
                     (total, item) => total + item.quantity,
                     0
                  )}
               </span>
            </div>
            <div className='flex justify-between text-2xl font-bold border-t pt-2'>
               <span>Total:</span>
               <span>
                  £{useCartStore.getState().getTotalPrice().toFixed(2)}
               </span>
            </div>
         </div>
         {isSignedIn ? (
            <button
               onClick={onCheckout}
               disabled={isLoading}
               className='mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400'
            >
               {isLoading ? 'Processing...' : 'Checkout'}
            </button>
         ) : (
            <SignInButton mode='modal'>
               <button className='mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                  Sign in to Checkout
               </button>
            </SignInButton>
         )}
      </div>
   );
};

export default OrderSummary;
