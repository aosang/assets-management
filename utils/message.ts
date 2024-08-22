import { message } from 'antd';

interface textProps {
  time: number
  content: string
}

const showMessage = (props: textProps) => {
  message.success({
    duration: props.time,
    content: props.content,
  })
}

export default showMessage