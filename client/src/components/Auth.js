import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import LoginImage from '../assets/login.jpg';
import './Auth.scss';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isRegister, setIsRegister] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fullName, username, password, phoneNumber, avatarURL } = form;

        const URL = 'http://localhost:5000/auth';

        const { data: { token, userId, hashedPassword } } = await axios.post(`${URL}/${isRegister ? 'register' : 'login'}`, {
            username, password, fullName, phoneNumber, avatarURL
        });

        cookies.set('token', token);
        cookies.set('name', username);
        cookies.set('fullName', fullName);
        cookies.set('id', userId);

        if (isRegister) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('image', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        // update authToken value
        window.location.reload();
    }
    const switchMode = () => {
        setIsRegister((prevIsRegister) => !prevIsRegister);
    };

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <p className='auth__form-container_fields__title'>{isRegister ? 'Register' : 'Login'}</p>
                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <div className="auth__form-container__fields-content_input">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                name='fullName'
                                placeholder='Full Name'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className="auth__form-container__fields-content_input">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name='username'
                            placeholder='Username'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {isRegister && (
                        <div className="auth__form-container__fields-content_input">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                name='phoneNumber'
                                placeholder='Phone Number'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    {isRegister && (
                        <div className="auth__form-container__fields-content_input">
                            <label htmlFor="avatarURL">Avatar URL</label>
                            <input
                                type="text"
                                name='avatarURL'
                                placeholder='Avatar URL'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className="auth__form-container__fields-content_input">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name='password'
                            placeholder='Password'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {isRegister && (
                        <div className="auth__form-container__fields-content_input">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                name='confirmPassword'
                                placeholder='Confirm Password'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="auth__form-container__fields-content_button">
                        <button>{isRegister ? "Register" : "Login"}</button>
                    </div>
                </form>
                <div className="auth__form-container_fields-account">
                    <p>
                        {isRegister
                            ? "Already have an account? "
                            : "Don't have an account? "
                        }
                        <span onClick={switchMode}>
                            {isRegister ? "Login" : "Register"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Auth