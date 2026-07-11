# Profile README Minimal Rewrite Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `README.md` into the 5-section terminal-minimal layout described in the spec, and remove unused auto-updater leftover files.

**Architecture:** This is a content change, not a software change. There is no test suite to drive with TDD; "verification" here means rendering checks (grep for banned content, confirm links resolve, confirm no dangling file references) instead of unit tests. Work happens directly on `main` in the existing working directory (no worktree needed, this is a single markdown file plus four deletions, low risk, easily reverted with git).

**Tech Stack:** Plain Markdown + inline HTML (GitHub-flavored), no build step. Existing `.github/workflows/snake.yml` is unmodified.

**Spec:** `docs/superpowers/specs/2026-07-11-profile-readme-minimal-design.md`

**Wording rules (apply to every edit and every commit message in this plan):** No em dashes anywhere. No `Co-Authored-By` trailer, no `Signed-off-by` trailer. Plain, human sentences.

---

## Chunk 1: Rewrite README.md

### Task 1: Replace header section (typing SVG, name, tagline, education, contact badges)

**Files:**
- Modify: `README.md:1-21`

- [ ] **Step 1: Read current README.md in full**

Confirm current line numbers still match (the file may have shifted since the spec was written). Use the Read tool on `README.md`.

- [ ] **Step 2: Replace lines 1-21 with the new header block**

```markdown
<div align="center">

  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=13&duration=3000&pause=1000&color=58A6FF&center=true&vCenter=true&multiline=true&repeat=false&width=560&height=80&lines=ayush%40github+~+%24+whoami;dev+tooling+%2B+automation+%7C+ML+%2F+CV" alt="typing" />

</div>

<h1 align="center">Ayush Kumar</h1>

<p align="center">Developer tooling and automation &nbsp;&#183;&nbsp; ML &amp; computer vision</p>

<p align="center">
  B.Tech CS (AI &amp; ML) @ <strong>MIT Manipal</strong> &nbsp;&#183;&nbsp; B.S. Data Science @ <strong>IIT Madras</strong>
</p>

<p align="center">
  <a href="https://linkedin.com/in/ayush-kumar-607a382a5"><img src="https://img.shields.io/badge/-ayush--kumar-0A66C2?style=flat&logo=linkedin&logoColor=white"/></a>&nbsp;
  <a href="mailto:nayush2001@gmail.com"><img src="https://img.shields.io/badge/-nayush2001-EA4335?style=flat&logo=gmail&logoColor=white"/></a>&nbsp;
  <a href="https://github.com/StrikerEureka34"><img src="https://img.shields.io/badge/-StrikerEureka34-181717?style=flat&logo=github&logoColor=white"/></a>
</p>

<br/>
```

Use the Edit tool with the exact old text read in Step 1 as `old_string`.

- [ ] **Step 3: Verify no em dashes were introduced**

Run: `grep -n $'\xe2\x80\x94' README.md` (searches for the em dash character U+2014)
Expected: no output (no matches)

If your grep tool doesn't handle the raw byte well, use the Grep tool with pattern `—` instead.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "rewrite readme header, drop view counter and credentials block"
```

---

### Task 2: Add "$ ls open-source/" section (replaces old skills section)

**Files:**
- Modify: `README.md` (the `### \`$ ls /skills\`` section and its skillicons block)

- [ ] **Step 1: Replace the skills section with the open-source section**

Find the block starting at `### \`$ ls /skills\`` through the closing `</div>` before the projects section, and replace it with:

```markdown
### `$ ls open-source/`

**[krkn-docs-bot](https://github.com/StrikerEureka34/krkn-docs-bot)**, LFX Mentee, CNCF / krkn-chaos (Jun 2026, present)
Automated Documentation Sync Bot: a GitHub Action plus LLM agent that turns a merged upstream PR into a draft docs PR. Mentored by Red Hat engineers on the krkn-chaos team, 12+ PRs merged upstream so far.

**[kubeedge-edge-llm-inference-demo](https://github.com/StrikerEureka34/kubeedge-edge-llm-inference-demo)**
Edge native LLM inference demo built for KubeEdge (CNCF).

<br/>
```

Do not render the star count anywhere; it was context for the spec only, not README content.

- [ ] **Step 2: Verify links resolve**

Run: `curl -s -o /dev/null -w "%{http_code}\n" https://github.com/StrikerEureka34/krkn-docs-bot` and the same for `kubeedge-edge-llm-inference-demo`.
Expected: `200` for both.

- [ ] **Step 3: Verify no em dashes**

Run: `grep -n $'\xe2\x80\x94' README.md`
Expected: no output. If any appear (the section above uses a literal em dash character as a visual separator between title and role in the first bullet), replace it with a comma or a line break instead. Use a plain hyphen-minus or restructure the sentence instead of an em dash anywhere in the actual file.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "add open-source section, cncf lfx mentorship leads the readme"
```

---

### Task 3: Replace projects table with "$ ls research + projects/" list

**Files:**
- Modify: `README.md` (the `### \`ls projects/\`` table section)

- [ ] **Step 1: Replace the `<table>` projects block**

```markdown
### `$ ls research + projects/`

**[Dynamic-Keystrokes-Pure-ML-Approach](https://github.com/StrikerEureka34/Dynamic-Keystrokes-Pure-ML-Approach)**
Adversarial robustness benchmark for keystroke dynamics authentication, built during a research internship at IIT Jodhpur. Paper under review.

**[Automatic-Expense-Tracker](https://github.com/StrikerEureka34/Automatic-Expense-Tracker)**
Android app that auto-captures spend from payment app notifications and receipt OCR, using ML Kit and vision LLMs.

**[3D-Object-Classification](https://github.com/StrikerEureka34/3D-Object-Classification)**
3D deep learning on the ModelNet40 dataset.

**[RehabAi](https://github.com/StrikerEureka34/RehabAi)**
Pose estimation for physiotherapy guidance.

<br/>
```

Note: the actual GitHub repo is named `RehabAi` (not `Rehab-AI` as in the spec draft); confirm the exact casing against `curl` before committing.

Note: the spec mentions `AutoFlow` as a nickname for Automatic-Expense-Tracker. It's deliberately omitted here to keep the line short; the repo name and description carry the same information.

- [ ] **Step 2: Verify all four links resolve**

Run for each of the four repo URLs above:
`curl -s -o /dev/null -w "%{http_code} %{url_effective}\n" <url>`
Expected: `200` for each. If a URL 404s, check the exact repo name from the earlier `git ls-files`/API listing in this conversation and correct the link before proceeding.

- [ ] **Step 3: Verify no em dashes**

Run: `grep -n $'\xe2\x80\x94' README.md`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "replace projects table with plain research and projects list"
```

---

### Task 4: Make the snake embed theme aware, remove stats/streak/highlights sections

**Files:**
- Modify: `README.md` (the `$ watch contributions` section through the old `cat highlights.txt` and footer sections)

- [ ] **Step 1: Replace the snake embed with a `<picture>` element**

Replace:
```markdown
### `$ watch contributions`

<div align="center">
  <img src="https://raw.githubusercontent.com/StrikerEureka34/StrikerEureka34/output/github-contribution-grid-snake-dark.svg" alt="snake" />
</div>
```

with:
```markdown
### `$ watch contributions`

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/StrikerEureka34/StrikerEureka34/output/github-contribution-grid-snake-dark.svg" />
    <img src="https://raw.githubusercontent.com/StrikerEureka34/StrikerEureka34/output/github-contribution-grid-snake.svg" alt="snake" />
  </picture>
</div>
```

- [ ] **Step 2: Delete the streak-stats, summary-cards, and highlights.txt sections entirely**

Remove the `### \`git log --stat\`` heading and both image blocks under it (streak-stats and github-profile-summary-cards), and the `### \`cat highlights.txt\`` code block, in full.

- [ ] **Step 3: Replace the old footer with the new plain footer**

Replace the trailing `<div align="center"><sub>Currently exploring...</sub></div>` block with:

```markdown
### `$ cat skills.txt`

Python, Go, PyTorch, OpenCV, GitHub Actions, Docker, Kubernetes, AWS

<br/>

<div align="center">
  <sub>Currently: LFX Mentee at CNCF / krkn-chaos, and Software Engineering Intern at Kenvue.</sub>
</div>
```

- [ ] **Step 4: Verify the deleted image URLs no longer appear**

Run: `grep -n "streak-stats\|summary-cards\|komarev\|skillicons" README.md`
Expected: no output.

- [ ] **Step 5: Verify no em dashes**

Run: `grep -n $'\xe2\x80\x94' README.md`
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add README.md
git commit -m "make snake embed theme aware, drop stat cards and highlights block"
```

---

### Task 5: Full-file review pass

**Files:**
- Review: `README.md` (entire file)

- [ ] **Step 1: Read the full final README.md**

Use the Read tool on the whole file.

- [ ] **Step 2: Confirm structure matches the spec's 5 sections**

Header, `$ ls open-source/`, `$ ls research + projects/`, `$ watch contributions`, `$ cat skills.txt` + status line. No leftover sections from the old version.

- [ ] **Step 3: Confirm zero em dashes in the whole file**

Run: `grep -c $'\xe2\x80\x94' README.md`
Expected: `0`

- [ ] **Step 4: Spot check wording reads as human, not buzzword-stacked**

Read the tagline, the open-source section, and the footer status line out loud (mentally). No sentence should be a stack of 3+ nouns with no verb connecting them.

- [ ] **Step 5: No commit needed for this task** (review only; if issues found, fix and commit as a follow-up "polish readme wording" commit)

---

## Chunk 2: Repo cleanup

### Task 6: Confirm the four leftover files are truly unreferenced, then delete them

**Files:**
- Delete: `updater.js`
- Delete: `write_readme.py`
- Delete: `template.svg`
- Delete: `package.json`

- [ ] **Step 1: Grep the whole repo for references to each filename**

Run: `grep -rn "updater.js\|write_readme.py\|template.svg" --include="*.yml" --include="*.yaml" --include="*.md" --include="*.json" .`
Expected: matches only inside the files themselves (e.g. `package.json` referencing `updater.js` in its own `scripts` block) and inside the spec/plan docs under `docs/`. No matches inside `.github/workflows/`.

- [ ] **Step 2: Confirm `.github/workflows/snake.yml` does not invoke any of these files**

Already read in this session; it only uses `Platane/snk@v3` and `crazy-max/ghaction-github-pages@v3`. No `node`, `python`, or script-invoking steps. Re-read the file if it has changed since this plan was written.

- [ ] **Step 3: Delete the four files**

```bash
git rm updater.js write_readme.py template.svg package.json
```

- [ ] **Step 4: Verify they are gone and nothing else broke**

Run: `git status`
Expected: four deletions staged, no other files touched.

- [ ] **Step 5: Commit**

```bash
git commit -m "remove unused auto-updater scripts, readme is now static markdown"
```

---

## Chunk 3: Final verification against spec success criteria

### Task 7: Verify against the spec's success criteria

**Files:** none (verification only)

- [ ] **Step 1: Confirm README renders with 5 sections**

Already confirmed in Task 5.

- [ ] **Step 2: Confirm zero em dashes in the rendered README**

Run: `grep -c $'\xe2\x80\x94' README.md`
Expected: `0`

- [ ] **Step 3: Confirm all repo links resolve**

Re-run the curl checks from Tasks 2 and 3 against the final file state (extract every `https://github.com/StrikerEureka34/...` URL from `README.md` and curl each).

- [ ] **Step 4: Confirm the snake animation still displays**

Open `https://github.com/StrikerEureka34/StrikerEureka34` in a browser (or `curl -I` the two raw SVG URls from the `output` branch) and check both return `200`.

- [ ] **Step 5: Confirm no dangling references to deleted files**

Run: `grep -rn "updater.js\|write_readme.py\|template.svg\|package.json" README.md .github/`
Expected: no output.

- [ ] **Step 6: Push and open the live profile page to eyeball it**

```bash
git push origin main
```

Then visit `https://github.com/StrikerEureka34` and confirm, in both GitHub's light and dark theme toggle: all 5 sections are visible, no image shows a broken-image icon, and the snake grid is visible and uses the palette matching the active theme.

No commit needed for this task (verification and push only).
