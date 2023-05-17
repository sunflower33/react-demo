import { connect } from "dva";
import { useEffect } from "react";

function Detail(props) {
  console.log(props);
  useEffect(() => {
    props.dispatch({
      type: "maizuo/hide",
    });
    return () => {
      props.dispatch({
        type: "maizuo/show",
      });
    };
  }, []);
  return (
    <div>
      console
      {/* <TestWithRouter></TestWithRouter> */}
    </div>
  );
}

export default connect()(Detail);

// class TestProps extends Component {
//   render() {
//     console.log(this.props);
//     return <div>testWithRouter</div>;
//   }
// }

// const TestWithRouter = withRouter(TestProps);
