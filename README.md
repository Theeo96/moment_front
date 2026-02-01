# moment_front

## 🗒️ Overview

**moment_front** is the frontend repository for **moment**, an HTP (House-Tree-Person Test)-based psychological counseling service platform. The application provides a comprehensive web interface for conducting psychological assessments using the HTP projective test, a widely used psychological evaluation technique that helps understand an individual's personality, emotional state, and interpersonal relationships through drawings.

### Key Features

- 🎨 **Interactive HTP Test Interface**: User-friendly drawing and image upload system for House-Tree-Person psychological assessments
- 🧠 **AI-Powered Analysis**: Advanced psychological analysis powered by backend AI models
- 📊 **Results Dashboard**: Comprehensive visualization of test results and psychological insights
- 👤 **User Profile Management**: Personal account management with test history tracking
- 🔒 **Privacy & Security**: Built-in privacy consent management and secure data handling
- 💆 **Wellness Features**: Integrated music therapy, tea recommendations, and professional counselor search
- 📱 **Responsive Design**: Modern, mobile-friendly interface built with React and Next.js
- ☁️ **Static Export**: Optimized for deployment on CDN platforms like Vercel and Azure Static Web Apps

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Technology Stack](#-technology-stack)
- [System Requirements](#️-system-requirements)
- [Setup Instructions](#-setup-instructions)
  - [Frontend Setup](#frontend-setup)
  - [Backend Configuration](#backend-configuration)
- [Execution](#-execution)
- [Project Structure](#-project-structure)
- [Troubleshooting](#-troubleshooting)
- [Additional Resources](#-additional-resources)

---

## 💻 Technology Stack

### Frontend Framework
- **Next.js 16.0.0** - React framework with static site generation (SSG) and static export
- **React 18.3.1** - UI component library
- **TypeScript 5** - Type-safe JavaScript superset

### Styling & UI Components
- **Tailwind CSS 4.1.9** - Utility-first CSS framework with PostCSS integration
- **Radix UI** - Comprehensive accessible component library (20+ components including dialogs, dropdowns, tooltips, etc.)
- **Lucide React** - Beautiful and consistent icon library
- **Shadcn/ui** - Re-usable component patterns

### State Management & Forms
- **React Hook Form 7.60.0** - Performant form validation and management
- **Zod 3.25.76** - TypeScript-first schema validation
- **Sonner 1.7.4** - Toast notification system

### Additional Libraries
- **date-fns** - Modern date utility library
- **recharts** - Composable charting library for data visualization
- **embla-carousel-react** - Lightweight carousel component
- **next-themes** - Theme management (light/dark mode support)
- **cmdk** - Command menu component
- **vaul** - Drawer component for mobile interfaces

### Development Tools
- **PostCSS** - CSS transformations
- **ESLint** - Code linting and quality checks
- **pnpm** - Fast, disk space efficient package manager

### Backend Integration
- External REST API backend hosted at `https://htp-backend.koreacentral.cloudapp.azure.com/`
- Configurable via environment variables for different deployment environments

---

## ⚙️ System Requirements

### Software Requirements

| Software | Minimum Version | Recommended Version | Purpose |
|----------|----------------|---------------------|---------|
| **Node.js** | 18.x | 18.x LTS or 20.x LTS | JavaScript runtime environment |
| **npm** | 9.x | 9.x or higher | Package manager (comes with Node.js) |
| **pnpm** | 8.x | Latest stable | Alternative package manager (optional but recommended) |
| **Git** | 2.x | Latest stable | Version control |

### Hardware Requirements

- **RAM**: 4GB minimum, 8GB recommended for development
- **Disk Space**: 500MB minimum for dependencies and build output
- **Processor**: Modern multi-core processor for optimal build performance

### Browser Compatibility

- **Chrome/Edge**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile latest

---

## 🔧 Setup Instructions

### Frontend Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/Theeo96/moment_front.git
cd moment_front
```

#### 2. Navigate to Frontend Directory

```bash
cd frontend
```

#### 3. Install Dependencies

You can use either **npm** or **pnpm** (recommended for faster installation):

**Using npm:**
```bash
npm install
```

**Using pnpm:**
```bash
pnpm install
```

> **💡 Note**: The project includes a `pnpm-lock.yaml` file, indicating that pnpm is the preferred package manager. Using pnpm ensures consistent dependency resolution.

### Backend Configuration

The application connects to an external backend API. Configure the backend URL using environment variables.

#### 4. Create Environment Configuration

Create a `.env.local` file in the **frontend** directory:

```bash
cd frontend
touch .env.local
```

#### 5. Set Environment Variables

Add the following configuration to `.env.local`:

```env
# Backend API Base URL
NEXT_PUBLIC_API_BASE_URL=https://htp-backend.koreacentral.cloudapp.azure.com

# For local backend development (if running backend locally)
# NEXT_PUBLIC_API_BASE_URL=http://localhost:5678
```

> **🔐 Important Notes:**
> - Environment variables prefixed with `NEXT_PUBLIC_` are accessible in the browser
> - The `.env.local` file is git-ignored and should never be committed to version control
> - For production deployments, set environment variables in your hosting platform (Vercel, Azure, etc.)
> - Since the project uses static export (`output: 'export'` in `next.config.js`), environment variables are embedded at **build time**, not runtime

#### Alternative: Using lib/config.ts

The project also includes a `frontend/lib/config.ts` file with default API configuration. Environment variables override these defaults during the build process. For more details, see `frontend/README_API.md`.

---

## 🚀 Execution

### Development Server

Start the development server with hot-reload enabled:

```bash
cd frontend
npm run dev
```

Or with pnpm:
```bash
cd frontend
pnpm dev
```

The application will be available at:
- **Local**: [http://localhost:3000](http://localhost:3000)
- **Network**: Check the terminal output for the network URL to access from other devices

### Production Build

Build the application for production deployment:

```bash
cd frontend
npm run build
```

Or with pnpm:
```bash
cd frontend
pnpm build
```

The build output will be generated in the `frontend/out/` directory as static HTML, CSS, and JavaScript files ready for deployment to any static hosting service.

### Preview Production Build Locally

To test the production build locally before deployment:

```bash
cd frontend
npm run start
```

> **📦 Deployment Notes:**
> - The project is configured for **static export** (`output: 'export'` in `next.config.js`)
> - Build output is optimized for CDN deployment (Vercel, Azure Static Web Apps, Netlify, etc.)
> - No Node.js server required for hosting
> - See `.github/workflows/` for CI/CD pipeline configurations

---

## 📂 Project Structure

```
moment_front/
├── .github/                    # GitHub configuration
│   └── workflows/              # CI/CD workflows (Azure Static Web Apps)
├── frontend/                   # Main Next.js application
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI components (Shadcn/ui)
│   │   ├── main-page.tsx      # Main landing page
│   │   ├── test-page.tsx      # HTP test interface
│   │   ├── image-upload-page.tsx  # Drawing upload interface
│   │   ├── analysis-loading-page.tsx  # Analysis progress indicator
│   │   ├── results-page.tsx   # Test results display
│   │   ├── my-page.tsx        # User profile management
│   │   ├── test-history-page.tsx  # Test history viewer
│   │   ├── signup-page.tsx    # User registration
│   │   ├── music-page.tsx     # Music therapy recommendations
│   │   ├── tea-page.tsx       # Tea therapy recommendations
│   │   ├── professional-search-page.tsx  # Counselor directory
│   │   ├── result-support-page.tsx  # Result interpretation support
│   │   ├── sharing-page.tsx   # Result sharing interface
│   │   ├── treatment-page.tsx # Treatment recommendations
│   │   ├── Terms-page.tsx     # Terms of service
│   │   ├── privacy-consent-page.tsx  # Privacy policy
│   │   └── ... (other components)
│   ├── lib/                   # Utility functions and configurations
│   │   ├── api.ts            # API client functions
│   │   ├── config.ts         # Configuration management
│   │   └── utils.ts          # Helper utilities
│   ├── hooks/                 # Custom React hooks
│   ├── public/                # Static assets (images, fonts, etc.)
│   ├── styles/                # Additional stylesheets
│   ├── next.config.js         # Next.js configuration
│   ├── tsconfig.json          # TypeScript configuration
│   ├── package.json           # Dependencies and scripts
│   ├── postcss.config.mjs     # PostCSS configuration
│   ├── components.json        # Shadcn/ui component configuration
│   └── README_API.md          # API configuration guide
├── README.md                   # This file
└── .gitignore                 # Git ignore rules
```

### Key Directories Explained

- **`frontend/app/`**: Contains the Next.js App Router pages and layouts
- **`frontend/components/`**: Reusable React components organized by feature
- **`frontend/components/ui/`**: Base UI components from Shadcn/ui library
- **`frontend/lib/`**: Core utilities, API client, and configuration management
- **`frontend/hooks/`**: Custom React hooks for shared component logic
- **`frontend/public/`**: Static assets served directly (images, icons, fonts)
- **`.github/workflows/`**: Automated CI/CD pipeline definitions

---

## ❓ Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use

**Problem**: Port 3000 is already in use by another application.

**Solution**: 
```bash
# Kill the process using port 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9

# Or start on a different port
PORT=3001 npm run dev
```

#### 2. Dependency Installation Errors

**Problem**: `npm install` or `pnpm install` fails with dependency conflicts.

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove existing installations
rm -rf node_modules
rm package-lock.json  # or pnpm-lock.yaml

# Reinstall dependencies
npm install  # or pnpm install
```

#### 3. TypeScript Errors

**Problem**: TypeScript compilation errors during development or build.

**Solution**:
```bash
# Regenerate TypeScript declarations
npx next telemetry disable
rm -rf .next
npm run dev
```

#### 4. Environment Variables Not Working

**Problem**: API calls fail or use incorrect backend URL.

**Solution**:
- Verify `.env.local` file exists in the `frontend/` directory (not root)
- Ensure environment variables start with `NEXT_PUBLIC_` prefix
- Restart the development server after changing environment variables
- For production builds, rebuild the application to embed new environment values

#### 5. Build Fails with Memory Issues

**Problem**: Build process crashes with "JavaScript heap out of memory" error.

**Solution**:
```bash
# Increase Node.js memory limit
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

#### 6. Static Export Issues

**Problem**: Features not working in production that work in development.

**Solution**:
- Check `next.config.js` - static export mode has limitations
- Avoid using Next.js server-side features (API routes, server actions, etc.)
- Ensure all dynamic data is fetched client-side
- Review build warnings for unsupported features

#### 7. Styling Issues or Missing Styles

**Problem**: Tailwind CSS classes not applying or components look unstyled.

**Solution**:
```bash
# Rebuild Tailwind CSS
npm run build

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Getting Help

If you encounter issues not covered here:

1. **Check Logs**: Review terminal output for specific error messages
2. **GitHub Issues**: Search or create an issue at [https://github.com/Theeo96/moment_front/issues](https://github.com/Theeo96/moment_front/issues)
3. **Verify Requirements**: Ensure you meet all system requirements listed above
4. **Update Dependencies**: Try updating to the latest compatible versions
5. **Clean Install**: Perform a fresh clone and installation in a new directory

---

## 📚 Additional Resources

- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **React Documentation**: [https://react.dev](https://react.dev)
- **Tailwind CSS**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Radix UI**: [https://www.radix-ui.com](https://www.radix-ui.com)
- **TypeScript**: [https://www.typescriptlang.org/docs](https://www.typescriptlang.org/docs)
- **HTP Test Information**: Research materials on House-Tree-Person psychological assessment

### API Configuration

For detailed information about backend API configuration and CI/CD environment setup, see:
- `frontend/README_API.md` - Comprehensive API configuration guide

---

## 📝 License

Please refer to the repository license file for usage rights and restrictions.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

**Built with ❤️ by the moment team**
