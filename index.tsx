import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Building2, 
  HardHat, 
  DraftingCompass, 
  Calculator, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight,
  Menu,
  X,
  LayoutDashboard,
  Users,
  Briefcase,
  MessageSquare,
  ArrowRight,
  Settings
} from 'lucide-react';

// --- Types & Interfaces ---
interface Project {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial';
  location: string;
  description: string;
  image: string;
  completionDate: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  process: string[];
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  createdAt: string;
}

// --- Initial Data ---
const initialServices: Service[] = [
  { id: '1', title: 'Structural Design', description: 'Advanced analysis and design of structural systems for stability and longevity.', icon: 'Building2', process: ['Site Analysis', 'Load Calculation', 'Blueprint Generation', 'Quality Audit'] },
  { id: '2', title: 'RCC & Building Planning', description: 'Comprehensive architectural planning and reinforced concrete design.', icon: 'DraftingCompass', process: ['Conceptualization', 'Compliance Check', 'RCC Modeling', 'Permit Support'] },
  { id: '3', title: 'Site Supervision', description: 'Rigorous on-site management to ensure construction aligns with design specs.', icon: 'HardHat', process: ['Safety Check', 'Material Inspection', 'Progress Monitoring', 'Daily Reporting'] },
  { id: '4', title: 'Estimation & BOQ', description: 'Precise quantity surveying and budget estimation for project feasibility.', icon: 'Calculator', process: ['Document Review', 'Quantity Takeoff', 'Price Analysis', 'Final Report'] },
  { id: '5', title: 'Renovation Consulting', description: 'Expert guidance for structural modifications and vintage building restoration.', icon: 'Wrench', process: ['Structural Audit', 'Feasibility Study', 'Design Proposal', 'Supervision'] },
  { id: '6', title: 'Structural Consultancy', description: 'Third-party peer review and structural health monitoring services.', icon: 'ShieldCheck', process: ['Reviewing Plans', 'Stress Testing', 'Remediation Advice', 'Certification'] },
];

const initialProjects: Project[] = [
  { id: '1', title: 'Skyline Heights', category: 'Residential', location: 'Downtown Metro', description: 'A 12-story luxury residential complex focusing on sustainable structural design.', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800', completionDate: '2023-11-15' },
  { id: '2', title: 'Nova Plaza', category: 'Commercial', location: 'Business Hub', description: 'Modern office space with expansive open floors and innovative RCC frames.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', completionDate: '2024-02-10' },
  { id: '3', title: 'Green Valley Villas', category: 'Residential', location: 'Suburb Hills', description: 'Seismic-resistant design for high-end residential villas.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', completionDate: '2023-08-20' },
  { id: '4', title: 'Industrial Tech Hub', category: 'Commercial', location: 'East Industrial Zone', description: 'Large-scale steel and concrete structural planning for heavy machinery.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800', completionDate: '2023-12-01' },
];

const initialTeam: TeamMember[] = [
  { id: '1', name: 'Eng. Michael Sterling', role: 'Founder & Chief Civil Engineer', bio: '20+ years of experience in structural engineering and urban planning.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'Sarah Chen', role: 'Structural Engineer', bio: 'Specialist in earthquake-resistant design and high-rise RCC frames.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'David Miller', role: 'Site Engineer', bio: 'Expert in site logistics, safety management, and execution monitoring.', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: 'Alex Rivera', role: 'Draftsman', bio: 'Highly skilled in AutoCAD, Revit, and detailed engineering blueprints.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
  { id: '5', name: 'Emma Watson', role: 'Estimator', bio: 'Precision-focused on BOQ preparation and cost-effective material sourcing.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' },
];

// --- Components ---

const Navbar = ({ currentRoute, setRoute }: { currentRoute: string, setRoute: (r: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => setRoute('home')}>
            <div className="bg-slate-900 p-2 rounded mr-3">
              <Building2 className="text-white h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">STERLING</span>
              <span className="block text-[10px] text-slate-500 font-semibold uppercase tracking-[0.2em] -mt-1">Engineering</span>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => setRoute(link.id)}
                className={`text-sm font-medium transition-colors ${currentRoute === link.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => setRoute('admin')}
              className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <Settings size={18} />
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-2">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => { setRoute(link.id); setIsOpen(false); }}
              className="block w-full text-left px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              {link.name}
            </button>
          ))}
          <button 
             onClick={() => { setRoute('admin'); setIsOpen(false); }}
             className="flex items-center w-full text-left px-4 py-3 text-base font-medium text-slate-400 hover:bg-slate-50 rounded-lg"
          >
            <Settings size={18} className="mr-2" /> Admin Panel
          </button>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ setRoute }: { setRoute: (r: string) => void }) => (
  <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center mb-6">
          <div className="bg-white p-1.5 rounded mr-3">
            <Building2 className="text-slate-900 h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">STERLING</span>
        </div>
        <p className="text-sm leading-relaxed mb-6">
          Providing world-class structural solutions and civil engineering expertise for residential and commercial landmarks.
        </p>
        <div className="flex space-x-4">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
            <span className="text-xs font-bold">in</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
            <span className="text-xs font-bold">f</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-white font-semibold mb-6">Quick Links</h3>
        <ul className="space-y-4 text-sm">
          {['About', 'Services', 'Projects', 'Contact'].map(item => (
            <li key={item}>
              <button onClick={() => setRoute(item.toLowerCase())} className="hover:text-white transition-colors">
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-white font-semibold mb-6">Services</h3>
        <ul className="space-y-4 text-sm">
          <li>Structural Design</li>
          <li>RCC Planning</li>
          <li>Site Supervision</li>
          <li>Project Estimation</li>
        </ul>
      </div>

      <div>
        <h3 className="text-white font-semibold mb-6">Contact Us</h3>
        <ul className="space-y-4 text-sm">
          <li className="flex items-start">
            <MapPin size={18} className="mr-3 text-blue-500 shrink-0" />
            <span>123 Engineering Way, Suite 500,<br/>Skyline City, SC 45678</span>
          </li>
          <li className="flex items-center">
            <Phone size={18} className="mr-3 text-blue-500 shrink-0" />
            <span>+1 (555) 123-4567</span>
          </li>
          <li className="flex items-center">
            <Mail size={18} className="mr-3 text-blue-500 shrink-0" />
            <span>office@sterling-eng.com</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 uppercase tracking-widest">
      © 2024 Sterling Civil Engineering Office. All Rights Reserved.
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ setRoute, projects }: { setRoute: (r: string) => void, projects: Project[] }) => (
  <div>
    <section className="hero-gradient relative py-32 md:py-48 px-4 flex items-center">
      <div className="max-w-7xl mx-auto w-full text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl">
          Reliable Civil Engineering & Construction Solutions
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl font-light">
          Delivering precision-engineered structures and innovative consultancy for modern infrastructure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button 
            onClick={() => setRoute('contact')}
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20"
          >
            Get Free Consultation
          </button>
          <button 
            onClick={() => setRoute('projects')}
            className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm"
          >
            View Projects
          </button>
        </div>
      </div>
    </section>

    {/* Services Overview */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">Expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Comprehensive Engineering Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initialServices.map((service) => (
            <div key={service.id} className="p-8 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-all hover:shadow-xl group">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {service.id === '1' && <Building2 />}
                {service.id === '2' && <DraftingCompass />}
                {service.id === '3' && <HardHat />}
                {service.id === '4' && <Calculator />}
                {service.id === '5' && <Wrench />}
                {service.id === '6' && <ShieldCheck />}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.description}</p>
              <button 
                onClick={() => setRoute('services')}
                className="text-blue-600 font-semibold text-sm flex items-center hover:gap-2 transition-all"
              >
                Learn More <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-blue-500 font-bold text-sm uppercase tracking-widest">Our Edge</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-8">Why Industry Leaders Trust Sterling</h2>
          <div className="space-y-6">
            {[
              { title: 'Decades of Mastery', desc: 'Over 20 years of hands-on experience in complex structural environments.' },
              { title: 'Zero-Safety Compromise', desc: 'Industry-leading site supervision protocols ensuring 100% compliance.' },
              { title: 'Cost-Effective Planning', desc: 'Smart BOQ and material estimation that saves up to 15% on construction costs.' },
              { title: 'Modern Methodology', desc: 'Utilizing latest BIM and 3D modeling technologies for precision execution.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
           <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000" 
            alt="Construction Blueprint" 
            className="rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
          />
        </div>
      </div>
    </section>

    {/* Recent Projects Preview */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">Recent Projects</h2>
          </div>
          <button onClick={() => setRoute('projects')} className="hidden sm:flex items-center text-blue-600 font-semibold gap-2">
            View All Projects <ArrowRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.slice(0, 4).map((project) => (
            <div key={project.id} className="group cursor-pointer" onClick={() => setRoute('projects')}>
              <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-[10px] font-bold uppercase text-slate-900 shadow-sm">
                  {project.category}
                </div>
              </div>
              <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">{project.title}</h3>
              <p className="text-slate-500 text-sm flex items-center mt-1">
                <MapPin size={14} className="mr-1" /> {project.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Client Testimonials</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "John Davidson", role: "CEO, Urban Living Group", text: "Sterling Engineering transformed our vision into a structurally sound masterpiece. Their attention to detail in the RCC planning phase was unparalleled." },
            { name: "Maria Rodriguez", role: "Site Developer", text: "The most professional engineering firm I have worked with. Their site supervision reduced our timeline by 3 weeks without compromising safety." },
            { name: "Robert Smith", role: "Industrial Investor", text: "Their BOQ and estimation services are precise. We stayed 100% on budget for our warehouse expansion thanks to Eng. Sterling." }
          ].map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
              </div>
              <p className="text-slate-600 italic mb-6">"{t.text}"</p>
              <div>
                <h4 className="font-bold text-slate-900">{t.name}</h4>
                <p className="text-xs text-slate-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to Start Your Project?</h2>
        <p className="text-blue-100 text-lg mb-10">Consult with our lead engineers today and get a free initial structural assessment.</p>
        <button 
          onClick={() => setRoute('contact')}
          className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-slate-100 transition-all shadow-2xl"
        >
          Contact Our Office
        </button>
      </div>
    </section>
  </div>
);

const AboutPage = ({ team }: { team: TeamMember[] }) => (
  <div className="bg-white">
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Practice</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
          Sterling Civil Engineering was founded on the principles of integrity, technical excellence, and innovative problem-solving in the built environment.
        </p>
      </div>
    </section>

    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Founder's Vision</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            "Engineering is not just about concrete and steel; it's about creating safe, sustainable spaces where communities thrive. At Sterling, we bridge the gap between architectural dreams and structural reality."
          </p>
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
              <img src={team[0]?.image} alt="Founder" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Michael Sterling</h4>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest">Founder & Chief Engineer</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 p-10 rounded-2xl border border-slate-100">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ShieldCheck className="text-blue-600" /> Professional Registrations
          </h3>
          <ul className="space-y-4 text-sm text-slate-600">
            <li className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span>Licensed Professional Engineer (PE)</span>
              <span className="font-bold text-slate-900">Active</span>
            </li>
            <li className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span>Member of Structural Engineers Assoc.</span>
              <span className="font-bold text-slate-900">Certified</span>
            </li>
            <li className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span>Green Building Council Member</span>
              <span className="font-bold text-slate-900">Verified</span>
            </li>
            <li className="flex justify-between items-center">
              <span>ISO 9001:2015 Quality Management</span>
              <span className="font-bold text-slate-900">Compliant</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center">Meet the Core Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {team.map((member) => (
            <div key={member.id} className="text-center group">
              <div className="relative mb-4 overflow-hidden rounded-xl aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-500 shadow-sm border border-white">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
              </div>
              <h4 className="font-bold text-slate-900">{member.name}</h4>
              <p className="text-xs text-blue-600 font-semibold uppercase tracking-widest mb-2">{member.role}</p>
              <p className="text-[11px] text-slate-500 leading-relaxed px-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const ServicesPage = () => (
  <div className="bg-white">
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Engineering Services</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">Specialized structural solutions tailored to residential and commercial challenges.</p>
      </div>
    </section>

    <div className="max-w-7xl mx-auto px-4 py-24 space-y-32">
      {initialServices.map((service, idx) => (
        <div key={service.id} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
          <div className="flex-1">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
               {service.id === '1' && <Building2 size={32} />}
               {service.id === '2' && <DraftingCompass size={32} />}
               {service.id === '3' && <HardHat size={32} />}
               {service.id === '4' && <Calculator size={32} />}
               {service.id === '5' && <Wrench size={32} />}
               {service.id === '6' && <ShieldCheck size={32} />}
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{service.title}</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">{service.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {service.process.map((step, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">0{i+1}</span>
                  <span className="text-sm font-medium text-slate-700">{step}</span>
                </div>
              ))}
            </div>
            <button className="px-8 py-3 bg-slate-900 text-white font-bold rounded hover:bg-slate-800 transition-all flex items-center gap-2">
              Inquire About {service.title} <ArrowRight size={18} />
            </button>
          </div>
          <div className="flex-1 bg-slate-100 rounded-2xl aspect-[16/10] overflow-hidden shadow-inner">
             <img 
               src={`https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000&sig=${idx}`} 
               alt={service.title}
               className="w-full h-full object-cover opacity-80"
             />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProjectsPage = ({ projects }: { projects: Project[] }) => {
  const [filter, setFilter] = useState<'All' | 'Residential' | 'Commercial'>('All');
  
  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter(p => p.category === filter);
  }, [filter, projects]);

  return (
    <div className="bg-white min-h-screen pb-24">
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Project Portfolio</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">A showcase of structural excellence across various sectors.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex justify-center gap-4 mb-16">
          {['All', 'Residential', 'Commercial'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === f ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">
                  <MapPin size={14} className="mr-1 text-blue-500" /> {project.location}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{project.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>
                <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed: {new Date(project.completionDate).getFullYear()}</span>
                   <button className="text-blue-600 font-bold text-sm hover:underline">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage = ({ onInquiry }: { onInquiry: (i: Omit<Inquiry, 'id' | 'createdAt'>) => void }) => {
  const [form, setForm] = useState({ name: '', phone: '', projectType: 'Residential', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInquiry(form);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', projectType: 'Residential', budget: '', message: '' });
    }, 3000);
  };

  return (
    <div className="bg-white">
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Discuss Your Project</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Our engineering team is ready to provide the expertise you need.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Contact Information</h2>
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Office Address</h4>
                  <p className="text-slate-600">123 Engineering Way, Suite 500, Skyline City, SC 45678</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Phone Number</h4>
                  <p className="text-slate-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Email Address</h4>
                  <p className="text-slate-600">office@sterling-eng.com</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <h4 className="font-bold mb-4">Direct WhatsApp Support</h4>
              <p className="text-slate-400 text-sm mb-6">Need quick answers? Chat with our site supervisor directly.</p>
              <button className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                 <MessageSquare size={20} /> Chat on WhatsApp
              </button>
            </div>
            
            <div className="mt-12 h-64 bg-slate-200 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                 Google Maps Placeholder
              </div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.7281066703!2d-0.241681!3d51.5287718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon!5e0!3m2!1sen!2suk!4v1700000000000" 
                className="w-full h-full grayscale border-0" 
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Send an Inquiry</h2>
            {submitted ? (
              <div className="bg-green-50 text-green-700 p-8 rounded-xl text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                <p>One of our engineers will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Project Type</label>
                    <select 
                      value={form.projectType}
                      onChange={e => setForm({...form, projectType: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Structural Audit</option>
                      <option>Renovation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Estimated Budget Range</label>
                    <input 
                      type="text" 
                      value={form.budget}
                      onChange={e => setForm({...form, budget: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                      placeholder="e.g. $50k - $100k"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Project Description</label>
                  <textarea 
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" 
                    placeholder="Tell us about your structural needs..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20"
                >
                  Send Inquiry Now
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const AdminPanel = ({ 
  projects, setProjects, 
  team, setTeam, 
  inquiries, 
  setRoute 
}: { 
  projects: Project[], setProjects: any, 
  team: TeamMember[], setTeam: any,
  inquiries: Inquiry[],
  setRoute: any
}) => {
  const [tab, setTab] = useState<'Inquiries' | 'Projects' | 'Team'>('Inquiries');

  const deleteProject = (id: string) => setProjects(projects.filter(p => p.id !== id));
  const deleteTeam = (id: string) => setTeam(team.filter(t => t.id !== id));

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200 px-4 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <LayoutDashboard className="text-blue-600" /> Admin Dashboard
          </h1>
          <button onClick={() => setRoute('home')} className="text-xs font-bold uppercase text-slate-400 hover:text-slate-900">
            Exit Admin
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-4 mb-12 overflow-x-auto pb-2">
          {[
            { id: 'Inquiries', icon: MessageSquare, count: inquiries.length },
            { id: 'Projects', icon: Briefcase, count: projects.length },
            { id: 'Team', icon: Users, count: team.length }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all whitespace-nowrap ${tab === t.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
            >
              <t.icon size={20} /> {t.id} <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full">{t.count}</span>
            </button>
          ))}
        </div>

        {tab === 'Inquiries' && (
          <div className="space-y-4">
            {inquiries.length === 0 ? (
              <div className="text-center py-20 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">No inquiries yet.</div>
            ) : (
              inquiries.slice().reverse().map(inq => (
                <div key={inq.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-slate-900">{inq.name}</h4>
                      <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded uppercase">{inq.projectType}</span>
                    </div>
                    <div className="text-xs text-slate-500 flex gap-4 mb-4">
                      <span className="flex items-center gap-1"><Phone size={12}/> {inq.phone}</span>
                      <span className="flex items-center gap-1"><Calculator size={12}/> {inq.budget}</span>
                      <span className="flex items-center gap-1">Received: {new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">{inq.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'Projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button className="h-full min-h-[300px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
              <PlusCircle size={40} className="mb-2" />
              <span className="font-bold">Add New Project</span>
            </button>
            {projects.map(p => (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 group">
                <div className="h-40 relative">
                  <img src={p.image} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <button onClick={() => deleteProject(p.id)} className="p-2 bg-red-50 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-slate-900">{p.title}</h4>
                  <p className="text-xs text-slate-500">{p.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'Team' && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {team.map(m => (
              <div key={m.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 ring-2 ring-slate-100 group-hover:ring-blue-100 transition-all">
                  <img src={m.image} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-slate-900">{m.name}</h4>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{m.role}</p>
                <button onClick={() => deleteTeam(m.id)} className="mt-4 text-xs text-red-500 font-bold hover:underline">Remove Member</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PlusCircle = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

// --- Main App ---

const App = () => {
  const [route, setRoute] = useState('home');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Simulated Database Persistence
  useEffect(() => {
    const savedProjects = localStorage.getItem('sterling_projects');
    const savedTeam = localStorage.getItem('sterling_team');
    const savedInquiries = localStorage.getItem('sterling_inquiries');
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedTeam) setTeam(JSON.parse(savedTeam));
    if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
  }, []);

  useEffect(() => {
    localStorage.setItem('sterling_projects', JSON.stringify(projects));
    localStorage.setItem('sterling_team', JSON.stringify(team));
    localStorage.setItem('sterling_inquiries', JSON.stringify(inquiries));
  }, [projects, team, inquiries]);

  const handleInquiry = (data: Omit<Inquiry, 'id' | 'createdAt'>) => {
    const newInq: Inquiry = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setInquiries([...inquiries, newInq]);
  };

  const renderRoute = () => {
    switch(route) {
      case 'home': return <HomePage setRoute={setRoute} projects={projects} />;
      case 'about': return <AboutPage team={team} />;
      case 'services': return <ServicesPage />;
      case 'projects': return <ProjectsPage projects={projects} />;
      case 'contact': return <ContactPage onInquiry={handleInquiry} />;
      case 'admin': return <AdminPanel 
        projects={projects} setProjects={setProjects}
        team={team} setTeam={setTeam}
        inquiries={inquiries}
        setRoute={setRoute}
      />;
      default: return <HomePage setRoute={setRoute} projects={projects} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {route !== 'admin' && <Navbar currentRoute={route} setRoute={setRoute} />}
      <main className="flex-grow">
        {renderRoute()}
      </main>
      {route !== 'admin' && <Footer setRoute={setRoute} />}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
