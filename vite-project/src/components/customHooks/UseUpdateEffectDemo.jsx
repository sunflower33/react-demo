import { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'

function useUpdateEffect(effect, deps) {
  const isMounted = useRef(false)
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    } else {
      effect()
    }
  }, deps)
}

export default function UseUpdateEffectDemo() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(123)
  }, [count])
  useUpdateEffect(() => {
    console.log(456)
  }, [count])
  return (
    <div>
      UseUpdateEffectDemo
      <Button onClick={() => setCount(count + 1)}>点击</Button> {count}
    </div>
  )
}
