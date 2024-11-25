import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import WeatherApp from '../images/WeatherApp.png'
import Playlist from '../images/Playlist.png'
import Calculator from '../images/calculator.png'
import Portfolio from '../images/portfolio.png'

const projects = [
  {
    title: 'Weather App',
    description: "Built with JavaScript and the Visual Crossing Weather API, this responsive web application delivers real-time weather insights with an intuitive interface. Users can search any location to instantly access current conditions, hourly forecasts, and extended predictions, complete with visual indicators for temperature, precipitation, wind conditions, and other vital meteorological data. The application features dynamic data visualization and seamless error handling to ensure reliable weather information delivery.",
    image: WeatherApp,
    tags: ['JavaScript', 'HTML', 'CSS', 'Webpack', 'Visual Crossing API'],
    github: 'https://github.com/khizarrm/JS-WeatherApp',
    demo : "https://khizarrm.github.io/JS-WeatherApp/"
  },
  {
    title: 'DungeonSim: Procedural Escape',
    description: "Developed in C++ within a Linux environment, this 2D grid-based simulation showcases object-oriented programming principles through an engaging procedural escape scenario. The application features multiple character classes with distinct behaviors and AI-driven interactions, supporting dynamic player positioning and pathfinding algorithms. Built with robust memory management and extensive debugging protocols, the simulation demonstrates advanced software engineering practices including polymorphism, UML modeling, and comprehensive testing methodologies.",
    image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&w=800&q=80',
    tags: ['C++', 'Linux', 'Valgrind', 'GDB'],
    github: 'https://github.com/khizarrm/2d-Game-Simulation',
    demo: 'https://demo.com'
  },
  {
    title: 'Itunes Playlist Application',
    description: "Built with JavaScript and Express.js, this full-stack web application interfaces with the iTunes API to create a dynamic playlist management system. Users can search and browse music tracks, with features including real-time song addition, playlist reordering, and persistent storage. The application demonstrates proficiency in RESTful API integration, DOM manipulation, and modern web development practices.",
    image: Playlist,
    tags: ['JavaScript', 'RESTful APIs', 'Itunes API', 'Express.js'],
    github: 'https://github.com/khizarrm/Itunes-Playlist',
    demo: 'https://demo.com'
  },
  {
    title: 'Calculator',
    description: "A lightweight calculator web application built with JavaScript that performs basic arithmetic operations through an intuitive user interface.",
    image: Calculator,
    tags: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/khizarrm/TOP-Calculator',
    demo: 'https://khizarrm.github.io/TOP-Calculator/'
  },
  {
    title: 'Portfolio',
    description: "A modern portfolio website built with React, TypeScript, and Tailwind CSS, enhanced by AI-powered design generation through Bolt.new. The site showcases professional projects and skills through a responsive, visually engaging interface.",
    image: Portfolio,
    tags: ['React', 'TypeScript', 'Tailwind', 'Lucide-React'],
    github: 'https://github.com',
    demo: 'https://demo.com'
  }
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const projectsPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + projectsPerPage >= projects.length ? 0 : prevIndex + projectsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - projectsPerPage < 0 ? projects.length - projectsPerPage : prevIndex - projectsPerPage
    );
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">

      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl font-bold text-white mb-12 text-glow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        
        <div className="relative">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {projects.slice(currentIndex, currentIndex + projectsPerPage).map((project, index) => (
              <ProjectCard key={currentIndex + index} project={project} index={index} />
            ))}
          </motion.div>

          <div className="absolute top-1/2 -left-4 -translate-y-1/2">
            <motion.button
              onClick={prevSlide}
              className="p-2 rounded-full bg-dark-lighter text-primary hover:text-primary-light purple-glow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="absolute top-1/2 -right-4 -translate-y-1/2">
            <motion.button
              onClick={nextSlide}
              className="p-2 rounded-full bg-dark-lighter text-primary hover:text-primary-light purple-glow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * projectsPerPage)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / projectsPerPage) === index
                  ? 'bg-primary'
                  : 'bg-dark-lighter'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ delay: index * 0.1 }}
    className="bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
  >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-lighter to-transparent" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 text-glow">
          {project.title}
        </h3>
        
        <p className="text-gray-400 mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag: string) => (
            <span 
              key={tag}
              className="px-3 py-1 text-sm bg-dark text-primary rounded-full animate-pulse-slow"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-light"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
          </motion.a>
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-light"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={20} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}