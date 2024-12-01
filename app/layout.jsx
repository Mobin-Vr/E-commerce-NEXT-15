import { DisableDraftMode } from '@/components/DisableDraftMode';
import Header from '@/components/Header';
import { SanityLive } from '@/sanity/lib/live';
import { ClerkProvider } from '@clerk/nextjs';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import '@/app/globals.css';

export const metadata = {
   title: 'Create Next App',
   description: 'Generated by create next app',
};

export default async function RootLayout({ children }) {
   const draftState = await draftMode();

   return (
      <ClerkProvider dynamic>
         <html lang='en'>
            <body>
               {draftState.isEnabled && (
                  <>
                     <DisableDraftMode />
                     <VisualEditing />
                  </>
               )}
               <SanityLive />
               <main>
                  <Header />
                  {children}
               </main>
            </body>
         </html>
      </ClerkProvider>
   );
}
