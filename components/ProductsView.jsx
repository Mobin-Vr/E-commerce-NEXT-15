import React from 'react';
import ProductsGrid from './ProductsGrid';
import { CategorySelector } from './ui/categorySelector';

const ProductsView = ({ products, categories }) => {
   return (
      <div className='flex flex-col'>
         {/* categories */}
         <div className='w-full sm:w-[200px'>
            <CategorySelector categories={categories} />
         </div>

         {/* products */}
         <div className='flex-1 mt-4'>
            <div>
               <ProductsGrid products={products} />
               {/* <hr className='w-1/2 sm:w-3/4' /> */}
            </div>
         </div>
      </div>
   );
};

export default ProductsView;
