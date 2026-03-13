# Mahmoud Abdellah Portfolio

A full-stack TypeScript portfolio website with:

- `client`: React + Vite frontend
- `server`: Express API backend
- Root scripts to run and build both apps together

The project renders personal profile content, skills, featured projects, contact links, and latest GitHub repositories.

## Tech Stack

- Frontend: React, TypeScript, Vite, CSS, React Icons
- Backend: Node.js, Express, TypeScript
- Tooling: npm workspaces via `--prefix`, concurrently

## Project Structure

```text
.
├── client/
│   ├── public/
│   └── src/
├── server/
│   └── src/
├── package.json
└── README.md
```

## Prerequisites

- Node.js 18+
- npm 9+

## Installation

Install dependencies for root, server, and client:

```bash
npm install
npm install --prefix server
npm install --prefix client
```

## Running Locally

Start both server and client in development mode:

```bash
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`

## Build

Build server and client:

```bash
npm run build
```

Build outputs:

- Server: `server/dist`
- Client: `client/dist`

## Start Production Server

```bash
npm run start
```

This runs the compiled backend from `server/dist`.

## Environment Variables

The backend reads these optional environment variables:

- `PORT`: API server port (default: `4000`)
- `GITHUB_USERNAME`: GitHub user for repo feed (default: `Mahmoud142`)
- `GITHUB_TOKEN`: optional token to reduce rate-limit issues

Example:

```bash
PORT=4000
GITHUB_USERNAME=Mahmoud142
GITHUB_TOKEN=your_token_here
```

## API Endpoints

- `GET /api/health` -> API health status
- `GET /api/portfolio` -> portfolio data payload
- `GET /api/repos` -> latest GitHub repos (with fallback data)

## Customization

- Portfolio content: `server/src/data/portfolio.ts`
- Main UI and sections: `client/src/App.tsx`
- Styling: `client/src/styles/`
- Profile image: `client/public/images/profile.jpg`

## Root Scripts

- `npm run dev`: run client + server together
- `npm run build`: build client + server
- `npm run start`: start compiled backend

## Notes

- The repository folder is named `portifolio` to match current project naming.
- If GitHub API requests fail, the app automatically serves fallback repositories from portfolio project data.
