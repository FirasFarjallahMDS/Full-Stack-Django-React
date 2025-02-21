import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const result = await handleLogin(username, password);
        if (result) {
            navigate("/generate-content");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                <form onSubmit={submitHandler} className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="w-full p-2 border border-gray-300 rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-2 border border-gray-300 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
