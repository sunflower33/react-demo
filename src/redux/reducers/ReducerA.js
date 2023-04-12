export default function ReducerA(prevState = {}, action) {
  const newState = { ...prevState };
  console.log("ReducerA----ssseee----", action);
  switch (action.type) {
    case "getBatchOptions":
      return action.state || newState;
    default:
      return newState;
  }
}
