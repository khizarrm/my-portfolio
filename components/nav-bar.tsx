"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("about")

  const sections = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  const handleClick = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="flex justify-center">
      <div className="flex space-x-1 md:space-x-2 text-sm md:text-base">
        {sections.map((section, index) => (
          <>
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-colors duration-300",
                activeSection === section.id
                  ? "text-blue-600 bg-blue-50 border-b border-blue-200"
                  : "text-gray-500 hover:text-blue-600 hover:bg-gray-50",
              )}
            >
              {section.label}
            </button>
            {index < sections.length - 1 && <span className="text-gray-300 flex items-center">|</span>}
          </>
        ))}
      </div>
    </nav>
  )
}
