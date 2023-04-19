import { Redirect, Route, Switch } from "react-router-dom";

import Home from "../views/Home";
import RightList from "../views/right-manage/RightList";
import RoleList from "../views/right-manage/RoleList";
import UserList from "../views/user-manage/UserList";

/* start react-demo */
import { withRouter } from "react-router-dom";
import HooksDemo from "../demo/hooks/hooksDemo";
import Communication from "../views/reactDemo/Communication";
import LifeCycle from "../views/reactDemo/LifeCycle";
import TestParams from "../views/reactDemo/TestParams";
import UserInfo from "../views/reactDemo/UserInfo";
import FeatureDemo from "../views/reactDemo/FeatureDemo";
/* end react-demo */

function LayoutRouter() {
  return (
    <Switch>
      <Route path="/react-demo/communication" component={Communication} />
      <Route path="/react-demo/lifeCycle" component={LifeCycle} />
      <Route path="/react-demo/hooksDemo" component={HooksDemo} />
      <Route path="/react-demo/userInfo" component={UserInfo} />
      <Route path="/react-demo/featureDemo" component={FeatureDemo} />
      <Route path="/react-demo/testParams/:id" component={TestParams} />
      
      <Route path="/home" component={Home}></Route>
      <Route path="/user-manage/list" component={UserList}></Route>
      <Route path="/right-manage/right/list" component={RightList}></Route>
      <Route path="/right-manage/role/list" component={RoleList}></Route>
      
      <Redirect to="/home" />
    </Switch>
  );
}

export default withRouter(LayoutRouter);
