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
  created_update: string
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
  created_update: string
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

export interface assetsItem {
  id: string,
  status: string
}

export interface productItem {
  product_id: string,
  product_name: string
  product_type: null | string
  product_brand: null | string
  product_status: null | string
  product_time: string,
  product_update: string,
  product_username: string
  product_price: number
  product_remark: string
}

export interface updateProfilesItem {
  username: string
  company: string
  email: string
}

export interface inspectionStatusItem {
  id: string,
  value: string,
  key: string
}

export interface inspectionForms {
  inspection_id: string,
  inspection_time: string,
  inspection_number: number,
  inspection_phone: string,
  inspection_name: string,
  inspection_email: string,
  inspection_status: string | null,
  inspection_deviceData: inspectionItem[]
}

export interface inspectionItem {
  inspection_id: string,
  inspection_device: string | null,
  inspection_description: string,
  key: string
}

export interface selectInspectionItem {
  id: string
  value: string,
  key: string
}