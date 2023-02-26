import React, { useEffect } from 'react'
import "./home.scss"
import { NavLink } from 'react-router-dom'
import HomeCard from '../../components/homeCard/HomeCard'
import { useProfessionalContext } from '../../hooks/useProfessionalContext'
import { useAuthContext } from '../../hooks/useAuthContext'


const Home = () => {

    const { user } = useAuthContext();
    const { professionals, dispatch } = useProfessionalContext();

    useEffect(() => {
        const fetchProfessionals = async () => {

            const response = await fetch('https://profolio-api.onrender.com/api/professional/', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                },
            })

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_PROFESSIONALS', payload: json })
            }
        }

        if (user) {
            fetchProfessionals()
        }
    }, [dispatch, user]);

    return (
        <div className='container'>
            <div className="top">
                <h2>Professionals</h2>
                <NavLink to="/create"><button className='primary-button'>Add New</button></NavLink>
            </div>
            <div className="bottom">
                {professionals ? (
                    professionals.length > 0 ? (
                        professionals.map((professional, id) => (
                            <HomeCard professional={professional} id={id} key={professional._id} />
                        ))
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', color: '#555' }}>
                            <h4 style={{ fontSize: '18px', fontWeight: '600' }} >No data to display </h4>
                            <p>Please Add some professionals to view your list</p>
                        </div>
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default Home
