# Foundation Two: Building Your First AI Workflow

**Date:** TBD | 7:00 PM EST
**Duration:** 60 Minutes | Live on Zoom
**Prerequisite:** Foundation One (Claude Code installed, IDE open, first prompt complete)
**Overview:** Connect external tools, build a real project live, and write your first Claude Code skill from scratch.

---

## Part 1: Connecting the Pipes

### Quick Recap (3 min)

- Foundation One: You set up the workshop — IDE, files, folders, Claude Code
- Foundation Two: Now you put it to work — real tools, real builds, real automation
- **Mindset Shift:** You're not learning to code. You're learning to direct.

---

### Section 1: How Claude Talks to the Outside World (8 min)

- Claude Code doesn't just read files — it can reach external services
- **Three Connection Types:**
  1. **APIs** — Claude sends requests to other platforms (like ordering from a menu)
  2. **MCP Servers** — Pre-built bridges that let Claude talk to tools like Notion, Airtable, Google Calendar
  3. **CLI Tools** — Command-line utilities Claude runs directly in your terminal
- **Analogy:** Your workshop now has delivery trucks. Claude can send materials out and bring supplies in.

### Section 2: Tools You'll Actually Use (7 min)

| Tool | What It Does | Real Example |
|------|-------------|--------------|
| Vercel | Puts your project on the internet | Deploy a landing page in 30 seconds |
| Supabase | Stores and retrieves data | Save form submissions from a website |
| GitHub | Saves versions of your work | Never lose progress, collaborate safely |
| Notion | Task and content management | Create tasks from Claude's output |
| Google Drive | File storage and sharing | Sync project files automatically |

- **Key Insight:** You don't need to learn these tools deeply. You need to know they exist and tell Claude to use them.

### Section 3: Live Setup — Adding Your First Tool (7 min)

- **Vercel Setup:**
  - Step 1: Create free account at vercel.com
  - Step 2: Install Vercel CLI — `npm install -g vercel`
  - Step 3: Login — `vercel login`
  - Step 4: Deploy — tell Claude "deploy this folder to Vercel"
- **What Just Happened:** Your local folder is now a live website. Claude did the deployment.

---

## Live Demonstrations

### Demo 1: Build & Deploy a Personal Landing Page (12 min)

- **Prompt:** "Create a simple personal landing page with my name, a short bio, and links to my social profiles. Make it look clean and modern. Then deploy it to Vercel."
- Claude writes HTML/CSS, creates the file, and deploys — all from one conversation
- **Key Insight:** You went from empty folder to live website without writing a single line of code

### Demo 2: Build a Simple Data Collector (10 min)

- **Prompt:** "Create a page where someone can enter their name and email to RSVP for an event. Save the submissions to Supabase. Deploy it."
- Claude creates the form, connects it to a database, and deploys
- **Three Things Built:** Frontend (what people see) + Backend (where data goes) + Deployment (live on the internet)
- **Key Insight:** This is a workflow. Input → Processing → Storage → Output. Every business tool follows this pattern.

---

## Part 2: Writing Your First Skill

### Why Skills Matter Now (3 min)

- In Foundation One, you learned what skills are
- Now you've seen Claude build real things — but you had to explain every step
- A skill means you explain it once, then it's a single command forever
- **The Jump:** From "do this specific thing" to "I have a button for that"

### Anatomy of a Skill File (8 min)

```
---
name: my-first-skill
description: What this skill does in one line
---

## Instructions

Step-by-step directions Claude follows every time this skill runs.
```

- **Three Parts:**
  1. **Frontmatter** — The label on the recipe card (name + description)
  2. **Instructions** — The recipe steps Claude follows
  3. **Examples** — Sample inputs/outputs so Claude knows what "done" looks like

- **Where Skills Live:** `~/.claude/skills/` — Claude checks this folder automatically

### Live Build: Your First Skill (10 min)

- **Skill:** `/organize-notes` — Takes a messy folder of text files and organizes them by topic
- **Step-by-step:**
  1. Create the skill file: `~/.claude/skills/organize-notes.md`
  2. Write the frontmatter (name + description)
  3. Write the instructions:
     - Read all files in the current folder
     - Identify topics based on content
     - Create subfolders by topic
     - Move and rename files logically
     - Generate a summary of what changed
  4. Save and test: Type `/organize-notes` in Claude Code
- **Before & After:** Same messy folder from Foundation One — now cleaned up with one command instead of a full prompt

### Skill Design Principles (5 min)

- **Be Specific:** "Organize files" is vague. "Read all .txt and .md files, group by topic, create subfolders, rename with topic prefix" is a skill.
- **Include Guardrails:** Tell Claude what NOT to do (don't delete files, don't rename the root folder)
- **Test with Edge Cases:** What if the folder is empty? What if there's only one file?
- **Iterate:** Your first version won't be perfect. Run it, see what Claude does wrong, update the instructions.

---

## Part 2B: Skill Thinking — Seeing Automation Everywhere

### The Skill Audit (5 min)

- Look at your last week of work
- **Ask three questions:**
  1. What did I explain to Claude more than once?
  2. What took more than 5 steps?
  3. What do I wish was one click?
- Each answer is a skill waiting to be built

### Industry Skill Blueprints

| Industry | Skill | What It Does |
|----------|-------|-------------|
| Real Estate | `/listing-page` | Photos + details → deployed property page |
| Marketing | `/weekly-content` | One topic → blog post + 5 social posts + email draft |
| Finance | `/expense-report` | Bank CSV → categorized report with totals |
| Church | `/sermon-package` | Transcript → sermon notes + quotes + social graphics prompt |
| Coaching | `/session-recap` | Meeting notes → client summary + action items + follow-up email |
| E-Commerce | `/product-launch` | Product info → listing page + email announcement + social posts |

---

## Wrap-Up & Q&A (5 min)

- **Recap:**
  - Connected external tools (Vercel, Supabase)
  - Built and deployed two real projects from prompts
  - Wrote and tested your first Claude Code skill
  - Learned to spot skill opportunities in any workflow
- **Homework:**
  1. Deploy one thing to Vercel (anything — even a "Hello World" page)
  2. Write one skill that solves a real problem in your work
  3. Run it three times and improve the instructions each time
- **Next Session Preview:** MCP servers, multi-step workflows, and building your first AI-powered business tool
- **Q&A:** Open floor

---

## Foundation Two Cheat Sheet

### Commands to Remember

| Command | What It Does |
|---------|-------------|
| `vercel` | Deploy current folder to the internet |
| `vercel login` | Connect your Vercel account |
| `/skill-name` | Run a Claude Code skill |
| `claude` | Start Claude Code in terminal |

### Skill Template (Copy & Paste Starter)

```markdown
---
name: skill-name-here
description: One line explaining what this skill does
---

## Context
[What this skill is for and when to use it]

## Instructions
1. [First step Claude should take]
2. [Second step]
3. [Third step]
4. [Continue as needed]

## Rules
- [What Claude should NOT do]
- [Constraints and guardrails]

## Output
[What the final result should look like]
```
