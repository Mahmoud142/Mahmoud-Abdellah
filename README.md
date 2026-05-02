# Mahmoud Abdellah Portfolio

A modern personal portfolio built with React, TypeScript, and Vite. It presents profile details, skills, featured projects, GitHub activity, and contact links in a clean responsive layout.

## ✨ Overview

This portfolio is designed to showcase my work as a full-stack software engineer. The site includes:

- A hero section with personal introduction and availability
- Skills grouped by backend, frontend, databases, DevOps, and tools
- Featured projects with GitHub links
- A live GitHub repositories section
- Contact links for email and social platforms
- Light and dark theme support
- Scroll reveal and responsive navigation

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- Custom CSS
- React Icons

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js 18 or later
- npm 9 or later

### 🔧 Install Dependencies

```bash
npm install
```

### ▶ Run Locally

```bash
npm run dev
```

Open the local URL shown in the terminal.

### 🏗 Build for Production

```bash
npm run build
```

The production output is generated in `dist`.

## 📁 Project Structure

- `src/App.tsx` contains the main portfolio layout and sections
- `src/data/portfolio.ts` stores the portfolio content
- `src/data/github.ts` handles GitHub repository data and fallback content
- `src/styles/` contains the site styling

## 🌐 Deployment

This project is ready to deploy on Vercel or any static hosting platform.

Recommended settings for Vercel:

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: leave empty

## 📡 GitHub Repositories

If the GitHub API is unavailable or rate-limited, the app falls back to the static repository data in `src/data/github.ts` so the portfolio still displays project activity.

## 📬 Contact

- GitHub: https://github.com/Mahmoud142
- LinkedIn: https://www.linkedin.com/in/mahmoud-3bdellah
- Email: mahmoud.abdellah014@gmail.com
