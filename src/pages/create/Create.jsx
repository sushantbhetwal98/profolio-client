import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useProfessionalContext } from '../../hooks/useProfessionalContext';
import "./create.scss";

const Create = () => {

    const { user } = useAuthContext()

    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')
    const [work, setWork] = useState('')
    const [description, setDescription] = useState('')
    const [isloading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch } = useProfessionalContext()

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/professional', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ fullName, address, email, phone, work, description })
        })

        const json = await response.json();


        if (response.ok) {
            // Update global Professionalcontext 
            dispatch({ type: 'CREATE_PROFESSIONALS', payload: json.professional })
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
                <h2>Add New</h2>
                <NavLink to='/' style={{ color: "blue", fontSize: '18px', fontWeight: '600', textDecoration: 'underline' }}>Home</NavLink>
            </div>
            <div className="buttom">
                <form className='add-card' onSubmit={handleSubmit}>
                    <label><h3>Name:</h3></label>
                    <input type='text' onChange={(e) => setFullName(e.target.value)} autoFocus={true} />
                    <label><h3>Address:</h3></label>
                    <input type='text' onChange={(e) => setAddress(e.target.value)} />
                    <label><h3>Email:</h3></label>
                    <input type='text' onChange={(e) => setEmail(e.target.value)} />
                    <label><h3>Phone:</h3></label>
                    <input type='text' onChange={(e) => setPhone(e.target.value)} />
                    <label><h3>Profession:</h3></label>
                    <input type='text' onChange={(e) => setWork(e.target.value)} />
                    <label><h3>Description:</h3></label>
                    <input type='text' onChange={(e) => setDescription(e.target.value)} />
                    <button disabled={isloading} className='success-button' >{isloading ? `Creating...` : `Create`}</button>
                    {error && <div className='error'>{error}</div>}

                </form>
            </div>
        </div>
    )
}

export default Create
