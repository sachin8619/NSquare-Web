import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  const team = [
    { name: 'Er. Name Here', role: 'Managing Director', color: 'bg-blue-500' },
    { name: 'Er. Name Here', role: 'Senior Structural Engineer', color: 'bg-emerald-500' },
    { name: 'Ar. Name Here', role: 'Senior Architect', color: 'bg-amber-500' },
  ];

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="bg-primary text-white py-24 rounded-b-[60px] mb-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-black mb-6">About Us</h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                N-Squre Engineering Design & Building pvt.Ltd is a premier civil engineering consultancy firm dedicated to excellence.
              </p>
              <p className="text-white/60 leading-relaxed">
                We specialize in providing high-quality engineering solutions, from structural analysis to construction supervision. Our team of dedicated professionals ensures that every project meets the highest standards of safety, durability, and aesthetics.
              </p>
            </motion.div>
            <div className="hidden md:block">
              <img
                src="https://picsum.photos/seed/about/800/600"
                alt="About Us"
                className="rounded-3xl shadow-2xl rotate-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="card bg-accent/50 border-none">
            <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
            <p className="text-text-secondary leading-relaxed">
              To provide innovative and sustainable engineering solutions that exceed client expectations while contributing to the development of safe and resilient infrastructure.
            </p>
          </div>
          <div className="card bg-primary/5 border-none">
            <h2 className="text-2xl font-bold text-primary mb-4">Our Vision</h2>
            <p className="text-text-secondary leading-relaxed">
              To be the most trusted and preferred engineering consultancy firm in the region, known for our technical expertise, integrity, and commitment to quality.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Leadership Team</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Meet the experts behind our successful projects and innovative designs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card text-center border-b-4 border-primary"
            >
              <div className={`w-24 h-24 ${member.color} rounded-full mx-auto mb-6 border-4 border-white shadow-md`} />
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-primary font-bold text-xs uppercase tracking-widest">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
