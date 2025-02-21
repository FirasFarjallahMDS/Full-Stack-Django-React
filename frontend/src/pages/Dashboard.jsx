import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        handleLogout();
        navigate('/login');
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome! You are logged in.</p>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    );
};

export default Dashboard;
