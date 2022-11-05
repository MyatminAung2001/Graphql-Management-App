import { gql } from "@apollo/client";

// Get Client
export const GET_CLIENTS = gql`
    query getClients {
        clients {
            id
            name
            email
            phone
        }
    }
`;