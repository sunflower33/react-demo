import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PortalV2 from "../views/PortalV2";
// import routes from "./routes";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/portal-v2-vite/:page/*',
    element: <PortalV2 />,
    props: {
      disableSandbox: true,
    },
  }
]);
export default Router;
