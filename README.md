# Sri Siddhartha Degree College

The official website for Sri Siddhartha Degree College, Nuzvid. It presents the college, undergraduate programmes, faculty, campus infrastructure, student life, and contact information in a responsive React experience.

## Features

- Responsive college homepage with hero, programmes, faculty, infrastructure, and student life sections
- Programme detail pages with route-based navigation
- Mobile-friendly faculty carousel with touch swiping, arrows, counter, and dot navigation
- Branded loading screen using the college logo
- Framer Motion animations and Lucide icons

## Tech Stack

- React 19
- Vite
- React Router
- Framer Motion
- Lucide React
- Oxlint

## Getting Started

### Requirements

- Node.js 18 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create an optimized production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Project Structure

```text
public/       Static images, logos, course assets, and faculty assets
src/App.jsx   Application shell and routing
src/Home.jsx  College homepage and content sections
src/data.json College, programme, and faculty data
src/*.css     Global and component styling
```

## Deployment

Build the project with:

```bash
npm run build
```

Deploy the generated `dist` directory to any static hosting provider. Configure the host to serve `index.html` as a fallback for client-side routes such as `/course/:id`.
