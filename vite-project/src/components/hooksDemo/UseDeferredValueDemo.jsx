import { Input } from 'antd'
import { useState, useDeferredValue } from 'react'
import PropTypes from 'prop-types'

function Query({ query }) {
  const items = []
  const word = 'Hello world'
  if (query !== '' && word.includes(query)) {
    const arr = word.split(query)
    for (let index = 0; index < 20000; index++) {
      items.push(
        <li key={index}>
          {arr[0]}
          <span style={{ color: 'red' }}>{query}</span>
          {arr[1]}
        </li>
      )
    }
  } else {
    for (let index = 0; index < 20000; index++) {
      items.push(<li key={index}>{word}</li>)
    }
  }
  return <ul>{items}</ul>
}
Query.propTypes = {
  query: PropTypes.string,
}

export default function UseDeferredValueDemo() {
  const [search, setSearch] = useState('')
  // 得到对应search一样的值，只不过是一个延迟的副本
  const query = useDeferredValue(search)

  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  return (
    <div>
      <Input type="text" value={search} onChange={handleChange} />
      <Query query={query} />
    </div>
  )
}
