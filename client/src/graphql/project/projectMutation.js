import { gql } from "@apollo/client";

// Add Project
export const ADD_PROJECT = gql`
    mutation AddProject($name: String!, $description: String!, $status: ProjectStatus! $clientID: ID!) {
        addProject(name: $name, description: $description, status: $status, clientID: $clientID) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;

// Delete Project
export const DELETE_PROJECT = gql`
    mutation DeleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
        }
    }
`;

// Update Project
export const UPDATE_PROJECT = gql`
    mutation UpdateProject($id: ID!, $name: String!, $description: String!, $status: ProjectStatusUpdate!) {
        updateProject(id: $id, name: $name, description: $description, status: $status) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`