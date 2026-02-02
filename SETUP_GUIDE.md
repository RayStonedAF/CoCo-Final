# CoCo Development Setup Guide

## One-Time Setup

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)
- (Optional) Ollama for AI ([Download](https://ollama.ai))

---

## Step-by-Step Setup

### 1️⃣ Backend Setup

Open a terminal and run:

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev
```

**Expected output:**
```
🍳 CoCo backend running on port 3001
📡 CORS enabled for http://localhost:5173
🤖 Using Ollama at http://localhost:11434
```

✅ **Backend Ready!** The server is now running at `http://localhost:3001`

---

### 2️⃣ Frontend Setup

Open **another terminal** and run:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev
```

**Expected output:**
```
VITE v4.5.0  ready in ... ms

➜  Local:   http://localhost:5173/
```

✅ **Frontend Ready!** Open your browser to `http://localhost:5173`

---

### 3️⃣ (Optional) Setup Ollama for AI Features

If you want AI-powered recipe summaries and chat:

1. **Download Ollama**: https://ollama.ai
2. **Install and run** Ollama app
3. **In terminal, download a model**:
   ```bash
   ollama run llama3
   ```
4. **Ollama will start on** `http://localhost:11434`

Backend will automatically detect Ollama and use it for AI features.

---

## ✅ Testing the App

### 1. Backend Health Check

```bash
curl http://localhost:3001/health
```

Should return:
```json
{"status":"ok","message":"CoCo backend is running"}
```

### 2. Try Getting a Random Recipe

```bash
curl http://localhost:3001/api/recipes/random
```

Should return recipe JSON with ingredients, steps, etc.

### 3. Browser Test

Visit: `http://localhost:5173`

You should see:
- CoCo splash screen (2 sec)
- Auto-navigate to home page
- Random recipe card loads
- All navigation works

---

## 🔧 Troubleshooting

### Backend won't start

**Error: `Port 3001 already in use`**
- Change port in `backend/.env`: `PORT=3002`
- Or kill process: `lsof -i :3001` (Mac/Linux) or `netstat -ano | findstr :3001` (Windows)

**Error: `Cannot find module`**
```bash
cd backend
rm -rf node_modules
npm install
npm run dev
```

### Frontend won't start

**Error: `Port 5173 already in use`**
```bash
npm run dev -- --port 5174
```

**Error: API calls failing**
- Ensure backend is running on port 3001
- Check browser console for actual error
- Verify `VITE_API_BASE_URL` in frontend `.env`

### AI not working / Ollama errors

- Ollama is **optional** - app works without it
- Backend returns fallback summaries
- To enable: Install Ollama, run `ollama run llama3`
- Check `OLLAMA_BASE_URL` in backend `.env`

### localStorage data stuck

Clear browser storage:
1. Press `F12` (DevTools)
2. Go to Application tab
3. Find "Local Storage"
4. Click `http://localhost:5173`
5. Delete all entries

Or use console:
```javascript
localStorage.clear()
```

---

## 🚀 Development Workflow

### While Developing

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev  # Auto-restarts on file changes (nodemon)
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev  # Auto-reloads on file changes (Vite)
```

**Terminal 3 (Optional - Ollama):**
```bash
ollama run llama3
```

### Making Changes

- **Backend code** (`backend/src/`) → Auto-restarts
- **Frontend code** (`frontend/src/`) → Auto-reloads
- **Environment** changes → Restart the server

---

## 📦 Production Build

### Build Backend

```bash
cd backend
npm run start  # Runs in production mode
```

### Build Frontend

```bash
cd frontend
npm run build      # Creates optimized dist/
npm run preview    # Test production build locally
```

---

## 📚 Key Files to Know

**Backend:**
- `backend/src/server.js` - Main server file
- `backend/src/routes/recipes.js` - Recipe API
- `backend/src/routes/ai.js` - AI API
- `backend/src/services/mealdb.js` - TheMealDB integration
- `backend/src/services/ollama.js` - Ollama AI

**Frontend:**
- `frontend/src/main.js` - App bootstrap
- `frontend/src/App.svelte` - Router
- `frontend/src/routes/` - Pages
- `frontend/src/components/` - Reusable components
- `frontend/src/stores/` - State management
- `frontend/src/lib/api.js` - API client

---

## 🎯 Next Steps

1. ✅ Backend running on port 3001
2. ✅ Frontend running on port 5173
3. ✅ Visit http://localhost:5173
4. ✅ Browse recipes, add favorites, try cooking mode
5. ✅ Enjoy! 🍳

---

## 💡 Tips

- **Responsive Design**: Open DevTools (F12) and toggle device toolbar to test mobile
- **Performance**: Use Vite's built-in dev server - it's very fast
- **Debugging**: Check backend terminal and browser console for errors
- **Recipe Data**: TheMealDB is free - no rate limits, try different searches
- **Customization**: All components are in `frontend/src/components/` - easy to modify

---

## 🆘 Still Having Issues?

1. **Check the main README**: `c:\CoCo\README.md`
2. **Check the build summary**: `c:\CoCo\BUILD_SUMMARY.md`
3. **Backend logs**: Watch the backend terminal for errors
4. **Browser console**: Press F12, check Console tab
5. **Try restarting**: Kill both servers and run again

---

**Happy coding! 🚀**
