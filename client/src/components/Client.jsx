import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';

import { GET_CLIENTS } from '../graphql/client/clientQueries';
import ClientRow from './ClientRow';
import Spinner from './Spinner';

const Client = () => {

    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) {
        return <Spinner />
    };

    if (error) {
        return (
            <p>
                Something went wrong!
            </p>
        )
    };

    return (
        <Fragment>
            {
                !loading && !error && (
                    <table className="table table-hover mt-3">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.clients.map((client) => (
                                    <ClientRow key={client.id} client={client} />
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </Fragment>
    )
};

export default Client;