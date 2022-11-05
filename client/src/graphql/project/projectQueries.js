import { gql } from "@apollo/client";

// Get Project
export const GET_PROJECTS = gql`
    query getPojects {
        projects {
            id
            name
            status
        }
    }
`;

// Get Project Detail
export const GET_PROJECT = gql`
    query getProject($id: ID!) {
        project(id: $id) {
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