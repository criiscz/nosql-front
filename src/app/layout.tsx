'use client'
import './globals.css'
import {Inter} from 'next/font/google'
import {QueryClient, QueryClientProvider} from "react-query";
import {SSRProvider} from "react-aria";
import {ReviewContext} from "@/context/ReviewContext";
import {useState} from "react";
import {Review} from "@/models/Review";

const inter = Inter({subsets: ['latin']})
export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {

  const queryClient = new QueryClient()
  const [reviews, setReviews] = useState<Review[]>([])
  return (
    <html lang="en">
    <SSRProvider>
      <QueryClientProvider client={queryClient}>
        <ReviewContext.Provider value={{reviews, setReviews}}>
          <body className={inter.className}>{children}</body>
        </ReviewContext.Provider>
      </QueryClientProvider>
    </SSRProvider>
    </html>
  )
}
