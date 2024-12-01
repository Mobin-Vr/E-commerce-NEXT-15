import { ClerkLoaded, SignedIn, SignInButton, UserButton } from '@clerk/nextjs';
import { PackageIcon } from '@sanity/icons';
import NavButton from './NavButton';

function UserMenu({ user, createClerkPasskey }) {
   return (
      <ClerkLoaded>
         <SignedIn>
            <NavButton route='/orders'>
               <PackageIcon className='h-6 w-6' />
               <span>My Orders</span>
            </NavButton>
         </SignedIn>

         {user ? (
            <div className='flex items-center space-x-2'>
               <UserButton />
               <div className='hidden sm:block text-xs'>
                  <p className='text-gray-400'>Welcome Back</p>
                  <p className='font-bold'>{user.fullName}!</p>
               </div>
            </div>
         ) : (
            <SignInButton mode='modal' />
         )}

         {user?.passkeys.length === 0 && (
            <button
               onClick={createClerkPasskey}
               className='bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border'
            >
               Create passkey
            </button>
         )}
      </ClerkLoaded>
   );
}

export default UserMenu;
