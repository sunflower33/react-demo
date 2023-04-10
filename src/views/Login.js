import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const loginHandler = useCallback(() => {
    localStorage.setItem("token", true);
    history.push("/userInfo");
  }, [history]);
  return (
    <div>
      <input></input>
      <button onClick={() => loginHandler()}>登录</button>
    </div>
  );
}
