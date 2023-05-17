import { Redirect, Route, Router, Switch } from "dva/router";
// import IndexPage from './routes/IndexPage';
import App from "./routes/App";
import Center from "./routes/Center";
import Cinema from "./routes/Cinema";
import Detail from "./routes/Detail";
import Films from "./routes/Films";
import Login from "./routes/Login";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route
          path="/"
          render={() => (
            <App>
              <Switch>
                <Route path="/film" component={Films}></Route>
                <Route path="/cinema" component={Cinema}></Route>
                <Route
                  path="/center"
                  render={() => {
                    return localStorage.getItem("token") ? (
                      <Center />
                    ) : (
                      <Redirect to="/login" />
                    );
                  }}
                ></Route>
                <Route path="/detail/:id" component={Detail}></Route>
                <Redirect from="/" to="/film"></Redirect>
              </Switch>
            </App>
          )}
        />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
