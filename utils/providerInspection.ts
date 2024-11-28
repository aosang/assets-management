import { supabase } from "./clients"
import useMessage from "@/utils/message"
import { getTimeNumber } from '@/utils/pubFunProvider'

export const getInspectionStatusData = async () => {
  const { data, error } = await supabase.from('inspection_status').select('*')
  try {
    if (data) return data || []
    useMessage(2, error?.message, 'error')
  }
  catch (error) {
    throw error
  }
}