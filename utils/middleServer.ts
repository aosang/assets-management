import { createBrowserClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"


export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({name, value, options}) => request.cookies.set({name, value,...options}))
          supabaseResponse = NextResponse.next({
            request
          })
          cookiesToSet.forEach(({name, value, options}) => 
            supabaseResponse.cookies.set({name, value, ...options})
          )
        }
      }
    }
  )

  const {data: { user }} = await supabase.auth.getUser()
  if(!user && !request.nextUrl.pathname.startsWith("/Auth")) {
    const url = request.nextUrl.clone()
    url.pathname = "/Auth"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}