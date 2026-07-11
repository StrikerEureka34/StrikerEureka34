# Profile README: Terminal Minimal Redesign

**Date:** 2026-07-11
**Status:** Approved by user (with resume alignment requested)
**Goal:** Simplify the GitHub profile README into a clean, minimal page aimed at GSoC mentors and open source org maintainers. Content should match the 2026 resume, read like a human wrote it, and contain no em dashes anywhere.

## Problem

The current README has about 10 visual sections: typing header, badges, 16 skill icons, a projects table, snake animation, streak card, 2 stat cards, a highlights block, and a footer. It reads as cluttered and leads with decorative stats instead of real work. The strongest material is missing entirely: Ayush is currently an LFX Mentee at CNCF / krkn-chaos (mentored by Red Hat engineers, 12+ PRs merged upstream) and has a research paper under review. Neither appears in the README.

## Audience

GSoC mentors and open source maintainers. They skim fast and want evidence of real contributions to real ecosystems. Stat cards, streaks, and view counters read as noise.

## Positioning (from resume)

The resume leads with "building production automation and developer tooling: GitHub Actions pipelines, LLM-powered bots, and Python systems shipped to real repos", with ML/CV as the second pillar. The README tagline follows the same order.

## Design

Rewrite `README.md` into 5 sections, roughly 60 lines. Keep the terminal aesthetic (typing SVG header, `$ command` style section headers) and the snake animation. Cut everything decorative. Wording rules: plain human sentences, no buzzword stacking, no em dashes (use commas, periods, or middots instead).

### Section 1: Header

- Typing SVG (JetBrains Mono, existing style): `ayush@github ~ $ whoami` plus a second line matching the new tagline
- `# Ayush Kumar`
- Tagline: developer tooling and automation, ML and computer vision
- One education line: B.Tech CS (AI and ML) at MIT Manipal, B.S. Data Science at IIT Madras
- 3 contact badges: LinkedIn, Gmail, GitHub
- Cut: profile views counter, standalone credentials block

### Section 2: `$ ls open-source/` (new, placed first)

Short linked list. Lead entry gets two lines because it is the strongest signal:

- **LFX Mentee, CNCF / krkn-chaos** (Jun 2026 to present): building the Automated Documentation Sync Bot, a GitHub Action plus LLM agent that turns merged upstream PRs into draft docs PRs. Mentored by Red Hat engineers, 12+ PRs merged upstream. Links to `krkn-docs-bot` (18 stars).
- `kubeedge-edge-llm-inference-demo`: edge LLM inference demo on KubeEdge (CNCF)

### Section 3: `$ ls research + projects/`

Plain linked list, one line each:

- `Dynamic-Keystrokes-Pure-ML-Approach`: adversarial robustness benchmark for keystroke authentication, built at IIT Jodhpur, paper under review
- `Automatic-Expense-Tracker` (AutoFlow): Android app that auto-captures spend from payment notifications and receipts, ML Kit plus vision LLMs
- `3D-Object-Classification`: 3D deep learning on ModelNet40
- `Rehab-AI`: pose estimation for physiotherapy guidance

### Section 4: `$ watch contributions`

Snake animation image, unchanged (served from the `output` branch by `.github/workflows/snake.yml`).

### Section 5: Footer

- One plain text skills line: Python, Go, PyTorch, OpenCV, GitHub Actions, Docker, Kubernetes, AWS
- One line status: currently LFX Mentee at CNCF and SWE Intern at Kenvue
- No separate achievements section. Adobe hackathon and NDA are resume material, not README material, unless the user asks to keep them.

### Cut entirely

16 skill icons (skillicons.dev), streak stats card, both github-profile-summary-cards, the `highlights.txt` code block, the komarev view counter, the CGPA lines.

## Repo cleanup

Delete unused auto-updater leftovers: `updater.js`, `write_readme.py`, `template.svg`, `package.json`. Before deleting, verify nothing references them, in particular that no GitHub Actions workflow invokes them. `.github/workflows/snake.yml` stays untouched.

## Out of scope

- No changes to the snake workflow or any GitHub Actions
- No changes to pinned repos or other GitHub settings (suggested to the user separately, done manually)

## Success criteria

- README renders cleanly on GitHub in dark and light themes with 5 sections
- Zero em dashes in the rendered README
- All repo links resolve
- Snake animation still displays
- No references to deleted files remain in the repo
