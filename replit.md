# Dragon Tiger Casino Game

## Overview

This is a browser-based Dragon Tiger card game - a popular casino betting game where players wager on which side (Dragon or Tiger) will receive the higher card, or if the cards will tie. The application features a mobile-first design with a fixed aspect ratio, real-time betting mechanics, animated visual feedback, and a casino-style aesthetic with vibrant gradients and glowing effects.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing (alternative to React Router)

**UI Component Strategy**
- Shadcn UI component library with Radix UI primitives for accessible, headless components
- Tailwind CSS for utility-first styling with custom design tokens
- Fixed 16:9 aspect ratio scaling system using a responsive container that maintains proportions across all screen sizes
- Mobile-first design approach with desktop scaling handled by transform calculations

**State Management**
- React Context API (GameManagerContext) for global game state including balance, bets, and round data
- TanStack Query (React Query) for server state management and data fetching
- Local component state (useState/useEffect) for UI interactions and animations

**Design System**
- Custom HSL-based color system supporting light/dark modes
- Casino aesthetic with gradient backgrounds, glow effects, and premium visual treatments
- Percentage-based positioning for responsive scaling within the game container
- Animation system using CSS transforms and transitions for coin animations, card flips, and visual feedback

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- RESTful API design with `/api/*` route prefix
- Session-based architecture prepared for user authentication

**Database Layer**
- Drizzle ORM for type-safe database queries
- PostgreSQL database (via Neon serverless driver)
- Schema-first design with Zod validation integration
- Migration system using drizzle-kit

**Data Models**
- User authentication schema (username/password)
- Game rounds with card data and winner tracking
- Bet recording system for Dragon/Tiger/Tie wagers

**API Design**
- POST `/api/round/result` - Determines round winner based on bet distribution and generates appropriate card outcomes
- Game logic implements a "house edge" system where the winner is determined by the betting area with the lowest total bets
- Card generation ensures outcomes match the determined winner (higher card value for winner, same value for tie)

### Game Logic & Rules

**Round Phases**
- 15-second betting phase where players place wagers
- 10-second revealing phase with sequential card flip animations
- Automatic round cycling with balance updates and bet clearing

**Betting Mechanics**
- Five chip denominations: 10, 50, 100, 500, 10,000
- Three betting areas: Dragon, Tiger, Tie
- Visual feedback with coin animations flying to betting areas
- Real-time bet total displays and balance tracking
- Border highlighting on active betting areas

**Card System**
- Standard 52-card deck with SVG-based card graphics
- Card values determine winner (Ace=1, 2-10=face value, J=11, Q=12, K=13)
- 3D flip animations during reveal phase
- Winner highlighting with glow effects

## External Dependencies

### Core Libraries
- **@tanstack/react-query** (v5.60.5) - Server state management and data fetching
- **drizzle-orm** (v0.39.1) - TypeScript ORM for database operations
- **drizzle-zod** (v0.7.0) - Zod schema integration for Drizzle
- **@neondatabase/serverless** (v0.10.4) - Serverless PostgreSQL driver

### UI Component Libraries
- **Radix UI** - Headless UI primitives (@radix-ui/react-* packages)
- **shadcn/ui** - Pre-built component patterns using Radix primitives
- **tailwindcss** - Utility-first CSS framework
- **class-variance-authority** (v0.7.1) - Component variant management
- **clsx** & **tailwind-merge** - Conditional className utilities

### Form & Validation
- **react-hook-form** - Form state management
- **@hookform/resolvers** (v3.10.0) - Validation resolver integration
- **zod** - Schema validation library

### Development Tools
- **vite** - Build tool and dev server
- **tsx** - TypeScript execution for Node.js
- **esbuild** - JavaScript bundler for production builds
- **@replit/vite-plugin-*** - Replit-specific development plugins

### Database & Session
- **connect-pg-simple** (v10.0.0) - PostgreSQL session store for Express
- **PostgreSQL** - Primary database (configured via DATABASE_URL environment variable)

### Utilities
- **date-fns** (v3.6.0) - Date manipulation library
- **lucide-react** - Icon library
- **react-icons** - Additional icon sets
- **embla-carousel-react** (v8.6.0) - Carousel/slider functionality
- **vaul** - Drawer component library