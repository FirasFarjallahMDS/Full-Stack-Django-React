import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const handleRegister = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}register/`, { username, password });
        console.log("Registration successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error.response?.data || error.message);
        alert(error.response?.data?.error || "Registration failed!");
    }
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}token/`, { username, password });

        if (response.data.access) {
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            console.log("Login successful:", response.data);
            return response.data;
        }
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        alert(error.response?.data?.detail || "Invalid username or password!");
    }
};


export const getToken = () => localStorage.getItem("access_token");

export const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};

const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
});

export const generateContent = async (prompt) => {
    const headers = getAuthHeaders();
    if (!headers) return; // Prevent request if token is missing

    try {
        const response = await axios.post(`${API_URL}generate/`, { prompt }, headers);
        console.log("Generated content:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error generating content:", error.response?.data || error.message);
        alert(error.response?.data?.error || "Failed to generate content. Try again.");
    }
};

export const getGeneratedContentHistory = async () => {
    const headers = getAuthHeaders();
    if (!headers) return;

    try {
        const response = await axios.get(`${API_URL}history/`, headers);
        return response.data;
    } catch (error) {
        console.error("Error fetching history:", error.response?.data || error.message);
        alert("Failed to fetch history.");
    }
};