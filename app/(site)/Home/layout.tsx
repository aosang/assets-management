import SideBar from '../components/Sidebar'

export default function RootLayout({ 
  children 
} : {
  children: React.ReactNode;
}) {
  return (
    <>
      <body>
        <SideBar>{children}</SideBar>
      </body>
    </>
  )
}