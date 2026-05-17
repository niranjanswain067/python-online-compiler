const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PYTHON_SERVER_URL = process.env.PYTHON_SERVER_URL || "http://localhost:8000";
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/run", async (req, res) => {

    try {

        const response = await axios.post(
            `${PYTHON_SERVER_URL}/run`,
            {
                code: req.body.code
            },
            { timeout: 10000 }
        );

        res.json(response.data);

    } catch (error) {

        console.error("Error:", error.message);

        if (error.code === 'ECONNREFUSED') {
            res.status(503).json({
                output: "Python server is not running. Please start it with: python python_runner/app.py"
            });
        } else if (error.code === 'ETIMEDOUT') {
            res.status(504).json({
                output: "Python server timeout. Code execution took too long."
            });
        } else {
            res.status(500).json({
                output: "Backend Error: " + (error.response?.data?.output || error.message)
            });
        }

    }

});

app.listen(PORT, () => {
    console.log(`Node Server running on port ${PORT}`);
    console.log(`Python Server URL: ${PYTHON_SERVER_URL}`);
});