import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = props => {

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark border-bottom border-info">
            <NavLink className="navbar-brand" to="/"><i className="fas fa-calendar-alt" /> Calendar</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Dashboard <span className="sr-only">(current)</span></NavLink>
                    </li>
                    {/* <li className="nav-item">
                        <NavLink className="nav-link" to="/editor"></NavLink>
                    </li> */}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;