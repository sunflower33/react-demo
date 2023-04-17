import React from "react";
import { Route } from "react-router-dom";
import HooksDemo from "../../demo/hooks/hooksDemo";
import Communication from "./demo/Communication";
import LifeCycle from "./demo/LifeCycle";
import TestParams from "./demo/TestParams";
import UserInfo from "./demo/UserInfo";
import { Switch } from "react-router-dom";
export default function ReactDemo() {
  return (
    <>
      <Switch>
        <Route path="/react-demo/communication" component={Communication} />
        <Route path="/react-demo/lifeCycle" component={LifeCycle} />
        <Route path="/react-demo/hooksDemo" component={HooksDemo} />
        <Route path="/react-demo/userInfo" component={UserInfo} />
        <Route path="/react-demo/testParams/:id" component={TestParams} />
      </Switch>
    </>
  );
}
