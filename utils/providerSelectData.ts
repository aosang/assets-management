import { supabase } from "./clients"
import useMessage from "./message"
import { getTimeNumber } from "./pubFunProvider"

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
      data.sort((a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime())
      return data
    }else {
      useMessage(2, error!.message, 'error')
    }
  }catch (error) {
    throw error
  }
}

// insert workOrder
export const insertUpdateWorkOrder = async ({
    created_product, 
    created_name,
    created_time, 
    created_text, 
    created_solved, 
    created_type,
    created_brand,
    created_status,
    created_remark
  }) => {
  const {data, error} = await supabase
  .from('work_order')
  .insert({
    created_id: getTimeNumber()[1],
    created_product,
    created_time,
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

// Delete workOrder
export const deleteWorkOrder = async (deleteId: string[]) => {
  const { error } = await supabase
    .from('work_order')
    .delete()
    .in('created_id', deleteId)

  try {
    if(error) return useMessage(2, error.message, 'error')
    useMessage(2, 'Delete success!','success')
  }catch (error) {
    throw error
  }

}
