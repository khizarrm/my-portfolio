"use client"

import { Mail, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactSection() {
  return (
    <section id="contact" className="py-4">
      <h2 className="text-2xl font-light text-gray-800 mb-6">Contact</h2>

      <div className="space-y-6">
        <p className="text-gray-600">Interested in working together? Feel free to reach out.</p>

        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white border-none rounded-full px-6"
          onClick={() => (window.location.href = "mailto:hello@example.com")}
        >
          <Mail className="mr-2 h-4 w-4" />
          Email Me
        </Button>

        <div className="flex space-x-4 pt-4">
          <a
            href="https://github.com/khizarrm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500 transition-colors"
            aria-label="GitHub profile"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/khizar--malik/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500 transition-colors"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://x.com/khizar_mm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500 transition-colors"
            aria-label="X (Twitter) profile"
          >
            <XLogo className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}

// X Logo component
function XLogo({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
