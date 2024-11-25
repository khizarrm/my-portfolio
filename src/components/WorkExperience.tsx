import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    position: 'Client Service Representative',
    company: 'Carleton University Residence, Ottawa, ON',
    period: 'Aug 2024 - Present',
    description:'* Leveraged EQ to stay calm and composed during challenging interactions, helping to de-escalate situations and provide clear solutions to 500+ distressed students\n* Used quick thinking to efficiently assess and prioritize student needs, directing them to the appropriate departments, enhancing the move-in experience for all students\n* Collaborated with 5+ team members and coordinated with departments to resolve complex issues, showcasing my ability to work in a team and provide personalized solutions to student problems',

    technologies: []
  },
  {
    position: 'Street Fundraiser',
    company: 'Public Outreach Fundraising',
    period: 'June 2024 - Aug 2024',
    description: '* Demonstrated strong emotional intelligence by reading non-verbal cues and adapting communication styles to 2000+ people, increasing positive interactions\n* Actively listened to concerns and shared compelling stories to create a sense of urgency and personal connection with the cause\n* Collaborated with team members to optimize locations, debrief on successful strategies, and maintain high morale in challenging environments',
    technologies: []
  },
  {
    position: 'Customer Service Representative',
    company: 'Elemental Data Collection',
    period: 'Jan 2024 - May 2024',
    description: '* Efficiently handled 100+ daily customer technical support queries, troubleshooting software issues and documenting solutions in internal knowledge base system\n* Leveraged problem-solving skills to systematically debug and resolve technical issues while maintaining a high customer satisfaction rate\n* Demonstrated proficiency in multiple CRM systems and ticketing platforms while managing concurrent customer interactions in a fast-paced technical environment',
    technologies: []
  },
];

export default function WorkExperience() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl font-bold text-white mb-12 text-glow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Work Experience
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Timeline line */}
              <div className="absolute left-[11px] top-0 h-full w-px bg-primary opacity-30" />
              
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary purple-glow flex items-center justify-center animate-pulse-slow">
                <Briefcase className="w-3 h-3 text-white" />
              </div>

              <div className="bg-dark-lighter rounded-lg p-6 shadow-lg ml-6 border-glow">
                <div className="flex flex-wrap items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white text-glow">
                    {experience.position}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {experience.period}
                  </span>
                </div>

                <h4 className="text-lg text-primary mb-4">
                  {experience.company}
                </h4>

                <p className="text-gray-400 mb-4">
                  {experience.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm bg-dark text-primary rounded-full animate-pulse-slow"
                      style={{
                        animationDelay: `${techIndex * 0.2}s`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}