'use client'
import SideBar from '../components/Sidebar'
import { getSession, updateProfiles } from '@/utils/providerSelectData'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { updateProfilesItem } from '@/utils/dbType'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [mySession, setMySession] = useState<any>('')
  const [userId, setUserId] = useState<string>('')
  const [updateForm, setUpdateForm] = useState<updateProfilesItem>({
    username: '',
    company: '',
    email: '',
  })

  const getCheckSession = () => {
    let userIds:any = ''
    getSession()
      .then(res => {
        const { session } = res!
        setMySession(session)
        
        if (!session) {
          router.replace('/')
        } else {
          setUserId(session!.user?.id)
          window.localStorage.setItem('myId', session!.user.id)
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
          <SideBar userId={userId} update={mySession}>
            {children}
          </SideBar>
        </div>
      )}
    </>
  )
}