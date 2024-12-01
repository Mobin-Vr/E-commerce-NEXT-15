import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
   projectId,
   dataset,
   apiVersion,
   useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
   stega: {
      // Check if the VERCEL_URL environment variable is set
      studioUrl: process.env.VERCEL_URL
         ? // If VERCEL_URL is set (used in Vercel deployments), use it to construct the URL
           `https://${process.env.VERCEL_URL}/studio`
         : // Otherwise, fall back to NEXT_PUBLIC_BASE_URL for local development or other environments
           `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
   },
});
