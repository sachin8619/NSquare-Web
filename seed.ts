import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';
import Project from './models/Project.js';

dotenv.config();

const services = [
  {
    title: "Drawing Design and Estimation",
    slug: "drawing-design-estimation",
    shortDescription: "Complete architectural and structural drawings with precise cost estimation.",
    fullDescription: "We provide comprehensive drawing design services including 2D layouts, 3D elevations, and structural detailing. Our estimation services ensure you have a clear financial roadmap for your project, minimizing unexpected costs during construction.",
    processSteps: ["Site Visit", "Requirement Analysis", "Drafting", "Cost Estimation"]
  },
  {
    title: "Municipal Approval Services",
    slug: "municipal-approval-services",
    shortDescription: "Hassle-free processing of building permits and municipal approvals.",
    fullDescription: "Navigating municipal regulations can be complex. We handle all documentation, submission, and follow-up required to get your building plans approved by local authorities, ensuring full legal compliance for your construction.",
    processSteps: ["Document Collection", "Compliance Check", "Submission", "Approval"]
  },
  {
    title: "Survey and Design (2D & 3D)",
    slug: "survey-and-design",
    shortDescription: "Topographical surveys and immersive 2D/3D architectural designs.",
    fullDescription: "Our advanced surveying equipment ensures accurate land measurement. We combine this with state-of-the-art 2D and 3D modeling to visualize your project before construction begins, allowing for better spatial planning and aesthetic decisions.",
    processSteps: ["Land Survey", "Data Analysis", "Conceptual Design", "3D Rendering"]
  },
  {
    title: "Supervision of Civil Works",
    slug: "supervision-of-civil-works",
    shortDescription: "On-site supervision to ensure quality and adherence to design.",
    fullDescription: "Our engineers provide continuous on-site supervision to ensure construction follows the approved drawings and safety standards. We monitor material quality, workmanship, and progress to ensure the project stays on track.",
    processSteps: ["Site Inspection", "Quality Check", "Progress Reporting", "Final Handover"]
  },
  {
    title: "Structural Analysis",
    slug: "structural-analysis",
    shortDescription: "Ensuring the stability and safety of your buildings through advanced analysis.",
    fullDescription: "We use advanced software to analyze structural integrity, ensuring your building can withstand loads, earthquakes, and other environmental factors. Our analysis covers RCC, steel, and composite structures.",
    processSteps: ["Load Calculation", "Modeling", "Analysis", "Reporting"]
  },
  {
    title: "Property Valuation for Abroad Study & Financial Institutions",
    slug: "property-valuation",
    shortDescription: "Certified valuation reports for abroad study and financial institutions.",
    fullDescription: "Accurate property valuation services accepted by banks and embassies for visa processing and loan applications. We provide detailed reports based on current market trends and government norms.",
    processSteps: ["Site Visit", "Market Analysis", "Report Preparation", "Certification"]
  },
  {
    title: "Quality Control & Construction of Civil Works",
    slug: "quality-control-construction",
    shortDescription: "Rigorous quality control and professional construction services.",
    fullDescription: "We conduct rigorous testing of concrete, steel, and other materials to ensure they meet engineering standards. Our construction team executes projects with a focus on durability and precision.",
    processSteps: ["Sampling", "Lab Testing", "Execution", "Quality Audit"]
  },
  {
    title: "Preparation of IEE, EIA, DPR Reports",
    slug: "iee-eia-dpr-reports",
    shortDescription: "Expert preparation of environmental and detailed project reports.",
    fullDescription: "Expert preparation of Initial Environmental Examination (IEE), Environmental Impact Assessment (EIA), and Detailed Project Reports (DPR) for infrastructure projects, ensuring environmental sustainability and project feasibility.",
    processSteps: ["Data Collection", "Impact Assessment", "Drafting", "Submission"]
  },
  {
    title: "Document Preparation for Abroad Study",
    slug: "document-preparation-abroad-study",
    shortDescription: "Assistance with engineering and financial documents for abroad study.",
    fullDescription: "We help students prepare necessary property and engineering valuation documents required for studying abroad. We ensure all documents meet the specific requirements of embassies and educational institutions.",
    processSteps: ["Consultation", "Verification", "Drafting", "Finalization"]
  },
  {
    title: "Trading Management (Mero Share, Demat Support)",
    slug: "trading-management",
    shortDescription: "Professional support for Mero Share and Demat account management.",
    fullDescription: "We provide assistance with managing your stock trading accounts, including Mero Share and Demat support. We help you navigate the digital aspects of the share market efficiently.",
    processSteps: ["Account Setup", "Guidance", "Management Support"]
  },
  {
    title: "Other Civil Engineering Related Services",
    slug: "other-civil-engineering-services",
    shortDescription: "Various other specialized civil engineering and consultancy services.",
    fullDescription: "Contact us for any other specific civil engineering needs not listed above. We offer custom consultancy for unique structural and infrastructure challenges.",
    processSteps: ["Consultation", "Custom Solution", "Execution"]
  }
];

const projects = [
  {
    title: "Modern Residential Complex",
    category: "Residential",
    shortDescription: "A 5-story luxury residential building.",
    fullDescription: "Located in the heart of the city, this residential complex features modern amenities, earthquake-resistant design, and sustainable energy solutions.",
    image: "https://picsum.photos/seed/proj1/800/600",
    client: "Mr. Sharma",
    location: "Kathmandu",
    year: "2023",
    status: "Completed"
  },
  {
    title: "Commercial Shopping Mall",
    category: "Commercial",
    shortDescription: "Steel structure shopping complex.",
    fullDescription: "A state-of-the-art shopping mall designed with a steel frame structure for rapid construction and flexibility.",
    image: "https://picsum.photos/seed/proj2/800/600",
    client: "ABC Group",
    location: "Pokhara",
    year: "2024",
    status: "Under Construction"
  },
  {
    title: "Community Hospital",
    category: "Public",
    shortDescription: "50-bed community hospital.",
    fullDescription: "Design and supervision of a community hospital focused on accessibility and hygiene standards.",
    image: "https://picsum.photos/seed/proj3/800/600",
    client: "Local Municipality",
    location: "Lalitpur",
    year: "2022",
    status: "Completed"
  }
];

const seedDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is not defined');
    
    await mongoose.connect(uri);
    console.log('MongoDB Connected for Seeding');

    // Clear existing data
    await Service.deleteMany({});
    await Project.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    await Service.insertMany(services);
    await Project.insertMany(projects);
    console.log('Data Seeded Successfully');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
