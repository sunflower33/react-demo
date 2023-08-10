import { Input } from 'antd'
import { forwardRef, useRef } from 'react'

const MyInput = forwardRef(function MyInput(props,ref) {
  return (<Input ref={ref} />)
})

export default function ForwardRefDemo() {
  const ref = useRef(null)
  return (
    <div>
      ForwardRef: <MyInput ref={ref} />
    </div>
  )
}
