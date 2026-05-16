# Cash Climb

Cash Climb is a gamified financial literacy platform that helps students learn personal finance through interactive lessons, scenario-based decision making, and progress-driven learning.

The platform is built to make core financial topics like budgeting, saving, investing, credit, and long-term planning easier for young learners to understand through a more visual and interactive experience.

## Live Demo

https://cash-climb.com

## Features

- Interactive financial literacy lessons
- Scenario-based money decision modules
- Gamified progression system for student engagement
- Responsive interface for desktop and mobile use
- Supabase-backed data layer
- Modular React component structure
- Typed frontend architecture using TypeScript
- Routing-based page structure for scalable lesson and dashboard flows

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase
- React Router
- TanStack Query

## Technical Highlights

- Built with a component-based React architecture to separate pages, reusable UI elements, lesson modules, and application layout.
- Uses TypeScript across the frontend to improve reliability and make financial-learning data structures easier to maintain.
- Uses Supabase as the backend layer for database-backed application features and future user progress tracking.
- Uses React Router for multi-page navigation and scalable feature expansion.
- Uses TanStack Query to support cleaner async data fetching and state handling.
- Uses Tailwind CSS and shadcn/ui for a consistent responsive design system.
- Designed with environment-based configuration so deployment credentials stay separate from source code.

## Architecture

Cash Climb is structured as a React + TypeScript frontend backed by Supabase.

```txt
React + TypeScript frontend
        ↓
Reusable lesson and UI components
        ↓
Supabase data layer
        ↓
Future support for user progress, quizzes, and personalized learning paths
```

## Repository Structure

```txt
cashclimb/
├── public/              # Static assets
├── src/                 # Application source code
├── supabase/            # Supabase configuration and database-related files
├── components.json      # shadcn/ui configuration
├── tailwind.config.ts   # Tailwind design configuration
├── vite.config.ts       # Vite build configuration
└── package.json         # Scripts and dependencies
```

## Local Development

Clone the repository:

```bash
git clone https://github.com/kounishb/cashclimb.git
cd cashclimb
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do not commit real environment variables.

## Why I Built This

Financial literacy is often taught too late, even though students begin making money-related decisions early. Cash Climb is designed to make personal finance feel more approachable by turning financial concepts into interactive learning experiences rather than static textbook lessons.

## Status

Cash Climb is in active development. Current work focuses on strengthening the learning modules, improving the gamified progression system, and expanding the backend structure for user progress and personalized financial education.

## Author

Created by Kounish Bhattacharjee.