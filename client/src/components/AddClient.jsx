import React, { Fragment, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { useMutation } from '@apollo/client';

import { ADD_CLIENT } from '../graphql/client/clientMutation';
import { GET_CLIENTS } from '../graphql/client/clientQueries';

const AddClient = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone},
        update(cache, { data: addClient } ) {
            const { clients } = cache.readQuery({ 
                query: GET_CLIENTS 
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: [...clients, addClient]
                }
            });
        }
    });

    const nameInputHandler = (event) => {
        setName(event.target.value);
    };

    const emailInputHandler = (event) => {
        setEmail(event.target.value);
    };

    const phoneInputHandler = (event) => {
        setPhone(event.target.value);
    };

    const fromSubmitHandler = (event) => {
        event.preventDefault();

        if (name === '' || email === '' || phone === '') {
            return alert('Please fill in all fields')
        };
        addClient(name, email, phone);
        setName('');
        setEmail('');
        setPhone('');
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addClientModel">
                <div className="d-flex align-items-center">
                    <FaUserAlt className="icon" />
                    <div>
                        Client
                    </div>
                </div>
            </button>

            <div className="modal fade" id="addClientModel" aria-labelledby="addClientModelLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addClientModelLabel">
                            Add Client
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={fromSubmitHandler}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="name" 
                                    value={name} 
                                    onChange={nameInputHandler}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="email" 
                                    value={email} 
                                    onChange={emailInputHandler}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone No</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="phone" 
                                    value={phone} 
                                    onChange={phoneInputHandler}
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default AddClient