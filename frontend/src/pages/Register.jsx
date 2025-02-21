import { useState } from 'react';
import {handleRegister } from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        await handleRegister(username, password);
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
                <form onSubmit={submitHandler} className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={(e) => setUsername(e.target.value)} required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={(e) => setPassword(e.target.value)} required 
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
