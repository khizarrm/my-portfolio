import ProjectCard from "./project-card"

export default function ProjectsSection() {
  const projects = [
    {
      title: "Zeez Creations",
      description: "Fully functional ecommerce website for an interior design firm in Kigali, Rwanda.",
      tags: ["Next.js", "E-commerce", "Tailwind CSS"],
      link: "https://zeezcreations.com/",
    },
    {
      title: "ThirdSpace",
      description: "Social networking app for students",
      tags: ["React", "Node.js", "MongoDB"],
      link: "https://apps.apple.com/ca/app/thirdspace-share-experiences/id6736379147",
    },
    {
      title: "Sub Tracker",
      description: "App to track monthly spending from subscriptions by analyzing your email.",
      tags: ["Python", "Machine Learning", "API Integration"],
      link: "https://email-subtracker.netlify.app",
    },
    {
      title: "LeetHub",
      description: "Google extension to connect correct LeetCode submissions to GitHub automatically.",
      tags: ["JavaScript", "Chrome Extension", "GitHub API"],
      link: "https://youtu.be/aJoQ0hedZz8",
    },
  ]

  return (
    <section id="projects" className="py-4">
      <h2 className="text-2xl font-light text-gray-800 mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  )
}
