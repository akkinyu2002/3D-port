# Dev Days Portfolio

A futuristic 3D portfolio for Aakash Neupane built with React, Vite, Three.js, and React Three Fiber.

## Features

- Interactive 3D landing scene with animated avatar, particles, skills ring, and project cards
- Glassmorphism UI panels for about, contact, project details, and chat
- Built-in AI portfolio assistant with quick prompts and safe rich-text rendering
- Voice-command navigation for supported browsers
- Responsive layout tuned for desktop and mobile

## Tech Stack

- React 19
- Vite 8
- Three.js
- @react-three/fiber
- @react-three/drei
- GSAP

## Scripts

- `npm run dev` starts the development server
- `npm run build` creates the production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint

## Notes

- The portfolio content lives in `src/data/portfolioData.js`.
- Main scene orchestration lives in `src/scenes/MainScene.jsx`.
- Global styling lives in `src/index.css`.
