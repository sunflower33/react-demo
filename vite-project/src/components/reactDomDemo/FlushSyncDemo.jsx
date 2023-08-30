import { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import { flushSync } from 'react-dom'

export default function UseUpdateEffectDemo() {
  const [count, setCount] = useState(6)
  const [count2, setCount2] = useState(3)
  const ref = useRef(null)

  useEffect(() => {
    console.log(123)
  }, [count])

  const onClickHandler = () => {
    // 将会破坏批处理的执行
    flushSync(() => {
      setCount(count + 1)
    })
    flushSync(() => {
      setCount2(count2 + 3)
    })
    console.log(ref.current.innerHTML)
  }
  console.log('渲染了几次？')

  return (
    <div>
      UseUpdateEffectDemo
      <Button onClick={onClickHandler}>点击</Button>
      <div ref={ref}> {count}</div>
      <div>count2:{count2}</div>
    </div>
  )
}
