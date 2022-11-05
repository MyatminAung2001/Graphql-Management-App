import React from 'react';
import { FaExclamation } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <FaExclamation size='5rem' className="text-danger" />
            <h1>
                404
            </h1>
            <p className="lead">
                Sorry, this page does not exist!
            </p>
            <Link to='/' className="btn btn-primary">
                Go Back
            </Link>
        </div>
    )
};

export default Error404;