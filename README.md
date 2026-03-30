# Mahmoud Abdellah Portfolio

A frontend Typescript portfolio website built with React and Vite.
The project renders personal profile content, skills, featured projects, contact links, and latest GitHub repositories.

## Tech Stack

- Frontend: React, TypeScript, Vite, CSS, React Icons
- Styling: Custom CSS (Modular, Themeable)

## Prerequisites

- Node.js 18+
- npm 9+

## Installation

Install dependencies:

```bash
npm install
```

## Running Locally

Start the development server:

```bash
npm run dev
```

Default local URL is usually `http://localhost:5173` or `http://localhost:5174`.

## Build

Build the project for production:

```bash
npm run build
```

The output will be placed in the `dist` directory.

## Deployment (Vercel)

This project is optimized for deployment on Vercel.

**Important Vercel Settings:**

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Root Directory**: *(Leave empty)*

*(Note: Because this is a flattened frontend repository, do not specify `client` as the root directory).*

## GitHub Data Fallback
If actual GitHub API requests fail (e.g., rate limits), the app automatically serves fallback repositories from the static `src/data/github.ts` file.
