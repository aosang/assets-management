import './globals.css'


export const metadata = {
  title: 'Assets-Management',
  description: 'IT asset management system',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}

export default function RootLayout({ 
  children 
} : {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}