# MUI 7 + React Router 7 Template

A modern, production-ready template for building full-stack React applications using **React Router v7** and **Material-UI (MUI) v7** with **Emotion** for styling.

## Features

- ⚛️ **React 19** with latest features
- 🚀 **React Router v7** with Server-side rendering
- 🎨 **Material-UI (MUI) v7** with latest components
- 💫 **Emotion** for CSS-in-JS styling with SSR support
- ⚡️ **Vite 6** for fast development and builds
- 🎨 **TailwindCSS v4** for utility-first styling
- 🔒 **TypeScript** by default
- 📦 **Latest package versions** for all dependencies
- 🔧 **Automatic Emotion patching** for Vite 6 compatibility

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

> **Note**: The development server automatically patches @emotion packages for Vite 6 compatibility.

## Project Structure

```
├── app/
│   ├── entry.client.tsx    # Client-side entry point
│   ├── entry.server.tsx    # Server-side entry point with Emotion SSR
│   ├── root.tsx           # Root layout component
│   ├── createCache.ts     # Emotion cache configuration
│   └── routes/            # Application routes
├── scripts/
│   ├── patch-emotion-packages.js    # Auto-patch Emotion for Vite 6
│   └── unpatch-emotion-packages.js  # Revert Emotion patches
├── vite.config.ts         # Vite configuration with SSR setup
└── package.json           # Latest package versions
```

## Scripts

- `npm run dev` - Start development server (auto-patches Emotion packages)
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking
- `npm run patch:emotion` - Manually patch Emotion packages
- `npm run unpatch:emotion` - Remove Emotion patches

## Styling

This template includes:

- **Material-UI (MUI) v7** for React components
- **Emotion** for CSS-in-JS with server-side rendering
- **TailwindCSS v4** for utility classes
- Proper SSR support for both MUI and Emotion

### MUI + Emotion SSR

The template includes proper server-side rendering setup for MUI and Emotion:

- Emotion cache configuration in `app/createCache.ts`
- SSR style injection in `app/entry.server.tsx`
- Automatic style extraction and critical CSS generation

## Vite 6 Compatibility

This template includes automatic compatibility fixes for Vite 6:

- **Automatic Emotion patching**: Adds `"type": "module"` to @emotion packages
- **SSR configuration**: Proper noExternal setup for MUI and Emotion packages
- **Package manager detection**: Works with npm, pnpm, and yarn

The `predev` script automatically applies necessary patches before starting the development server.

### Emotion Package Patching

These scripts add `"type": "module"` to @emotion packages to resolve ESM/CJS compatibility issues with Vite 6 in development.

#### How It Works

1. **Detects package manager** by checking for lock files
2. **Finds @emotion packages** in `node_modules/@emotion/*`
3. **Modifies package.json** files to add `"type": "module"`
4. **Provides feedback** on success/failure

#### Usage

**Automatic (Recommended)**

The `predev` script automatically runs before `npm run dev`:

```bash
npm run dev    # Automatically patches then starts dev server
pnpm dev       # Also works with pnpm
yarn dev       # Also works with yarn
```

**Manual**

```bash
# Patch packages
npm run patch:emotion

# Unpatch packages (restore originals)
npm run unpatch:emotion
```

#### Notes

- Patches are lost when reinstalling packages
- The `predev` script ensures patches are reapplied automatically
- For Yarn PnP users: add `nodeLinker: node-modules` to `.yarnrc.yml`

## Package Manager Support

✅ **Supported:**
- npm - Full support
- pnpm - Full support (works with symlinks)
- yarn v1 (classic) - Full support
- yarn v2+ with nodeLinker: node-modules - Full support

❌ **Not supported:**
- yarn v2+ with PnP - Cannot modify packages in PnP mode

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t mui-react-router-app .

# Run the container
docker run -p 3000:3000 mui-react-router-app
```

### DIY Deployment

Deploy the output of `npm run build`:

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, yarn.lock)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Tech Stack

- **React 19** - Latest React with concurrent features
- **React Router v7** - Full-stack React framework
- **Material-UI v7** - React component library
- **Emotion** - CSS-in-JS library with SSR
- **TailwindCSS v4** - Utility-first CSS framework
- **Vite 6** - Next generation frontend tooling
- **TypeScript** - Static type checking

---

Built with ❤️ using React Router v7 and Material-UI v7.
