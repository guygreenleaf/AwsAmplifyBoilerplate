/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      friends
      friendRequestsSent
      friendRequestsReceieved
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      friends
      friendRequestsSent
      friendRequestsReceieved
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      friends
      friendRequestsSent
      friendRequestsReceieved
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createPin = /* GraphQL */ `
  mutation CreatePin(
    $input: CreatePinInput!
    $condition: ModelPinConditionInput
  ) {
    createPin(input: $input, condition: $condition) {
      id
      location
      description
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updatePin = /* GraphQL */ `
  mutation UpdatePin(
    $input: UpdatePinInput!
    $condition: ModelPinConditionInput
  ) {
    updatePin(input: $input, condition: $condition) {
      id
      location
      description
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deletePin = /* GraphQL */ `
  mutation DeletePin(
    $input: DeletePinInput!
    $condition: ModelPinConditionInput
  ) {
    deletePin(input: $input, condition: $condition) {
      id
      location
      description
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
