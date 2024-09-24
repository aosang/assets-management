'use client'
import SideBar from './components/Sidebar/Sidebar'
import MaskLoad from '../components/MaskLoad'
import { supabase } from '@/utils/clients'
import { useEffect } from 'react'

export default function RootLayout({
    children
  } : {
    children: React.ReactNode
  }) {

  const getSession = async () => {
    const {data, error} = await supabase.auth.getSession()
  }  

  useEffect(() => {
    getSession()
  })

  return (
    <div>
      <SideBar>
        {/* <MaskLoad /> */}
        {children}
      </SideBar>
    </div>
  )
}
