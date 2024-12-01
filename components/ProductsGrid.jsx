import { AnimatePresence, motion } from 'framer-motion';
import ProductThumb from './ProductThumb';

function ProductGrid({ products }) {
   return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
         {products?.map((product) => {
            return <ProductThumb product={product} key={product._id} />;
         })}
      </div>
   );
}

export default ProductGrid;
