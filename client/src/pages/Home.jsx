import React, { Fragment } from 'react';

import Client from '../components/Client';
import Project from '../components/Project';
import AddClient from '../components/AddClient';
import AddProject from '../components/AddProject';

const Home = () => {
    return (
        <Fragment>
            <div className="d-flex gap-3 mb-4">
                <AddClient />
                <AddProject />
            </div>
            <Project />
            <hr />
            <Client />
        </Fragment>
    )
};

export default Home;