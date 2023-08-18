import { Calendar, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

export default function LocalLanguageDemo() {
  return (
    <div>
      LocalLanguageDemo
      <ConfigProvider locale={zhCN}>
        <Calendar />
      </ConfigProvider>
    </div>
  )
}
