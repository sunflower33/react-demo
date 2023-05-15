export default function ReducerOptions(prevState = {}, action) {
  const newState = { ...prevState };
  switch (action.type) {
    case "getBatchOptions":
      return action.state || newState;
    default:
      return newState;
  }
}
