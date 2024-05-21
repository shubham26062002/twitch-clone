import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Toaster } from 'sonner'

import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Streamtech - Watch and Stream Live Content Worldwide',
  description: 'Streamtech offers a revolutionary live streaming experience. Watch and stream your favorite content effortlessly. Join a vibrant community of creators and viewers today!',
  keywords: 'Live streaming platform, Video streaming service, Streamtech, Watch live content, Stream live events, Live video streaming, Online streaming platform, Watch live broadcasts, Streamtech community, Live gaming streams, Music livestreams, Educational streams, Entertainment streaming, Live sports events, Streamtech channels, Broadcasting platform, Streamtech network, Live chat feature, Explore live content, Discover new streams, Interactive live experiences, Real-time streaming, Streamtech app, High-quality streaming, Live stream aggregation, Streamtech creators, Viewer engagement, Trending live streams, Personalized recommendations, Streamtech membership, Streamtech subscriptions, Streamtech events calendar, Streamtech highlights, Streamtech on-demand, Streamtech originals, Streamtech community guidelines, Streamtech content policies, Streamtech privacy settings, Streamtech monetization options, Streamtech partnership opportunities',
}

interface RootLayoutProps {
  children: React.ReactNode,
}

const RootLayout = ({
  children,
}: RootLayoutProps) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html className="h-full bg-[#161616]" lang="en" suppressHydrationWarning>
        <body className={cn('h-full bg-[#161616]', inter.className)}>
          <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
            <Toaster theme="light" position="bottom-center" />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout