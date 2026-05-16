# Cash Climb Architecture

Cash Climb is a React + TypeScript financial literacy platform backed by Supabase.

## Frontend

The frontend is built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. The app uses reusable components so lesson pages, cards, dashboards, and interactive financial literacy modules can be expanded without rewriting the entire app.

## Data Layer

Supabase is used as the backend data layer. The project is structured to support user accounts, saved progress, quizzes, and personalized learning flows.

## Routing

React Router is used to organize the app into separate pages and learning sections.

## Deployment

The app is designed for deployment through Vercel, with environment variables used for Supabase configuration.

## Future Technical Improvements

- Add persistent user progress tracking
- Add quiz result storage
- Add financial decision simulation data
- Add personalized lesson recommendations
- Add better analytics for student learning progress