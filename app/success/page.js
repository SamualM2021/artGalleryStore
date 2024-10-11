import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className='flex flex-col'>
      Nice!
      <Link className='hover:opacity-60 cursor-pointer' href={'/'}><i className="fa-regular fa-circle-left"></i>Back home</Link>
    </div>
  )
}