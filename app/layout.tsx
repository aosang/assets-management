import './globals.css'


export const metadata = {
  title: 'Assets-Management',
  description: 'IT asset management system',
}

export default function RootLayout({ 
  children 
} : {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      </head>
      <body>{children}</body>
    </html>
  )
}