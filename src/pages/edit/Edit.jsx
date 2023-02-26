import React, { useState } from 'react'
import { useProfessionalContext } from '../../hooks/useProfessionalContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const Edit = () => {

    const { user } = useAuthContext();

    const navigate = useNavigate()

    const { id } = useParams();
    const { professionals, dispatch } = useProfessionalContext();


    const [fullName, setFullName] = useState(professionals[id].fullName + ' ');
    const [address, setAddress] = useState(professionals[id].address);
    const [email, setEmail] = useState(professionals[id].email);
    const [phone, setPhone] = useState(professionals[id].phone)
    const [work, setWork] = useState(professionals[id].work)
    const [description, setDescription] = useState(professionals[id].description)
    const [isloading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/professional/${professionals[id]._id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ fullName, email, address, work, phone, description })
        })

        const json = await response.json();

        if (response.ok) {
            // update Global State
            console.log(json)
            dispatch({ type: 'UPDATE_PROFESSIONALS', payload: json.professional })
            navigate('/')
            setIsLoading(false)

        }

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }
    }

    return (
        <div className='container'>
            <div className="top">
                <h2>Edit </h2>
                <div>
                    <NavLink to='/' style={{ color: "blue", fontSize: '18px', fontWeight: '600', textDecoration: 'underline' }}>Home</NavLink>
                    <NavLink to='/create'><button className='primary-button' style={{ marginLeft: '10px' }}>Add New</button></NavLink>
                </div>
            </div>
            <div className="buttom">
                <form className='add-card' onSubmit={handleSubmit}>
                    <label><h3>Name:</h3></label>
                    <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} autoFocus={true} />
                    <label><h3>Address:</h3></label>
                    <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
                    <label><h3>Email:</h3></label>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label><h3>Phone:</h3></label>
                    <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <label><h3>Profession:</h3></label>
                    <input type='text' value={work} onChange={(e) => setWork(e.target.value)} />
                    <label><h3>Description:</h3></label>
                    <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button disabled={isloading} className='primary-button' >{isloading ? `Updating...` : `Update`}</button>
                    {error && <div className='error'>{error}</div>}

                </form>
            </div>
        </div>
    )
}

export default Edit
