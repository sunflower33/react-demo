import React from 'react'
/* 
  react 模块
  1. 核心模块
  2. 组件
*/
import ReactDOM from 'react-dom/client'
/* 
  react-dom模块
  1. 操作浏览器DOM
  2. react-dom/client、react-dom/server
*/
// import App from './App.jsx'
// import App from '@components/UseImmerDemo'
import App from '@components/ForwardRefDemo'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 
    Strict Mode严格模式
    1. 检查组件是否是纯函数
    2. 及早的发现useEffect中的错误
    3. 警告过平的API
   */}
    <App />
  </React.StrictMode>
)
