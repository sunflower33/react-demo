export const changeSiderCollapsed = () => {
  return {
    type: "changeSiderCollapsed"
  };
};
export const changeRouterPageLoading = (isLoading)=>{
    return {
        type: 'changeRouterPageLoading',
        isLoading
    }
}
