import gql from "graphql-tag";

export const READ_OPERATION = gql`
  {
    read {
      id
      todo
    }
  }
`;

export const ADD_OPERATION = gql`
  mutation addCrud($todo: String!) {
    addCrud(todo: $todo) {
      todo
    }
  }
`;

export const REMOVE_OPERATION = gql`
  mutation removeCrud($id: ID!) {
    removeCrud(id: $id) {
      id
    }
  }
`;

export const UPDATE_OPERATION = gql`
  mutation updateCrud($id: ID!, $todo: String!) {
    updateCrud(id: $id, todo: $todo) {
      todo
    }
  }
`;
