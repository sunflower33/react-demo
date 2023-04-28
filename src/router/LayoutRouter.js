import { Redirect, Route, Switch } from "react-router-dom";

import Audit from "../views/audit-manage/Audit";
import AuditList from "../views/audit-manage/AuditList";
import Home from "../views/Home";
import NewsAdd from "../views/news-manage/NewsAdd";
import NewsCategory from "../views/news-manage/NewsCategory";
import NewsDraft from "../views/news-manage/NewsDraft";
import Nopermission from "../views/no-permission/Nopermission";
import Published from "../views/publish-manage/Published";
import Sunset from "../views/publish-manage/Sunset";
import Unpublished from "../views/publish-manage/Unpublished";
import RightList from "../views/right-manage/RightList";
import RoleList from "../views/right-manage/RoleList";
import UserList from "../views/user-manage/UserList";
import NewsPreview from "../views/news-manage/NewsPreview";
import NewsUpdate from "../views/news-manage/NewsUpdate";

/* start react-demo */
import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import HooksDemo from "../demo/hooks/hooksDemo";
import Communication from "../views/reactDemo/Communication";
import FeatureDemo from "../views/reactDemo/FeatureDemo";
import LifeCycle from "../views/reactDemo/LifeCycle";
import TestParams from "../views/reactDemo/TestParams";
import UserInfo from "../views/reactDemo/UserInfo";
/* end react-demo */

const LocalRouterMap = {
  "/home": Home,
  "/user-manage/list": UserList,
  "/right-manage/role/list": RoleList,
  "/right-manage/right/list": RightList,
  "/news-manage/add": NewsAdd,
  "/news-manage/draft": NewsDraft,
  "/news-manage/category": NewsCategory,
  "/news-manage/preview/:id": NewsPreview,
  "/news-manage/update/:id": NewsUpdate,
  "/audit-manage/audit": Audit,
  "/audit-manage/list": AuditList,
  "/publish-manage/unpublished": Unpublished,
  "/publish-manage/published": Published,
  "/publish-manage/sunset": Sunset,
};

function LayoutRouter() {
  const [BackRouteList, setBackRouteList] = useState([]);
  const {
    role: { rights },
  } = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    Promise.all([axios.get("/rights"), axios.get("/children")]).then((res) => {
      setBackRouteList([...res[0].data, ...res[1].data]);
      console.log([...res[0].data, ...res[1].data]);
    });
  }, []);

  const checkRoute = (item) => {
    return (
      LocalRouterMap[item.key] &&
      (item.pagepermisson === 1 || item.routepermisson === 1)
    );
  };
  const checkUserPermission = (item) => {
    return rights.includes(item.key);
  };

  return (
    <Switch>
      <Route path="/react-demo/communication" component={Communication} />
      <Route path="/react-demo/lifeCycle" component={LifeCycle} />
      <Route path="/react-demo/hooksDemo" component={HooksDemo} />
      <Route path="/react-demo/userInfo" component={UserInfo} />
      <Route path="/react-demo/featureDemo" component={FeatureDemo} />
      <Route path="/react-demo/testParams/:id" component={TestParams} />

      {BackRouteList.map((item) => {
        if (checkRoute(item) && checkUserPermission(item)) {
          return (
            <Route
              path={item.key}
              key={item.key}
              component={LocalRouterMap[item.key]}
              exact
            ></Route>
          );
        }
        return null;
      })}
      {/* <Route path="/home" component={Home}></Route>
      <Route path="/user-manage/list" component={UserList}></Route>
      <Route path="/right-manage/right/list" component={RightList}></Route>
      <Route path="/right-manage/role/list" component={RoleList}></Route> */}

      <Redirect from="/" to="/home" exact />
      {BackRouteList.length > 0 && <Route path="*" component={Nopermission} />}
    </Switch>
  );
}

export default withRouter(LayoutRouter);
