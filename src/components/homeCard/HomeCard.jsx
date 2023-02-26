import React from 'react'
import "./homeCard.scss";
import { NavLink } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const HomeCard = ({ professional, id }) => {
    return (
        <div className='home-card'>
            <div className="user-info">
                <h3>Name:</h3><span>{professional.fullName}</span>
                <h3>Profession:</h3> <span>{professional.work}</span>
            </div>
            <div className="controllers">
                <NavLink to={`/view/${id}`}><button className='success-button'><RemoveRedEyeIcon /></button></NavLink>
            </div>
        </div>
    )
}

export default HomeCard
