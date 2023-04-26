import { Layout, theme } from "antd";
import { connect } from "react-redux";
import PageFooter from "../components/layout/PageFooter";
import SideMenu from "../components/layout/SideMenu";
import TopHeader from "../components/layout/TopHeader";

import nProgress from "nprogress";
import 'nprogress/nprogress.css'
import '../utils/http'

import LayoutRouter from "../router/LayoutRouter";
import { useEffect } from "react";
const { Content } = Layout;

function WindowLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  nProgress.start()
  useEffect(()=>{
    nProgress.done()
  },[])
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
          <LayoutRouter />
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
