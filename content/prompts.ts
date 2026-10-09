import type { Prompt } from './types'

export const prompts: Prompt[] = [
  {
    id: 'research',
    title: 'research',
    content:
      "I have a task to [DESCRIBE FEATURE/BUG]. Goal: Provide all context needed for a junior developer to implement this without asking further questions. Instructions:\n1. Do not write any code or modify the codebase yet.\n2. Explore the codebase to understand existing systems, data models, and patterns relevant to this task.\n3. Return your findings in markdown document with these sections:\n    * Files: List of relevant files and their roles\n    * Data Structures: Key types, interfaces, database schemas involved\n    * Patterns: How similar features are implemented (e.g., 'React Query for fetching', 'errors via middleware')\n    * Strategy: High-level implementation approach\n    * Unknowns: Ambiguities needing resolution Be brutally concise. Use bullet points. Verify by reading code before stating anything.\nConstraints: **Do not modify the .cursor/commands/research.md, make your own RESEARCH.MD in the root directory**",
  },
  {
    id: 'plan',
    title: 'plan',
    content:
      "We are working on [FEATURE/BUG]. Research has been completed above.\nGoal: Provide an implementation checklist in markdown document.\nInstructions:\n1. Create a checklist with atomic implementation steps.\n2. Each step must be:\n    * Atomic: One clear action (e.g., 'Create file X', 'Add function Y to file Z')\n    * Verifiable: Include a check to ensure it works (e.g., 'Run test X', 'Verify log output')\n    * No Code: Instructions only, not actual code\nFormat:\n\n[ ] Step 1: [Action] - [Verification]\n[ ] Step 2: [Action] - [Verification]\n\nCreate the file in the root directory, in a PLAN.MD file. Do not implement yet.\nConstraints: **Do not modify the .cursor/commands/plan.md. Create your own PLAN.MD in the root directory**",
  },
  {
    id: 'implementation',
    title: 'implementation',
    content:
      "I want to implement the feature. Context: RESEARCH.MD and PLAN.MD have been provided above. Instructions:\n1. Execute Step 1 ONLY.\n2. Verify it works as described.\n3. Mark Step 1 as completed (change [ ] to [x]).\n4. STOP and ask for confirmation before proceeding to Step 2.\nDo not deviate from the plan. If the plan is wrong, stop and tell me.\n**EXCEPTION: If the user says 'do all' you may do all steps at once**.",
  },
  {
    id: 'find',
    title: 'find',
    content:
      'Task: Find [SPECIFIC ITEM/PATTERN/CODE] in the codebase.\n\nInstructions:\n1. Search the codebase for the requested item (file, function, pattern, usage, etc.)\n2. Return findings in a brief, concise format:\n    * Location: File path and line number\n    * Context: Minimal surrounding context (1-2 lines)\n    * Count: How many instances found (if multiple)\n3. If nothing found, state that explicitly\n4. No explanations or suggestions unless specifically asked\n5. Format as plain text or simple markdown - no files created\n\nBe specific. Be brief.',
  },
  {
    id: 'initialize',
    title: 'initialize',
    content:
      "Task: Initialize understanding of the [FEATURE/BUG]. The user will then ask you questions relating to this topic.\n\nInstructions:\n1. Examine project structure:\n    * Project type (monorepo/single, framework, language)\n    * Directory organization and module structure\n    * Naming conventions (files, variables, directories)\n2. Identify architectural patterns:\n    * Layers (presentation, business logic, data access)\n    * Design patterns (MVC, DDD, microservices, etc.)\n3. Map data flow:\n    * Data fetching (REST, GraphQL, DB queries)\n    * State management (global, local, server, URL)\n    * Mutation patterns and error handling\n4. Note code conventions:\n    * File naming and placement patterns\n    * Import styles (absolute/relative, aliases)\n    * Code style (classes/functions, declarative/imperative)\n\nConstraints: **Do not make an md file, just clarify your understanding of it and reply with the word 'Ready'**",
  },
  {
    id: 'pr',
    title: 'pr',
    content:
      'Write a PR description for these changes following the "Context Engineering" framework.\n\nDo not just list file changes. Instead, structure the response into:\n\n1. **The Context:** A high-level summary of the problem we are solving and the intent behind the changes.\n2. **The Plan:** A numbered list of the logical steps taken to implement this (e.g., "1. Refactored the auth hook to allow X..."). For each step, explain the *why*.\n3. **Verification:** How to verify this works (tests or manual steps).\n\nKeep it concise and focused on the decision-making process.',
  },
  {
    id: 'summary',
    title: 'summary',
    content:
      'Summarize these changes as a modular "Plan Section" for a larger PR.\n\nStructure the output exactly like this so I can copy-paste it:\n\n**[Feature/Module Name]**\n* **Intent:** One sentence on what this specific chunk solves.\n* **Execution Steps:**\n  1. `[Action]` (e.g., Created X component) - *Why: [Reason]*\n  2. `[Action]` (e.g., Updated Y hook) - *Why: [Reason]*\n  3. `[Action]` (e.g., Added Z test) - *Why: [Reason]*\n\nFocus on the *logical flow* of changes, not just file names.',
  },
]
