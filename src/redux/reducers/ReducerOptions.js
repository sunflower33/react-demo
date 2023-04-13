export default function ReducerOptions(prevState = {}, action) {
  const newState = { ...prevState };
  console.log("ReducerOptions----ssseee----", action);
  switch (action.type) {
    case "getBatchOptions":
      return action.state || newState;
    default:
      return newState;
  }
}
