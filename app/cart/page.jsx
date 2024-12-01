'use client';

import CartItemList from '@/components/CartItemList';
import EmptyCartMessage from '@/components/EmptyCartMessage';
import OrderSummary from '@/components/OrderSummary';
import { createCheckoutSession } from '@/lib/actions';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useCartStore from '../store';

function Page() {
   const groupedItems = useCartStore((state) => state.getGroupedItems());
   const { isSignedIn } = useAuth();
   const { user } = useUser();
   const router = useRouter();

   const [isClient, setIsClient] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setIsClient(true);
   }, []);

   if (!isClient) return null;

   async function handleCheckout() {
      if (!isSignedIn || !user) {
         // Handle case where user is not signed in or user data is not available
         return;
      }
      setIsLoading(true);

      try {
         const metadata = {
            orderNumber: crypto.randomUUID(),
            clerkUserId: user.id,
            customerName: user.fullName ?? 'Unknown',
            customerEmail: user.emailAddresses?.[0]?.emailAddress ?? 'Unknown',
         };

         const checkoutUrl = await createCheckoutSession(
            groupedItems,
            metadata
         );

         if (checkoutUrl) {
            window.location.href = checkoutUrl; // Redirect to the checkout session URL
         }
      } catch (error) {
         console.error('Error creating checkout session:', error);
      } finally {
         setIsLoading(false);
      }
   }

   // If the cart is empty, show the empty cart message
   if (groupedItems.length === 0) {
      return <EmptyCartMessage />;
   }

   return (
      <div className='container mx-auto p-4 max-w-6xl'>
         <h1 className='text-2xl font-bold mb-4'>Your Cart</h1>

         <div className='flex flex-col lg:flex-row gap-8'>
            <CartItemList groupedItems={groupedItems} />
            <OrderSummary
               groupedItems={groupedItems}
               isSignedIn={isSignedIn}
               onCheckout={handleCheckout}
               isLoading={isLoading}
            />
         </div>

         {/* Spacer for fixed checkout on mobile */}
         <div className='h-64 lg:h-0'></div>
      </div>
   );
}

export default Page;
