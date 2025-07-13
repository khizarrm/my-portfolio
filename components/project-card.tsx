"use client"

import { useState, useRef, useEffect } from "react"
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
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleVideoLoad = () => {
    setIsLoading(false)
  }

  const handleVideoError = () => {
    setIsLoading(false)
  }

  return (
    <Card
      ref={cardRef}
      className={`rounded-2xl border border-gray-800 transition-all duration-300 h-full flex flex-col
        ${isHovered ? "shadow-md scale-[1.01]" : "shadow-sm"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-60 w-full overflow-hidden">
        {/* Loading placeholder */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Video */}
        {isVisible && (
          <video
            ref={videoRef}
            src={project.image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '20px',
              objectFit: 'cover',
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.3s ease'
            }}
          />
        )}
        
        {/* Fallback placeholder if not visible yet */}
        {!isVisible && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="text-gray-400 text-sm">{project.title}</div>
          </div>
        )}
      </div>

      <CardContent className="flex-grow p-6">
        <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>


          <div className="space-y-4 text-gray-300 text-base">
            <p>{project.description}</p>
          </div>
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
