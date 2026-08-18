# Project Submission Report

## 1. Student Details

- **Full Name:** Musila Ivan Muvane
- **GitHub Username:** IvanMusila - https://github.com/IvanMusila
- **Email:** ivanmusila@strathmore.edu

---

## 2. Deployed Project Link

- **Live GitHub Pages URL:** https://is-project-2026.github.io/savings-tracker-165992/

---

## 3. Reflection — Grounded in Your Git History

> **Rules:** Every answer below **must include a direct link** to the specific commit, PR, issue, or branch in your repository that demonstrates what you are describing. Answers without working links will not be graded. Generic explanations that could apply to any project will receive zero marks.
>
> **Marks:** A (2 marks) · B (1 mark) · C (1 mark) · D (1 mark) = **5 marks total**

### A. Your Best Commit

Paste the URL of the commit in your history that you think best demonstrates clean conventional commit practice (good type tag, clear subject, meaningful body or footer).

- **Commit URL:** https://github.com/IS-PROJECT-2026/savings-tracker-165992/commit/80f4688755037a2c982057c49400785426805ddd
- **Why this one?** This commit demonstrates a clear Conventional Commit message and is well-structured because it uses the standard feat: prefix to clearly categorize the update as a new feature. The commit message is also highly descriptive, immediately explaining exactly what functionality was added without requiring the reviewer to read the code.

<img width="1904" height="751" alt="image" src="https://github.com/user-attachments/assets/87f50e32-a4d1-4e76-9fc6-551fc96ca055" />


### B. A Mistake or Struggle

Link to a commit, PR, or issue where something went wrong — a bad commit message you had to fix, a branch you had to delete and recreate, a PR that needed rework, or a deployment that broke. 

- **Link to the evidence:** https://github.com/IS-PROJECT-2026/savings-tracker-165992/commit/c7dec7f5ffc0aa7065867905b108382523695e71
- **What happened and how did you recover?** My deployment to GitHub Pages failed repeatedly because of a VS Code credential helper conflict (ECONNREFUSED), which left a broken "ghost" gh-pages branch. I recovered by clearing the hidden node_modules/.cache/gh-pages folder, bypassing the local terminal entirely, and setting up a GitHub Actions workflow to handle the deployment automatically.

<img width="1899" height="971" alt="image" src="https://github.com/user-attachments/assets/48065e59-e29a-43c3-b6c2-8b75fe9c857d" />

### C. A Pull Request You're Proud Of

Paste the URL of the PR that best shows your self-review process — one where the description is clear, the issue linkage is correct, and the diff tells a coherent story.

- **PR URL:** https://github.com/IS-PROJECT-2026/savings-tracker-165992/pull/17
- **What did you check before merging?** Before merging, I verified that the new glassmorphism CSS rendered correctly and didn't break the layout. I also ensured that the math logic in the dashboard (like the totalSaved calculation) correctly parsed floats to avoid displaying NaN errors when adding new goals.

<img width="1903" height="860" alt="image" src="https://github.com/user-attachments/assets/1b844889-e122-48ac-801e-c1cb75b6048a" />

### D. One Thing You Would Do Differently

If you had to restart this project from scratch with everything you know now, name one specific workflow decision you would change (not a code change — a Git/project management decision).

- **What would you change?** I would configure GitHub Actions for deployment from the very beginning of the project instead of trying to manually push to the gh-pages branch via the local terminal. It would have saved me significant debugging time regarding socket errors and organizational authentication blocks.

- **Link to the evidence of the original decision:** https://github.com/IS-PROJECT-2026/savings-tracker-165992/commit/c7dec7f5ffc0aa7065867905b108382523695e71

---

## 4. Screenshots of Key GitHub Features

Demonstrate your workflow mechanics by embedding your screenshots below.

> **CRITICAL FOR WORKING IMAGES:** Do not type manual folder paths. Edit this file directly on the GitHub web interface, click on the blank line below each prompt, and **paste (Ctrl+V / Cmd+V)** your screenshot. GitHub will automatically upload the file and generate a permanent, working image link for you.

### A. Milestones and Issues
*Provide a screenshot showing your active milestone(s) and the granular tracking issues linked directly to them.*

<img width="1584" height="606" alt="image" src="https://github.com/user-attachments/assets/81138ec5-8332-48a4-9d8b-8974570d42b8" />

* **Caption:** The active project milestone displaying granular, linked issues used to track the development of the frontend UI and the transition to local storage.

### B. Project Board
*Provide a screenshot of your GitHub Project Board with your issues organized dynamically across columns (To Do, In Progress, Done).*

<img width="1919" height="891" alt="image" src="https://github.com/user-attachments/assets/d9ee4b6b-a1be-4a00-9d91-c1c401c5f810" />

* **Caption:** The automated GitHub Kanban board tracking the lifecycle of repository issues as they move from "To Do" through "In Progress" to "Done".

### C. Branching Architecture
*Provide a screenshot showing your local or remote Git branch list, highlighting your use of conventional, issue-linked naming patterns (e.g., `feat/`, `fix/`, `style/`).*

<img width="1500" height="969" alt="image" src="https://github.com/user-attachments/assets/f8accc8d-dbd0-477c-b480-244c0cf34f79" />

* **Caption:** A view of the branch structure demonstrating the consistent use of conventional branch prefixes (such as feat/ and chore/) to isolate features.

### D. Pull Requests & Traceability
*Provide a screenshot of a completed or open Pull Request (PR) on GitHub that clearly shows it is linked to a related development issue.*

<img width="1538" height="950" alt="image" src="https://github.com/user-attachments/assets/a6f138dd-2cfd-4278-9195-f01eed6560c7" />

<img width="1901" height="969" alt="image" src="https://github.com/user-attachments/assets/0a60ae0a-904d-41d5-9c1a-65d292d01ee7" />


* **Caption:** A completed Pull Request clearly linked to its corresponding development issue, demonstrating full traceability from the initial task to the merged code.

---

## 5. Merge Conflict Evidence

You must engineer **three merge conflicts**, each triggered by a **different cause** from those covered in the lecture. For Conflict 1, document the full resolution lifecycle. For Conflicts 2 and 3, provide the conflict marker screenshot and identify the cause.

> **Marks:** Conflict 1 full chronology (2 marks) · Conflict 2 (1 mark) · Conflict 3 (1 mark) · All three use distinct causes (1 mark) = **5 marks total**

---

### Conflict 1 — Full Chronology

**What cause did you use?** Concurrent editing of the same lines (Different Changes to the Same File/Line).

#### Step 1: Generating the Clash
*Screenshot showing the merge attempt and the conflict warning.*

<img width="1465" height="650" alt="Screenshot 2026-08-18 162911" src="https://github.com/user-attachments/assets/a288f325-6541-4f17-85f7-3df411236533" />

* **Caption:** Attempting to merge a feature branch into main triggered a conflict because both branches simultaneously modified the API URL

#### Step 2: Inside the Code Editor (Conflict Markers)
*Screenshot showing the raw, unresolved conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`) in your editor.*

<img width="1476" height="583" alt="Screenshot 2026-08-18 162936" src="https://github.com/user-attachments/assets/bfb834d8-7ccf-4dc4-9d17-03b7609657ba" />

* **Caption:** The editor displays the conflict markers (<<<<<<< HEAD) where the main branch had the old URL, and the incoming branch had the new URL. I resolved it by accepting the incoming changes to keep the modern UI.

#### Step 3: Resolution & Clean Merge
*Screenshot of your clean Git history or completed PR showing the conflict was resolved and merged.*

<img width="1465" height="611" alt="Screenshot 2026-08-18 163128" src="https://github.com/user-attachments/assets/0e6e0d1b-899b-416c-8727-11a0baabf5c4" />

* **Caption:** The clean Git history showing the successfully resolved merge commit, confirming the conflicting branches are now synchronized.
---

### Conflict 2 — Different Cause

**What cause did you use?** Deleted vs. Modified File

**Why does this cause trigger a conflict?** Why does this cause trigger a conflict? This conflict occurs when one branch deletes a file entirely while another branch simultaneously makes code modifications to that exact same file.

<img width="1659" height="946" alt="Screenshot 2026-08-17 201423" src="https://github.com/user-attachments/assets/b142c403-5b63-4983-bf7f-84dcd4ddafe5" />

<img width="1864" height="753" alt="Screenshot 2026-08-17 201643" src="https://github.com/user-attachments/assets/ee8f698a-bb3b-47b4-8af0-921dfe459ed2" />

* **Caption:** The merge conflict warning triggered when attempting to merge

---
##
## 6. Feedback & Evaluation

To help improve this course for future engineering cohorts, please take 2 minutes to fill out the anonymous feedback form. Your honest review helps shape how this program is taught next semester!
- [ ] **Anonymous Evaluation Form:** [Course & Instructor Evaluation](https://forms.gle/YLybnsyXXErKEg3s9)

---
 
## Final Submission
 
Once your repository is complete, submit your work through the official submission form below. The form will **stop accepting responses after Monday, August 17th, 2026** — no late submissions will be accepted.
 
> **Submission Form:** [https://forms.gle/KrT4VxtFtkU3wtYu8](https://forms.gle/KrT4VxtFtkU3wtYu8)
