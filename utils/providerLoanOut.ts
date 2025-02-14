import { supabase } from "./clients"
import useMessage from "@/utils/message"

export const getLoanOutTableData = async (id: string) => {
  const {data, error} = await supabase
  .from('loanout_table')
  .select('*')
  .match({id: id})

  try {
    if (data) return data || []
    useMessage(2, error?.message, 'error')
  }
  catch (error) {
    throw error
  }
}