import { supabase } from "./clients"
import useMessage from "@/utils/message"

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