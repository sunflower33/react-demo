import { Button, Form, Input, InputNumber, Space } from "antd";
import gql from "graphql-tag";
import { Component, createRef } from "react";
import { Mutation } from "react-apollo";
class GraphqlCreate extends Component {
  formRef = createRef();
  state = {
    id: undefined,
  };
  createFilm = gql`
    mutation createFilm($input: FilmInput) {
      createFilm(input: $input) {
        name
        price
        poster
      }
    }
  `;

  render() {
    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        <Form ref={this.formRef} layout="vertical">
          <Form.Item
            label="用户名"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="poster" name="poster" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="price" name="price" rules={[{ required: true }]}>
            <InputNumber  />
          </Form.Item>
        </Form>
        <Mutation mutation={this.createFilm} variables={{ id: this.state.id }}>
          {(createFilm, { data }) => {
            this.props.cb();
            return (
              <Button
                type="primary"
                onClick={() => {
                  const formData = this.formRef.current.getFieldsValue();
                  createFilm({
                    variables: {
                      input: {
                        ...formData,
                      },
                    },
                  });
                }}
              >
                add
              </Button>
            );
          }}
        </Mutation>
      </Space>
    );
  }
}

export default GraphqlCreate;
