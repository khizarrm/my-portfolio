import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Instagram } from 'lucide-react';

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a 
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-white"
            whileHover={{ scale: 1.05 }}
          >
            KM
          </motion.a>
          
          <div className="flex items-center space-x-6">
            <SocialLink href="https://github.com/khizarrm" icon={<Github size={20} />} />
            <SocialLink href="https://www.instagram.com/khizar.mm" icon={<Instagram size={20} />} />
            <SocialLink href="https://www.linkedin.com/in/khizar--malik/" icon={<Linkedin size={20} />} />
            <SocialLink href="mailto:khizarmalik@cmail.carleton.ca" icon={<Mail size={20} />} />
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
}