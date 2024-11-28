import { supabase } from "./clients"
import useMessage from "@/utils/message"
import { getTimeNumber } from "./pubFunProvider"
import { productItem } from '@/utils/dbType'

export const getItAssetsTabbleData = async () => {
  const { data, error } = await supabase
    .from("it_assets")
    .select('*')
    .order('product_time', { ascending: false })

  try {
    if (data) return data || []
    useMessage(2, error?.message, 'error')
  }
  catch (error) {
    throw error
  }
}

export const getCodeAssetsData = async (query?: string) => {
  const { data, error } = await supabase
  .from('it_assets')
  .select('*')
  .eq('product_id', query)

  try {
    if (data) return data || []
    useMessage(2, error?.message, 'error')
  }
  catch (error) {
    throw error
  }
}

// get IT assets status
export const getItAssetsStatusData = async () => {
  const { data, error } = await supabase.from('it_status').select('*')
  try {
    if (data) return data || []
    useMessage(2, error?.message, 'error')
  }
  catch (error) {
    throw error
  }
}

// insert it assets
export const insertItAssets = async ({
  product_id,
  product_name,
  product_time,
  product_update,
  product_type,
  product_brand,
  product_status,
  product_username,
  product_price,
  product_remark,
}) => {
  const { data, error } = await supabase.from('it_assets')
  .insert({
    product_id: getTimeNumber()[1],
    product_name,
    product_time,
    product_update,
    product_type,
    product_brand,
    product_status,
    product_username,
    product_price,
    product_remark,
  })
  .select('*')

  try {
    if (data) {
      useMessage(2, 'Create sucessful!', 'success')
      return data
    }
    useMessage(2, error!.message, 'error')
  } catch (error) {
    throw error
  }
}

// delete
export const deleteItAssets = async (id: string[]) => {
  const { error } = await supabase
    .from('it_assets')
    .delete()
    .in('product_id', id)
  try {
    if (error) return useMessage(2, error.message, 'error')
    useMessage(2, 'Delete sucessful!', 'success')
  } catch (error) {
    throw error
  }
}

export const searchItAssetsData = async (
  type?: string | null, status?: string | null, startTime?: string | null, endTime?: string | null
) => {
  if (type && !status && !startTime) {
    const { data, error } = await supabase.
      from('it_assets')
      .select('*')
      .eq('product_type', type)

    try {
      if (data) return data
      useMessage(2, error!.message, 'error')
    } catch (error) {
      throw error
    }
  } else if (status && !type && !startTime) {
    const { data, error } = await supabase.
      from('it_assets')
      .select('*')
      .eq('product_status', status)

    try {
      if (data) return data
      useMessage(2, error!.message, 'error')
    } catch (error) {
      throw error
    }
  } else if (status && type && !startTime) {
    const { data, error } = await supabase.
      from('it_assets')
      .select('*')
      .eq('product_type', type)
      .eq('product_status', status)

    try {
      if (data) return data
      useMessage(2, error!.message, 'error')
    } catch (error) {
      throw error
    }
  } else if (!type && !status && startTime) {
    const { data, error } = await supabase
      .from('it_assets')
      .select('*')
      .gte('product_time', startTime)
      .lte('product_time', endTime)

    try {
      if (data) return data
      useMessage(2, error!.message, 'error')
    } catch (error) {
      throw error
    }

  } else if (type && !status && startTime) {
    const { data, error } = await supabase
      .from('it_assets')
      .select('*')
      .eq('product_type', type)
      .gte('product_time', startTime)
      .lte('product_time', endTime)

    try {
      if (data) return data
      useMessage(2, error!.message, 'error')
    } catch (error) {
      throw error
    }

  } else if (!type && status && startTime) {
    const { data, error } = await supabase
      .from('it_assets')
      .select('*')
      .eq('product_status', status)
      .gte('product_time', startTime)
      .lte('product_time', endTime)

    try {
      if (data) return data
      useMessage(2, error!.message, 'error')
    } catch (error) {
      throw error
    }
  } else if (type && status && startTime) {

  } else {
    const { data, error } = await supabase.
      from('it_assets')
      .select('*')
    try {
      if (data) return data
      useMessage(2, error!.message, 'error')
    } catch (error) {
      throw error
    }
  }
}

// update
export const editItAssetsData = async (assetsId: string, assetsOrderForm: productItem) => {
  const { error } = await supabase
  .from('it_assets')
  .update(assetsOrderForm)
  .eq('product_id', assetsId)

  try {
    if(error) return useMessage(2, error!.message, 'error')
    useMessage(2, 'Update sucessful!','success')
  } catch (error) {
    throw error
  }
}