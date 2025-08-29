"use client"
import { Button } from '@/components/ui/button'
import React, { useRef, useState } from 'react'
import { useBarcode } from 'next-barcode';
import Link from 'next/link';
import Image from 'next/image';

const Home = () => {
  const [input, setInput] = useState('')
  const [barcodeValue, setBarcodeValue] = useState('Spider Function')
  const svgRef = useRef<SVGSVGElement | null>(null)

  const { inputRef } = useBarcode({
    value: barcodeValue,
    options: {
      background: '#ffcccc',
    }
  });

  // Use a callback ref to set both refs
  const setRefs = (node: SVGSVGElement | null) => {
    if (node) {
      (inputRef as React.MutableRefObject<SVGSVGElement | null>).current = node
      svgRef.current = node
    }
  }

  // Download SVG as file
  const handleDownload = () => {
    if (svgRef.current) {
      const serializer = new XMLSerializer()
      const source = serializer.serializeToString(svgRef.current)
      const svg64 = btoa(unescape(encodeURIComponent(source)))
      const image64 = `data:image/svg+xml;base64,${svg64}`

      const img = new window.Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          canvas.toBlob(blob => {
            if (blob) {
              const sanitize = (str: string) =>
                str.replace(/[^a-z0-9_\-\.]/gi, '_') || 'barcode'
              const url = URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.href = url
              link.download = `${sanitize(barcodeValue)}.png`
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
              URL.revokeObjectURL(url)
            }
          }, 'image/png')
        }
      }
      img.src = image64
    }
  }

  return (
    <div className='flex flex-col items-center p-16 gap-8'>
      <Link href={'https://spiderfunction.com'} target="_blank" rel="noopener noreferrer">
        <Image src={'/logo.png'} 
        alt='Spider Function Logo'
        width={120}
        height={120}
        className='hover:animate-spin transition-all duration-500 hover:scale-110'
        />
      </Link>

      <div>
        <h1 className='text-3xl uppercase font-bold tracking-wider'>Barcode Generator</h1>
        <p>Made by <Link href={'https://spiderfunction.com'} className='text-red-600 underline underline-offset-6 hover:text-red-600/80 transition-all duration-300' target="_blank" rel="noopener noreferrer">Spider Function</Link></p>
      </div>

      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="border px-4 py-2 text-black w-full max-w-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
        placeholder="Enter barcode value"
        autoComplete="off"
      />

      <Button
        variant={'pressable'}
        onClick={() => setBarcodeValue(input)}
        className='px-24 py-6 text-xl h-14'
        disabled={!input.trim()}
      >
        Generate
      </Button>

      <svg ref={setRefs} />
        
      <Button
        variant={'pressable'}
        onClick={handleDownload}
        className='px-24 py-6 text-xl h-14'
        disabled={!barcodeValue.trim()}
      >
        Download
      </Button>

    </div>
  )
}

export default Home