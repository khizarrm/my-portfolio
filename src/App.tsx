import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import WorkExperience from './components/WorkExperience';
import Background from './components/Background';

function App() {
  return (
    <div className="min-h-screen bg-dark text-gray-100">
      {/* Animated background overlay */}
      <div className="fixed inset-0 gradient-animate -z-10" />
      
      {/* Animated glow lines */}
      <div className="fixed inset-0 -z-5 overflow-hidden opacity-20">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="glow-line absolute w-full"
            style={{
              top: `${i * 20}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
      <Background />
      <Header />
      <main className="relative">
        <Hero />
        <Projects />
        <WorkExperience />
      </main>
      <footer className="py-8 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Khizar Malik. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;