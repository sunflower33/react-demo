import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import HooksDemo from "../demo/hooks/hooksDemo";
import LifeCycle from "../views/LifeCycle";
import NotFoundPage from "../views/notFoundPage";

export default function RouterLayout() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/hooksDemo" component={HooksDemo} />
          <Route path="/lifeCycle" component={LifeCycle} />
          <Redirect from="/" to="/hooksDemo" exact />
          <Route component={NotFoundPage} />
          {/* <Route path="*" component={NotFoundPage} /> */}
        </Switch>
      </HashRouter>
    </div>
  );
}
