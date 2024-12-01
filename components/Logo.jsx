import Link from 'next/link';

function Logo() {
   return (
      <Link
         href='/'
         className='text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0'
      >
         Shopr
      </Link>
   );
}

export default Logo;
