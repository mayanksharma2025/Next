export const ME_QUERY = `
query {
  me {
    id
    name
    email
    role
  }
}
`;

export const TASKS_QUERY = `
query Tasks(
  $search: String
  $status: String
  $priority: String
  $createdBy: [ID!]
  $limit: Int!
  $offset: Int!
) {
  tasks(
    search: $search
    status: $status
    priority: $priority
    createdBy: $createdBy
    limit: $limit
    offset: $offset
  ) {
    tasks {
      id
      title
      description
      status
      priority
      banner
      createdAt
      updatedAt
      createdBy {
        id
        name
      }
    }
    totalCount
    hasMore
  }
}
`;

export const TASK_QUERY = `
query Task($id: ID!) {
  tasks(limit: 1, offset: 0) {
    tasks {
      id
      title
      description
      status
      priority
      banner
      createdAt
      updatedAt
      createdBy {
        id
        name
      }
    }
  }
}
`;

// export const GET_TASK_QUERY = `
// query GetTask($id: ID!) {
//   getTask(id: $id) {
//     id
//     title
//     description
//     status
//     priority
//     banner
//     createdAt
//     updatedAt
//     createdBy {
//       id
//       name
//     }
//   }
// }
// `;

export const TASK_BY_ID_QUERY = `
query TaskById($search: String, $limit: Int!, $offset: Int!) {
  tasks(search: $search, limit: $limit, offset: $offset) {
    tasks {
      id
      title
      description
      status
      priority
      banner
      createdAt
      updatedAt
      createdBy {
        id
        name
      }
    }
  }
}
`;
