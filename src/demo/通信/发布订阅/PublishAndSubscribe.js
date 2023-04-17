import axios from "axios";
import { Component } from "react";
import "../../../asset/index.css";
import styles from "../../../asset/css/detail.module.scss"

const bus = {
  cbList: [],
  subscribe(callback) {
    this.cbList.push(callback);
  },
  publish(value) {
    this.cbList.forEach((callback) => {
      callback && callback(value);
    });
  },
};

class ListItem extends Component {
  render() {
    return (
      <div
        className={styles.listItem}
        onClick={() => bus.publish(this.props)}
      >
        <p className={styles.title}>电影名称: {this.props.nm}</p>
        <p>演员: {this.props.star}</p>
      </div>
    );
  }
}

class ItmeDetail extends Component {
  constructor() {
    super();
    this.state = {
      info: {},
    };
    bus.subscribe((val) => {
      this.setState({
        info: val,
      });
    });
  }
  render() {
    return <div>{this.state.info.star || "无内容"}</div>;
  }
}

export default class testRequestJson extends Component {
  state = { list: [], ItmeDetail: {} };
  componentDidMount() {
    axios
      .get(
        "/ajax/movieOnInfoList?token=&optimus_uuid=423B5820D84211EDA80BC1655A6E58134EDDFF350E8E4C12BEAEA889754D902E&optimus_risk_level=71&optimus_code=10"
      )
      .then((res) => {
        this.setState({ list: res?.data?.movieList || [] });
      });
  }
  render() {
    return (
      <div className="flex-row">
        <div style={{ width: "50%", height: '300px', overflow: 'auto' }}>
          {this.state.list.map((item) => (
            <ListItem key={item.id} {...item}></ListItem>
          ))}
        </div>
        <ItmeDetail></ItmeDetail>
      </div>
    );
  }
}
