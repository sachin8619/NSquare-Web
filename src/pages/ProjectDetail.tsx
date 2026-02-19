import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, User, CheckCircle } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(res => res.json())
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching project detail:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container py-20">Loading...</div>;
  if (!project) return <div className="container py-20 text-center">Project not found.</div>;

  return (
    <div className="py-20">
      <section className="container">
        <Link to="/projects" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-8 font-medium">
          <ArrowLeft size={18} /> Back to Portfolio
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-4">{project.title}</h1>
          <p className="text-xl text-text-secondary font-semibold mb-12 flex items-center gap-2">
            {project.category} <span className="text-primary/30">|</span> {project.location}
          </p>
          
          <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl mb-16">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-primary mb-6">Project Overview</h3>
              <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed">
                {project.fullDescription}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="card bg-accent/50 border-l-4 border-primary p-8">
                <h3 className="text-xl font-bold text-primary mb-8">Project Details</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <User className="text-primary shrink-0" size={20} />
                    <div>
                      <div className="text-xs uppercase tracking-widest font-bold text-text-secondary mb-1">Client</div>
                      <div className="font-bold text-primary">{project.client}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="text-primary shrink-0" size={20} />
                    <div>
                      <div className="text-xs uppercase tracking-widest font-bold text-text-secondary mb-1">Location</div>
                      <div className="font-bold text-primary">{project.location}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Calendar className="text-primary shrink-0" size={20} />
                    <div>
                      <div className="text-xs uppercase tracking-widest font-bold text-text-secondary mb-1">Year</div>
                      <div className="font-bold text-primary">{project.year}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="text-primary shrink-0" size={20} />
                    <div>
                      <div className="text-xs uppercase tracking-widest font-bold text-text-secondary mb-1">Status</div>
                      <div className="font-bold text-primary">{project.status}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ProjectDetail;
