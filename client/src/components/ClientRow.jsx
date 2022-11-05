import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { useMutation } from '@apollo/client';

import { DELETE_CLIENT } from '../graphql/client/clientMutation';
import { GET_CLIENTS } from '../graphql/client/clientQueries';
import { GET_PROJECTS } from '../graphql/project/projectQueries';

const ClientRow = ({ client }) => {

    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }]
        // update(cache, { data: { deleteClient } }) {
        //     const { clients } = cache.readQuery({
        //         query: GET_CLIENTS
        //     });
        //     cache.writeQuery({
        //         query: GET_CLIENTS,
        //         data: {
        //             clients: clients.filter((client) => 
        //                 client.id !== deleteClient.id
        //             )
        //         }
        //     })
        // }
    });

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button 
                    className="btn btn-danger btn-sm" 
                    onClick={deleteClient}
                >
                    <BiTrash />
                </button>
            </td>
        </tr>
    )
};

export default ClientRow;