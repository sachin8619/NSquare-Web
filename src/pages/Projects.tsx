import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => {
        const contentType = res.headers.get('content-type');
        if (res.ok && contentType && contentType.includes('application/json')) {
          return res.json();
        }
        throw new Error(`Server error: ${res.status}`);
      })
      .then(data => setProjects(data || []))
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  return (
    <div className="py-20">
      <section className="container mb-16">
        <h1 className="text-4xl font-black text-primary mb-4">Our Portfolio</h1>
        <p className="text-text-secondary max-w-2xl">
          A showcase of our engineering excellence across residential, commercial, and public infrastructure projects.
        </p>
      </section>

      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id || project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-black/5"
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
                <p className="text-text-secondary text-sm mb-6 line-clamp-2">
                  {project.shortDescription}
                </p>
                <Link
                  to={`/projects/${project._id || project.id}`}
                  className="btn btn-outline w-full text-sm group-hover:bg-primary group-hover:text-white"
                >
                  View Project Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
