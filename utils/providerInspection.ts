import { supabase } from "./clients"
import useMessage from "@/utils/message"
import { getTimeNumber } from "./pubFunProvider"

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

export const getProblemDeviceTableData = async () => {
  const {data, error} = await supabase.from('problem_device').select('*')
  try {
    if (data) return data || []
    useMessage(2, error?.message, 'error')
  }catch(error) {
    throw error
  }
}

export const getInspectionProblemDeviceData = async () => {
  const { data, error } = await supabase.from('problem_device').select('*')
  try {
    if (data) return data || []
    useMessage(2, error?.message, 'error')
  }catch(error) {
    throw error
  }
}
 
export const addInspectionProblemDeviceData = async ({
  inspection_id,
  inspection_device,
  inspection_description
}) => {
  const { data, error } = await supabase
  .from('problem_device')
  .insert({
    inspection_id,
    inspection_device,
    inspection_description,
  })
  .select('*')

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