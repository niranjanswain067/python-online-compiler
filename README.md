# Python Online Compiler

A full-stack Python online compiler that allows you to write and execute Python code in the browser.

## Architecture

- **Client**: React + Vite frontend with Monaco Editor
- **Server**: Express.js middleware server
- **Backend**: Flask Python execution engine

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Python Dependencies

```bash
cd python_runner
pip install -r requirements.txt
cd ..
```

### 2. Install Node Dependencies

```bash
# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..
```

## Running the Application

You need to run three services:

### Terminal 1: Python Backend

```bash
cd python_runner
python app.py
```

The Flask server will start on `http://localhost:8000`

### Terminal 2: Express Server

```bash
cd server
npm start
```

The Express server will start on `http://localhost:5000`

### Terminal 3: React Client

```bash
cd client
npm run dev
```

The Vite dev server will typically start on `http://localhost:5173`

## Environment Variables

### Server (Express)

```bash
PORT=5000                          # Port for Express server (default: 5000)
PYTHON_SERVER_URL=http://localhost:8000  # Python backend URL (default: http://localhost:8000)
```

### Client (React)

```bash
VITE_API_URL=http://localhost:5000 # Node.js server URL (default: http://localhost:5000)
```

## Fixed Issues

1. ✅ **Python subprocess fix** - Now uses `sys.executable` instead of hardcoded "python" for Windows compatibility
2. ✅ **Added requirements.txt** - Flask and Flask-CORS dependencies documented
3. ✅ **Flask production mode** - Changed from debug mode to production mode
4. ✅ **Environment variables** - All hardcoded URLs replaced with configurable environment variables
5. ✅ **Error handling** - Detailed error messages for debugging (connection errors, timeouts, etc.)
6. ✅ **Start scripts** - Added npm scripts for easier startup
7. ✅ **Health check endpoint** - Added /health endpoint for monitoring
8. ✅ **Request timeout handling** - Added timeout configuration and proper error responses

## Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server
- `npm start` - Start the Express server

### Python Runner
- `python app.py` - Start the Flask server

## API Endpoints

### Express Server (localhost:5000)

- `POST /run` - Execute Python code
  - Request body: `{ code: "python code string" }`
  - Response: `{ output: "execution output" }`

- `GET /health` - Health check endpoint
  - Response: `{ status: "ok" }`

### Flask Server (localhost:8000)

- `POST /run` - Execute Python code
  - Request body: `{ code: "python code string" }`
  - Response: `{ output: "execution output" }`

## Troubleshooting

### "Python server is not running"
- Make sure the Flask app is running: `cd python_runner && python app.py`

### "Cannot connect to server"
- Verify Express server is running: `cd server && npm start`
- Check that the client is pointing to the correct URL

### Python code execution fails
- Check the Python version: `python --version`
- Ensure Flask-CORS is installed: `pip install Flask-CORS`
- Check Python code for syntax errors

### Port already in use
- Change the port using environment variables:
  - Express: `PORT=5001 npm start` (in server directory)
  - Flask: Modify `app.py` and change port 8000 to another port
  - React: Vite will automatically use next available port

## Development Notes

- The client uses Monaco Editor for Python syntax highlighting
- Code execution is sandboxed with a 5-second timeout to prevent infinite loops
- All code files are temporary (UUID-based) and automatically deleted after execution
