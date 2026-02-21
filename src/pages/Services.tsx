import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const Services: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    // Update document title for SEO
    document.title = "Our Services | N-Squre Engineering";
    
    fetch('/api/services')
      .then(res => {
        const contentType = res.headers.get('content-type');
        if (res.ok && contentType && contentType.includes('application/json')) {
          return res.json();
        }
        throw new Error(`Server error: ${res.status}`);
      })
      .then(data => setServices(data || []))
      .catch(err => console.error('Error fetching services:', err));
  }, []);

  return (
    <div className="py-20 bg-white">
      <section className="container mb-16">
        <h1 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tight">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-2xl font-light">
          Comprehensive civil engineering and consultancy solutions designed for excellence and sustainability.
        </p>
      </section>

      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group bg-white p-8 border-r border-b border-black hover:bg-black hover:text-white transition-colors duration-300 flex flex-col"
            >
              <h2 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                {service.title}
              </h2>
              <p className="text-gray-600 mb-8 line-clamp-3 group-hover:text-gray-300 transition-colors flex-grow">
                {service.shortDescription}
              </p>
              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center justify-center px-6 py-3 border border-black text-black font-semibold hover:bg-white hover:text-black group-hover:border-white group-hover:text-white transition-colors duration-300 mt-auto"
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
