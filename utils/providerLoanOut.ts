import { supabase } from "./clients"

export const getLoanOutTableData = async (id?: string) => {
  if(id) {
    const [ loanoutData ] = await Promise.all([
      supabase.from('loanout_table').select('*').eq('id', id)
    ])

    if(loanoutData.error) throw loanoutData.error
    return loanoutData.data
  }else {
    const { data, error } = await supabase
    .from('loanout_table')
    .select('*')

    if(error) throw error
    return data
  } 

}