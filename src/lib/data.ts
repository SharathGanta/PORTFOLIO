export interface ProfileData {
  name: string;
  firstName: string;
  initials: string;
  role: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  additionalSummaryLine: string;
  github: string | null;
  linkedin: string;
  resumePath: string;
  idCard: {
    idNumber: string;
    department: string;
    validTill: string;
    quote: string;
    whatIAm: string[];
  };
}

export interface NavItem {
  id: string;
  label: string;
  index: string;
}

export interface SkillElement {
  atomicNumber: number;
  symbol: string;
  name: string;
  family: "GenAI & Agents" | "RPA & Mining" | "Cloud & Arch" | "Programming" | "Data & Integrations" | "Methodologies";
  description: string;
  projects: string[];
  brandLogo?: string;
  isBrand: boolean;
  color: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github: string | null;
  uiType: "orchestration-dashboard" | "agent-graph" | "integration-pipeline" | "mining-analytics";
}

export interface CertificationItem {
  id: string;
  index: string;
  title: string;
  issuer: string;
  description: string;
  tag: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location?: string;
  type: "experience" | "education";
  highlights: string[];
}

export interface AchievementItem {
  id: string;
  index: string;
  metric: string;
  numericTarget: number;
  suffix: string;
  label: string;
  caption: string;
  detail: string;
  logo: string;
  glowColor: string;
}

export const PROFILE: ProfileData = {
  name: "Sharath Kumar Ganta",
  firstName: "SHARATH",
  initials: "SKG",
  role: "Digital Transformation and AI Architect",
  email: "Sharath.Ghanta@gmail.com",
  phone: "+91 9172762318",
  phoneHref: "tel:+919172762318",
  location: "Hyderabad, India",
  resumeSummary:
    "Digital Transformation Architect with 13+ years of experience in RPA, Generative AI, and Agentic AI solutions. Delivered 80+ automation solutions reducing costs by 60–70% and improving SLA compliance by 60%. Experts in LLM integration, AI agents, hyper automation, AI governance, and enterprise architecture.",
  additionalSummaryLine:
    "Architecting intelligent automation integrating Automation Anywhere, UiPath, and Power Automate with SAP, Salesforce, and AI/ML platforms.",
  github: null, // Omitted in strict compliance with Rule 1 (not in résumé)
  linkedin: "https://www.linkedin.com/in/sharath-pawar-4b340514b",
  resumePath: "/resume.pdf",
  idCard: {
    idNumber: "SKG-2012-AI",
    department: "Enterprise AI & RPA Architecture",
    validTill: "2012 (Graduation) / Present",
    quote: "Delivered 80+ enterprise automation systems reducing manual effort by 70% and scaling AI CoEs.",
    whatIAm: [
      "Digital Transformation & AI Architect with 13+ years in RPA & Generative AI",
      "Bachelor of Technology (B. Tech) from JNTU Hyderabad (2008 – 2012)",
      "Delivered 80+ enterprise automation solutions with 60–70% cost reduction",
      "Established & led RPA Center of Excellence (CoE) with 99.9% platform availability",
      "Architect of autonomous workflows with LangGraph, AutoGen, and Azure OpenAI",
    ],
  },
};

export const NAV: NavItem[] = [
  { id: "about", label: "About", index: "01" },
  { id: "skills", label: "Skills", index: "02" },
  { id: "work", label: "Work", index: "03" },
  { id: "certifications", label: "Certifications", index: "04" },
  { id: "experience", label: "Experience", index: "05" },
  { id: "achievements", label: "Achievements", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
];

export const SKILL_FAMILIES = [
  "All",
  "GenAI & Agents",
  "RPA & Mining",
  "Cloud & Arch",
  "Programming",
  "Data & Integrations",
  "Methodologies",
] as const;

export const SKILLS: SkillElement[] = [
  // GenAI & Agents
  {
    atomicNumber: 1,
    symbol: "Ag",
    name: "Agentic AI",
    family: "GenAI & Agents",
    description: "Autonomous agent architectures, goal planning, reflection loops, and decision systems.",
    projects: ["Cognitive AI/ML Bot System", "Enterprise Hyperautomation Fleet"],
    isBrand: false,
    color: "#0d0d0d",
  },
  {
    atomicNumber: 2,
    symbol: "Lm",
    name: "LLM Integration",
    family: "GenAI & Agents",
    description: "Enterprise integration of Azure OpenAI, GPT-4, Claude, and Llama foundation models.",
    projects: ["Cognitive AI/ML Bot System", "Enterprise Hyperautomation Fleet"],
    brandLogo: "openai.svg",
    isBrand: true,
    color: "#10A37F",
  },
  {
    atomicNumber: 3,
    symbol: "Lc",
    name: "LangChain",
    family: "GenAI & Agents",
    description: "Chains, memory buffers, dynamic tool calling, and agent execution harnesses.",
    projects: ["Cognitive AI/ML Bot System"],
    brandLogo: "langchain.svg",
    isBrand: true,
    color: "#1C3C3C",
  },
  {
    atomicNumber: 4,
    symbol: "Lg",
    name: "LangGraph",
    family: "GenAI & Agents",
    description: "Stateful multi-step agent orchestration with cycles, checkpoints, and human-in-the-loop.",
    projects: ["Cognitive AI/ML Bot System"],
    brandLogo: "langchain.svg",
    isBrand: true,
    color: "#2E5B88",
  },
  {
    atomicNumber: 5,
    symbol: "Au",
    name: "AutoGen",
    family: "GenAI & Agents",
    description: "Multi-agent conversational systems, specialized peer agents, and collaborative solvers.",
    projects: ["Cognitive AI/ML Bot System"],
    brandLogo: "autogen.svg",
    isBrand: true,
    color: "#0078D4",
  },
  {
    atomicNumber: 6,
    symbol: "Rg",
    name: "RAG Architecture",
    family: "GenAI & Agents",
    description: "Retrieval-Augmented Generation, chunking, semantic indexing, and grounded context synthesis.",
    projects: ["Cognitive AI/ML Bot System"],
    isBrand: false,
    color: "#0d0d0d",
  },
  {
    atomicNumber: 7,
    symbol: "Gv",
    name: "AI Governance",
    family: "GenAI & Agents",
    description: "Responsible AI frameworks, prompt security, telemetry auditing, and hallucination control.",
    projects: ["Cognitive AI/ML Bot System", "Enterprise Hyperautomation Fleet"],
    isBrand: false,
    color: "#0d0d0d",
  },
  {
    atomicNumber: 8,
    symbol: "Mm",
    name: "Memory Management",
    family: "GenAI & Agents",
    description: "Hierarchical memory, episodic recalls, and conversation context window optimization.",
    projects: ["Cognitive AI/ML Bot System"],
    isBrand: false,
    color: "#0d0d0d",
  },

  // RPA & Mining
  {
    atomicNumber: 9,
    symbol: "Aa",
    name: "Automation Anywhere",
    family: "RPA & Mining",
    description: "Automation Anywhere A360 bot development, workload management, and enterprise CoE.",
    projects: ["Enterprise Hyperautomation Fleet", "ERP & CRM Integration Engine"],
    brandLogo: "automationanywhere.svg",
    isBrand: true,
    color: "#FF6A00",
  },
  {
    atomicNumber: 10,
    symbol: "Ui",
    name: "UiPath",
    family: "RPA & Mining",
    description: "UiPath orchestrator fleets, unattended robots, REFramework, and document understanding.",
    projects: ["Enterprise Hyperautomation Fleet", "RPA CoE & Process Mining"],
    brandLogo: "uipath.svg",
    isBrand: true,
    color: "#FA4616",
  },
  {
    atomicNumber: 11,
    symbol: "Pa",
    name: "Power Automate",
    family: "RPA & Mining",
    description: "Microsoft Power Automate cloud flows, desktop RPA, and Microsoft 365 connectors.",
    projects: ["Enterprise Hyperautomation Fleet"],
    brandLogo: "powerautomate.svg",
    isBrand: true,
    color: "#0066FF",
  },
  {
    atomicNumber: 12,
    symbol: "Bp",
    name: "Blue Prism",
    family: "RPA & Mining",
    description: "Enterprise robotic process automation, connected-RPA, and business object modeling.",
    projects: ["Enterprise Hyperautomation Fleet"],
    brandLogo: "blueprism.svg",
    isBrand: true,
    color: "#002D72",
  },
  {
    atomicNumber: 13,
    symbol: "Cp",
    name: "Celonis Mining",
    family: "RPA & Mining",
    description: "Celonis Process & Task Mining, event log analysis, and automation discovery.",
    projects: ["RPA CoE & Process Mining"],
    brandLogo: "celonis.svg",
    isBrand: true,
    color: "#00F2FE",
  },
  {
    atomicNumber: 14,
    symbol: "Wf",
    name: "WorkFusion",
    family: "RPA & Mining",
    description: "Intelligent automation and cognitive OCR processing for banking and enterprise operations.",
    projects: ["Enterprise Hyperautomation Fleet"],
    brandLogo: "workfusion.svg",
    isBrand: true,
    color: "#00B4D8",
  },

  // Cloud & Arch
  {
    atomicNumber: 15,
    symbol: "Aw",
    name: "AWS Architect",
    family: "Cloud & Arch",
    description: "AWS Solutions Architecture, high-availability clusters, serverless, and IAM.",
    projects: ["Enterprise Hyperautomation Fleet"],
    brandLogo: "aws.svg",
    isBrand: true,
    color: "#FF9900",
  },
  {
    atomicNumber: 16,
    symbol: "Az",
    name: "Microsoft Azure",
    family: "Cloud & Arch",
    description: "Azure OpenAI Service, Cognitive Services, Virtual Desktops, and Key Vault.",
    projects: ["Cognitive AI/ML Bot System", "Enterprise Hyperautomation Fleet"],
    brandLogo: "azure.svg",
    isBrand: true,
    color: "#0078D4",
  },
  {
    atomicNumber: 17,
    symbol: "Ea",
    name: "Enterprise Architecture",
    family: "Cloud & Arch",
    description: "Scalable enterprise blueprint design, zero-trust security, and multi-tier systems.",
    projects: ["Enterprise Hyperautomation Fleet", "RPA CoE & Process Mining"],
    isBrand: false,
    color: "#0d0d0d",
  },
  {
    atomicNumber: 18,
    symbol: "Dr",
    name: "Disaster Recovery",
    family: "Cloud & Arch",
    description: "Disaster Recovery (DR) and Business Continuity Planning (BCP) ensuring 99.9% availability.",
    projects: ["Enterprise Hyperautomation Fleet"],
    isBrand: false,
    color: "#0d0d0d",
  },

  // Programming
  {
    atomicNumber: 19,
    symbol: "Py",
    name: "Python",
    family: "Programming",
    description: "Data pipelines, AI/ML SDKs, FastAPI microservices, and async automation workflows.",
    projects: ["Cognitive AI/ML Bot System", "Enterprise Hyperautomation Fleet"],
    brandLogo: "python.svg",
    isBrand: true,
    color: "#3776AB",
  },
  {
    atomicNumber: 20,
    symbol: "Js",
    name: "JavaScript",
    family: "Programming",
    description: "Scripting, dynamic RPA browser injection, automation telemetry, and Node services.",
    projects: ["Enterprise Hyperautomation Fleet"],
    brandLogo: "javascript.svg",
    isBrand: true,
    color: "#F7DF1E",
  },
  {
    atomicNumber: 21,
    symbol: "Fa",
    name: "FastAPI",
    family: "Programming",
    description: "High-performance asynchronous REST API backends for bot trigger orchestration.",
    projects: ["Cognitive AI/ML Bot System", "ERP & CRM Integration Engine"],
    brandLogo: "fastapi.svg",
    isBrand: true,
    color: "#009688",
  },
  {
    atomicNumber: 22,
    symbol: "Nt",
    name: ".NET / C#",
    family: "Programming",
    description: ".NET custom automation libraries, Windows workflow foundations, and COM wrappers.",
    projects: ["Enterprise Hyperautomation Fleet"],
    brandLogo: "dotnet.svg",
    isBrand: true,
    color: "#512BD4",
  },
  {
    atomicNumber: 23,
    symbol: "Ht",
    name: "HTML5 & CSS",
    family: "Programming",
    description: "Modern enterprise dashboards, front-end portals, and responsive interfaces.",
    projects: ["Enterprise Hyperautomation Fleet"],
    brandLogo: "html5.svg",
    isBrand: true,
    color: "#E34F26",
  },

  // Data & Integrations
  {
    atomicNumber: 24,
    symbol: "Sp",
    name: "SAP Integration",
    family: "Data & Integrations",
    description: "BAPI, RFC, and GUI automation for SAP ECC and S/4HANA transactional workflows.",
    projects: ["ERP & CRM Integration Engine"],
    brandLogo: "sap.svg",
    isBrand: true,
    color: "#0FAAFF",
  },
  {
    atomicNumber: 25,
    symbol: "Sf",
    name: "Salesforce (SFDC)",
    family: "Data & Integrations",
    description: "Salesforce REST API integrations, lead automation, and opportunity synchronizations.",
    projects: ["ERP & CRM Integration Engine"],
    brandLogo: "salesforce.svg",
    isBrand: true,
    color: "#00A1E0",
  },
  {
    atomicNumber: 26,
    symbol: "Vd",
    name: "Vector Databases",
    family: "Data & Integrations",
    description: "High-dimensional vector indexing, similarity search, and RAG semantic embeddings.",
    projects: ["Cognitive AI/ML Bot System"],
    isBrand: false,
    color: "#0d0d0d",
  },
  {
    atomicNumber: 27,
    symbol: "My",
    name: "MySQL",
    family: "Data & Integrations",
    description: "Relational database schema design, indexing, and high-volume transaction tracking.",
    projects: ["Enterprise Hyperautomation Fleet"],
    brandLogo: "mysql.svg",
    isBrand: true,
    color: "#4479A1",
  },
  {
    atomicNumber: 28,
    symbol: "Mg",
    name: "MongoDB",
    family: "Data & Integrations",
    description: "NoSQL document persistence for dynamic unstructured bot telemetry and JSON payloads.",
    projects: ["Enterprise Hyperautomation Fleet"],
    brandLogo: "mongodb.svg",
    isBrand: true,
    color: "#47A248",
  },
  {
    atomicNumber: 29,
    symbol: "Pb",
    name: "Power BI",
    family: "Data & Integrations",
    description: "Executive automation health reporting, SLA compliance dashboards, and bot KPIs.",
    projects: ["RPA CoE & Process Mining"],
    brandLogo: "powerbi.svg",
    isBrand: true,
    color: "#F2C811",
  },
  {
    atomicNumber: 30,
    symbol: "Rt",
    name: "REST & SOAP",
    family: "Data & Integrations",
    description: "Enterprise web services, WSDL specifications, XML parsing, and secure endpoints.",
    projects: ["ERP & CRM Integration Engine"],
    isBrand: false,
    color: "#0d0d0d",
  },

  // Methodologies
  {
    atomicNumber: 31,
    symbol: "Sc",
    name: "Agile & Scrum",
    family: "Methodologies",
    description: "Agile roadmap creation, sprint coaching, and cross-functional leadership.",
    projects: ["Enterprise Hyperautomation Fleet", "RPA CoE & Process Mining"],
    isBrand: false,
    color: "#0d0d0d",
  },
  {
    atomicNumber: 32,
    symbol: "Sx",
    name: "Six Sigma (6σ)",
    family: "Methodologies",
    description: "Lean Six Sigma DMAIC process optimization and ROI-driven waste reduction.",
    projects: ["RPA CoE & Process Mining"],
    isBrand: false,
    color: "#0d0d0d",
  },
  {
    atomicNumber: 33,
    symbol: "Dv",
    name: "DevOps & CI/CD",
    family: "Methodologies",
    description: "Automated test pipelines, bot code reviews, continuous deployment, and Git workflows.",
    projects: ["Enterprise Hyperautomation Fleet"],
    isBrand: false,
    color: "#0d0d0d",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "hyperautomation-fleet",
    index: "01",
    title: "Enterprise Hyperautomation Fleet",
    kicker: "ENTERPRISE PLATFORM · ALIGNED AUTOMATION",
    description:
      "End-to-end architecture, development, deployment, and 24/7 operations of 80+ RPA and Gen AI-powered bot solutions delivering 60–70% cost reduction and 70% manual effort reduction across enterprise clients.",
    features: [
      "80+ autonomous bots deployed across global enterprises",
      "Configurable email & SMS alerts for bot monitoring & SLA compliance",
      "Disaster recovery & business continuity ensuring 99.9% availability",
      "Agile DevOps maturity frameworks accelerating delivery speed by 40%",
    ],
    tech: ["Automation Anywhere", "UiPath", "Power Automate", "FastAPI", "Python", "Azure"],
    github: null,
    uiType: "orchestration-dashboard",
  },
  {
    id: "cognitive-agent-system",
    index: "02",
    title: "Cognitive AI/ML Autonomous Agents",
    kicker: "AGENTIC ARCHITECTURE · YASH & ALIGNED",
    description:
      "Advanced multi-agent orchestration combining RPA with Generative AI, RAG architecture, and cognitive NLP. Implemented memory management, planning agents, and strict prompt security.",
    features: [
      "Multi-agent choreography with LangChain, LangGraph & AutoGen",
      "RAG architecture with vector databases and hallucination controls",
      "Enterprise AI governance and responsible AI guardrails",
      "Integrated Azure OpenAI, GPT-4, Claude & Llama foundation models",
    ],
    tech: ["LangChain", "LangGraph", "AutoGen", "Azure OpenAI", "Vector DB", "Python"],
    github: null,
    uiType: "agent-graph",
  },
  {
    id: "erp-crm-integration-engine",
    index: "03",
    title: "SAP & Salesforce Integration Engine",
    kicker: "ENTERPRISE INTEGRATION · MULTI-SYSTEM",
    description:
      "Enterprise-scale intelligent automation fabric integrating Automation Anywhere, UiPath, and Power Automate with core SAP ERP, Salesforce (SFDC), and AI/ML backend services.",
    features: [
      "Bi-directional REST, SOAP, WSDL & XML transactional processing",
      "Identity & Access Management (IAM) and zero-trust credentials",
      "Process Design Documents (PDD) & Solution Design Documents (SDD)",
      "High-throughput transactional reconciliation between ERP & CRM",
    ],
    tech: ["SAP", "Salesforce", "REST", "SOAP", "Automation Anywhere", "MySQL"],
    github: null,
    uiType: "integration-pipeline",
  },
  {
    id: "rpa-coe-process-mining",
    index: "04",
    title: "RPA Center of Excellence & Mining",
    kicker: "GOVERNANCE & MINING · YASH & CAPGEMINI",
    description:
      "Institutionalized enterprise RPA Centers of Excellence (CoE), defining best practices, governance standards, and automation frameworks paired with Celonis Process & Task Mining.",
    features: [
      "ROI-driven candidate prioritization & feasibility assessment",
      "Celonis Process & Task Mining bottleneck discovery",
      "Lean Six Sigma (6σ) process optimization for maximum ROI",
      "Incubated, scaled, and institutionalized POTs, POCs, and POVs",
    ],
    tech: ["Celonis", "Power BI", "UiPath", "Lean", "Six Sigma (6σ)", "DevOps"],
    github: null,
    uiType: "mining-analytics",
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "aws-architect",
    index: "01",
    title: "AWS Solutions Architect",
    issuer: "Amazon Web Services (AWS)",
    description:
      "Cloud architecture, resilient enterprise systems, serverless microservices, and disaster recovery design.",
    tag: "Cloud Architecture",
  },
  {
    id: "six-sigma",
    index: "02",
    title: "Six Sigma (6σ) & Lean Methodology",
    issuer: "Operational Excellence & Quality",
    description:
      "DMAIC process optimization, defect reduction, workflow streamlining, and automation ROI maximization.",
    tag: "Quality & Optimization",
  },
  {
    id: "agile-transformation",
    index: "03",
    title: "Agile & DevOps Transformation",
    issuer: "Enterprise Agile Frameworks",
    description:
      "Roadmap creation, coaching cross-functional teams and managing directors, reinforced Agile Ways of Working.",
    tag: "Agile Leadership",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "aligned-automation",
    period: "2019 – Present",
    role: "Automation Lead",
    company: "Aligned Automation",
    location: "Enterprise Practice",
    type: "experience",
    highlights: [
      "Led 80+ Automation Solutions reducing manual effort by 70% and costs by 60–70%.",
      "Defined enterprise hyperautomation strategy, improving delivery speed by 40%.",
      "Ensured 99.9% platform availability across mission-critical bot infrastructures.",
      "Led end-to-end design, development, and operations of RPA and Gen AI-powered bots.",
      "Architected solutions integrating Automation Anywhere, UiPath, and Power Automate with SAP, Salesforce, and AI/ML.",
      "Directed Agile transformation, coaching teams and MDs; conducted DevOps assessments.",
      "Developed configurable alert mechanisms (email/SMS) for bot telemetry and SLA compliance.",
    ],
  },
  {
    id: "yash-tech",
    period: "2018 – 2019",
    role: "RPA Center of Excellence (CoE) Lead",
    company: "Yash Technologies",
    type: "experience",
    highlights: [
      "Established and led the RPA Center of Excellence, defining best practices, governance standards, and automation frameworks.",
      "Designed cognitive bots combining RPA with AI/ML and NLP capabilities beyond rule-based processes.",
      "Mentored development teams on bot design patterns, deployment pipelines, and operational excellence.",
      "Assessed and prioritized automation candidates using ROI-driven feasibility analysis.",
    ],
  },
  {
    id: "capgemini",
    period: "2017 – 2018",
    role: "Senior RPA Consultant",
    company: "Capgemini",
    type: "experience",
    highlights: [
      "Delivered RPA consulting engagements across multiple industries, automating complex business processes.",
      "Led solution design workshops with client stakeholders, translating business requirements into scalable architectures.",
      "Promoted Agile and DevOps cultural change to support and accelerate RPA adoption.",
      "Championed process optimization using Lean and Six Sigma (6σ) methodologies to maximize automation ROI.",
    ],
  },
  {
    id: "allvy",
    period: "2012 – 2017",
    role: "Senior RPA Consultant",
    company: "Allvy Software Solutions",
    type: "experience",
    highlights: [
      "Delivered full-lifecycle RPA implementations: requirements analysis, design, development, testing, and production deployment.",
      "Developed automated solutions using Automation Anywhere, integrating with REST, SOAP, and XML web services.",
      "Built expertise in process digitization, AI/Robotics, and advanced data analytics.",
      "Educated business teams on production bot management and process governance.",
    ],
  },
  {
    id: "jntu",
    period: "2008 – 2012",
    role: "Bachelor of Technology (B. Tech)",
    company: "JNTU Hyderabad",
    location: "Hyderabad, India",
    type: "education",
    highlights: [
      "Four-year engineering degree program establishing foundational core in computer science, software engineering, algorithms, and system design.",
    ],
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "solutions",
    index: "01 / 06",
    metric: "80+",
    numericTarget: 80,
    suffix: "+",
    label: "Solutions Delivered",
    caption: "RPA, GenAI & Agent Automations",
    detail: "Production enterprise solutions deployed across global organizations",
    logo: "automationanywhere.svg",
    glowColor: "rgba(255, 106, 0, 0.2)",
  },
  {
    id: "experience-years",
    index: "02 / 06",
    metric: "13+",
    numericTarget: 13,
    suffix: "+",
    label: "Years of Experience",
    caption: "Enterprise Digital Transformation",
    detail: "Leading architecture from early RPA to modern Agentic AI workflows",
    logo: "azure.svg",
    glowColor: "rgba(0, 120, 212, 0.2)",
  },
  {
    id: "effort",
    index: "03 / 06",
    metric: "70%",
    numericTarget: 70,
    suffix: "%",
    label: "Effort Reduction",
    caption: "Manual Workload Automation",
    detail: "Direct manual effort savings achieved across enterprise business processes",
    logo: "uipath.svg",
    glowColor: "rgba(250, 70, 22, 0.2)",
  },
  {
    id: "cost",
    index: "04 / 06",
    metric: "70%",
    numericTarget: 70,
    suffix: "%",
    label: "Cost Reduction",
    caption: "60–70% Operational Savings",
    detail: "Substantial operational cost reductions delivered across client engagements",
    logo: "celonis.svg",
    glowColor: "rgba(0, 242, 254, 0.2)",
  },
  {
    id: "sla",
    index: "05 / 06",
    metric: "60%",
    numericTarget: 60,
    suffix: "%",
    label: "SLA Improvement",
    caption: "Compliance & Telemetry",
    detail: "Enhanced compliance via configurable SMS/email alerting and bot monitoring",
    logo: "fastapi.svg",
    glowColor: "rgba(0, 150, 136, 0.2)",
  },
  {
    id: "uptime",
    index: "06 / 06",
    metric: "99.9%",
    numericTarget: 99.9,
    suffix: "%",
    label: "Availability Guaranteed",
    caption: "Platform SLA & Continuity",
    detail: "Disaster recovery, business continuity, and zero-downtime execution",
    logo: "aws.svg",
    glowColor: "rgba(255, 153, 0, 0.2)",
  },
];
