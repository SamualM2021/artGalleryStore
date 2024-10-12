"use client"
import React, {useLayoutEffect, useState} from 'react'
import { createPortal } from 'react-dom'
import useCart from '@/app/(store)/store';
import { useRouter } from 'next/navigation';

export default function Modal() {
  const closeModal = useCart(state => state.setOpenModal)
  const cartItems = useCart(state => state.cart)
  const removeItemFromCart = useCart(state => state.removeItemFromCart)
  const emptyCart = useCart(state => state.emptyCart)
  // console.log(cartItems)
  const router = useRouter()

  async function checkout() {
    const lineItems = cartItems.map(cartItem => {
      console.log('CART ITEM: ', cartItem)
      return {
        price: cartItem.price_id,
        quantity: 1
      }
    })
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lineItems })
    })
    const data = await res.json()
    router.push(data.session.url)
  }

  function handleRemoveFromCart(index) {
    // console.log("index: " + index)
    removeItemFromCart({index})
  }

  const [containerToLoad, setContainerToLoad] = useState(null);

  // useLayoutEffect is required here to reference the portal
  useLayoutEffect(() => {
    setContainerToLoad(document.getElementById('portal'));
  }, []);
  return containerToLoad && createPortal(
  <div className='fixed top-0 left-0 w-screen h-screen z-50'>
    <div onClick={closeModal} className='bg-transparent absolute inset-0'></div>
    <div className='flex flex-col bg-white absolute right-0 top-0 h-screen shadow-lg
    w-screen sm:w-96 max-w-screen gap-4'>
      <div className='flex items-center p-6 justify-between text-xl relative'>
        <h1>Cart <i onClick={emptyCart} className="opacity-20 hover:opacity-40 fa-solid fa-cart-shopping"></i></h1>
        <i onClick={closeModal} className="fa-solid cursor-pointer hover:opacity-60
        fa-xmark"></i>
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px]
        bg-slate-300 w-2/3'></div>
      </div>
      <div className='p-4 overflow-scroll flex-1 flex flex-col gap-4'>
        {/* Render the container based on the cart being empty or non-empty */}
        {cartItems.length === 0 ? (
          <p>There is nothing in your cart :'(</p>
        ) : (
          <>
          {cartItems.map((cartItem, itemIndex) => {
            return (
              <div key={itemIndex} className='flex border-l border-solid
              border-slate-700 px-2 flex-col gap-2'>
                <div className='flex items-center justify-between'>
                  <h2>
                    {cartItem.name}
                  </h2>
                  <p>${cartItem.cost/100} CAD</p>
                  <i onClick={() => handleRemoveFromCart(itemIndex)} className="fa-solid cursor-pointer hover:opacity-60
                fa-xmark"></i>
                </div>
                <p className='text-slate-600 text-sm'>Quantity: 1</p>
              </div>
            )
          })}
          <div onClick={checkout} className='border border-solid border-slate-700 text-xl m-4 p-6 uppercase
      grid place-items-center hover:opacity-60 cursor-pointer'>Checkout</div>
          </>
        )}
      </div>
    </div>
  </div>,
  containerToLoad)
}