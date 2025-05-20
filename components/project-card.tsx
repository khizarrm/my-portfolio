"use client"

import { useState } from "react"
import { Github, ExternalLink, Info } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  image: string
  github: string | null
  live: string | null
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card
      className={`rounded-2xl border border-gray-800 transition-all duration-300 h-full flex flex-col
        ${isHovered ? "shadow-md scale-[1.01]" : "shadow-sm"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-60 w-full overflow-hidden">
      <video
        src={project.image || "./placeholder.svg"}// 👈 Put your file in public/videos/
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '20px',
          objectFit: 'cover'
        }}
      />
      </div>

      <CardContent className="flex-grow p-6">
        <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>

        {showDetails ? (
          <div className="space-y-4 text-gray-300 text-base">
            <p>{project.description}</p>
            <p className="text-sm opacity-80">
              This project highlights frontend skills, responsive design, and thoughtful UX decisions.
            </p>
            <button
              onClick={() => setShowDetails(false)}
              className="text-sm text-purple-400 hover:underline"
            >
              Show Less
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-300 text-base">{project.description}</p>
            <button
              onClick={() => setShowDetails(true)}
              className="mt-4 inline-flex items-center text-sm text-white-400 hover:underline"
            >
              <Info className="w-4 h-4 mr-1" />
              More Details
            </button>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-4 flex-wrap">

        {project.github && (
          <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-full border border-gray-700 text-sm text-white hover:bg-gray-800 transition"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </a>
        )}
        
        
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-full border border-gray-700 text-sm text-white hover:bg-gray-800 transition"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </a>
        )}
      </CardFooter>
    </Card>
  )
}
