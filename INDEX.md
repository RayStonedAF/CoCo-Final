# 🍳 CoCo - Cooking Companion | Complete Monorepo

## ✅ Build Complete - Ready to Run

Your full-stack cooking companion app is ready. This is a **production-ready prototype** with no missing pieces.

---

## 📂 Repository Contents

### Root Level
- **README.md** - Complete documentation & API reference
- **SETUP_GUIDE.md** - Step-by-step setup instructions
- **BUILD_SUMMARY.md** - What was built & architecture
- **package.json** - Root metadata
- **.gitignore** - Git configuration
- **THIS FILE** - Index

### Backend (`/backend`)
```
backend/
├── src/
│   ├── server.js                 # Express server, CORS, routing
│   ├── routes/
│   │   ├── recipes.js           # /api/recipes/* endpoints
│   │   └── ai.js                # /api/ai/* endpoints
│   └── services/
│       ├── mealdb.js            # TheMealDB integration + normalization
│       └── ollama.js            # Ollama AI integration + fallbacks
├── package.json                  # Dependencies & scripts
├── .env.example                  # Environment template
└── README (in main README.md)
```

**Runs on:** `http://localhost:3001`

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── main.js                   # Bootstrap
│   ├── App.svelte                # Router & layout
│   ├── global.css                # Dark brown theme
│   ├── routes/                   # 9 pages
│   │   ├── Splash.svelte
│   │   ├── Home.svelte
│   │   ├── Search.svelte
│   │   ├── Favorites.svelte
│   │   ├── Profile.svelte
│   │   ├── Recipe.svelte
│   │   ├── Cooking.svelte
│   │   ├── Chat.svelte
│   │   └── Loading.svelte
│   ├── components/               # 12 reusable components
│   │   ├── Header.svelte
│   │   ├── BottomNav.svelte
│   │   ├── RecipeCard.svelte
│   │   ├── RecipeList.svelte
│   │   ├── SearchBar.svelte
│   │   ├── SegmentedTabs.svelte
│   │   ├── PortionsControl.svelte
│   │   ├── ToggleSwitch.svelte
│   │   ├── RadioGroup.svelte
│   │   ├── ChatBubble.svelte
│   │   ├── LoadingSpinner.svelte
│   │   └── ErrorBanner.svelte
│   ├── stores/                   # 4 Svelte stores
│   │   ├── userStore.js
│   │   ├── favoritesStore.js
│   │   ├── triedStore.js
│   │   └── portionsStore.js
│   └── lib/
│       └── api.js                # Fetch-based API client
├── index.html                    # HTML template
├── vite.config.js                # Vite configuration
├── package.json                  # Dependencies & scripts
└── .env.example                  # Environment template
```

**Runs on:** `http://localhost:5173`

---

## 🚀 Quick Start (3 Steps)

### Step 1: Backend
```bash
cd backend
npm install && npm run dev
```

### Step 2: Frontend (new terminal)
```bash
cd frontend
npm install && npm run dev
```

### Step 3: Visit
Open browser to: **`http://localhost:5173`**

💡 See **SETUP_GUIDE.md** for detailed instructions.

---

## 📋 What's Implemented

### ✅ Hard Requirements
- [x] Two services (backend + frontend)
- [x] External recipes API (TheMealDB via backend)
- [x] Svelte components (clean, modular)
- [x] Multiple pages (9 routes)
- [x] Fully runnable with no TODOs or placeholders

### ✅ Should-Have Requirements
- [x] AI as a Service (Ollama with fallbacks)
- [x] Responsive design (1 breakpoint at 768px)
- [x] Sensible use of grid/flex

### ✅ Extra Features
- [x] localStorage persistence
- [x] Text-to-speech
- [x] Voice input
- [x] Ingredient highlighting
- [x] Portions scaling
- [x] Recipe normalization

---

## 🎯 Key Features

### Recipe Discovery
- **Home**: Random daily recipe with AI summary
- **Search**: Real-time debounced search
- **Favorites**: Save & grid view

### Cooking Mode
- Step-by-step guidance
- Relevant ingredient highlights
- Portions adjustment
- Text-to-speech option

### AI Integration
- Recipe summaries (Ollama)
- Multi-turn chat (Ollama)
- Graceful fallbacks if Ollama unavailable

### User Profile
- Save name (Ray, Brian, or custom)
- Measuring unit (metric/imperial)
- Text-to-speech toggle
- Track tried recipes

### Responsive Design
- Mobile-first (< 768px)
- Enhanced desktop layout (≥ 768px)
- Dark brown theme throughout

---

## 🔌 API Endpoints

### Recipes
- `GET /api/recipes/random`
- `GET /api/recipes/search?q=<query>`
- `GET /api/recipes/:id`

### AI
- `POST /api/ai/recipe-summary`
- `POST /api/ai/chat`

---

## 💾 Data Storage

**All persisted in browser localStorage:**
- User profile (name, settings)
- Favorites list
- Tried recipes count
- Portions per recipe

---

## 🛠️ Technology Stack

**Backend:**
- Node.js, Express, Axios
- CORS, dotenv
- TheMealDB API, Ollama API

**Frontend:**
- Svelte, Vite, svelte-spa-router
- CSS Grid, Flexbox
- localStorage API
- Web Speech API (TTS/voice)
- Fetch API

---

## 📖 Documentation Files

1. **README.md** (start here)
   - Full feature documentation
   - API reference
   - Configuration guide
   - Troubleshooting

2. **SETUP_GUIDE.md**
   - Step-by-step setup
   - Ollama setup
   - Testing checklist
   - Common issues

3. **BUILD_SUMMARY.md**
   - Complete build details
   - Architecture overview
   - Implementation notes
   - Testing checklist

4. **THIS FILE (INDEX.md)**
   - Quick reference
   - File structure
   - Quick start

---

## 🎨 Design

**Theme:** Dark Brown (Coffee/Kitchen aesthetic)
- Primary: `#d4a574` (Gold)
- Background: `#3d2817` (Deep Brown)
- Text: `#f5f1e8` (Cream)

**Components:**
- Pill-shaped buttons
- Dark cards with borders
- Sticky bottom nav
- Smooth animations

---

## ⚙️ Environment Setup

**Backend (.env):**
```
PORT=3001
CORS_ORIGIN=http://localhost:5173
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3
```

**Frontend (.env):**
```
VITE_API_BASE_URL=http://localhost:3001
```

---

## 🧪 Testing

**Backend health:**
```bash
curl http://localhost:3001/health
```

**Get random recipe:**
```bash
curl http://localhost:3001/api/recipes/random
```

**Frontend:**
- Visit `http://localhost:5173`
- Splash screen appears
- Auto-navigates to home
- Random recipe loads

---

## 🎓 Learning Resources

### File Organization
- **Routes** = Pages (one per `.svelte` file in `src/routes/`)
- **Components** = Reusable UI parts (in `src/components/`)
- **Stores** = State management (in `src/stores/`)
- **Services** = Backend business logic (in `backend/src/services/`)

### Key Patterns
- **Fetch**: `src/lib/api.js` (centralized, error handling)
- **State**: Svelte stores with localStorage sync
- **Styling**: Global CSS + scoped component styles
- **Routing**: svelte-spa-router with clean paths

---

## 🚀 Next Steps

1. **Run both servers** (backend + frontend)
2. **Visit** `http://localhost:5173`
3. **Explore**:
   - Browse random recipe
   - Search for recipes
   - Add favorites
   - Try cooking mode
   - Check profile
   - Chat with CoCo

4. **Customize**:
   - Edit components in `frontend/src/components/`
   - Add more recipe sources
   - Extend AI capabilities
   - Modify styling in `global.css`

---

## 📞 Support

**Having issues?**

1. Check **README.md** troubleshooting
2. Check **SETUP_GUIDE.md** common issues
3. Review terminal output (both servers)
4. Check browser console (F12)
5. Ensure ports 3001 & 5173 are free

**Common fixes:**
```bash
# Port in use?
# Change PORT in backend/.env
# Or use: npm run dev -- --port 5174 (frontend)

# Weird state?
localStorage.clear()  # In browser console

# Dependencies broken?
rm -rf node_modules && npm install
```

---

## 🎉 You're All Set!

Everything is ready to run. No configuration needed beyond the basic setup.

**Start here:** → **SETUP_GUIDE.md**

**Questions?** → **README.md**

**What's inside?** → **BUILD_SUMMARY.md**

---

**Enjoy cooking with CoCo! 🍳**
