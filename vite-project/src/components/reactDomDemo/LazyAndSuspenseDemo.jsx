import { Button, Space } from 'antd'
import { Suspense, lazy, useState } from 'react'
const FlushSyncDemo = lazy(() =>
  import('@components/reactDomDemo/FlushSyncDemo')
)

export default function LazyAndSuspenseDemo() {
  const [show, setShow] = useState(false)
  return (
    <Space direction='vertical'>
      LazyAndSuspenseDemo
      <Button onClick={() => setShow(true)}>显示</Button>
      <Suspense fallback={<div>Loading......</div>}>{show && <FlushSyncDemo />}</Suspense>
    </Space>
  )
}
