import { useState, useEffect } from 'react'

function useMouse() {
  const [state, setState] = useState({
    pageX: NaN,
    papeY: NaN,
  })
  useEffect(() => {
    function move(e) {
      setState({
        pageX: e.pageX,
        papeY: e.papeY,
      })
    }
    document.addEventListener('mousemove', move)
    return ()=>{
      document.removeEventListener('mousemove', move)
    }
  }, [])
  return state
}
export default useMouse
