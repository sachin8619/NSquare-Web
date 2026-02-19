import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/services/${slug}`)
      .then(res => res.json())
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching service detail:', err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="container py-20">Loading...</div>;
  if (!service) return <div className="container py-20 text-center">Service not found.</div>;

  return (
    <div className="py-20">
      <section className="container">
        <Link to="/services" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-8 font-medium">
          <ArrowLeft size={18} /> Back to Services
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-black text-primary mb-6">{service.title}</h1>
            <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed mb-12">
              {service.fullDescription}
            </div>

            <h3 className="text-2xl font-bold text-primary mb-6">Our Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.processSteps?.map((step: string, index: number) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-accent rounded-xl border border-black/5">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {index + 1}
                  </div>
                  <span className="font-semibold text-primary">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card bg-primary text-white sticky top-24">
              <h3 className="text-xl font-bold mb-6">Need this service?</h3>
              <p className="text-white/70 mb-8">
                Contact us today to discuss your project requirements and get a professional consultation.
              </p>
              <Link to="/contact" className="btn bg-white text-primary hover:bg-opacity-90 w-full mb-4">
                Get a Quote
              </Link>
              <div className="space-y-4 mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-white/50" />
                  <span>Expert Consultation</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-white/50" />
                  <span>Quality Assurance</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-white/50" />
                  <span>Timely Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
