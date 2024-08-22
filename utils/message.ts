import { message } from 'antd';



const showMessage = (time:number, text:string) => {
  message.error({
    duration: time,
    content: text,
  })
}

export default showMessage