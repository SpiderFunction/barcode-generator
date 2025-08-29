import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <>
      <div className='p-12 flex flex-col justify-center items-center text-center space-y-8'>
        <h1 className='text-md md:text-xl lg:text-3xl xl:text-5xl font-bold text-shadow-lg text-shadow-red-200 dark:text-shadow-red-800'>Webpage Not Found</h1>
        <Image src={'/logo.png'}
          alt='Spider Function Logo'
          width={300}
          height={300}
        />
        <p className='text-md md:text-xl lg:text-3xl text-shadow-lg text-shadow-red-200 dark:text-shadow-red-800'>It seems like you are wandering too far from our cobweb</p>
        <div className='flex gap-x-8'>
          <Button variant={'pressable'} className='px-10 py-6 md:px-12 md:py-7 lg:px-14 lg:py-8 text-xl'>
            <Link href={'/'}>
              Go back to Barcode Generator
            </Link>
          </Button>
          <Button variant={'pressable'} className='px-10 py-6 md:px-12 md:py-7 lg:px-14 lg:py-8 text-xl'>
            <Link href={'https://spiderfunction.com'}>
              Go to Spider Function Home Page
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default NotFound