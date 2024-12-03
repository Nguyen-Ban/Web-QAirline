import { useState } from 'react';
import axios from 'axios';

import { HiOutlineMail } from 'react-icons/hi';
import { HiMiniLockClosed } from "react-icons/hi2";
import { AiFillGooglePlusCircle, AiFillFacebook, AiFillApple } from 'react-icons/ai';
import plane from "../../assets/plane.mp4"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        } catch (err) {
            console.log('Error message:', err);
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <div className="video-container">
                <video autoPlay loop muted>
                    <source src={plane} type="video/mp4" />
                </video>
            </div>
            <div className="form-container">
                <h2>Sign in</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <HiOutlineMail className="icon" />
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <HiMiniLockClosed className="icon" />
                    </div>
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                    <hr className="separator"></hr>
                    <p className="create-account">No Account yet? <a href="/register">Register</a></p>
                    <div className="or-container">
                        <span>or continue with</span>
                        <br></br>
                        <br></br>
                        <div className="social-icons">
                            <br></br>
                            <AiFillGooglePlusCircle />
                            <AiFillFacebook />
                            <AiFillApple />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;