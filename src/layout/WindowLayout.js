import React from "react";

import { connect } from "react-redux";
import { Switch, Redirect, Route } from "react-router-dom";
import SideMenu from "../components/layout/SideMenu";
import TopHeader from "../components/layout/TopHeader";
import PageFooter from "../components/layout/PageFooter";
import ReactDemo from "../views/reactDemo/ReactDemo";
import Home from "../views/Home";
import UserList from "../views/user-manage/List"
import RightList from "../views/right-manage/RightList";

import "../asset/index.css";
import { Layout, theme } from "antd";
const { Content } = Layout;

function WindowLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout>
        <TopHeader />
        <Content
          style={{
            margin: "24px 16px 0",
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <Switch>
            <Route path="/react-demo" component={ReactDemo}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/user-manage/list" component={UserList}></Route>
            <Route path="/right-manage/right/list" component={RightList}></Route>
            <Redirect to="/home" />
          </Switch>
        </Content>
        <PageFooter />
      </Layout>
    </Layout>
  );
}
// connect( 将来给传给子组件的属性， 传给子组件传来的回调函数)
export default connect(() => {
  return {};
})(WindowLayout);
