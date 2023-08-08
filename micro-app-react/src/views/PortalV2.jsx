import { MicroApp } from "@micro-zoe/micro-app";
import React, { useEffect } from "react";

export const PortalV2 = () => {
  useEffect(() => {
    // console.log('你显灵了吗')
    // console.log(MicroApp)
  });
  return (
    <div>
      <h1>asfds</h1>
      <micro-app
        name="portal-v2-vite"
        url="//localhost.mobvista.com:4173/portal-v2-vite"
        baseroute="/portal-v2-vite"
      />
      {/* url="//portal-v2-test.mobvista.com" */}
    </div>
  );
};

export default PortalV2;
