import { ArrowRight } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="py-4">
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-light text-gray-800 tracking-tight">
          Hi, I'm <span className="font-normal">Khizar Malik</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 font-light">Developer</h2>
        <p className="text-gray-600 leading-relaxed max-w-2xl">
          I craft elegant, user-centered digital experiences with clean code and thoughtful design. Specializing in
          building modern web applications that balance aesthetics with performance.
        </p>
        <div className="pt-2">
          <a
            href="#projects"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors group"
          >
            View my work
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
