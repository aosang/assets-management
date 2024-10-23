'use client'
import SideBar from '../components/Sidebar'
import { getSession } from '@/utils/providerSelectData'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { updateProfilesItem } from '@/utils/dbType'


 export default function RootLayout({ children } : { children: React.ReactNode }) {
  const router = useRouter()
  const [mySession, setMySession] = useState<any>('')
  const [userId, setUserId] = useState<string>('')
  const [updateForm, setUpdateForm] = useState<updateProfilesItem>({
    username: '',
    company: '',
    email: '',
  })

  const getCheckSession = () => {
    getSession()
    .then(res => {
      const { session } = res!
      setMySession(session)
      setUserId(session!.user!.id)
      window.localStorage.setItem('myId', session!.user.id)
      
      setUpdateForm({...updateForm,
        username: session!.user.user_metadata.username, 
        company: session!.user.user_metadata.company,
        email: session!.user.email || '',
      })
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
          <SideBar userId={userId} update={updateForm}>
            {children}
          </SideBar>
        </div>
      )}
    </>
  )
}