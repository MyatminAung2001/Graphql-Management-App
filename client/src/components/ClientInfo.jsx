import React, { Fragment } from 'react';
import { MdEmail, MdLocalPhone } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';

const ClientInfo = ({ client }) => {
    return (
        <Fragment>
            <h5 className="mt-5">
                Client Information
            </h5>
            <ul className="list-group">
                <li className="list-group-item">
                    <FaUserCircle className="icon" />
                    {client.name}
                </li>
                <li className="list-group-item">
                    <MdEmail className="icon" />
                    {client.email}
                </li>
                <li className="list-group-item">
                    <MdLocalPhone className="icon" />
                    {client.phone}
                </li>
            </ul>
        </Fragment>
    )
};

export default ClientInfo;