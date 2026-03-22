# Project - Enterprise SaaS Workflow Automation Platform

A comprehensive high-fidelity design mockup for an enterprise SaaS workflow automation platform with dual theme support (Deep Violet Dark Mode and Crisp Violet Light Mode).

## Features

### Landing Page
- **3D Knowledge Net Visualization**: An animated, isometric representation of interconnected data nodes
- **Hero Section**: Compelling headline and call-to-action
- **Integration Showcase**: Display of Slack, GitHub, and Jira integrations
- **Feature Cards**: Three core features highlighted

### Dashboard
- **Interactive Decision Flow Canvas**: React Flow-based graph visualization showing decision paths
- **Automated Post-Mortem Sidebar**: Structured incident analysis using Five Whys methodology
- **Shadow Decision Detection**: AI-powered toast notifications for undocumented decisions
- **Real-time Updates**: Animated nodes and edges with violet glow effects

## Theme System

### Electric Violet Theme
- **Primary Color**: `#510399` - Electric Violet
- **Light Mode**: Crisp white background with subtle violet tints
- **Dark Mode**: Deep violet-black background (`#0a0012`)
- **Glow Effects**: Dynamic shadow and glow effects on interactive elements

### Design Philosophy
- Sophisticated and contrasting aesthetics
- Balanced minimalism with depth and subtle shadows
- Consistent violet accent throughout the application

## Tech Stack

- **React 18.3.1** - UI framework
- **React Router 7.13.0** - Navigation and routing
- **ReactFlow 11.11.4** - Interactive decision flow graphs
- **Motion (Framer Motion) 12.23.24** - Smooth animations
- **next-themes 0.4.6** - Dark/light mode support
- **Tailwind CSS 4.1.12** - Utility-first styling
- **Lucide React** - Icon system

## Key Components

- `Landing` - Hero page with 3D Knowledge Net
- `Dashboard` - Main product UI with decision flow
- `KnowledgeNet` - 3D canvas visualization
- `PostMortemSidebar` - Five Whys analysis panel
- `ShadowDecisionToast` - Notification system
- `ThemeToggle` - Dark/light mode switcher

## Running the Application

The application uses Vite for development and building:

```bash
# Build the application
npm run build
```

## Color Variables

The application uses CSS custom properties for theming:

- `--violet`: Primary violet color
- `--violet-light`: Lighter violet for highlights
- `--violet-dark`: Darker violet for depth
- `--violet-glow`: Rgba value for glow effects
- `--background-violet-tint`: Subtle background tint
- `--canvas-bg`: Canvas background color

## Features in Detail

### 1. Interactive Decision Flow
- Drag-and-drop node positioning
- Animated edge connections
- Violet-themed styling
- Mini-map for navigation
- Zoom and pan controls

### 2. Automated Post-Mortem
- Five Whys root cause analysis
- Event timeline visualization
- Automated recommendations
- Color-coded event types

### 3. Shadow Decision Detection
- Pulsing notification with violet glow
- LLM-powered recommendations
- One-click ticket creation
- Dismissible toast interface
