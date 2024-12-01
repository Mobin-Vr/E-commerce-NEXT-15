import { imageUrl } from '@/lib/utils';

const { default: Image } = require('next/image');

function ProductImage({ image, alt, isOutOfStock, size }) {
   return (
      <div className={`relative aspect-square w-auto overflow-hidden ${size}`}>
         {image && (
            <Image
               src={imageUrl(image).url()}
               alt={alt || 'Product image'}
               fill
               className='object-contain transition-transform duration-300 group-hover:scale-105'
            />
         )}

         {isOutOfStock && (
            <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
               <span className='text-white font-bold text-lg'>
                  Out of Stock
               </span>
            </div>
         )}
      </div>
   );
}

export default ProductImage;
