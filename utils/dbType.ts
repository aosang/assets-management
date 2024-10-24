export interface formCollect {
  email: string,
  password: string,
  username: string,
  company: string
}  

export interface tableItems {
  key: string
  user_id: string
  created_product: string
  created_id: string
  created_name: string
  created_time: string
  created_text: string
  created_solved: string
  created_at: string
  created_type: string
  created_brand: string
  created_status: string
  created_remark: string
}

export interface workOrderFormProps {
  created_product: string
  created_name: string
  created_time: string
  created_text: string
  created_solved: string 
  created_type: null | string
  created_brand: null | string
  created_status: null | string
  created_remark: string
}

export interface typeDataName {
  id: string
  value: string
  key: string
  product_id: string
}

export interface typeDataBrand {
  id: string
  value: string
  label: string
  key: string,
  logo_url: string
  brand_id: string
}

export interface statusItem {
  id: string
  status: string
}

export interface productItem {
  id: string
  product_id: string
  product_time: string
  product_name: string
  product_type: string
  product_brand: string
  product_num: string
  product_remark: string
}

export interface updateProfilesItem {
  username: string
  company: string
  email: string
}