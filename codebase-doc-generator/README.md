# codebase-doc-generator Agent

Generates comprehensive interactive documentation websites for codebases, designed for learning and onboarding purposes.

## Overview

This agent creates a two-part system:
1. A prebuilt TypeScript static documentation website (Vite + React) that renders structured content
2. An intelligent agent that analyzes codebases and generates the content files the website consumes

The generated documentation includes:
- Project overview and statistics
- Technology stack breakdown
- Architecture diagrams and descriptions
- Component catalog with relationships
- Workflow/execution flow documentation
- Deep dives into key features with code examples
- Complete setup and usage guide

## Features

### Agent Capabilities
- 🔍 Full codebase analysis and structure mapping
- 📝 Automatic content generation following strict schemas
- 🎨 Automatic website dependency installation
- 🏗️ Static website build and optimization
- 🌐 Local development server with live preview
- 📦 Export built website for deployment

### Website Features
- 📱 Fully responsive design (desktop + mobile)
- 🌓 Dark/light mode support
- 📊 Interactive Mermaid diagram rendering
- 💅 Syntax-highlighted code examples
- 🔍 Full-text search across all documentation
- 🧭 Intuitive navigation between sections
- ⚡ Fast static build with Vite

## Usage

### Basic Usage
```
Generate documentation for this codebase
```

### Generate and Preview
```
Generate documentation and serve it locally
```

### Export for Deployment
```
Export the documentation to ./docs folder
```

## Directory Structure

```
codebase-doc-generator/
├── codebase-doc-generator.md       # Agent definition
├── README.md                       # This file
└── website/                        # Prebuilt documentation website
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── src/
    │   ├── App.tsx                 # Root application
    │   ├── main.tsx                # Entry point
    │   ├── components/             # Reusable UI components
    │   ├── pages/                  # Section pages
    │   ├── types/                  # TypeScript type definitions
    │   ├── utils/                  # Helper functions
    │   └── index.css               # Global styles
    └── public/
        └── content/                # Generated content (agent output)
            ├── metadata.json       # Project metadata
            ├── overview.md         # High-level overview
            ├── tech-stack.json     # Technology stack
            ├── architecture.json   # Architecture details
            ├── components.json     # Component catalog
            ├── workflows.json      # Workflow documentation
            ├── deep-dives.json     # Feature deep dives
            └── setup.md            # Setup guide
```

## Content Schema

All generated content follows strict schemas to ensure compatibility with the website. See `codebase-doc-generator.md` for complete schema specifications.

## Development

### Website Development
```bash
cd website
npm install
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run typecheck    # Run TypeScript checks
```

### Adding New Features
1. Update the type definitions in `src/types/index.ts`
2. Add content loader functions in `src/utils/contentLoader.ts`
3. Create new page components in `src/pages/`
4. Add navigation in `src/components/Sidebar.tsx`
5. Update routes in `src/App.tsx`
6. Update the agent definition to generate the new content type

## Technology Stack

### Website
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Mermaid** - Diagram rendering
- **React Syntax Highlighter** - Code highlighting
- **Lucide React** - Icon library
- **Marked** - Markdown parsing

### Agent
- **Glob/Grep** - Codebase scanning and analysis
- **Read/Write** - File operations
- **Bash** - Command execution for building website
- **WebSearch** - Supplementary project information

## License

MIT
