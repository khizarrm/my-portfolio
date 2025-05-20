import { Github, Linkedin } from "lucide-react"
import ProjectCard from "@/components/project-card"


export default function Portfolio() {
  // Sample project data - replace with your own
  const projects = [
    {
      id: 1,
      title: "thirdspace",
      description:
        "A social networking app to allow users to share experiences simutaneoulsy.",
      image: "/videos/thirdspace.mp4",
      github: null,
      live: "https://thirdspace.so/",
    },
    {
      id: 2,
      title: "Zeez Creations",
      description:
        "A fully functional website for an interior design studio, which bought in 30% more clients.",
      image: "/videos/zeez.mp4",
      github: "https://github.com/yourusername/ecommerce",
      live: "https://zeezcreations.com/",
    },
    {
      id: 3,
      title: "Plainly",
      description:
        "An app that takes your messy voice notes — in any language — and rewrites them into clear, polite messages for clients or friends.",
      image: "/videos/plainly.mov",
      github: "https://github.com/khizarrm/plainly",
      live: "https://plainly.vercel.app",
    },
    {
      id: 3,
      title: "CareWeb",
      description:
        "A healthtech agency which provided website redesign/developments and AI integration for health clinics, allowing them to bring in more clients",
      image: "/videos/careweb.mp4",
      github: "https://github.com/yourusername/task-manager",
      live: "https://careweb.ca/",
    },
    {
      id: 4,
      title: "LeetHub",
      description: "A chrome extension which automatically syncs your correct LeetCode submissions to github for employers to see",
      image: "./videos/leethub.mkv",
      github: "https://github.com/yourusername/portfolio",
      live: null,
    },
    {
      id: 5,
      title: "Lider (Walmart) Scraper",
      description: "An application which scrapes all products of all categories on the walmart website.",
      image: "/videos/lider-scraper.mp4",
      github: "https://github.com/yourusername/recipe-finder",
      live: "https://recipe-finder-example.com",
    }
  ]

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0" />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Khizar Malik</h1>

          <div className="flex justify-center space-x-4 mb-8">
            <a
              href="https://github.com/khizarrm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/khizar--malik/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-300">
              I love building.
            </p>
          </div>
        </header>

        <main className="container mx-auto px-8 py-12">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">My Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </main>

        <footer className="container mx-auto px-4 py-12 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Khizar Malik. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
