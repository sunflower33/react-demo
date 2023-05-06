import {
  HashRouter as Router,
  // BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "../asset/index.css";

import Login from "../views/Login";
import NotFoundPage from "../views/notFoundPage";
import WindowLayout from "../layout/WindowLayout";
import News from "../views/news/News";
import Detail from "../views/news/Detail";

function isAuth() {
  const token = window.localStorage?.token;
  if (token) return true;
  return false;
}

export default function RouterLayout() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/news" component={News} />
        <Route path="/detail/:id" component={Detail} />
        <Route
          path="/"
          render={() => {
            return isAuth() ? <WindowLayout /> : <Redirect to="login" />;
          }}
        />
        <Route component={NotFoundPage} />
        {/* <Route path="*" component={NotFoundPage} /> */}
      </Switch>
    </Router>
  );
}
