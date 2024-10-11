"use client"
import Stripe from "stripe"
import useCart from "../(store)/store"
import Image from "next/image"
import { useEffect } from "react"

export default function ProductPage(props) {
  const { searchParams } = props
  const { price_id } = searchParams
  const product = useCart(state => state.product)
  const addItemToCart = useCart(state => state.addItemToCart)
  const { cost, productInfo, name, description } = product
  const setProduct = useCart(state => state.setProduct)
  // const getProduct = useCart(state => state.getProduct)

  // console.log(product)
  // console.log(searchParams)
  // useEffect(() => {
    // const myProduct = getProduct()
    // console.log('product ' + cart.product)
    // const { cost, productInfo, name, description } = myProduct
  // }, []) // Run getProduct on page load

  // if (!product?.name) {
    /* TODO - handling the URL context by refetching
    * the product on page load on the sub page route
    * instead of route to homepage
    */
    // window.location.href = "/"
  // }

  function handleAddToCart() {
    // console.log('PRICE ID: ', price_id)
    const newItem = {
      quantity:1,
      price_id,
      name,
      cost
    }
    addItemToCart({ newItem })
  }

  return (
    <div className='flex flex-col p-4'>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-
      [1000px] mx-auto">
        <div className='md:p-2 md:shadow'>
          <Image priority={true} width={500} height={500} src={productInfo.images[0]} alt={name}
            className="w-full h-full object-cover"></Image>
        </div>
        <div className='flex flex-col gap-2 p-4'>
          <div className='flex md:flex-col md:items-start text-xl
          items-center justify-between gap-2'>
            <h3>{name}</h3>
            <p className="md:text-base">${cost / 100} CAD</p>
          </div>
          <p className='text-sm flex-1'>{description}</p>
          <button onClick={handleAddToCart} className="bg-slate-700 text-white
          hover:bg-slate-500 cursor-pointer ml-auto px-4
          py-2">Add To Cart</button>
        </div>
      </div>
    </div>
  )
}