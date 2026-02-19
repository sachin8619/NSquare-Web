import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data || []))
      .catch(err => console.error('Error fetching services:', err));
  }, []);

  return (
    <div className="py-20">
      <section className="container mb-16">
        <h1 className="text-4xl font-black text-primary mb-4">Our Services</h1>
        <p className="text-text-secondary max-w-2xl">
          Comprehensive civil engineering and consultancy solutions designed for excellence and sustainability.
        </p>
      </section>

      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="card border-t-4 border-primary group hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-primary/80 transition-colors">
                {service.title}
              </h3>
              <p className="text-text-secondary mb-8 line-clamp-3">
                {service.shortDescription}
              </p>
              <Link
                to={`/services/${service.slug}`}
                className="btn btn-outline w-full text-sm group-hover:bg-primary group-hover:text-white"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
