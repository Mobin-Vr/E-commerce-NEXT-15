import { TrolleyIcon } from '@sanity/icons';
import Link from 'next/link';

function NavButton({ children, route }) {
   return (
      <Link
         href={route}
         className='flex-1 relative flex justify-center sm:flex-none items-center space-x-2 bg-blue-500 text-white font-bold py-2 px-4 rounded'
      >
         {children}
      </Link>
   );
}

export default NavButton;
