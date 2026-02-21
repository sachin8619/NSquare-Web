import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Home: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/home-data')
      .then(res => res.json())
      .then(data => {
        setServices(data.services || []);
        setProjects(data.projects || []);
      })
      .catch(err => console.error('Error fetching home data:', err));
  }, []);

  return (
    <div>
      {/* Hero Section with Parallax */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url("https://picsum.photos/seed/civilengineering/1920/1080")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-black/60"></div>
        <div className="container relative z-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-secondary text-white font-bold text-sm uppercase tracking-wider mb-6 shadow-lg">
              Engineering Excellence
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg">
              Building the Future <br />
              <span className="text-secondary">With Precision</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed drop-shadow-md">
              Complete Civil Engineering & Consultancy Solutions for a sustainable future. We bring innovation, expertise, and vibrant design to every project.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn btn-secondary border-none">
                Get a Quote
              </Link>
              <Link to="/projects" className="btn bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/30">
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Our Core Services</h2>
              <p className="text-text-secondary max-w-xl">
                We offer a wide range of engineering and consultancy services tailored to meet your specific needs.
              </p>
            </div>
            <Link to="/services" className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
              All Services <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card border-t-4 border-primary group hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-primary/80 transition-colors">
                  {service.title}
                </h3>
                <p className="text-text-secondary mb-6 line-clamp-3">
                  {service.shortDescription}
                </p>
                <Link to={`/services/${service.slug}`} className="btn btn-outline w-full text-sm">
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-4xl font-black mb-2">100+</div>
              <div className="text-white/70 uppercase tracking-widest text-xs font-bold">Projects Done</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">50+</div>
              <div className="text-white/70 uppercase tracking-widest text-xs font-bold">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">10+</div>
              <div className="text-white/70 uppercase tracking-widest text-xs font-bold">Years Exp.</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">15+</div>
              <div className="text-white/70 uppercase tracking-widest text-xs font-bold">Experts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-accent/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Recent Projects</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Take a look at some of our most recent and impactful engineering projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project._id || project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                  <Link
                    to={`/projects/${project._id || project.id}`}
                    className="inline-flex items-center gap-2 text-primary font-bold text-sm"
                  >
                    View Project <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
