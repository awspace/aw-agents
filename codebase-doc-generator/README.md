# codebase-doc-generator Agent

A Claude Code agent that generates comprehensive interactive documentation websites for any codebase, designed for learning and onboarding purposes.

## ✨ Features
- 🔍 **Full codebase analysis** - Automatically scans and understands any codebase structure
- 📚 **Interactive documentation website** - Prebuilt Vite + React site with modern UI
- 🎨 **Diagram support** - Auto-generates and pre-renders Mermaid architecture diagrams
- 🔍 **Zoomable diagrams** - Click or press Zoom to view large diagrams full-screen in a popup
- ⬇️ **Download diagrams** - Download any diagram as SVG file to your computer
- 💻 **Syntax highlighting** - Beautiful code examples for key features
- 🌓 **Dark/light mode** - Comfortable viewing in any environment
- 📱 **Fully responsive** - Works on desktop, tablet, and mobile
- 📦 **Multi-documentation support** - Keep docs for all your projects in one place, no re-analysis needed
- ⚡ **Instant loading** - Pre-rendered content and diagrams for fast performance
- 🚀 **Zero setup** - Works out of the box after installation

## 🚀 Quick Start

### 1. Install the Agent
1. Clone or copy this repository to your Claude Code agents directory:
   ```bash
   git clone https://github.com/awspace/aw-agents.git
   cp -r aw-agents/codebase-doc-generator ~/.claude/agents/
   ```

2. **Fully quit and restart Claude Code** (Cmd+Q on Mac / Alt+F4 on Windows) to detect the new agent.

### 2. Generate Documentation
Open Claude Code in the root directory of the project you want to document, then run:
```
Use the codebase-doc-generator agent to generate documentation for this project and serve it locally
```

The agent will automatically:
- Scan and analyze your codebase
- Generate all structured content files
- Build the documentation website
- Start a local server at `http://localhost:3421/`
- Provide you with a clickable URL to view your documentation

## 📖 Usage Examples

### Basic Usage
```
Generate documentation for this codebase
```
Generates all content files but doesn't start the server.

### Generate and View
```
Generate documentation for this project and serve it locally
```
Generates content, builds the site, and starts a local server for immediate viewing.

### Export for Deployment
```
Generate documentation and export the built site to ./docs folder
```
Builds the static site and exports it to your specified directory for deployment to Vercel, Netlify, GitHub Pages, etc.

### Use Existing Documentation
If the agent detects existing documentation for your project, it will ask if you want to use the existing version or regenerate it, saving you time on re-analysis.

## 📁 What Gets Generated

The agent produces 8 structured content files that power the documentation website:

| File | Purpose |
|------|---------|
| `metadata.json` | Project name, description, statistics, generation date |
| `overview.md` | High-level project overview and goals |
| `tech-stack.json` | Complete breakdown of languages, frameworks, libraries, and tools |
| `architecture.json` | System architecture description + pre-rendered Mermaid diagrams |
| `components.json` | Catalog of all major components with responsibilities and relationships |
| `workflows.json` | Step-by-step execution flows and business processes |
| `deep-dives.json` | In-depth analysis of key features with code examples |
| `setup.md` | Complete installation, configuration, and usage guide |

## 🔧 Requirements
- Claude Code (latest version)
- Node.js 18+ (automatically installed by the agent on first run if missing)
- No other dependencies required - the agent handles all setup automatically

## 🗂️ Multi-Documentation Management
All your generated documentation is stored permanently in:
```
~/.claude/agents/codebase-doc-generator/website/public/docs/
```
Each project gets its own dedicated folder with a unique ID. You can:
- Switch between different project docs instantly using the dropdown selector in the website header
- Keep multiple versions of documentation as your codebase evolves
- Share entire doc folders with team members
- Delete old documentation sets you no longer need

## 🎯 Supported Languages & Frameworks
The agent works with any codebase, including but not limited to:
- **Languages**: Python, TypeScript/JavaScript, Go, Rust, Java, C#, Ruby, PHP
- **Frameworks**: React, Vue, Angular, Next.js, Django, Flask, FastAPI, Spring, Express
- **Architectures**: Monoliths, microservices, serverless, CLI tools, libraries

## 🐛 Troubleshooting

### Agent not detected after installation
- Make sure you copied the entire `codebase-doc-generator` folder to `~/.claude/agents/`
- Fully quit and restart Claude Code (closing the window isn't enough - use Cmd+Q / Alt+F4)
- Run `/agents` in Claude Code to see if it appears in the list

### Documentation website doesn't load
- Check that port 3421 is not being used by another application
- Verify the content symlink points to a valid doc set: `~/.claude/agents/codebase-doc-generator/website/public/content`
- Check the browser console for errors

### Diagrams don't render
- The agent pre-renders all diagrams to SVG for instant loading, so this shouldn't happen
- If you see errors, the agent will fall back to client-side rendering automatically

### Slow generation on first run
- The agent installs Node.js dependencies on first run only - subsequent runs are much faster
- Large codebases (>100k LOC) may take a few minutes to analyze fully

## 🤝 Contributing
Contributions are welcome! Some areas for improvement:
- Add support for more programming languages and frameworks
- Improve diagram generation accuracy
- Add search functionality across documentation
- Add export to PDF functionality
- Improve content generation quality

## 📝 Notes
- This agent is for **educational and documentation purposes only**
- All content generation happens locally on your machine
- No code is sent to external servers unless you use WebSearch functionality
- Generated documentation is stored locally and never uploaded anywhere

## 📄 License
MIT License - feel free to use this agent for personal or commercial projects.
