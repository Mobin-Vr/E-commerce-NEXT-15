import Link from 'next/link';
import ProductDescription from './ProductDescription';
import ProductImage from './ProductImage';

function ProductThumb({ product }) {
   const isOutOfStock = product.stock != null && product.stock <= 0;

   const linkClasses = `group flex flex-col bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
      isOutOfStock ? 'opacity-50' : ''
   }`;

   return (
      <Link href={`/product/${product.slug?.current}`} className={linkClasses}>
         <ProductImage
            image={product.image}
            alt={product.name}
            isOutOfStock={isOutOfStock}
            size='h-48'
         />

         <div className='p-4'>
            <h2 className='text-base font-semibold text-gray-800 mb-2'>
               {product.name}
            </h2>

            <ProductDescription description={product.description} />

            <p className='text-base font-bold text-gray-700 mt-4'>
               ${product.price?.toFixed(2)}
            </p>
         </div>
      </Link>
   );
}

export default ProductThumb;
