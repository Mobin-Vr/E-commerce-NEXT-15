import { PortableText } from 'next-sanity';

function ProductDescription({ description, wordQuantity = 0 }) {
   return (
      <>
         {!description ? (
            <p className='text-sm text-gray-600 mb-2'>
               No description available
            </p>
         ) : (
            <div className='prose max-w-none mb-2'>
               {wordQuantity === 'all' && <PortableText value={description} />}
            </div>
         )}
      </>
   );
}

export default ProductDescription;
