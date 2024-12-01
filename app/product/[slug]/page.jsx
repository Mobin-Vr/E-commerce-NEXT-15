import ProductDescription from '@/components/ProductDescription';
import ProductImage from '@/components/ProductImage';
import AddToCartButton from '@/components/AddToCartButton';
import { Button } from '@/components/ui/button';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';

async function Page({ params }) {
   const { slug } = await params;
   const product = await getProductBySlug(slug);

   if (!product) {
      return <div>Product not found</div>;
   }

   const isOutOfStock = product.stock != null && product.stock <= 0;

   return (
      <div className='container mx-auto px-4 py-8 max-w-4xl'>
         <div className='flex flex-col md:flex-row gap-3 md:gap-2 justify-center items-center'>
            <ProductImage
               image={product.image}
               alt={product.name}
               isOutOfStock={isOutOfStock}
               size='h-56 md:h-96'
            />

            <div className='p-4'>
               <h2 className='text-base font-semibold text-gray-800 mb-2'>
                  {product.name}
               </h2>

               <p className='text-base font-bold text-gray-700 mb-4'>
                  ${product.price?.toFixed(2)}
               </p>

               <ProductDescription
                  description={product.description}
                  wordQuantity='all'
               />
            </div>

            <div className='mt-'>
               <AddToCartButton product={product} disabled={isOutOfStock} />
            </div>
         </div>
      </div>
   );
}

export default Page;
