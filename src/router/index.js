import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import HooksDemo from "../demo/hooks/hooksDemo";
import LifecycleDemoV2 from "../demo/生命周期/生命周期V2/lifecycleDemoV2";
import NotFoundPage from "../views/notFoundPage";

export default function RouterLayout() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/hooksDemo" component={HooksDemo} />
          <Route path="/lifecycleDemoV2" component={LifecycleDemoV2} />
          <Redirect from="/" to="/hooksDemo" exact />
          <Route component={NotFoundPage} />
          {/* <Route path="*" component={NotFoundPage} /> */}
        </Switch>
      </HashRouter>
    </div>
  );
}
