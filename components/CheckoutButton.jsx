import { SignInButton } from '@clerk/nextjs';

const CheckoutButton = ({ isSignedIn, onCheckout, isLoading }) => {
   return isSignedIn ? (
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
   );
};

export default CheckoutButton;
