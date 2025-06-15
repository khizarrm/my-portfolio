import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Khizar Malik",
  description: 'Software Developer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-jost">{children}</body>
    </html>
  )
}
