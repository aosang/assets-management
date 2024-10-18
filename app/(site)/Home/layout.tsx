'use client'
import SideBar from '../components/Sidebar'
import { getSession } from '@/utils/providerSelectData'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

 export default function RootLayout({ children } : { children: React.ReactNode }) {
  const router = useRouter()
  const [mySession, setMySession] = useState<any>(null)
  const getCheckSession = () => {
    getSession()
    .then(res => {
      const { session } = res!
      setMySession(session)
      if(!session) {
        router.replace('/')
      }
    })
  }

  useEffect(() => {
    getCheckSession()
  }, [])

  return (
    <>
      {mySession && (
        <div>
          <SideBar>{children}</SideBar>
        </div>
      )}
    </>
    
  )
}