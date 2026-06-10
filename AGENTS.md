# AGENTS.md

## Project Context

This repository is a personal website project used as a learning path for a Java backend developer moving toward frontend, full-stack, and indie product development.

The current goal is not to generate a polished website all at once. The goal is to understand the full chain from local files to a deployed public website:

- HTML structure
- CSS layout and responsive design
- Basic JavaScript interactions
- Git and GitHub workflow
- Static site deployment
- Basic SEO

## Technical Boundaries

- First phase uses only native HTML, CSS, and JavaScript.
- Do not introduce React, Next.js, Vue, Tailwind, component libraries, site builders, blog themes, databases, auth, or build tooling unless the user explicitly asks.
- Keep the file structure simple until there is a clear need to split files further.
- Prefer readable, beginner-friendly code over clever abstractions.

## Collaboration Style

- The user has a Java backend background and is learning frontend concepts.
- Explain frontend concepts with backend analogies when useful.
- Do not generate large complete implementations immediately.
- Before editing code, explain the goal, scope, and concepts involved.
- Move one small module at a time, such as HTML structure, navigation CSS, card layout, responsive rules, or dark mode.
- After changing code, explain the important parts and provide a simple verification method.

## AI-Assisted Development Rules

- Treat Codex as a learning partner and implementation assistant, not a black-box code generator.
- The preferred workflow is:
  1. Clarify what this step is trying to achieve.
  2. Identify which files and concepts are involved.
  3. Make a small, focused change.
  4. Verify the result locally.
  5. Commit meaningful checkpoints with Git.
- When adding code, keep comments sparse and useful.
- When the user asks to learn, prioritize explanation and guided reading before optimization.

## Git Workflow

- Use `main` as the primary branch.
- Before making changes, check `git status`.
- After meaningful milestones, suggest a commit with a clear message.
- Do not rewrite history, reset, or discard changes unless the user explicitly asks.

## Current Site Structure

- `index.html` contains the page structure.
- `styles.css` contains the visual design, layout, and responsive rules.
- The first page has:
  - Header navigation
  - Hero section with self-introduction and tech stack
  - Projects section
  - Blog/build-log section
  - Footer with contact/about information
