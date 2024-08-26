import './globals.css'
import MaskLoad from './MaskLoad/page'

export const metadata = {
  title: "Assets-Management",
  description: "The Simple Asset Management System",
}

export default function RootLayout({
  children,
}:{
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <MaskLoad />
          <div>{children}</div>
      </body>
    </html>
  )
}
