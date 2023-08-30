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
// import App from '@components/ForwardRefDemo'
// import App from '@components/ImmerReducerDemo'
// import App from '@components/StartTransitionDemo'
// import App from '@components/UseTransitionDemo'
// import App from '@components/UseDeferredValueDemo'
// import App from '@components/ThemeDome'
// import App from '@components/LocalLanguageDemo'
// import App from '@components/CustomHooksDemo'
// import App from '@components/ahooksDemo/UseRequestDemo'
// import App from '@components/customHooks/UseUpdateEffectDemo'
// import App from '@components/reactDomDemo/FlushSyncDemo'
import App from '@components/reactDomDemo/LazyAndSuspenseDemo'
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
