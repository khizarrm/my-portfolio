import RecordingPlayer from '@/components/recording-player'

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
    },
    {
      slug: 'how-i-code-with-ai',
      title: 'how i code with AI',
    }
  ]

  const projects = [
    {
      title: 'sema',
      description: 'automate outreach for oppurtunities',
      details: '300+ users, 1 paying user',
      github: 'https://try-sema.com',
    },
    {
      title: 'thirdspace',
      description: 'bereal but irl',
      details: '1k+ users, top 70 in app store',
      github: 'https://thirdspace.so',
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-3xl px-8 py-16">

        {/* Header */}
        <header className="mb-4 flex gap-6 items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-medium mb-2">Khizar Malik</h1>
            <div className="text-sm text-text-secondary max-w-2xl leading-relaxed space-y-2">
              <p>
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
                currently learning ruby at{' '}
                <a
                  href="https://fullscript.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-teal underline transition-colors"
                >
                  fullscript
                </a>
                {' '}and building{' '}
                <a
                  href="https://try-sema.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-teal underline transition-colors"
                >
                  sema
                </a>
                .
              </p>
              <p>
                i also recently started a{' '}
                <a
                  href="https://www.instagram.com/desirun_ottawa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-teal underline transition-colors"
                >
                  run club
                </a>
                .
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
              <div className="flex gap-4 items-center mt-2">
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
            </div>
          </div>
          <img
            src="/profile.JPG"
            alt="Khizar Malik"
            className="w-32 h-auto"
          />
        </header>

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

        {/* Conversations Section */}
        <section className="mb-4">
          <h2 className="text-lg font-bold mb-1 text-white">conversations</h2>
          <div className="space-y-1">
            <RecordingPlayer
              title="ito n khizar"
              audioSrc="/recordings/ito-n-khizar.m4a"
              subtitlesSrc="/recordings/ito-n-khizar-subtitles.json"
            />
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
                {project.details && (
                  <div className="ml-4 text-xs text-text-muted">
                    - {project.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Email & Prompts */}
        <div className="mt-4 flex gap-4">
          <a
            href="mailto:khizarmalik2003@gmail.com"
            className="text-sm text-text-secondary hover:text-teal underline transition-colors"
          >
            email me
          </a>
          <a
            href="/prompts"
            className="text-sm text-text-secondary hover:text-teal underline transition-colors"
          >
            prompts
          </a>
        </div>

      </div>
    </div>
  )
}
