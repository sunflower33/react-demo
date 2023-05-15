import { Button, Card, Space } from "antd";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import gql from "graphql-tag";
import { Component } from "react";
import { ApolloProvider, Mutation } from "react-apollo";
import GraphqlCreate from "../../components/graphQLDemo/GraphqlCreate";
import GraphqlQurey from "../../components/graphQLDemo/GraphqlQuery";

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
    resultCaching: false,
    typePolicies: {
      Query: {
        fields: {
          books: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  link: new HttpLink({
    uri: "/graphql",
  }),
});
export default class TestGraphQL extends Component {
  refetch = function () {};
  render() {
    return (
      <ApolloProvider client={client}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Card title="创建">
            <GraphqlCreate cb={this.refetch} />
          </Card>
          <Card>
            <GraphqlQurey
              refetch={(refetch) => {
                this.refetch = refetch;
              }}
            />
          </Card>
          <GraphqlUpdate />
          <GraphqlDelete />
        </Space>
      </ApolloProvider>
    );
  }
}

class GraphqlUpdate extends Component {
  updateFilm = gql`
    mutation updateFilm($id: String!, $input: FilmInput) {
      updateFilm(id: $id, input: $input) {
        name
        price
        poster
      }
    }
  `;

  render() {
    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        {/* <Input onChange={(evt)=>{
          this.setState({id: evt.target.value})
        }}></Input> */}
        <Mutation mutation={this.updateFilm}>
          {(updateFilm, { data }) => {
            console.log(updateFilm, data);
            return (
              <Button
                onClick={() => {
                  updateFilm({
                    variables: {
                      id: "645cbd13e4568eb8b4533d42",
                      input: {
                        name: "name1-react-update",
                        price: 112,
                        poster: "asfsdraf2-react-update",
                      },
                    },
                  });
                }}
              >
                Update
              </Button>
            );
          }}
        </Mutation>
      </Space>
    );
  }
}

class GraphqlDelete extends Component {
  deleteFilm = gql`
    mutation deleteFilm($id: String!) {
      deleteFilm(id: $id)
    }
  `;

  render() {
    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        {/* <Input onChange={(evt)=>{
          this.setState({id: evt.target.value})
        }}></Input> */}
        <Mutation mutation={this.deleteFilm}>
          {(deleteFilm, { data }) => {
            console.log(deleteFilm, data);
            return (
              <Button
                onClick={() => {
                  deleteFilm({
                    variables: {
                      id: "645cbd13e4568eb8b4533d42",
                    },
                  });
                }}
              >
                Delete
              </Button>
            );
          }}
        </Mutation>
      </Space>
    );
  }
}
