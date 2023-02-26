import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(firstName, lastName, email, password);
    }


    return (
        <div>
            <Navbar />
            <form className='login-signup' onSubmit={handleSubmit}>
                <h3>Signup</h3>
                <div className="inputs">
                    <div className="signup">
                        <input type="text" placeholder='First name' onChange={(e) => setFirstName(e.target.value)} />
                        <input type="text" placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="login">
                        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <button disabled={isLoading} className='success-button'>{isLoading ? `Signing in` : `Signup`}</button>
                {error && <div className='error'>{error}</div>}

            </form>
        </div>
    )
}

export default Signup
