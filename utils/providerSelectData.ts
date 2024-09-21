import { supabase } from "./clients"
import useMessage from "./message"
import { nanoid } from 'nanoid'
import dayjs from "dayjs"

// get session
export const getSession = async () => {
  const {data: session, error} = await supabase.auth.getSession()
  try {
    if (session) return session
    useMessage(2, error!.message, 'error')
  } catch (error) {
    throw error
  }
}

// get user
export const getUser = async () => {
  const {data: user, error} = await supabase.auth.getUser()
  try {
    if (user) return user
    useMessage(2, error!.message, 'error')
  } catch (error) {
    throw error
  }
}

// get profiles
export const getProfiles = async () => {
  const {data, error} = await supabase.from('profiles').select('*')
  try {
    if (data) return data
    useMessage(2, error!.message, 'error')
  } catch (error) {
    throw error
  }
}

// get workOrder type
export const getWorkOrderType = async () => {
  const {data, error} = await supabase.from('product_type').select('*')
  try {
    if (data) return data.sort((a, b) => a.product_id.localeCompare(b.product_id))
    useMessage(2, error!.message, 'error')
  } catch (error) {
    throw error
  }
}

// get workOrder brand
export const getWorkBrand = async (keys: string) => {
  let key = keys
  const {data, error} = await supabase.from('product_type').select(`key, product_brand (value)`).eq('key', key)
  try {
    if(data) return data
    useMessage(2, error!.message, 'error')
  } catch (error) {
    throw error
  }
}

// get workOrder status
export const getWorkOrderStatus = async () => {
  const {data, error} = await supabase.from('status').select('*')
  try {
    if(data) return data
    useMessage(2, error!.message, 'error')
  }catch (error) {
    throw error
  }
}

// get workOrder
export const getWorkOrder = async (id?: string) => {
  const {data, error} = await supabase.
    from('work_order')
    .select('*')
    .match({id: id})
  try {
    if(data) { 
       data.forEach((item) => { 
        item.created_at = dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')
      })
      data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      return data
    }else {
      useMessage(2, error!.message, 'error')
    }
  }catch (error) {
    throw error
  }
}

export const insertUpdateWorkOrder = async ({
    created_product, 
    created_name, 
    created_text, 
    created_solved, 
    created_type,
    created_brand,
    created_status,
    created_remark
  }) => {
  let number: number = Math.floor(Math.random() * 99) + 1
  const {data, error} = await supabase
  .from('work_order')
  .insert({
    created_id: nanoid() + number,
    created_product,
    created_name: created_name,
    created_text: created_text,
    created_solved,
    created_type,
    created_brand,
    created_status,
    created_remark,
  })
  .select()

  try {
    if(data) {
      useMessage(2, 'Create sucessful!','success')
      return data
    }
    useMessage(2, error!.message, 'error')
  }catch (error) {
    throw error
  }
}
