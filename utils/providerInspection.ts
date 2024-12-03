import { supabase } from "./clients"
import useMessage from "@/utils/message"
import { getTimeNumber } from "./pubFunProvider"
import { inspectionForms } from '@/utils/dbType'

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

export const getInspectionDeviceData = async (id?: string) => {
  const {data, error} = await supabase
  .from('inspection_table')
  .select('*')
  .match({id: id})
  try {
    if (data) return data || []
    useMessage(2, error?.message, 'error')
  }catch(error) {
    throw error
  }
}

export const insertInspectionDeviceData = async ({
  inspection_id,
  inspection_time,
  inspection_number,
  inspection_phone,
  inspection_name,
  inspection_email,
  inspection_status,
  inspection_deviceData
}: inspectionForms) => {
  const {data, error} = await supabase.from('inspection_table').insert({
    inspection_id: getTimeNumber()[1],
    inspection_time,
    inspection_number,
    inspection_phone,
    inspection_name,
    inspection_email,
    inspection_status,
    inspection_deviceData
  }).select('*')
  try {
    if (data) {
      useMessage(2, 'Inspection record create sucessful!','success')
      return data
    }
    useMessage(2, error?.message, 'error')
  }catch(error) {
    throw error
  }
}


export const getProblemDeviceTableData  = async () => {
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