import { supabase } from "@/utils/clients"

export const getLibrarysDataList = async (id: string) => {
  const {data, error} = await supabase
  .from('library_table')
  .select('*')
  .eq('id', id)
  return data
}