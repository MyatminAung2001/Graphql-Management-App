import React, { Fragment, useState } from 'react';
import { MdViewList } from 'react-icons/md';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_PROJECT } from '../graphql/project/projectMutation';
import { GET_PROJECTS } from '../graphql/project/projectQueries';
import { GET_CLIENTS } from '../graphql/client/clientQueries';

const AddProject = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("new");
    const [clientID, setClientID] = useState("");

    // Add Project
    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientID },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: {
                    projects: [...projects, addProject]
                }
            });
        }
    });

    // Get Client 
    const { loading, error, data } = useQuery(GET_CLIENTS);

    const nameInputHandler = (event) => {
        setName(event.target.value);
    };

    const descriptionInputHandler = (event) => {
        setDescription(event.target.value);
    };

    const statusInputHandler = (event) => {
        setStatus(event.target.value);
    };

    const fromSubmitHandler = (event) => {
        event.preventDefault();

        if (name === '' || description === '' || status === '') {
            return alert('Please fill in all fields')
        };

        addProject(name, description, status, clientID);
        
        setName('');
        setDescription('');
        setStatus('new');
        setClientID('');
    };

    if (loading) {
        return null
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
                    <>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModel">
                            <div className="d-flex align-items-center">
                                <MdViewList className="icon" />
                                <div>
                                    New Project
                                </div>
                            </div>
                        </button>

                        <div className="modal fade" id="addProjectModel" aria-labelledby="addProjectModelLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addProjectModelLabel">
                                        New Project
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
                                            <label className="form-label">Description</label>
                                            <textarea 
                                                type="text" 
                                                className="form-control" 
                                                id="description" 
                                                value={description} 
                                                onChange={descriptionInputHandler}
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Status</label>
                                            <select 
                                                id="status" 
                                                className="form-select" 
                                                value={status} 
                                                onChange={statusInputHandler}
                                            >
                                                <option value="new">Not Started</option>
                                                <option value="progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Client</label>
                                            <select 
                                                id="clientID"
                                                className="form-select"
                                                value={clientID}
                                                onChange={(e) => setClientID(e.target.value)}
                                            >
                                                <option value="">Select Client</option>
                                                {
                                                    data.clients.map((client) => (
                                                        <option 
                                                            value={client.id}
                                                            key={client.id}
                                                        >
                                                            {client.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <button 
                                            type="submit" 
                                            className="btn btn-primary" 
                                            data-bs-dismiss="modal"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </Fragment>
    )
};

export default AddProject