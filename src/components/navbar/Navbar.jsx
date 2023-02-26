import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import './navbar.scss'
import { useLogout } from "../../hooks/useLogout"

const Navbar = () => {

    const { logout } = useLogout()

    const handleClick = (e) => {
        e.preventDefault();
        logout();
    }

    const { user } = useAuthContext()
    return (
        <div className='navbar'>
            <div className="nav">
                <div className="left-nav"><NavLink to="/">Pro<span>folio</span></NavLink></div>
                <div className="right-nav">
                    {!user && (
                        <div className='login-signup-nav'>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/signup">Signup</NavLink>
                        </div>
                    )}
                    {user && (
                        <div className="logout">
                            <p > {user.firstname}</p>
                            <button className='logout-button' onClick={handleClick}>Logout</button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Navbar
