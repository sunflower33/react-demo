import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TestSaga from '../views/reactDemo/TestSaga'

export default function DemoLayoutRouter() {
  return (
    <Switch>
      <Route path="/demos/testSaga" component={TestSaga}></Route>
    </Switch>
  )
}
