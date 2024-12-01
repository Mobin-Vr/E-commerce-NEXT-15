'use server';

import { stripe } from './stripe';
import { imageUrl } from './utils';

export async function createCheckoutSession(items, metadata) {
   try {
      // Filter items that don't have a price
      const itemsWithoutPrice = items.filter((item) => !item.product.price);
      if (itemsWithoutPrice.length > 0) {
         throw new Error('Some items do not have a price');
      }

      // Search for an existing customer by email
      const customers = await stripe.customers.list({
         email: metadata.customerEmail,
         limit: 1,
      });

      let customerId;
      if (customers.data.length > 0) {
         customerId = customers.data[0].id; // Use existing customer if found
      }

      const baseUrl =
         process.env.NODE_ENV == 'production'
            ? `https://${process.env.VERCEL_URL}`
            : `${process.env.NEXT_PUBLIC_BASE_URL}`;

      const cancelUrl = `${baseUrl}/cart`;
      const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

      const checkoutData = {
         customer: customerId,
         customer_creation: customerId ? undefined : 'always', // Create a new customer if none exists
         customer_email: !customerId ? metadata.customerEmail : undefined, // Set email if customer is new
         metadata,
         mode: 'payment',
         allow_promotion_codes: true,
         success_url: successUrl,
         cancel_url: cancelUrl,

         line_items: items.map((item) => ({
            price_data: {
               currency: 'gbp',
               unit_amount: Math.round(item.product.price * 100),
               product_data: {
                  name: item.product.name || 'Unnamed Product',
                  description: `Product ID: ${item.product_id}`,
                  metadata: {
                     id: item.product._id,
                  },
                  images: item.product.image
                     ? [imageUrl(item.product.image).url()]
                     : undefined,
               },
            },
            quantity: item.quantity,
         })),
      };

      // Create the checkout session
      const session = await stripe.checkout.sessions.create(checkoutData);

      return session.url;
   } catch (error) {
      console.error('Error creating checkout session:', error.message);
      throw new Error('Checkout session creation failed');
   }
}
