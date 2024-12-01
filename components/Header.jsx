'use client';

import { useUser } from '@clerk/nextjs';
import { TrolleyIcon } from '@sanity/icons';
import Logo from './Logo';
import NavButton from './NavButton';
import SearchForm from './SearchForm';
import UserMenu from './UserMenu';
import CartItemCard from './CartItemCard';

function Header() {
   const { user } = useUser();

   async function createClerkPasskey() {
      try {
         const response = await user?.createPasskey();
      } catch (err) {
         console.error('Error:', JSON.stringify(err, null, 2));
      }
   }

   return (
      <header className='flex flex-wrap justify-between items-center px-4 py-2'>
         <div className='flex w-full flex-wrap justify-between items-center'>
            <Logo />
            <SearchForm />
            <div className='flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none'>
               <NavButton route='/cart'>
                  <TrolleyIcon className='h-6 w-6' />
                  <span>My Cart</span>
               </NavButton>
               <UserMenu user={user} createClerkPasskey={createClerkPasskey} />
            </div>
         </div>
      </header>
   );
}

export default Header;
