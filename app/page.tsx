export default function Portfolio() {
  const experiences = [
    {
      role: 'Engineering',
      company: 'fullscript.com',
      website: 'https://fullscript.com',
    },
    {
      role: 'Engineering',
      company: 'thirdspace.so',
      website: 'https://thirdspace.so',
    },
    {
      role: 'Engineering',
      company: 'studenthaus.ca',
      website: 'https://studenthaus.ca',
    },
    {
      role: 'Engineering',
      company: 'wiredin.rw',
      website: 'https://wiredin.rw',
    }
  ]

  const essays = [
    {
      slug: 'the-privilege-of-failing',
      title: 'the privilege of failing',
    },
    {
      slug: 'changing-your-baseline',
      title: 'changing your baseline',
    }
  ]

  const projects = [
    {
      title: 'linkd',
      description: 'ai agent to automate outreach for internships',
      github: 'https://try-linkd.com',
    },
    {
      title: 'sage ai',
      description: 'chrome extension using ml to block unproductive pages',
      github: 'https://github.com/khizarrm/sage-ai',
    },
    {
      title: 'passr',
      description: 'resume optimizer for job descriptions',
      github: 'https://github.com/khizarrm/passr',
    },
    {
      title: 'zeez creations',
      description: 'interior design studio website',
      github: 'https://github.com/khizarrm/zeezfinal',
    },
    {
      title: 'plainly',
      description: 'converts voice notes to clear messages',
      github: 'https://github.com/khizarrm/plainly',
    },
    {
      title: 'leethub',
      description: 'recreation of leethub extension for practice',
      github: 'https://github.com/khizarrm/LeetHub',
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-3xl px-8 py-6">

        {/* Header */}
        <header className="mb-4">
          <h1 className="text-3xl font-medium mb-1">Khizar Malik</h1>
          <p className="text-base text-text-secondary mb-2">software developer</p>
          <div className="text-sm text-text-secondary max-w-2xl leading-snug">
            <p className="mb-1">
              i like to build things.{' '}
              <a
                href="https://www.linkedin.com/company/cansbridgescholars/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-teal underline transition-colors"
              >
                cansbridge scholar
              </a>
              . 4th year cs @ carleton university.
            </p>
            <p>
              currently building{' '}
              <a
                href="https://try-linkd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-teal underline transition-colors"
              >
                linkd
              </a>
              , an agent to help students find internships.
            </p>
            <p>
              i also like to take{' '}
              <a
                href="https://www.instagram.com/khizar.pics/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-teal underline transition-colors"
              >
                pics
              </a>
              {' '}and{' '}
              <a
                href="https://www.youtube.com/channel/UCSvcxp1CzJCh-Y-sACtrqtQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-teal underline transition-colors"
              >
                vlogs
              </a>
              {' '}from time to time
            </p>
          </div>
        </header>

        {/* Navigation */}
        <nav className="mb-4">
          <div className="flex gap-4 items-center">
            <a
              href="https://github.com/khizarrm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="GitHub"
            >
              <img
                src="/icons8-github-64.png"
                alt="GitHub"
                width="20"
                height="20"
                loading="eager"
                decoding="sync"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/khizar--malik/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="LinkedIn"
            >
              <img
                src="/LinkedIn_icon.svg.png"
                alt="LinkedIn"
                width="20"
                height="20"
                loading="eager"
                decoding="sync"
              />
            </a>
            <a
              href="https://x.com/khizar_mm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="X (Twitter)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </nav>

        {/* Experience Section */}
        <section className="mb-4">
          <h2 className="text-lg font-bold mb-1 text-white">experience</h2>
          <div className="space-y-2">
            {experiences.map((exp) => (
              <div key={exp.company}>
                <div className="flex items-center gap-2">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${exp.company}&sz=16`}
                    alt={`${exp.company} favicon`}
                    width="16"
                    height="16"
                    className="flex-shrink-0"
                  />
                  <a
                    href={exp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary hover:text-teal transition-colors"
                  >
                    {exp.role}
                  </a>
                </div>
                <div className="ml-6 text-xs text-text-muted">
                  {exp.company.replace(/\.(so|ca|rw|com)$/, '')}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Writings Section */}
        <section className="mb-4">
          <h2 className="text-lg font-bold mb-1 text-white">writings</h2>
          <div className="space-y-0.5">
            {essays.map((essay) => (
              <div key={essay.slug}>
                <a
                  href={`/essays/${essay.slug}`}
                  className="text-sm text-text-secondary hover:text-teal transition-colors"
                >
                  {essay.title}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-4">
          <h2 className="text-lg font-bold mb-1 text-white">projects</h2>
          <div className="space-y-0.5">
            {projects.map((project) => (
              <div key={project.title}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-teal transition-colors"
                >
                  <span className="font-medium">{project.title}</span>
                  <span className="text-text-muted"> - {project.description}</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Email */}
        <div className="mt-4">
          <a
            href="mailto:khizarmalik2003@gmail.com"
            className="text-sm text-text-secondary hover:text-teal underline transition-colors"
          >
            email me
          </a>
        </div>

      </div>
    </div>
  )
}
