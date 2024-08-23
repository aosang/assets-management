// 邮箱正则
let emailReg: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const emailRegFunc = (email: string) => {
  return emailReg.test(email)
}

// 密码正则
let passwordReg: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/
export const passwordRegFunc = (password: string) => {
  return passwordReg.test(password)
}