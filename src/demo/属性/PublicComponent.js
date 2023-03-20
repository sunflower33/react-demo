import { Component } from "react";
import PropTypes from "prop-types";

export default class PropsComponent extends Component {
  // 类属性, 属性验证
  static propTypes = {
    title: PropTypes.string,
    isShown: PropTypes.bool,
  };
  static defaultProps = {
    isShown: true,
  };
  render() {
    const { title, isShown } = this.props;
    return (
      <>
        <div>props: {title}</div>
        <div>{isShown ? "显示" : "隐藏"}</div>
      </>
    );
  }
}

// 类属性
// PropsComponent.propTypes = {
//     title: PropTypes.string,
//     isShown: PropTypes.bool,
// }
