import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Sidebar from '@/Components/Sidebar'
import './globals.css'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/Components/Player'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to Music',
}

const revalidate = 0;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const userSongs = await getSongsByUserId();
const products = await getActiveProductsWithPrices();
  

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
         <SupabaseProvider>
           <UserProvider>
             <ModalProvider products ={products} />
              <Sidebar songs={userSongs}>
                {children}
              </Sidebar>
              <Player/>
           </UserProvider>
         </SupabaseProvider>
        </body>
    </html>
  )
}
/*function getActiveProductsWithPrices() {
  throw new Error('Function not implemented.')
}*/

