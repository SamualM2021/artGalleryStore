import Stripe from "stripe";
import ProductCard from "@/components/ProductCard";

async function getStripeProducts() {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
  const res = await stripe.prices.list({
    expand: ['data.product']
  })
  const prices = res.data
  return prices
}

export default async function HomePage() {
  const products = await getStripeProducts()
  console.log(products)
  return (
      <main className='p-4 flex flex-col'>
      <div className='max-w-[1000px] w-full mx-auto grid grid-cols-1
      sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {products.map((product, productIndex) => {
        return (
          <ProductCard key={productIndex} product={product}></ProductCard>
        )
      })}
      </div>
      </main>
  );
}
