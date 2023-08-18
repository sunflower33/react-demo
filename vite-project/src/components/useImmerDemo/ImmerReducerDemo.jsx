import { Col, Row, Divider } from 'antd'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useImmerReducer } from 'use-immer'
import PropTypes from "prop-types"
 
const GlobalContext = React.createContext()

const initStateValue = {
  list: [],
  itmeDetail: { text: 'tewst' },
}

const reducer = (draft, action) => {
  switch (action.type) {
    case 'setList':
      draft.list = action.value
      break
    case 'setItemDetail':
      draft.itmeDetail = action.value
      break
    default:
      break
  }
}

export default function ImmerReducerDemo() {
  const [state, dispatch] = useImmerReducer(reducer, initStateValue)
  useEffect(() => {
    axios.get('/test.json').then((res) => {
      dispatch({ type: 'setList', value: res?.data?.list || [] })
    })
  }, [dispatch])

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Row style={{ backgroundColor: 'greenyellow' }}>
        <Col span={12} style={{ height: '200px', overflow: 'auto' }}>
          {state.list &&
            state.list.map((item) => (
              <ListItem key={item.id} {...item}></ListItem>
            ))}
        </Col>
        <Col span={12}>
          <ItmeDetail />
        </Col>
      </Row>
    </GlobalContext.Provider>
  )
}
function ListItem(props) {
  const { dispatch } = useContext(GlobalContext)
  return (
    <div
      style={{
        cursor: 'pointer',
      }}
      onClick={() => dispatch({ type: 'setItemDetail', value: props })}
    >
      <p> id: {props.id} </p> <p> text: {props.text} </p>
      <Divider />
    </div>
  )
}
ListItem.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  text: PropTypes.string
};


function ItmeDetail() {
  const {
    state: { itmeDetail },
  } = useContext(GlobalContext)
  return <div>{itmeDetail?.text || '无内容'} </div>
}
