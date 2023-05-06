export default function ReducerLayout(
  prevState = { isSiderCollapsed: false, isRouterPageLoading: false
 },
  action
) {
  const newState = { ...prevState };
  switch (action.type) {
    case "changeSiderCollapsed":
      newState.isSiderCollapsed = !newState.isSiderCollapsed;
      return newState;
    case "changeRouterPageLoading":
      newState.isRouterPageLoading = action.isLoading;
      return newState;
    default:
      return newState;
  }
}
