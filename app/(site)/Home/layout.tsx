'use client'
import SideBar from './components/Sidebar/Sidebar'

export default function RootLayout({
    children
  } : {
    children: React.ReactNode
  }) {
  
  return (
    <div>
      <SideBar>
        {children}
      </SideBar>
    </div>
  )
}
