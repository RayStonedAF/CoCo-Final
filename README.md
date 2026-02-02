# CoCo - Cooking Companion App

A full-stack monorepo application featuring a Svelte frontend and Node.js Express backend. CoCo is your personalized cooking companion that helps you discover recipes, follow cooking steps with AI guidance, and track your culinary adventures.

## 🎯 Features

- **Recipe Discovery**: Search, browse, and explore recipes from TheMealDB
- **AI-Powered Insights**: Get AI-generated recipe summaries and cooking assistance
- **Cooking Mode**: Step-by-step guided cooking with text-to-speech support
- **Personal Profile**: Track favorites and recipes you've tried
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Voice Control**: Optional voice input for hands-free interaction

## 📁 Repository Structure

```
coco/
├── backend/              # Node.js + Express server (port 3001)
│   ├── src/
│   │   ├── server.js     # Main server file
│   │   ├── routes/       # API endpoints
│   │   └── services/     # External API & AI integrations
│   ├── package.json
│   └── .env.example
├── frontend/             # Svelte + Vite app (port 5173)
│   ├── src/
│   │   ├── routes/       # Page components
│   │   ├── components/   # Reusable UI components
│   │   ├── stores/       # Svelte stores for state
│   │   ├── lib/          # API client
│   │   ├── App.svelte    # Main app component
│   │   ├── main.js       # Entry point
│   │   └── global.css    # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- (Optional) Ollama running locally for AI features
  - Download from [ollama.ai](https://ollama.ai)
  - After installation, run: `ollama run llama3`

### Installation

#### 1. Clone/Setup the Repository

```bash
cd coco
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start the backend
npm run dev
```

Backend will run on `http://localhost:3001`

Check health: `curl http://localhost:3001/health`

#### 3. Frontend Setup (in a new terminal)

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start the frontend dev server
npm run dev
```

Frontend will be available at `http://localhost:5173`

### 4. Access the App

Open your browser and go to:
```
http://localhost:5173
```

You should see the CoCo splash screen, which will auto-navigate to the home page.

---

## ⚙️ Configuration

### Backend Environment Variables (`.env`)

```env
PORT=3001                                    # Backend port
NODE_ENV=development                         # Environment
CORS_ORIGIN=http://localhost:5173           # Frontend URL for CORS
OLLAMA_BASE_URL=http://localhost:11434      # Ollama server (optional)
OLLAMA_MODEL=llama3                         # Ollama model to use
MEALDB_BASE_URL=https://www.themealdb.com/api/json/v1/1
```

### Frontend Environment Variables (`.env`)

```env
VITE_API_BASE_URL=http://localhost:3001     # Backend API URL
```

### Disabling Ollama (for AI features)

If Ollama is not running, the backend will return graceful fallback responses. The app will still be fully functional, just without AI summaries and chat features.

---

## 📚 API Endpoints

### Recipes

- `GET /api/recipes/random` - Get a random recipe
- `GET /api/recipes/search?q=<query>` - Search recipes by name
- `GET /api/recipes/:id` - Get a specific recipe by ID

### AI Features

- `POST /api/ai/recipe-summary` - Generate AI summary for a recipe
  ```json
  {
    "recipeName": "Pasta",
    "category": "Italian",
    "area": "Italy",
    "ingredients": [{"name": "pasta", "measure": "500g"}],
    "steps": ["Boil water", "Cook pasta"]
  }
  ```
- `POST /api/ai/chat` - Chat with CoCo AI
  ```json
  {
    "messages": [
      {"role": "user", "content": "What's for dinner?"}
    ],
    "userName": "Ray"
  }
  ```

---

## 🎨 Pages & Routes

- `/splash` - Splash screen (auto-navigates to home)
- `/home` - Home page with random recipe and favorites
- `/search` - Search recipes by name
- `/favorites` - View saved favorite recipes
- `/profile` - User profile, settings, and statistics
- `/recipe/:id` - Recipe details with ingredients, steps, nutrition
- `/recipe/:id/cooking` - Guided cooking mode with step-by-step instructions
- `/chat` - AI chat interface (CoCo assistant)
- `/loading` - Loading screen

---

## 💾 Local Storage

The app persists data in browser localStorage:

- **User Profile**: Name, measuring unit preference, text-to-speech setting
- **Favorites**: List of saved recipe IDs
- **Tried Recipes**: Count of recipes completed in cooking mode
- **Portions**: Portion multiplier for each recipe

---

## 🎮 Features Explained

### Recipe Discovery

1. **Home Page**: Features a random recipe of the day with AI-generated summary
2. **Search**: Real-time debounced search (300ms) across TheMealDB
3. **Favorites**: Save recipes and track them

### Cooking Mode

- **Step-by-Step Guidance**: Navigate through recipe steps
- **Ingredient Highlights**: See relevant ingredients for current step
- **Text-to-Speech**: Optional voice reading of instructions (enable in Profile)
- **Portions Scaling**: Adjust ingredient quantities (up/down buttons)

### AI Features

- **Recipe Summaries**: 2-3 sentence friendly descriptions generated by Ollama
- **Coco Chat**: Multi-turn conversation with the cooking AI
- **Voice Input**: Optional speech-to-text for chat and step navigation

### Profile & Settings

- **User Name**: Switch between profiles (Ray, Brian, or custom name)
- **Measuring Unit**: Toggle between metric (mg/ml) and imperial (lbs/oz)
- **Text-to-Speech**: Enable/disable voice reading of recipe steps
- **Statistics**: Track favorite recipes and completed recipes

---

## 🛠️ Development

### Running Both Servers

**Terminal 1 - Backend:**
```bash
cd backend && npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend && npm run dev
```

### Building for Production

**Backend:**
```bash
cd backend
npm run start  # Runs with production settings
```

**Frontend:**
```bash
cd frontend
npm run build  # Creates optimized dist/ folder
npm run preview  # Preview production build locally
```

---

## 📦 Dependencies

### Backend
- **express** - Web framework
- **cors** - Cross-origin requests
- **axios** - HTTP client for external APIs
- **dotenv** - Environment variable management

### Frontend
- **svelte** - UI framework
- **vite** - Build tool
- **svelte-spa-router** - Client-side routing

---

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Ensure backend is running on port 3001
- Check `CORS_ORIGIN` in backend `.env`
- Verify no other service is using port 3001

### "AI features not working"
- Ollama is optional - app works without it
- To use AI: Install Ollama, run `ollama run llama3`
- Check `OLLAMA_BASE_URL` in backend `.env`
- Backend will return fallback responses if Ollama is unavailable

### "Recipes not loading"
- TheMealDB is free and has no rate limits
- Check internet connection
- Backend logs will show errors if API calls fail

### "Port 5173 already in use"
- Vite will auto-select next available port
- Or manually specify: `npm run dev -- --port 5174`

---

## 📋 Responsive Design

- **Mobile-First**: Optimized for phones (< 768px)
- **Desktop**: Enhanced layout and spacing (≥ 768px)
- Single breakpoint at 768px
- Flexbox and Grid layouts for flexible content

---

## 🎨 Design System

### Color Palette
- **Primary**: #d4a574 (Warm Gold)
- **Background**: #3d2817 (Deep Brown)
- **Dark**: #2a2015 (Very Dark Brown)
- **Light**: #f5f1e8 (Cream)
- **Muted**: #a89878 (Taupe)

### Components
- Rounded pill-style buttons
- Dark card panels with subtle borders
- Centered bottom navigation bar
- Dark brown theme throughout

---

## 📝 Notes

- The app uses TheMealDB, which is free and doesn't require authentication
- AI features use Ollama (local) - no external API keys needed
- All user data is stored locally in browser (no backend database)
- Voice features require HTTPS in production or localhost in development

---

## 🤝 Contributing

Feel free to extend this app with additional features:
- More recipe sources
- User authentication and cloud sync
- Advanced filtering and recommendations
- Recipe rating and reviews
- Nutrition calculations
- Meal planning features

---

## 📄 License

MIT License - Feel free to use and modify!

---

## 🙋 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review server logs (backend terminal)
3. Check browser console for errors (F12)
4. Verify all environment variables are set correctly
5. Ensure both frontend and backend are running

---

**Enjoy cooking with CoCo! 🍳**
