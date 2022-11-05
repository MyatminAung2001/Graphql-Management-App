import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useMutation } from '@apollo/client';

import { GET_PROJECTS } from '../graphql/project/projectQueries';
import { DELETE_PROJECT } from '../graphql/project/projectMutation';

const DeleteProject = ({ projectID }) => {

    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectID },
        onCompleted: () => navigate('/'),
        refetchQueries: [{ query: GET_PROJECTS }]
    });

    return (
        <div className='d-flex mt-5 ms-auto'>
            <button className="btn btn-danger m-2" onClick={deleteProject}>
                <FaRegTrashAlt className="icon" />
                Delete Project
            </button>
        </div>
    )
};

export default DeleteProject;