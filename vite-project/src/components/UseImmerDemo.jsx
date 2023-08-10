import { Button } from 'antd'
import { useImmer } from 'use-immer'

export default function UseImmerDemo() {
  const [list, setList] = useImmer([
    {
      id: 1,
      text: 'aaa',
    },
    {
      id: 2,
      text: 'bbb',
    },
    {
      id: 3,
      text: 'ccc',
    },
  ])
  const handleClick = () => {
    setList((draft) => {
      draft.push({
        id: Math.random(2),
        text: 'ddd',
      })
      console.log(list)
    })
  }
  return (
    <div>
      UseImmerDemo
      <Button onClick={handleClick}>点击</Button>
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  )
}
