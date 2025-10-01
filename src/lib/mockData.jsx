import { Code, Cloud, Database, Smartphone, Globe, Settings, CheckCircle } from 'lucide-react';

export const getMockData = () => {
  return {
    products: [
      { id: 'p1', name: "JM Analytics Pro", category: "Business Intelligence", price: 299 },
      { id: 'p2', name: "JM Security Suite", category: "Cybersecurity", price: 199 },
      { id: 'p3', name: "JM Cloud Manager", category: "Cloud Infrastructure", price: 149 },
    ],
    services: [
      { 
        id: 's1', 
        name: "Custom Software Development", 
        price: 5000,
        icon: <Code className="w-16 h-16 text-blue-500" />,
        shortDescription: "Tailored software solutions built to meet your specific business requirements and goals.",
        longDescription: "Our custom software development service provides end-to-end solutions, from ideation and strategy to design, implementation, and support. We create scalable, secure, and high-performance applications that are perfectly aligned with your business processes and objectives. Whether you need a new enterprise system, a customer-facing portal, or a specialized internal tool, our expert team has you covered.",
        features: [
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Full-cycle development (idea to deployment)" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Scalable and microservices-based architecture" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Agile methodology for flexibility and speed" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Ongoing maintenance and support" }
        ],
        image: "A team of developers collaborating around a whiteboard with code snippets and diagrams"
      },
      { 
        id: 's2', 
        name: "Cloud Solutions", 
        price: 2500,
        icon: <Cloud className="w-16 h-16 text-blue-500" />,
        shortDescription: "Scalable cloud infrastructure and migration services to modernize your business operations.",
        longDescription: "Leverage the power of the cloud with our comprehensive solutions. We help businesses migrate their existing infrastructure to the cloud, design new cloud-native architectures, and optimize their cloud spending. Our expertise spans major platforms like AWS, Azure, and Google Cloud, ensuring you get a robust, secure, and cost-effective setup.",
        features: [
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Cloud migration and strategy planning" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Infrastructure as Code (IaC) implementation" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Serverless and containerization (Docker, Kubernetes)" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Cost optimization and performance monitoring" }
        ],
        image: "Abstract representation of cloud computing with connected servers and data streams"
      },
      { 
        id: 's3', 
        name: "Data Management", 
        price: 3500,
        icon: <Database className="w-16 h-16 text-blue-500" />,
        shortDescription: "Comprehensive data solutions including analytics, warehousing, and business intelligence.",
        longDescription: "Turn your data into a strategic asset. Our data management services cover everything from data warehousing and ETL pipelines to advanced analytics and business intelligence dashboards. We help you collect, process, and visualize your data to uncover actionable insights and drive informed decision-making across your organization.",
        features: [
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Data warehousing and lake solutions" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "BI dashboard creation (Tableau, Power BI)" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "ETL/ELT pipeline development" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Predictive analytics and machine learning models" }
        ],
        image: "An interactive business intelligence dashboard showing charts and graphs"
      },
      { 
        id: 's4', 
        name: "Mobile Development", 
        price: 4000,
        icon: <Smartphone className="w-16 h-16 text-blue-500" />,
        shortDescription: "Native and cross-platform mobile applications for iOS and Android platforms.",
        longDescription: "Engage your customers on the go with a stunning mobile application. We specialize in developing both native (Swift, Kotlin) and cross-platform (React Native) apps that deliver a seamless user experience. From concept to launch in the app stores, we manage the entire lifecycle to ensure your app is a success.",
        features: [
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Native iOS and Android development" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Cross-platform development with React Native" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "UI/UX design for mobile" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "App store submission and optimization" }
        ],
        image: "A user interacting with a sleek mobile app on a smartphone"
      },
      { 
        id: 's5', 
        name: "Web Development", 
        price: 3000,
        icon: <Globe className="w-16 h-16 text-blue-500" />,
        shortDescription: "Modern, responsive websites and web applications with cutting-edge technologies.",
        longDescription: "Your website is your digital storefront. We build beautiful, fast, and responsive websites and web applications that captivate your audience and drive conversions. Using modern frameworks like React and Next.js, we create dynamic experiences that are both user-friendly and search-engine optimized.",
        features: [
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Responsive design for all devices" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Frontend development with React/Vue" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Headless CMS integration" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "E-commerce and payment gateway integration" }
        ],
        image: "A visually stunning website displayed on a laptop screen"
      },
      { 
        id: 's6', 
        name: "IT Consulting", 
        price: 1500,
        icon: <Settings className="w-16 h-16 text-blue-500" />,
        shortDescription: "Strategic technology consulting to help you make informed decisions about your IT infrastructure.",
        longDescription: "Navigate the complex technology landscape with confidence. Our IT consulting services provide strategic guidance to help you align your technology initiatives with your business goals. We offer expertise in digital transformation, IT infrastructure planning, cybersecurity strategy, and technology roadmapping.",
        features: [
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Digital transformation roadmap" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "IT infrastructure audit and planning" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Cybersecurity risk assessment" },
          { icon: <CheckCircle className="w-5 h-5 text-green-500"/>, text: "Software and vendor selection" }
        ],
        image: "A consultant presenting a strategic technology plan to business executives"
      }
    ]
  };
};