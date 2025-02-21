import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ContentGenerator from "./pages/ContentGenerator";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                <Route path="/generate-content" element={<ContentGenerator />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
