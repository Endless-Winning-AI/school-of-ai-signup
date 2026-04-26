# Foundation One: Setting Up Your AI Workshop

**Date:** March 19, 2026 | 7:00 PM EST
**Duration:** 60 Minutes | Live on Zoom
**Overview:** Introduction to IDE fundamentals, file/folder organization, and Claude Code capabilities.

---

## Part 1: Your AI Workshop

### Three Things You Need

1. **Claude Code** — Your AI assistant. Lives inside the IDE, reads files, writes code, runs commands from a single prompt.
2. **The IDE** — Integrated Development Environment. The shared workspace where you and AI see the same files.
3. **Files & Folders** — Your project structure. Claude can only work with what's in the open folder.

---

### Section 1: What Is an IDE? (8 min)

- IDEs aren't just for developers
- **File Explorer (Sidebar):** Left panel for project navigation
- **Terminal (Center Area):** Main workspace for Claude Code conversation
- IDEs to know: Zed (Mac), Cursor (Mac + Windows), Antigravity, VS Code (Mac + Windows)

### Section 2: Folders & Files — How Claude Sees Projects (7 min)

- Project folders = containers ("everything you need is in here")
- Subfolders for organization
- File types: `.txt`, `.html`, `.md`, `.csv`
- **Critical Mistake:** Asking Claude about files it can't see — if it's not in the folder, it's not on the workbench

### Section 3: Live Setup — Building Your Workshop (10 min)

- **Step 1: Account Setup** — Claude Pro ($20/mo) or Max ($100/mo) at claude.ai
- **Step 2: Node.js Installation** — Visit nodejs.org, click LTS (green button), verify with `node --version`
- **Step 3: Claude Code Installation** — `npm install -g @anthropic-ai/claude-code`
- **Step 4: IDE Download** — Zed, Antigravity, Cursor, or VS Code
- **Step 5: Launch Claude Code** — Open folder → Terminal (`Ctrl + backtick`) → type `claude`
- **Step 6: First Prompts**
  - "What files are in this folder and what are they about?"
  - "Organize these files into folders by topic and rename them"

---

## Live Demonstrations

### Demo 1: Messy Folder Cleanup

- **Prompt:** "Look at all the files in this folder, organize them by topic into subfolders, and rename them so they make sense"
- Claude reads files, creates categorized subfolders, renames items logically

### Demo 2: Website Scrape & Rebuild

- Claude downloads website content/assets, creates HTML files mirroring original site
- **Key Insight:** "Claude isn't just answering questions. It's reading, writing, and building things."

---

## Part 2: Claude Skills

### Tool Ecosystem Overview

| Tool | Purpose |
|------|---------|
| IDE | Workspace environment |
| Claude Code | AI assistant for files & commands |
| Vercel | Deployment & hosting |
| Supabase | Database for persistent data |
| Node.js | Runtime environment |
| Git + GitHub | Version control |

### What Are Claude Skills? (10 min)

- Reusable instruction sets that eliminate repetitive explanations
- **Before Skills:** Multi-step manual instructions every time
- **After Skills:** Single command (e.g., `/create-social-post`)
- **Analogy:** A recipe — written once, executed consistently

### How Skills Work (8 min)

1. User types command (`/skill-name`)
2. Claude reads pre-written instructions
3. Claude executes steps sequentially
4. Consistent output delivered

### Spotting Skill Opportunities (7 min)

- **Signal 1 — Repetition:** Same instructions repeated = skill candidate
- **Signal 2 — Complexity:** 10-step recurring process = automation target
- **Signal 3 — Desire:** Wanting one-click functionality = skill indicator

**Industry Examples:**

| Industry | Skill | Input |
|----------|-------|-------|
| Real Estate | `/generate-listing` | Photos + details |
| Marketing | `/create-social-post` | Blog articles |
| Finance | `/categorize-transactions` | Bank CSVs |
| Church | `/publish-sermon-notes` | Transcripts |
| Coaching | `/write-followup-email` | Session notes |

---

## Wrap-Up & Q&A (5 min)

- **Recap:** Core concepts covered
- **Homework:** Install Claude Code, open a folder, ask one question
- **Next Session Preview:** Tool integration, live builds, first skill creation
- **Q&A:** Open floor
