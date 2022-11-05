import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';

import ProjectCard from './ProjectCard';
import { GET_PROJECTS } from '../graphql/project/projectQueries';

const Project = () => {

    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) {
        return null;
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
                data.projects.length > 0 ? (
                    <div className="row mt-4">
                        { 
                            data.projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        }
                    </div>
                ) : (
                    <p>
                        No Projects
                    </p>
                )
            }
        </Fragment>
    )
};

export default Project;