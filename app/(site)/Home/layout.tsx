'use clinet'
import SideBar from '../components/Sidebar'

export default function RootLayout({ 
  children 
} : {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <SideBar>{children}</SideBar>
      </body>
    </html>
  )
}