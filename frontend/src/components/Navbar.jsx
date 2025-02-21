import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { user, handleLogout } = useContext(AuthContext);

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold">
                    MyApp
                </Link>
                
                <div>
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-white">Welcome, {user.username}!</span>
                            <div className="container mx-auto">
          <Link to="/generate-content" className="text-white px-4 py-2">Generate Content</Link>
        </div>
                            <button 
                                onClick={handleLogout} 
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                              <Link to="/login">Logout</Link>  
                            </button>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                Login
                            </Link>
                            <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
