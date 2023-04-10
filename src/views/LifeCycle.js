import { Route, Switch,Redirect } from "react-router-dom";
import LifecycleDemo from "../demo/生命周期/生命周期V1/LifecycleDemo";
import LifecycleDemoV2 from "../demo/生命周期/生命周期V2/lifecycleDemoV2";
import {  } from "react-router-dom/cjs/react-router-dom.min";

export default function LifeCycle() {
  return (
    <div>
      <Switch>
        <Route path="/lifeCycle/lifeCycleDemoV2" component={LifecycleDemoV2} />
        <Route path="/lifeCycle/lifecycleDemo" component={LifecycleDemo} />
        <Redirect from="/lifeCycle" to="/lifeCycle/lifeCycleDemoV2" />
      </Switch>
    </div>
  );
}
