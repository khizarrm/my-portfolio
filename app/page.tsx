import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import NavBar from "@/components/nav-bar"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center py-12 px-4 bg-gray-100">
      {/* Subtle background accents */}
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-blue-50/20 rounded-full blur-3xl"></div>

      <div className="card-container max-w-[800px] w-full mx-auto relative z-10">
        <div className="card relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm p-6 md:p-8 border border-gray-200 transition-all duration-500 overflow-hidden">
          {/* Subtle card background */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl"></div>

          {/* Minimal color accent */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100/20 rounded-full blur-3xl -z-10"></div>

          <NavBar />

          <div className="space-y-12 mt-8">
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
          </div>
        </div>
      </div>
    </main>
  )
}
