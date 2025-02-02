import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {NavLink,useHistory} from "react-router-dom";

const NavBar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push("/");
    };

    return (
        <div>
            <nav>
                <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                    <a href="/" className="brand-logo">Logo</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/create">Create</NavLink></li>
                        <li><NavLink to="/links">Links</NavLink></li>
                        <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
