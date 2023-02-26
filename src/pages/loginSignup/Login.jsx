import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import { useLogin } from '../../hooks/useLogin';
import "./style.scss"

const Login = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

    return (
        <div>
            <Navbar />
            <form className='login-signup' onSubmit={handleSubmit}>
                <h3>Login</h3>
                <div className="login">
                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button disable={isLoading} className='primary-button'>{isLoading ? `Logging in` : `Login`}</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )
}

export default Login
