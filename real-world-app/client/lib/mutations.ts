export const LOGIN_MUTATION = `
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      name
      email
      role
    }
  }
}
`;

export const REGISTER_MUTATION = `
mutation Register($name: String!, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password) {
    token
    user {
      id
      name
      email
      role
    }
  }
}
`;

export const CREATE_TASK = `
mutation CreateTask($input: TaskInput!) {
  createTask(input: $input) {
    id
  }
}
`;

export const UPDATE_TASK = `
mutation UpdateTask($id: ID!, $input: TaskInput!) {
  updateTask(id: $id, input: $input) {
    id
  }
}
`;

export const DELETE_TASK = `
mutation DeleteTask($id: ID!) {
  deleteTask(id: $id)
}
`;

export const ADD_COMMENT = `
mutation AddComment($taskId: ID!, $content: String!) {
  addComment(taskId: $taskId, content: $content) {
    id
    content
    createdAt
    author {
      name
    }
  }
}
`;
