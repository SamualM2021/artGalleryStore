"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import useCart from '@/app/(store)/store'
import Image from 'next/image'

export default function ProductCard(props) {
  const { product } = props
  const {id: price_id, unit_amount: cost, product: productInfo} = product
  const {name, description } = productInfo

  const setProduct = useCart(state => state.setProduct)

  const router = useRouter()

  function onProductClick() {
    const newProduct = {
      name,
      description,
      price_id,
      cost,
      productInfo
    }
    setProduct({ newProduct })
    router.push('/product?price_id=' + price_id)
  }
  return (
    <div onClick={onProductClick} className='flex flex-col shadow:bg-white hover:shadow-lg
    cursor-pointer'>
      <Image priority={true} width={250} height={250} src={productInfo.images[0]} alt={name} className="w-full
      h-full object-cover"></Image>
      <div className='flex flex-col gap-2 p-4'>
          <div className='flex items-center justify-between'>
            <h3>{name}</h3>
            <p>${cost/100} CAD</p>
          </div>
          <p className='text-sm'>{description}</p>
      </div>
    </div>
  )
}