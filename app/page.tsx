import ProjectCard from "@/components/project-card"

export default function Portfolio() {
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
      github: "https://github.com/khizarrm/zeezfinal",
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
      id: 4,
      title: "CareWeb",
      description:
        "A healthtech agency which provided website redesign/developments and AI integration for health clinics, allowing them to bring in more clients",
      image: "/videos/careweb.mp4",
      github: "https://github.com/khizarrm/careweb",
      live: "https://careweb.ca/",
    },
    {
      id: 5,
      title: "LeetHub",
      description: "A chrome extension which automatically syncs your correct LeetCode submissions to github for employers to see",
      image: "./videos/leethub.mkv",
      github: "https://github.com/khizarrm/LeetHub",
      live: null,
    },
    {
      id: 6,
      title: "Lider (Walmart) Scraper",
      description: "An application which scrapes all products of all categories on the walmart website.",
      image: "/videos/lider-scraper.mp4",
      github: "https://github.com/yourusername/recipe-finder",
      live: null,
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Header Section */}
        <header className="mb-16">
          <h1 className="text-large font-bold mb-4">Khizar Malik</h1>
          <p className="text-medium mb-8">Software Developer.</p>
          
          <div className="max-w-3xl">
            <p className="text-body mb-6">I live in Ontario.</p>
            <p className="text-body mb-6">
              I help run Z Fellows and previously joined TCP.
            </p>
            <p className="text-body mb-6">
              Recently, I started Yesterday Media. We interview individuals across industries, focused on 
              their childhood to the present day. Much of what we record hasn't been shared publicly.
            </p>
            <p className="text-body">
              Episodes release weekly across platforms, alongside a written biography on each guest.
            </p>
          </div>
        </header>

        {/* Divider */}
        <hr className="border-white mb-16 animated-line" />

        {/* Navigation Section */}
        <nav className="mb-16">
          <div className="flex gap-8">
            <a href="/essays" className="underline-link text-body font-medium">
              Essays
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
