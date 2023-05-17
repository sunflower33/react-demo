import axios from "axios";

export default function Login() {
  return (
    <div
      onClick={() => {
        axios
          .post("/users/login", {
            username: "21342",
            password: "12432",
          })
          .then((res) => {
            console.log(res);
          });
      }}
    >
      Login
    </div>
  );
}
