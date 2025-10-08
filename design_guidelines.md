# Dragon Tiger Game - Design Guidelines

## Design Approach
**Reference-Based Approach:** Casino/Gaming Application inspired by mobile casino games with a focus on vibrant visual feedback, immediate responsiveness, and entertainment value. The design prioritizes visual excitement while maintaining functional clarity for betting interactions.

## Core Design Principles
1. **Fixed Aspect Ratio Scaling:** All UI elements must scale proportionally within a 16:9 landscape container
2. **Visual Hierarchy:** Betting areas are the primary focus, with supporting elements (timer, trends, balance) positioned for quick reference
3. **Immediate Feedback:** Every interaction provides visual confirmation through animations and color changes
4. **Casino Aesthetic:** Rich gradients, glowing effects, and premium visual treatments create an engaging gambling atmosphere

## Color Palette

### Primary Colors (Dark Mode)
- **Background:** Pure black (#000000) for maximum contrast
- **Dragon Betting Area:** Deep indigo to blue gradient (from-indigo-900 to-blue-700)
- **Tiger Betting Area:** Deep red to yellow gradient (from-red-900 to-yellow-700)
- **Tie Betting Area:** Emerald to teal gradient (from-emerald-900 to-teal-700)

### Accent Colors
- **Gold/Yellow:** Border highlights (border-yellow-600, #5f5c07) for premium feel
- **Glow Effects:** Gold (#FFD700) for winning card animations
- **Orange Flames:** Tiger flame particles (rgba(255,140,0,0.8))

### Feedback Colors
- **Selected State:** Yellow glow (shadow-[0_0_10px_2px_rgba(255,255,0,0.7)])
- **Betting Totals:** Emerald with opacity (text-emerald-100/65)
- **Text Overlays:** Semi-transparent backgrounds (bg-opacity-40)

## Typography
- **Font Stack:** System default (Tailwind)
- **Betting Labels:** text-lg to text-xl, font-semibold, tracking-wide
- **Timer:** text-lg, font-bold, color #443001 (dark brown on clock)
- **Balance/Stats:** text-[15px], font-semibold
- **Trend Indicators:** text-[10px], font-bold

## Layout System
**Responsive Scaling Container:**
- Base container maintains 16:9 aspect ratio
- All child elements use percentage-based positioning (top, left, right, bottom, width, height)
- Spacing units: Use Tailwind classes that scale proportionally - gap-1, gap-2, p-1, p-2, m-2

**Key Positioning:**
- Dragon/Tiger creatures: top: 3-4%, left/right: 5%
- Timer: top: 29%, centered horizontally
- Cards: top: 15%, centered horizontally
- Tie betting: bottom: 38%, centered, width: 80%, height: 16%
- Dragon/Tiger betting: bottom: 13%, width: 39%, height: 24%

## Component Library

### Betting Areas
- **Rounded corners:** rounded-xl (12px)
- **Borders:** 2-4px solid borders with color-matched themes
- **Gradients:** Dual-tone bg-gradient-to-br for depth
- **Glow Effects:** -inset-4 blur-lg overlays with opacity-20
- **Interactive:** cursor-pointer with visual feedback

### Cards
- **Size:** 63px × 91px with perspective transforms
- **Animation:** 1s rotateY flip with preserve-3d
- **Winner Effect:** glowZoom animation (scale 1.09, gold drop-shadow)
- **Border radius:** 8px

### Chips
- **Size:** 36px × 36px (w-9 h-9)
- **Selected State:** 2px yellow border with glow shadow
- **Arrangement:** Horizontal row with gap-5 spacing

### Animations
- **Creature Float:** upDownImg 4s ease-in-out infinite (-20px translateY)
- **Flame Pulse:** flamePulse 4s ease-in-out (opacity 0.7-1)
- **Coin Fly:** 0.8s cubic-bezier trajectory with scale transforms
- **Card Flip:** 1s rotateY(180deg) with timing based on game phase

### Visual Effects
- **Flame Container:** 18% width, 15% height, bottom-positioned with particle system
- **Gradient Overlays:** Crosshatch patterns (45deg/-45deg) for texture
- **Text Shadows:** Multiple layers for depth (0 2px 5px colors)
- **Blur Backgrounds:** backdrop-blur or filter: blur(18px) for glows

## Accessibility & Responsiveness

### Viewport Management
- Container centers in viewport with letterboxing on oversized screens
- Minimum width: 329px to maintain usability
- Scales up/down based on available viewport while maintaining 16:9 ratio

### Interactive States
- Selected chip: 2px border + shadow glow
- Betting areas: Hover-ready (cursor-pointer) during betting phase
- Disabled state: Toast notifications prevent invalid interactions

### Text Readability
- High contrast text on gradient backgrounds
- Semi-transparent overlays (bg-opacity-40) for text containers
- Text shadows for separation from background

## Images & Assets
**Hero/Background:**
- Casino table image as full background (background-size: cover)

**Game Elements:**
- Dragon/Tiger creature PNGs with transparent backgrounds
- Playing cards: 52 individual SVGs + card back
- Betting chips: 5 denominations (10, 50, 100, 500, 10k) as PNGs
- Clock icon PNG for timer display

## Critical Implementation Notes
- All positioning must use percentages for scaling
- Font sizes scale with container using CSS transform
- Z-index layering: Creatures (20) > Betting areas (10) > Animations (1000)
- Maintain performance: Use CSS transforms over layout changes
- Preserve original visual design exactly - only add responsive wrapper