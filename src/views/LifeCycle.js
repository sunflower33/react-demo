import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "../asset/index.css";
import LifecycleDemo from "../demo/生命周期/生命周期V1/LifecycleDemo";
import LifecycleDemoV2 from "../demo/生命周期/生命周期V2/lifecycleDemoV2";

export default function LifeCycle(props) {
  const history = useHistory();
  const navigateToByProps = (url) => {
    props.history.push(url);
  };
  const navigateTo = (url) => {
    history.push(url);
  };
  return (
    <div>
      <ul>
        <li onClick={() => navigateToByProps("/lifeCycle/lifeCycleDemoV2")}>
          新生命周期
        </li>
        <li onClick={() => navigateTo("/lifeCycle/lifecycleDemo")}>
          老生命周期
        </li>
      </ul>
      <Switch>
        <Route path="/lifeCycle/lifeCycleDemoV2" component={LifecycleDemoV2} />
        <Route path="/lifeCycle/lifecycleDemo" component={LifecycleDemo} />
        <Redirect from="/lifeCycle" to="/lifeCycle/lifeCycleDemoV2" />
      </Switch>
    </div>
  );
}
