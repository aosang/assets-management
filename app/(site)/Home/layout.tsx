import SideBar from '../components/Sidebar'
export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <div>
      <SideBar>{children}</SideBar>
    </div>
  )
}