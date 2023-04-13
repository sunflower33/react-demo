export default function ReducerTest(prevState = {}, action) {
  const newState = { ...prevState };
  switch (action.type) {
    case "getTestJsonData":
      return action.state || newState;
    default:
      return newState;
  }
}
