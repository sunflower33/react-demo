import { Button, Descriptions, Tabs, Typography } from "antd";
import { fromJS, List, Map } from "immutable";
import { Component } from "react";
const { Title } = Typography;

class ImmutableDemoV1 extends Component {
  state = {
    info: Map({
      name: "name",
      location: Map({
        province: "广东",
        city: "大连",
      }),
      favor: List(["读书", "看报", "写代码"]),
    }),
  };
  render() {
    return (
      <div>
        <Button
          onClick={() => {
            this.setState({
              info: this.state.info
                .set("name", "名字已修改")
                .set(
                  "location",
                  this.state.info.get("location").set("province", "广西")
                ),
            });
          }}
        >
          修改
        </Button>
        <Descriptions>
          <Descriptions.Item label="姓名">
            {this.state.info.get("name")}
          </Descriptions.Item>
          <Descriptions.Item label="地址">
            {this.state.info.get("location").get("province")} -
            {this.state.info.get("location").get("city")}
          </Descriptions.Item>
          <Descriptions.Item label="爱好">
            <ul>
              {this.state.info.get("favor").map((item, index) => (
                <li key={item}>
                  {item}
                  <Button
                    onClick={() => {
                      this.setState({
                        info: this.state.info.set(
                          "favor",
                          this.state.info.get("favor").splice(index, 1)
                        ),
                      });
                    }}
                  >
                    delete
                  </Button>
                </li>
              ))}
            </ul>
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}

class ImmutableDemoV2 extends Component {
  state = {
    info: fromJS({
      name: "name",
      location: {
        province: "广东",
        city: "广州",
      },
      favor: ["读书", "看报", "写代码"],
    }),
  };
  render() {
    return (
      <div>
        <Button
          onClick={() => {
            this.setState({
              info: this.state.info
                .set("name", "名字已修改")
                .setIn(["location", "city"], "深圳"),
            });
          }}
        >
          修改
        </Button>
        <Descriptions>
          <Descriptions.Item label="姓名">
            {this.state.info.get("name")}
          </Descriptions.Item>
          <Descriptions.Item label="地址">
            {this.state.info.get("location").get("province")} -
            {this.state.info.get("location").get("city")}
          </Descriptions.Item>
          <Descriptions.Item label="爱好">
            <ul>
              {this.state.info.get("favor").map((item, index) => (
                <li key={item}>
                  {item}
                  <Button
                    danger
                    onClick={() => {
                      this.setState({
                        info: this.state.info.updateIn(["favor"], (list) =>
                          list.splice(index, 1)
                        ),
                      });
                    }}
                  >
                    delete
                  </Button>
                </li>
              ))}
            </ul>
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}

export default class ImmutableDemo extends Component {
  render() {
    return (
      <>
        <Title level={3}>Immutable Demo</Title>
        <Tabs
          tabPosition="left"
          items={[
            {
              label: "基础用法",
              key: "ImmutableDemoV1",
              children: <ImmutableDemoV1 />,
            },
            {
              label: "高级用法",
              key: "ImmutableDemoV2",
              children: <ImmutableDemoV2 />,
            },
          ]}
        />
      </>
    );
  }
}
