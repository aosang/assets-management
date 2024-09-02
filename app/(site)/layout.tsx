import SideBar from './Sidebar/page'
import MaskLoad from './MaskLoad/page'
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <div>
      <SideBar>
          <MaskLoad />
          {children}
        </SideBar>
    </div>
  )
}
