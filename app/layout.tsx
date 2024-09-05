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
      <body>{children}</body>
    </html>
  )
}