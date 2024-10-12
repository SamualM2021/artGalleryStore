import "./globals.css";

export const metadata = {
  title: "AISmart Art Gallery",
  description: "A Marketplace for AISmart's Art",
};

import { Inter } from "next/font/google"
import Link from "next/link";
import Header from "../components/Header";

const inter = Inter({subsets : ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className={'min-h-screen flex flex-col relative ' + inter.className} >
        <Header></Header>
        <div className='flex-1'>
          {children}
        </div>
        <footer className='flex items-center flex-wrap justify-center
        border-t border-solid border-slate-300 p-4 md:p-8'>
          {/* This would link to the business instagram account */}
          <Link href='https://www.instagram.com'
          target='_blank'>
            <i className="fa-brands fa-square-instagram text-slate-700
            hover:text-slate-500 cursor-pointer text-2xl sm:text-3xl
            md:text-4xl"></i>
          </Link>
        </footer>
        <div id="portal"></div>
      </body>
    </html>
  );
}
