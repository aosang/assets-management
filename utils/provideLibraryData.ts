import { supabase } from "./clients"
import { knowledgeTypeItem } from "@/utils/dbType"
import useMessage from "@/utils/message"

export const getLibraryTableData = async () => { 
  const {data, error} = await supabase.from('library_table')
  .select('*')
  try {
    if(data) return data
    useMessage(2, error!.message, 'error')
  } catch (error) {
    throw error
  }
}

export const insertLibraryData = async ({title, author, type, created_time, content }: knowledgeTypeItem) => {
  const {data, error} = await supabase.from('library_table')
  .insert({
    title,
    author,
    type,
    created_time,
    content
  })
  .select('*')
  try {
    if(data) return data
    useMessage(2, error!.message, 'error')
  } catch (error) {
    throw error
  }
}