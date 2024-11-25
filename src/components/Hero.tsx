import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Resume from '../resume.pdf'

export default function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
        <motion.h1 
        className="text-6xl md:text-8xl font-bold text-white mb-6" // Increased from text-5xl/text-7xl
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Hi, I'm <span className="text-purple-500">Khizar</span>
      </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-400 mb-8"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
          >
            An ambitious Computer Science student specializing in AI and full-stack development. Passionate about exploring cutting-edge technologies and building innovative solutions. Currently seeking Winter 2025 co-op opportunities to make meaningful contributions in tech.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors purple-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.a>
            
            <motion.a
            href= {Resume} target='_blank'
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}