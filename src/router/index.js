import { HashRouter, NavLink, Redirect, Route, Switch } from "react-router-dom";
import "../asset/index.css";
import HooksDemo from "../demo/hooks/hooksDemo";
import Communication from "../views/Communication";
import LifeCycle from "../views/LifeCycle";
import TestParams from "../views/TestParams";
import UserInfo from "../views/UserInfo";
import Login from "../views/Login";
import NotFoundPage from "../views/notFoundPage";

function isAuth() {
  const token = window.localStorage?.token;
  console.log(token);
  if (token) return true;
  return false;
}

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
          <li>
            <NavLink to="/userInfo" activeClassName="text-danger">
              个人中心
            </NavLink>
          </li>
        </ul>
        <Switch>
          <Route path="/communication" component={Communication} />
          <Route path="/lifeCycle" component={LifeCycle} />
          <Route path="/hooksDemo" component={HooksDemo} />
          <Route
            path="/userInfo"
            render={() => {
              return isAuth() ? <UserInfo /> : <Redirect to="login" />;
            }}
          />
          <Route path="/login" component={Login} />
          <Route path="/testParams/:id" component={TestParams} />

          <Redirect from="/" to="/hooksDemo" exact />
          <Route component={NotFoundPage} />
          {/* <Route path="*" component={NotFoundPage} /> */}
        </Switch>
      </HashRouter>
    </div>
  );
}
