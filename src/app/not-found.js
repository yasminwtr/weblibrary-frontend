'use client'
import { Providers } from './providers'
import Navigationbar from '@/components/Navigationbar'
import "@/styles/globals.css";

export default function NotFound() {
  return (
    <html lang="en" className='light'>
      <head>
        <title>Página não encontrada</title>
      </head>
      <body>
        <Providers>
          <Navigationbar />
          <div className='flex flex-col items-center justify-center h-screen'>
            <h2 className='font-bold text-9xl mb-2'>404</h2>
            <p className='text-2xl'>Página não encontrada</p>
          </div>
        </Providers>
      </body>
    </html>
  )
}