import SkillBadge from "./skill-badge"

export default function SkillsSection() {
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Tailwind CSS",
    "Figma",
    "UI/UX Design",
    "GraphQL",
    "AWS",
    "Docker",
    "Prompt Engineering",
    "Machine Learning",
  ]

  return (
    <section id="skills" className="py-4">
      <h2 className="text-2xl font-light text-gray-800 mb-6">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <SkillBadge key={index} name={skill} />
        ))}
      </div>
    </section>
  )
}
