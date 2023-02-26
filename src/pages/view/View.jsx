import React, { useState } from 'react'
import "./view.scss"
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useProfessionalContext } from '../../hooks/useProfessionalContext';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthContext } from '../../hooks/useAuthContext';

const View = () => {
    const { user } = useAuthContext();
    const { id } = useParams();
    const [error, setError] = useState(null);
    const { professionals, dispatch } = useProfessionalContext();
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        setError(null)

        const response = await fetch(`https://profolio-api.onrender.com/api/professional/${professionals[id]._id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            // update professional context
            dispatch({ type: 'DELETE_PROFESSIONALS', payload: json.professional })

            // redirect to home
            navigate('/')
        }
        if (!response.ok) {
            setError(json.error)
        }
    }

    return (
        <div className='container'>
            <div className="top">
                <h2>Details</h2>
                <div>
                    <NavLink to='/' style={{ color: "blue", fontSize: '18px', fontWeight: '600', textDecoration: 'underline' }}>Home</NavLink>
                    <NavLink to='/create'><button className='primary-button' style={{ marginLeft: '10px' }}>Add New</button></NavLink>
                </div>
            </div>

            <div className="bottom">
                <div className="card">
                    <div className="info">
                        <h3>Name:</h3><span>{professionals[id].fullName}</span>
                        <h3>Address:</h3><span>{professionals[id].address}</span>
                        <h3>email:</h3><span>{professionals[id].email}</span>
                        <h3>Phone:</h3><span>{professionals[id].phone}</span>
                        <h3>Profession:</h3><span>{professionals[id].work}</span>
                        <h3>Description:</h3><span>{professionals[id].description}</span>
                    </div>
                    <div className="controllers">
                        <NavLink to={`/edit/${id}`}><button className='primary-button'><ModeEditIcon /></button></NavLink>
                        <button className='danger-button' onClick={handleClick}><DeleteIcon /></button>
                    </div>
                    {error && <div className="error">{error}</div>}
                </div>
            </div>
        </div>
    )
}

export default View
