import { Redirect, Route, Switch } from "react-router-dom";
import TestGraphQL from "../views/reactDemo/TestGraphQL";
import TestSaga from "../views/reactDemo/TestSaga";

export default function DemoLayoutRouter() {
  return (
    <Switch>
      <Route path="/demos/testSaga" component={TestSaga}></Route>
      <Route path="/demos/testGraphQL" component={TestGraphQL} />
      <Redirect from="/demos" to="/demos/testSaga" exact />
    </Switch>
  );
}
