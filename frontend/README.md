# AI-Powered Construction Planning System

A modern React web application for AI-driven construction planning with cost estimation, labour allocation, and schedule optimization.

## Tech Stack

- **React 19** + **Vite 7**
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - API calls
- **Lucide React** - Icons
- **React Router** - Navigation

## Features

- **Landing Page** - Animated hero, feature highlights, CTA
- **Dashboard** - Interactive form with validation, progress bar, floating labels
- **Results Page** - Worker requirements, timeline, cost breakdown, material estimation, weekly schedule accordion, blueprint placeholder
- **Dark/Light Mode** - Theme toggle with persistence
- **Toast Notifications** - Success, error, warning feedback
- **Error Boundary** - Graceful error handling
- **Lazy Loading** - Route-based code splitting
- **SEO** - Meta tags in index.html

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## API Integration

The app sends form data to `POST /api/analyze`. Configure the backend URL via:

```
VITE_API_URL=http://your-api.com npm run dev
```

Default: Proxies `/api` to `http://localhost:8000` in development.

### Expected Request Payload

```json
{
  "built_up_area": 2000,
  "floors": "G+2",
  "duration": 180,
  "budget": 5000000,
  "location": "Mumbai",
  "wage_rate": 500,
  "material_cost": 1200
}
```

### Demo Mode

When the API is unavailable (404/network error), the app automatically shows a sample plan with mock data for demo purposes.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Route pages
├── hooks/          # Custom hooks (useTheme)
├── context/        # React context (ToastContext)
├── animations/     # Framer Motion variants
├── services/       # API service
├── styles/         # Global styles (index.css)
├── App.jsx
└── main.jsx
```

## Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
