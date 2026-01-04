# Nexus - Project Management Application

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-4.4-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
</div>

---

## 📖 Table of Contents

1. [Project Introduction](#-project-introduction)
2. [Problem Statement](#-problem-statement)
3. [Solution & Value Proposition](#-solution--value-proposition)
4. [Tech Stack](#-tech-stack)
5. [Features](#-features)
6. [Architecture](#-architecture)
7. [React Concepts Deep Dive](#-react-concepts-deep-dive)
8. [Hooks Usage](#-hooks-usage)
9. [Component Architecture](#-component-architecture)
10. [State Management](#-state-management)
11. [Performance Optimizations](#-performance-optimizations)
12. [Security Implementation](#-security-implementation)
13. [Interview Q&A](#-interview-qa)

---

## 🚀 Project Introduction

**Nexus** is a modern, full-stack project management and team collaboration platform designed to streamline workflows, enhance team productivity, and provide real-time visibility into project progress.

### Elevator Pitch (30 seconds)
> "Nexus is a comprehensive project management solution I built using the MERN stack that solves the fragmentation problem teams face when using multiple tools. It combines task management with a Kanban board, a real-time brainstorming canvas for diagrams and flowcharts, centralized document management, and team analytics—all in one premium, glassmorphic UI. The platform uses React Context for global state, Axios interceptors for secure API communication, and implements performance optimizations like lazy loading and memoization."

### Why I Built This
- Demonstrate proficiency in **full-stack development**
- Showcase understanding of **modern React patterns** (hooks, context, composition)
- Implement **complex UI** with custom animations and glassmorphism
- Build **scalable architecture** with separation of concerns
- Practice **real-world authentication** with JWT tokens

---

## 🎯 Problem Statement

### The Challenge
Modern teams face **tool fragmentation**—they use:
- Trello/Jira for task management
- Miro/FigJam for brainstorming
- Google Drive for documents
- Slack for communication
- Multiple dashboards for analytics

This leads to:
1. **Context switching** reduces productivity by 40%
2. **Information silos** cause miscommunication
3. **Lack of unified visibility** into project health
4. **Onboarding complexity** for new team members

### Target Users
- Small to medium development teams (5-50 members)
- Startups needing lightweight project management
- Agencies managing multiple client projects

---

## 💡 Solution & Value Proposition

### How Nexus Solves This

| Problem | Nexus Solution |
|---------|----------------|
| Multiple tools | Unified platform with Projects, Tasks, Documents, Brainstorming |
| No visual brainstorming | Built-in canvas with shapes, sticky notes, keyboard shortcuts |
| Scattered documents | Centralized with project-specific & personal sections |
| Lack of insights | Real-time dashboard with sparkline charts & progress tracking |
| Context switching | Single app with ⌘K command palette for instant navigation |

### Unique Features
1. **Glassmorphic UI** - Premium, modern design language
2. **Brainstorming Board** - Interactive canvas with keyboard shortcuts
3. **Dual Document System** - Project (shared) + Personal (private)
4. **Role-Based Access** - Admin vs Member permissions
5. **Real-time Analytics** - Sparkline charts, progress rings

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **React 18** | UI Library | Component-based, virtual DOM efficiency |
| **Vite** | Build Tool | 10x faster HMR than CRA |
| **React Router v6** | Routing | Declarative, nested routes support |
| **TailwindCSS** | Styling | Utility-first, rapid prototyping |
| **Lucide React** | Icons | Consistent, customizable SVG icons |
| **Axios** | HTTP Client | Interceptors, better error handling |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js + Express** | REST API server |
| **MongoDB + Mongoose** | NoSQL database |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |

### Development Tools
- **ESLint** - Code linting
- **Git/GitHub** - Version control
- **VS Code** - IDE

---

## ✨ Features

### Dashboard
- Glassmorphic stat cards with hover effects
- Sparkline mini-charts for trends
- Circular progress indicators
- Real-time activity feed

### Projects
- Grid/List view toggle
- Search and status filters
- Progress bars per project
- Color-coded project cards

### Task Management (Kanban)
- Drag-drop columns (To Do, In Progress, Review, Done)
- Priority badges (High/Medium/Low)
- Assignee avatars
- Due date tracking

### Brainstorming Board
- Pan/zoom canvas
- Shape tools (Rectangle, Circle, Diamond, Sticky Notes)
- Keyboard shortcuts (H, V, R, O, N, T)
- Help modal with shortcut reference

### Documents
- Project documents (team-wide)
- Personal documents (private)
- File type icons
- Grid/List view

### Calendar
- Month grid view
- Event indicators
- Upcoming events sidebar
- Monthly stats

### Settings
- Profile management
- Theme customization
- Notification preferences
- Security settings

---

## 🏗 Architecture

```
nexus/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/           # Base components (GlassCard)
│   │   │   ├── Layout.jsx    # App shell with sidebar
│   │   │   └── CommandPalette.jsx
│   │   ├── context/          # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/            # Route-level components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   ├── Brainstorm.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── Documents.jsx
│   │   │   ├── Calendar.jsx
│   │   │   └── Settings.jsx
│   │   ├── services/         # API layer
│   │   │   └── api.js        # Axios instance
│   │   ├── App.jsx           # Route definitions
│   │   └── main.jsx          # Entry point
│   └── package.json
│
└── backend-node/
    ├── models/               # Mongoose schemas
    ├── routes/               # Express routes
    ├── middleware/           # Auth middleware
    └── server.js
```

---

## ⚛️ React Concepts Deep Dive

### 1. Functional Components
All components are **functional** (no class components). This aligns with modern React practices.

```jsx
// Functional component with props destructuring
const GlassCard = ({ children, hoverEffect = true, padding = 'p-5' }) => {
    return (
        <div className={`glass-card ${padding}`}>
            {children}
        </div>
    );
};
```

**Interview Answer:**
> "I exclusively use functional components because they're simpler, more readable, and allow us to use hooks for state and side effects. Class components are still valid but functional components with hooks are the modern standard."

---

### 2. JSX & Rendering

```jsx
// Conditional rendering
{user?.role === 'admin' && (
    <button onClick={() => setShowModal(true)}>
        New Project
    </button>
)}

// List rendering with unique keys
{projects.map((project) => (
    <ProjectCard key={project._id} project={project} />
))}
```

**Interview Answer:**
> "JSX is syntactic sugar for `React.createElement()`. It allows us to write HTML-like code in JavaScript. For lists, I always use unique `key` props (like MongoDB `_id`) to help React's reconciliation algorithm efficiently update the DOM."

---

### 3. Component Composition

```jsx
// Layout wraps page content (Composition Pattern)
<Layout>
    <Dashboard />
</Layout>

// GlassCard as a reusable wrapper
<GlassCard hoverEffect={true} padding="p-6">
    <h3>Title</h3>
    <p>Content</p>
</GlassCard>
```

**Interview Answer:**
> "I use composition extensively. The `Layout` component wraps all pages, providing the sidebar and header. `GlassCard` is a reusable container that accepts `children` and configuration props. This follows the 'composition over inheritance' principle."

---

### 4. Props vs State

| Aspect | Props | State |
|--------|-------|-------|
| Source | Parent component | Component itself |
| Mutability | Read-only | Mutable via setter |
| Example | `<ProjectCard project={data} />` | `const [filter, setFilter] = useState('all')` |

---

## 🪝 Hooks Usage

### useState - Local State Management

```jsx
const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newProject, setNewProject] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: ''
    });
    // ...
};
```

**Interview Answer:**
> "I use `useState` for component-local state. For complex objects like form data, I use a single state object instead of multiple states, updating with spread operator to maintain immutability."

---

### useEffect - Side Effects

```jsx
// Fetch data on mount
useEffect(() => {
    fetchProjects();
}, []); // Empty dependency array = runs once on mount

// Keyboard shortcuts
useEffect(() => {
    const handleKeyDown = (e) => {
        if (e.key === 'h') setTool('hand');
        if (e.key === 'v') setTool('select');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown); // Cleanup
}, []);

// Theme persistence
useEffect(() => {
    localStorage.setItem('nexus-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
}, [theme]); // Runs when theme changes
```

**Interview Answer:**
> "I use `useEffect` for side effects like API calls, event listeners, and localStorage. I always include proper cleanup functions to prevent memory leaks. The dependency array controls when the effect runs—empty for mount-only, with dependencies for reactive effects."

---

### useContext - Global State

```jsx
// Creating context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const login = async (email, password) => {
        const { data } = await API.post('/auth/login', { email, password });
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
    };
    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for consuming context
export const useAuth = () => useContext(AuthContext);

// Usage in components
const { user, logout } = useAuth();
```

**Interview Answer:**
> "I created two contexts: `AuthContext` for authentication state and `ThemeContext` for theme preferences. Using `createContext` + custom hooks (`useAuth`, `useTheme`) provides a clean API. The Provider wraps the app in `App.jsx`, making state available everywhere without prop drilling."

---

### useRef - DOM References

```jsx
const Brainstorm = () => {
    const canvasRef = useRef(null);
    
    const handleClick = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Add shape at x, y
    };
    
    return <div ref={canvasRef} onClick={handleClick} />;
};
```

**Interview Answer:**
> "I use `useRef` in the Brainstorming Board to get the canvas DOM element's position for calculating where to place shapes. Unlike `useState`, updating a ref doesn't trigger re-renders."

---

### useCallback - Memoized Functions

```jsx
const handleCanvasMouseMove = useCallback((e) => {
    if (isPanning) {
        setOffset({
            x: e.clientX - panStart.x,
            y: e.clientY - panStart.y
        });
    }
}, [isPanning, panStart]);
```

**Interview Answer:**
> "I use `useCallback` to memoize event handlers, especially for expensive operations like canvas interactions. This prevents unnecessary re-creation of functions on every render, which is important when passing callbacks to child components or using them in `useEffect` dependencies."

---

### useNavigate - Programmatic Navigation

```jsx
const navigate = useNavigate();

const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
};
```

---

### useParams - URL Parameters

```jsx
const { id } = useParams(); // Gets :id from /project/:id
```

---

### useLocation - Current Route

```jsx
const location = useLocation();

const isActive = (path) => {
    return location.pathname === path;
};
```

---

## 🧩 Component Architecture

### Component Categories

| Category | Purpose | Examples |
|----------|---------|----------|
| **Pages** | Route-level, full screens | Dashboard, Projects, Settings |
| **Layout** | App structure | Layout (sidebar + header) |
| **UI Components** | Reusable building blocks | GlassCard, CommandPalette |
| **Feature Components** | Domain-specific | Kanban columns, Calendar grid |

### Reusable Component Example: GlassCard

```jsx
const GlassCard = ({ 
    children, 
    hoverEffect = true,
    padding = 'p-5',
    className = '' 
}) => {
    return (
        <div 
            className={`
                relative rounded-2xl overflow-hidden
                transition-all duration-500
                ${hoverEffect ? 'hover:scale-[1.02] hover:-translate-y-1' : ''}
                ${padding} ${className}
                group
            `}
            style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}
        >
            {/* Shimmer effect on hover */}
            {hoverEffect && (
                <div className="shimmer-effect absolute inset-0 opacity-0 group-hover:opacity-100" />
            )}
            <div className="relative z-10">{children}</div>
        </div>
    );
};
```

**Interview Answer:**
> "GlassCard is a prime example of the 'composition' pattern. It accepts `children` as a prop and wraps them with consistent glassmorphic styling. I made it configurable with optional hover effects and customizable padding. This DRY approach means any UI changes are made in one place."

---

## 📊 State Management

### Strategy: Context + Local State (No Redux)

**Why not Redux?**
1. Application scale doesn't require it
2. React Context handles global state adequately
3. Fewer dependencies, simpler mental model
4. Easier onboarding for new developers

### State Distribution

| State Type | Where | Example |
|------------|-------|---------|
| Authentication | AuthContext | `user`, `login()`, `logout()` |
| Theme | ThemeContext | `theme`, `setTheme()` |
| Page data | Component state | `projects`, `tasks` |
| UI state | Component state | `showModal`, `activeTab` |
| Form data | Component state | `newProject`, `filter` |

### Lifting State Up

```jsx
// Parent manages sidebar state
const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    
    return (
        <>
            <Sidebar isOpen={isSidebarOpen} />
            <button onClick={() => setSidebarOpen(!isSidebarOpen)}>Toggle</button>
        </>
    );
};
```

---

## ⚡ Performance Optimizations

### 1. Lazy Loading Routes

```jsx
import { lazy, Suspense } from 'react';

const Brainstorm = lazy(() => import('./pages/Brainstorm'));

// In routes
<Route 
    path="/project/:id/brainstorm" 
    element={
        <Suspense fallback={<LoadingSpinner />}>
            <Brainstorm />
        </Suspense>
    } 
/>
```

**Benefit:** Reduces initial bundle size. Brainstorm's canvas code loads only when needed.

---

### 2. Conditional Rendering (Short-Circuit)

```jsx
// Only render modal when needed
{showModal && <CreateProjectModal onClose={() => setShowModal(false)} />}

// Auth context prevents rendering until loaded
return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
);
```

**Benefit:** Avoids unnecessary component mounts.

---

### 3. useCallback/useMemo for Expensive Operations

```jsx
// Memoize filtered results
const filteredProjects = useMemo(() => {
    return projects.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
}, [projects, searchQuery]);

// Memoize callback for child components
const handleDelete = useCallback((id) => {
    setProjects(prev => prev.filter(p => p._id !== id));
}, []);
```

**Benefit:** Prevents recalculation on every render.

---

### 4. CSS Transitions over JS Animations

```jsx
// CSS handles animation, not JS
className="transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
```

**Benefit:** GPU-accelerated, smoother 60fps animations.

---

### 5. Event Listener Cleanup

```jsx
useEffect(() => {
    const handler = (e) => handleKeyDown(e);
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler); // Cleanup!
}, []);
```

**Benefit:** Prevents memory leaks from orphaned listeners.

---

### 6. Debouncing Search Input

```jsx
const [searchQuery, setSearchQuery] = useState('');
const [debouncedQuery, setDebouncedQuery] = useState('');

useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
}, [searchQuery]);

// Use debouncedQuery for API calls
```

**Benefit:** Reduces API calls during rapid typing.

---

### 7. Keys for List Rendering

```jsx
{projects.map((project) => (
    <ProjectCard key={project._id} project={project} />
))}
```

**Benefit:** Helps React's reconciliation algorithm efficiently update only changed items.

---

## 🔐 Security Implementation

### 1. JWT Authentication Flow

```
User Login → Server validates → Returns JWT → Stored in localStorage
                                             ↓
                    Every API request includes token in header
                                             ↓
                    Backend middleware verifies before processing
```

### 2. Axios Interceptors for Token Injection

```jsx
API.interceptors.request.use((config) => {
    const user = localStorage.getItem('user');
    if (user) {
        const { token } = JSON.parse(user);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

**Interview Answer:**
> "I use Axios interceptors to automatically attach the JWT token to every outgoing request. This ensures authenticated requests without manually adding headers everywhere. The interceptor pattern is a form of AOP (Aspect-Oriented Programming)."

### 3. Protected Routes

```jsx
const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <LoadingSpinner />;
    return user ? children : <Navigate to="/login" />;
};

// Usage
<Route path="/" element={
    <PrivateRoute>
        <Layout><Dashboard /></Layout>
    </PrivateRoute>
} />
```

### 4. Role-Based UI

```jsx
// Only admins see "New Project" button
{user?.role === 'admin' && (
    <button onClick={() => setShowModal(true)}>New Project</button>
)}
```

---

## ❓ Interview Q&A

### Q1: Why did you choose React over Angular/Vue?
> "React's component-based architecture and virtual DOM make it efficient for complex UIs. Its ecosystem (React Router, Context API) covers all my needs without the verbosity of Angular. Also, the job market has high React demand."

### Q2: Why not use Redux?
> "For this application's scale, React Context with `useState` adequately handles global state (auth, theme). Redux adds boilerplate that isn't justified here. I'd use Redux for larger apps with deeply nested components or complex state interactions."

### Q3: How do you ensure component reusability?
> "I created a `GlassCard` component that encapsulates the glassmorphic styling. It accepts `children`, `hoverEffect`, and `padding` props. Any page can use it without duplicating styles. This follows DRY principles."

### Q4: Explain the authentication flow.
> "On login, the backend returns a JWT stored in localStorage. An Axios interceptor attaches it to all API requests. The `AuthContext` provides user state globally. `PrivateRoute` redirects unauthenticated users to `/login`."

### Q5: How did you handle performance?
> "Multiple strategies: lazy loading heavy components (Brainstorm board), CSS animations over JS, memoization with `useCallback`/`useMemo`, proper `useEffect` cleanup, and keys for list rendering."

### Q6: What's the hardest feature you built?
> "The Brainstorming Board. It required canvas-like interactions (pan, zoom, drag shapes), keyboard shortcuts, and maintaining shape state. I used `useRef` for DOM measurements, `useState` for shapes array, and `useEffect` for global keyboard listeners with cleanup."

### Q7: How would you scale this application?
> "I'd add: (1) React Query for server state caching, (2) WebSockets for real-time updates, (3) virtualized lists for large datasets, (4) code splitting for all routes, (5) migrate Context to Zustand/Redux if state gets complex."

### Q8: What are controlled vs uncontrolled components?
> "Controlled components have their state managed by React (via `value` + `onChange`). All my form inputs are controlled. Uncontrolled components use `ref` to access DOM values directly. I prefer controlled for predictable state."

### Q9: Explain the virtual DOM.
> "React maintains an in-memory representation of the UI. On state change, it creates a new virtual DOM, diffs it against the previous one (reconciliation), and updates only the changed real DOM nodes. This is faster than direct DOM manipulation."

### Q10: How do you handle errors?
> "API calls are wrapped in try-catch. Failed logins return `{ success: false, message }`. The UI displays user-friendly error messages. For unexpected errors, I'd add an Error Boundary component at the route level."

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB

### Installation

```bash
# Clone repository
git clone https://github.com/shreya02042004/Nexus.git
cd Nexus

# Backend
cd backend-node
npm install
cp .env.example .env  # Configure MongoDB URI, JWT secret
npm start

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Environment Variables

**Backend (`backend-node/.env`):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nexus
JWT_SECRET=your-secret-key
```

---

## 📝 License

MIT © Ayush

---

<div align="center">
  <p>Built with ❤️ using React, Node.js, and MongoDB</p>
</div>
