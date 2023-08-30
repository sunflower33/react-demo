import useMouse from '../../hooks/useMouse'

export default function CustomHooksDemo() {
    const mouse = useMouse()
  return (
    <div>customHooksDemo, {mouse.pageX}, {mouse.pageX}</div>
  )
}
