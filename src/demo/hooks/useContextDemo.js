import axios from "axios";
import React, { useEffect, useContext, useReducer } from "react";

const GlobalContext = React.createContext();

const initStateValue = {
  list: [],
  itmeDetail: { text: "tewst" },
};

const reducer = (prevState, action) => {
  const nextState = { ...prevState };
  switch (action.type) {
    case "setList":
      nextState.list = action.value;
      return nextState;
    case "setItemDetail":
      nextState.itmeDetail = action.value;
      return nextState;

    default:
      return prevState;
  }
};

export default function useContextDemo() {
  const [state, dispatch] = useReducer(reducer, initStateValue);
  useEffect(() => {
    axios.get("/test.json").then((res) => {
      dispatch({ type: "setList", value: res?.data?.list || [] });
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <section className="flex-row" style={{ backgroundColor: "greenyellow" }}>
        <div style={{ width: "60%", height: "200px", overflow: "auto" }}>
          {state.list &&
            state.list.map((item) => (
              <ListItem key={item.id} {...item}></ListItem>
            ))}
        </div>
        <ItmeDetail />
      </section>
    </GlobalContext.Provider>
  );
}
function ListItem(props) {
  const { dispatch } = useContext(GlobalContext);
  return (
    <div
      style={{
        cursor: "pointer",
        border: "1px solid black",
      }}
      onClick={() => dispatch({ type: "setItemDetail", value: props })}
    >
      <p> id: {props.id} </p> <p> text: {props.text} </p>
    </div>
  );
}

function ItmeDetail() {
  const {
    state: { itmeDetail },
  } = useContext(GlobalContext);
  return <div>{itmeDetail?.text || "无内容"} </div>;
}
