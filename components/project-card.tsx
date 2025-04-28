import { ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    tags: string[]
    link: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative bg-gray-50 rounded-xl p-5 transition-all duration-300 hover:translate-y-[-5px] hover:bg-white border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl text-gray-800 font-light">{project.title}</h3>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition-colors p-1"
            aria-label={`View ${project.title} project`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <p className="text-gray-600 text-sm mb-4 flex-grow">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
