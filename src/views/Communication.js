import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import "../asset/index.css";
import StatusElevation from "../demo/通信/状态提升/statusElevation";

export default function LifeCycle(props) {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/communication/statusElevation">状态提升</NavLink>
        </li>
      </ul>
      <Switch>
        <Route
          path="/communication/statusElevation"
          component={StatusElevation}
        />
        <Redirect from="/communication" to="/communication/statusElevation" />
      </Switch>
    </div>
  );
}
