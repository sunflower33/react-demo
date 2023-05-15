import { Component } from "react";

import { Button, Input, Space, Tag } from "antd";
import gql from "graphql-tag";
import { Query } from "react-apollo";

class GraphqlQurey extends Component {
  state = {
    id: undefined,
  };
  refetch = undefined;
  query = gql`
    query getList($id: String) {
      getList(id: $id) {
        id
        name
        price
        poster
      }
    }
  `;

  render() {
    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space>
          <Input
            onChange={(evt) => {
              this.setState({ id: evt.target.value });
            }}
          ></Input>
          <Button
            onClick={() => {
              console.log(this.refetch);
            }}
          >
            查询
          </Button>
        </Space>
        <Query query={this.query} variables={{ id: this.state.id }}>
          {(value) => {
            const { loading, data, refetch } = value;
            this.props.refetch(refetch);
            this.refetch = refetch;
            const list = (data) => {
              return (
                data?.getList &&
                data.getList.map((item) => <Tag key={item.id}>{item.name}</Tag>)
              );
            };
            return loading ? <div>loading......</div> : list(data);
          }}
        </Query>
      </Space>
    );
  }
}

export default GraphqlQurey;
