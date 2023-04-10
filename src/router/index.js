import { HashRouter, NavLink, Redirect, Route, Switch } from "react-router-dom";
import "../asset/index.css";
import HooksDemo from "../demo/hooks/hooksDemo";
import Communication from "../views/Communication";
import LifeCycle from "../views/LifeCycle";
import TestParams from "../views/TestParams"
import NotFoundPage from "../views/notFoundPage";

export default function RouterLayout() {
  return (
    <div>
      <HashRouter>
        <ul>
          <li>
            <NavLink to="/communication" activeClassName="text-danger">
              通信
            </NavLink>
          </li>
          <li>
            <NavLink to="/hooksDemo" activeClassName="text-danger">
              hooks demo
            </NavLink>
          </li>
          <li>
            <NavLink to="/lifeCycle" activeClassName="text-danger">
              生命周期
            </NavLink>
          </li>
        </ul>
        <Switch>
          <Route path="/communication" component={Communication} />
          <Route path="/lifeCycle" component={LifeCycle} />
          <Route path="/hooksDemo" component={HooksDemo} />
          <Route path="/testParams/:id" component={TestParams} />
          
          <Redirect from="/" to="/hooksDemo" exact />
          <Route component={NotFoundPage} />
          {/* <Route path="*" component={NotFoundPage} /> */}
        </Switch>
      </HashRouter>
    </div>
  );
}
