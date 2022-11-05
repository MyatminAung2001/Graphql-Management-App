import React from 'react';

import Logo from '../assets/logo (1).png';

const Header = () => {
    return (
        <nav className="navbar bg-light mb-4 py-2">
            <div className="container">
                <a href="/" className="navbar-brand">
                    <div className="d-flex">
                        <img 
                            src={Logo}
                            alt=""
                            className="mr-2"
                        />
                        <div>Project Management</div>
                    </div>
                </a>
            </div>
        </nav>
    )
};

export default Header;