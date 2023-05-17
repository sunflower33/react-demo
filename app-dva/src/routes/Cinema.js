import { connect } from "dva";
import { useEffect } from "react";
function Cinema(props) {
  useEffect(() => {
    if (!props?.list?.length) {
      props.dispatch({ type: "maizuo/getCinemaList" });
    } else {
      console.log('缓存----', props.list);
    }
  }, []);
  return <div>Cinema</div>;
}

const mapStateToProps = (state) => ({
  list: state.maizuo.list,
});

export default connect(mapStateToProps)(Cinema);
