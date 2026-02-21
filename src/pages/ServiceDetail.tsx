import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Send } from 'lucide-react';

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
        if (data && data.title) {
          document.title = `${data.title} | N-Squre Engineering`;
        }
      })
      .catch(err => {
        console.error('Error fetching service detail:', err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="container py-20 min-h-[60vh] flex items-center justify-center">Loading...</div>;
  if (!service) return <div className="container py-20 min-h-[60vh] flex items-center justify-center text-center">Service not found.</div>;

  return (
    <div className="py-20 bg-white">
      <section className="container">
        <Link to="/services" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-12 font-medium transition-colors">
          <ArrowLeft size={18} /> Back to Services
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-black text-black mb-8 tracking-tight leading-tight">
                {service.title}
              </h1>
              
              <div className="w-full h-px bg-black/10 mb-12"></div>
              
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-16 font-light">
                <p className="text-2xl text-black font-medium mb-8 leading-snug">
                  {service.shortDescription}
                </p>
                <p>
                  {service.fullDescription}
                </p>
              </div>

              <h2 className="text-3xl font-bold text-black mb-8 tracking-tight">Our Process</h2>
              <div className="space-y-6 mb-16">
                {service.processSteps?.map((step: string, index: number) => (
                  <div key={index} className="flex items-start gap-6 p-6 border border-black/10 rounded-none hover:border-black transition-colors">
                    <div className="w-12 h-12 rounded-full border-2 border-black text-black flex items-center justify-center font-bold text-xl shrink-0">
                      {index + 1}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold text-black">{step}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-black text-white p-8 mb-8">
                <h3 className="text-2xl font-bold mb-4">Need this service?</h3>
                <p className="text-gray-400 mb-8 font-light">
                  Contact us today to discuss your project requirements and get a professional consultation.
                </p>
                <a href="#contact-preview" className="inline-flex items-center justify-center px-6 py-4 bg-white text-black font-bold w-full hover:bg-gray-200 transition-colors">
                  Get a Quote
                </a>
                <div className="space-y-4 mt-8 pt-8 border-t border-white/20">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={18} className="text-white" />
                    <span>Expert Consultation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={18} className="text-white" />
                    <span>Quality Assurance</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={18} className="text-white" />
                    <span>Timely Delivery</span>
                  </div>
                </div>
              </div>

              {/* Contact Form Preview */}
              <div id="contact-preview" className="border border-black p-8">
                <h3 className="text-xl font-bold text-black mb-6">Quick Inquiry</h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent!'); }}>
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none transition-colors bg-gray-50"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none transition-colors bg-gray-50"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Tell us about your project..."
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-black/20 focus:border-black outline-none transition-colors bg-gray-50 resize-none"
                    ></textarea>
                  </div>
                  <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-bold w-full hover:bg-gray-800 transition-colors">
                    Send Inquiry <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
