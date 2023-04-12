import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import "../asset/index.css";
import PublishAndSubscribe from "../demo/通信/发布订阅/PublishAndSubscribe";
import StatusElevation from "../demo/通信/状态提升/statusElevation";

export default function LifeCycle(props) {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/communication/statusElevation">状态提升</NavLink>
        </li>
        <li>
          <NavLink to="/communication/publishAndSubscribe">发布订阅</NavLink>
        </li>
      </ul>
      <Switch>
        <Route
          path="/communication/statusElevation"
          component={StatusElevation}
        />
        <Route
          path="/communication/publishAndSubscribe"
          component={PublishAndSubscribe}
        />
        <Redirect from="/communication" to="/communication/statusElevation" />
      </Switch>
    </div>
  );
}
