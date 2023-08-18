import { Button, Checkbox, ConfigProvider, Space } from 'antd'
import { useState } from 'react'

export default function ThemeDome() {
  const [theme, setTheme] = useState()
  const handleClick1 = () => {
    setTheme({
      token: {
        colorPrimary: '#00ff00',
      },
    })
  }
  const handleClick2 = () => {
    setTheme({
      token: {
        colorPrimary: '#ff0000',
      },
    })
  }
  return (
    <div>
      <Space>
        <Button onClick={handleClick1}>主题一</Button>
        <Button onClick={handleClick2}>主题二</Button>
      </Space>
      <div>
        <ConfigProvider theme={theme}>
          <Space>
            <Button type="primary">按钮</Button>
            <Checkbox checked /> 全选
          </Space>
        </ConfigProvider>
      </div>
    </div>
  )
}
