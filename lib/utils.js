import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

export function cn(...inputs) {
   return twMerge(clsx(inputs));
}

const builder = imageUrlBuilder(client);

export function imageUrl(source) {
   return builder.image(source);
}

export function formatCurrency(amount, currencyCode = 'GBP') {
   try {
      return new Intl.NumberFormat('en-GB', {
         style: 'currency',
         currency: currencyCode.toUpperCase(),
      }).format(amount);
   } catch (error) {
      // Fallback formatting if currency code is invalid
      console.error('Invalid currency code:', currencyCode, error);
      return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
   }
}
