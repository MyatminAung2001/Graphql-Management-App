import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { GET_PROJECT } from '../graphql/project/projectQueries';
import { UPDATE_PROJECT } from '../graphql/project/projectMutation';

const EditProject = ({ project }) => {

    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState("");

    const nameInputHandler = (event) => {
        setName(event.target.value);
    };

    const descriptionInputHandler = (event) => {
        setDescription(event.target.value);
    };

    const statusInputHandler = (event) => {
        setStatus(event.target.value);
    };

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id} }]
    });

    const submitFormHandler = (event) => {
        event.preventDefault();

        if (!name || !description || !status ) {
            return alert('Please fill in all fields')
        };

        updateProject(name, description, status);
    }

    return (
        <div className="mt-5">
            <h3>Update Project Detail</h3>
            <form onSubmit={submitFormHandler}>
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

                <button className="btn btn-primary" type="submit">
                    Update
                </button>
            </form>
        </div>
    )
};

export default EditProject;