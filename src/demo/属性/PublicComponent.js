import { Component } from 'react';
import PropTypes from "prop-types";

export default class PropsComponent extends Component {
    render(){
        const {title} = this.props;
        return (<div>props: {title}</div>)
    }
}

// 类属性
PropsComponent.propTypes = {
    title: PropTypes.string,
    isShown: PropTypes.bool,
}