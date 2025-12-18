'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface Prompt {
  id: string
  title: string
  content: string
}

const prompts: Prompt[] = [
  {
    id: 'research',
    title: 'RESEARCH',
    content: `I have a task to [DESCRIBE FEATURE/BUG]. Goal: Provide all context needed for a junior developer to implement this without asking further questions. Instructions:
1. Do not write any code or modify the codebase yet.
2. Explore the codebase to understand existing systems, data models, and patterns relevant to this task.
3. Return your findings in markdown document with these sections:
    * Files: List of relevant files and their roles
    * Data Structures: Key types, interfaces, database schemas involved
    * Patterns: How similar features are implemented (e.g., 'React Query for fetching', 'errors via middleware')
    * Strategy: High-level implementation approach
    * Unknowns: Ambiguities needing resolution Be brutally concise. Use bullet points. Verify by reading code before stating anything.
Constraints: **Do not modify the .cursor/commands/research.md, make your own RESEARCH.MD in the root directory**`
  },
  {
    id: 'plan',
    title: 'PLAN',
    content: `We are working on [FEATURE/BUG]. Research has been completed above.
Goal: Provide an implementation checklist in markdown document.
Instructions:
1. Create a checklist with atomic implementation steps.
2. Each step must be:
    * Atomic: One clear action (e.g., 'Create file X', 'Add function Y to file Z')
    * Verifiable: Include a check to ensure it works (e.g., 'Run test X', 'Verify log output')
    * No Code: Instructions only, not actual code
Format:

[ ] Step 1: [Action] - [Verification]
[ ] Step 2: [Action] - [Verification]

Create the file in the root directory, in a PLAN.MD file. Do not implement yet.
Constraints: **Do not modify the .cursor/commands/plan.md. Create your own PLAN.MD in the root directory**`
  },
  {
    id: 'implementation',
    title: 'IMPLEMENTATION',
    content: `I want to implement the feature. Context: RESEARCH.MD and PLAN.MD have been provided above. Instructions:
1. Execute Step 1 ONLY.
2. Verify it works as described.
3. Mark Step 1 as completed (change [ ] to [x]).
4. STOP and ask for confirmation before proceeding to Step 2.
Do not deviate from the plan. If the plan is wrong, stop and tell me.
**EXCEPTION: If the user says 'do all' you may do all steps at once**.`
  },
  {
    id: 'find',
    title: 'FIND',
    content: `Task: Find [SPECIFIC ITEM/PATTERN/CODE] in the codebase.

Instructions:
1. Search the codebase for the requested item (file, function, pattern, usage, etc.)
2. Return findings in a brief, concise format:
    * Location: File path and line number
    * Context: Minimal surrounding context (1-2 lines)
    * Count: How many instances found (if multiple)
3. If nothing found, state that explicitly
4. No explanations or suggestions unless specifically asked
5. Format as plain text or simple markdown - no files created

Be specific. Be brief.`
  },
  {
    id: 'initialize',
    title: 'INITIALIZE',
    content: `Task: Initialize understanding of the codebase.

Instructions:
1. Examine project structure:
    * Project type (monorepo/single, framework, language)
    * Directory organization and module structure
    * Naming conventions (files, variables, directories)
2. Identify architectural patterns:
    * Layers (presentation, business logic, data access)
    * Design patterns (MVC, DDD, microservices, etc.)
3. Map data flow:
    * Data fetching (REST, GraphQL, DB queries)
    * State management (global, local, server, URL)
    * Mutation patterns and error handling
4. Note code conventions:
    * File naming and placement patterns
    * Import styles (absolute/relative, aliases)
    * Code style (classes/functions, declarative/imperative)

Output: Once complete, respond with only the word "Ready."`
  },
  {
    id: 'pr',
    title: 'PR',
    content: `Write a PR description for these changes following the "Context Engineering" framework.

Do not just list file changes. Instead, structure the response into:

1. **The Context:** A high-level summary of the problem we are solving and the intent behind the changes.
2. **The Plan:** A numbered list of the logical steps taken to implement this (e.g., "1. Refactored the auth hook to allow X..."). For each step, explain the *why*.
3. **Verification:** How to verify this works (tests or manual steps).

Keep it concise and focused on the decision-making process.`
  }
]

export default function PromptsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({})
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedContents, setEditedContents] = useState<Record<string, string>>({})

  const copyToClipboard = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleTitleClick = (id: string) => {
    const newCount = (clickCounts[id] || 0) + 1
    setClickCounts({ ...clickCounts, [id]: newCount })

    if (newCount >= 5) {
      setEditingId(id)
      setClickCounts({ ...clickCounts, [id]: 0 })
    }
  }

  const handleContentChange = (id: string, newContent: string) => {
    setEditedContents({ ...editedContents, [id]: newContent })
  }

  const saveEdit = (id: string) => {
    setEditingId(null)
  }

  const cancelEdit = (id: string) => {
    setEditingId(null)
    const updated = { ...editedContents }
    delete updated[id]
    setEditedContents(updated)
  }

  const getPromptContent = (prompt: Prompt) => {
    return editedContents[prompt.id] ?? prompt.content
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Header Section */}
        <header className="mb-16">
          <Link href="/" className="underline-link text-body mb-8 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-large font-bold mb-4">Prompts</h1>
          <p className="text-body text-gray-400">
            A collection of prompts I use for Cursor. Click the copy button to use them.
          </p>
        </header>

        {/* Divider */}
        <hr className="border-white mb-16" />

        {/* Prompts Section */}
        <section>
          <div className="space-y-12">
            {prompts.map((prompt) => (
              <div key={prompt.id}>
                <div className="flex items-center justify-between mb-3">
                  <h2
                    className="text-medium font-bold select-none"
                    onClick={() => handleTitleClick(prompt.id)}
                  >
                    {prompt.title}
                  </h2>
                  <div className="flex gap-2">
                    {editingId === prompt.id && (
                      <>
                        <button
                          onClick={() => saveEdit(prompt.id)}
                          className="px-3 py-1 text-sm bg-white text-black hover:bg-gray-300 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => cancelEdit(prompt.id)}
                          className="px-3 py-1 text-sm border border-white hover:bg-white hover:text-black transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => copyToClipboard(getPromptContent(prompt), prompt.id)}
                      className="flex items-center gap-2 px-3 py-1 text-sm border border-white hover:bg-white hover:text-black transition-colors"
                      aria-label={`Copy ${prompt.title} prompt`}
                    >
                      {copiedId === prompt.id ? (
                        <>
                          <Check size={14} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                {editingId === prompt.id ? (
                  <textarea
                    value={getPromptContent(prompt)}
                    onChange={(e) => handleContentChange(prompt.id, e.target.value)}
                    className="w-full min-h-[300px] bg-yellow-900 bg-opacity-20 border-2 border-yellow-500 p-4 rounded text-sm text-white font-mono resize-y"
                    spellCheck={false}
                  />
                ) : (
                  <pre className="bg-gray-900 p-4 rounded overflow-x-auto">
                    <code className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                      {getPromptContent(prompt)}
                    </code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
