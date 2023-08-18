import { Input } from 'antd'
import { useTransition, useState } from 'react'
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

export default function UseTransitionDemo() {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [pending, startTransition] = useTransition()

  const handleChange = (e) => {
    // 紧急
    setSearch(e.target.value)
    // 非紧急
    startTransition(() => {
      setQuery(e.target.value)
    })
  }
  return (
    <div>
      <Input type="text" value={search} onChange={handleChange} />
      {pending && <div>Loading.....</div>}
      <Query query={query} />
    </div>
  )
}
