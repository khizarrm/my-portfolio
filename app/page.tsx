import ProjectCard from "@/components/project-card"

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "Amategeko",
      description: "Legislation app for the Government of Rwanda. Target towards 10,000+ legal workers.Built during internship at WiredIn with team collaboration.",
      image: "/videos/amategeko.MP4",
      github: null,
      live: null,
    },
    {
      id: 2,
      title: "thirdspace",
      description: "A social networking app for sharing experiences simultaneously. 1000+ users, top 70 in the app store.",
      image: "/videos/thirdspace.mp4",
      github: null,
      live: "https://thirdspace.so/",
    },
    {
      id: 3,
      title: "Books and Brains",
      description: "Ecommerce platform for selling books to kids in Kigali. Addressing the gap since the country only has one library. 300+ active users.",
      image: "/books.png",
      github: null,
      live: null,
    },
    {
      id: 4,
      title: "Sage AI",
      description: "Chrome extension using ML to block unproductive pages. Features real-time learning and in-browser model retraining via Flask APIs.",
      image: "/videos/sage.mp4",
      github: "https://github.com/khizarrm/sage-ai",
      live: null,
    },
    {
      id: 5, 
      title: "Passr", 
      description: "Web app which optimizes your resume for a JD. Currently at 40+ users.",
      image: "/videos/passr.mp4",
      github: "https://github.com/khizarrm/passr",
      live: "https://passr.vercel.app/", 
    },
    {
      id: 6,
      title: "Zeez Creations",
      description: "Website for an interior design studio that brought in 100+ new clients.",
      image: "/videos/zeez.mp4",
      github: "https://github.com/khizarrm/zeezfinal",
      live: "https://zeezcreations.com/",
    },
    {
      id: 7,
      title: "Plainly",
      description: "App that converts messy voice notes to clear messages. Created for my mom who doesn't speak English well.",
      image: "/videos/plainly.mov",
      github: "https://github.com/khizarrm/plainly",
      live: "https://plainly.vercel.app",
    },
    {
      id: 8,
      title: "LeetHub",
      description: "Recreation of the existing LeetHub extension - built for UI/UX and API practice.",
      image: "./videos/leethub.mkv",
      github: "https://github.com/khizarrm/LeetHub",
      live: null,
    }
  ]

  const mobileProjects = projects.filter((project) =>
    ["Amategeko", "thirdspace", "Books and Brains"].includes(project.title)
  )

  const webProjects = projects.filter(
    (project) => !mobileProjects.includes(project)
  )

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Header Section */}
        <header className="mb-16">
          <h1 className="text-large font-bold mb-4">Khizar Malik</h1>
          <p className="text-medium mb-8">Software Developer.</p>
          
          <div className="max-w-3xl">
            <p className="text-body mb-6">I like to build things. Cansbridge Scholar. 4th year CS @ Carleton University.</p>
            <p className="text-body mb-6">
              Currently building AI agents at a startup. 
            </p>
          </div>
        </header>

        {/* Divider */}
        <hr className="border-white mb-16" />

        {/* Navigation Section */}
        <nav className="mb-16">
          <div className="flex gap-8">
            <a href="/essays" className="underline-link text-body font-medium">
              Writings
            </a>
            <a href="https://github.com/khizarrm" target="_blank" rel="noopener noreferrer" className="underline-link text-body font-medium">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/khizar--malik/" target="_blank" rel="noopener noreferrer" className="underline-link text-body font-medium">
              LinkedIn
            </a>
            <a href="https://x.com/khizar_mm" target="_blank" rel="noopener noreferrer" className="underline-link text-body font-medium">
              X
            </a>
          </div>
        </nav>

        {/* Projects Section */}
        <section id="projects" className="mb-16">
          <h2 className="text-medium font-bold mb-8">Projects</h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-body font-semibold mb-6">Mobile Apps</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {mobileProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-body font-semibold mb-6">Web Apps</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {webProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
