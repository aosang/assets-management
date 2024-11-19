import { supabase } from "./clients"
import useMessage from "@/utils/message"
import { getTimeNumber } from "./pubFunProvider"

export const getItAssetsTabbleData = async () => {
  const { data, error } = await supabase.from("it_assets").select("*")
  try {
    if(data) return data || []
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
    if(data) return data || []
    useMessage(2, error?.message, 'error')
  }
  catch (error) {
    throw error
  }
}

// insert it assets
export const insertItAssets = async ({
  product_name,
  product_time,
  product_type,
  product_brand,
  product_status,
  product_username,
  product_price,
  product_remark,
}) => {
  const { data, error } = await supabase.from('it_assets').insert({
    product_id: getTimeNumber()[1],
    product_name,
    product_time,
    product_type,
    product_brand,
    product_status,
    product_username,
    product_price,
    product_remark,
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
