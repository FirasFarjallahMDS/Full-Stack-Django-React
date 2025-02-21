import { useState, useEffect } from "react";
import { generateContent, getGeneratedContentHistory } from "../api";

const ContentGenerator = () => {
    const [prompt, setPrompt] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const data = await getGeneratedContentHistory();
        if (data) {
            setHistory(data);
        }
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            alert("Please enter a prompt.");
            return;
        }

        setLoading(true);
        setGeneratedText("");

        try {
            const data = await generateContent(prompt);
            if (data && data.generated_text) {
                setGeneratedText(data.generated_text);
                fetchHistory(); // Refresh history
            } else {
                alert("No content generated.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to generate content. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto mt-10 p-4">
            <h2 className="text-2xl font-bold text-center">AI Content Generator</h2>
            <div className="mt-4">
                <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="4"
                    placeholder="Enter your prompt here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                ></textarea>
                <button 
                    onClick={handleGenerate} 
                    className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate Text"}
                </button>
            </div>

            {generatedText && (
                <div className="mt-4 p-4 border border-gray-200 bg-gray-100 rounded">
                    <h3 className="font-bold">Generated Text:</h3>
                    <p>{generatedText}</p>
                </div>
            )}

            <h2 className="text-xl font-bold mt-6">Your Generated Content History</h2>
            <ul className="mt-2 border-t border-gray-300 pt-2">
                {history.map((item) => (
                    <li key={item.id} className="p-2 border-b border-gray-200">
                        <strong>Prompt:</strong> {item.prompt} <br />
                        <strong>Response:</strong> {item.response} <br />
                        <span className="text-sm text-gray-500">({new Date(item.created_at).toLocaleString()})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContentGenerator;
