export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  bullets: string[];
  tools: string[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  featured: boolean;
  color: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'internship' | 'leadership' | 'education';
  description: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  badge?: string;
  category: 'core' | 'job-sim' | 'course';
}

export interface SkillCategory {
  category: string;
  color: string;
  skills: { name: string; level: number; iconName?: string }[];
}

export const PERSONAL_INFO = {
  name: "Prathamesh Chavan",
  title: "Data Analytics & Computer Engineering Specialist",
  tagline: "Transforming complex raw data into actionable business intelligence & 3D insights.",
  location: "Pune, Maharashtra, India",
  email: "prathamesh07chavan@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  summary: "Detail-oriented and analytical Computer Engineering student aspiring to build an impactful career in Data Analytics. Skilled in SQL, Python, Power BI, Excel, and Data Visualization with hands-on experience in developing academic and internship-based analytics projects.",
  stats: [
    { label: "Projects Built", value: "4+" },
    { label: "Transactions Analyzed", value: "3.9k+" },
    { label: "Certifications Earned", value: "15+" },
    { label: "Dashboards Created", value: "10+" },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages & Core",
    color: "#06B6D4",
    skills: [
      { name: "Python", level: 90 },
      { name: "SQL (MySQL, PostgreSQL)", level: 88 },
      { name: "C & C++", level: 75 },
      { name: "HTML & CSS", level: 80 },
    ],
  },
  {
    category: "Visualization & BI",
    color: "#10B981",
    skills: [
      { name: "Power BI (DAX, Power Query)", level: 92 },
      { name: "Tableau", level: 82 },
      { name: "Excel (Advanced, Pivot, Formulas)", level: 90 },
    ],
  },
  {
    category: "Data Libraries & Frameworks",
    color: "#8B5CF6",
    skills: [
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 85 },
      { name: "SQLAlchemy", level: 80 },
    ],
  },
  {
    category: "Concepts & Tools",
    color: "#F59E0B",
    skills: [
      { name: "Data Analytics & EDA", level: 92 },
      { name: "Data Preprocessing & Cleaning", level: 88 },
      { name: "Customer Segmentation Modeling", level: 85 },
      { name: "Git & GitHub", level: 85 },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "shopping-behavior",
    title: "Customer Shopping Behavior Analysis",
    category: "Data Science & Python",
    description: "Analyzed 3,900+ customer transactions using Python, SQLAlchemy, and Power BI to identify spending patterns and customer segmentation models.",
    longDescription: "End-to-end analytics workflow that extracted insights from over 3,900 customer purchasing records. Utilized Pandas for feature engineering and data cleaning, SQLAlchemy to query MySQL databases, and designed an interactive Power BI dashboard categorizing customers into New, Returning, and Loyal segments.",
    bullets: [
      "Analyzed 3,900+ customer transactions to identify spending patterns and customer segmentation.",
      "Performed data cleaning, preprocessing, and feature engineering using Pandas.",
      "Connected Python with MySQL using SQLAlchemy for structured querying and storage.",
      "Built interactive Power BI dashboards for revenue trends and customer insights.",
      "Created customer segmentation models including New, Returning, and Loyal customers."
    ],
    tools: ["Python", "Pandas", "SQLAlchemy", "MySQL", "Power BI"],
    metrics: [
      { label: "Transactions", value: "3,900+" },
      { label: "Segments Identified", value: "3 Key Types" },
      { label: "Pipeline", value: "Python to PowerBI" }
    ],
    githubUrl: "https://github.com/customer_behavior_analysis",
    featured: true,
    color: "#06B6D4"
  },
  {
    id: "finance-superstore",
    title: "Finance & Superstore Sales Analytics",
    category: "Business Intelligence",
    description: "Developed comprehensive Power BI dashboards utilizing Power Query and complex DAX calculations for YoY growth and category-wise analysis.",
    longDescription: "Developed an end-to-end business intelligence suite analyzing Finance and Superstore sales data. Performed advanced data transformations in Power Query, crafted DAX measures for YoY profit calculations, and built interactive visual dashboards with dynamic drill-through maps.",
    bullets: [
      "Developed an end-to-end Power BI dashboard using Finance and Superstore datasets.",
      "Performed data transformation and modeling using Power Query and DAX.",
      "Built KPI visuals for Sales, Profit, YoY Growth, and Category-wise analysis.",
      "Implemented drill-through insights, geography maps, and dynamic filters."
    ],
    tools: ["Power BI", "DAX", "Power Query", "Excel"],
    metrics: [
      { label: "Analysis Scope", value: "Global Superstore" },
      { label: "Key Metrics", value: "Sales, Profit, YoY" },
      { label: "Modeling", value: "Star Schema DAX" }
    ],
    githubUrl: "https://github.com/Finance-Superstore-Analytics",
    featured: true,
    color: "#10B981"
  },
  {
    id: "kickstarter-crowdfunding",
    title: "Kickstarter Crowdfunding Dashboard",
    category: "Data Visualization",
    description: "Analyzed crowdfunding campaign success factors, epoch timestamp conversions, and funding trends through interactive DAX storytelling.",
    longDescription: "Designed an interactive analytics platform investigating success drivers across thousands of Kickstarter crowdfunding campaigns. Handled Epoch time conversion, constructed relational calendar tables, and engineered DAX metrics for project success probability.",
    bullets: [
      "Developed an interactive Power BI dashboard to analyze crowdfunding campaign performance and funding trends.",
      "Performed Epoch time conversion, calendar table creation, and data modeling.",
      "Created KPI dashboards and DAX measures for success rate analysis.",
      "Designed interactive dashboards with filters and visual storytelling techniques."
    ],
    tools: ["Power BI", "DAX", "Excel", "Data Modeling"],
    metrics: [
      { label: "Domain", value: "Crowdfunding" },
      { label: "Transformations", value: "Epoch & Calendar" },
      { label: "Insights", value: "Funding Trends" }
    ],
    githubUrl: "https://github.com",
    featured: true,
    color: "#8B5CF6"
  },
  {
    id: "zomato-analytics",
    title: "Zomato Data Analysis & BI Dashboard",
    category: "SQL & Tableau",
    description: "Conducted restaurant market research and sales data exploration using SQL, Excel, Power BI, and Tableau visualizations.",
    longDescription: "Conducted extensive restaurant market analysis leveraging SQL queries and Excel for dataset scrubbing. Generated Tableau visualizations and Power BI dashboards identifying regional cuisine trends, average order values, and revenue performance across dining sectors.",
    bullets: [
      "Conducted restaurant data analysis to uncover customer behavior and sales trends.",
      "Cleaned datasets using Excel and SQL for business analysis.",
      "Built interactive Power BI dashboards and Tableau visualizations.",
      "Generated insights related to revenue trends and cuisine preferences."
    ],
    tools: ["Excel", "SQL", "Power BI", "Tableau"],
    metrics: [
      { label: "Visualization", value: "Tableau + Power BI" },
      { label: "Engine", value: "SQL Queries" },
      { label: "Domain", value: "Food & Dining" }
    ],
    githubUrl: "https://github.com/Zomato_analysis",
    featured: true,
    color: "#F59E0B"
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "ai-variant",
    role: "Data Analytics Intern",
    company: "Ai Variant",
    period: "Jan 2025 – Present",
    location: "Pune, India",
    type: "internship",
    description: [
      "Worked on data analysis and visualization using Python, SQL, Excel, and Power BI.",
      "Created interactive dashboards and reports to analyze business and sales data.",
      "Performed data cleaning, preprocessing, and exploratory data analysis to generate actionable insights.",
      "Collaborated with team members on analytics-based projects using real-world datasets.",
      "Assisted in developing reports and presentations for data-driven business decision-making."
    ]
  },
  {
    id: "mes-event-org",
    role: "Event Organizer",
    company: "Modern Education Society’s College of Engineering",
    period: "Apr 2024 – Present",
    location: "Pune, India",
    type: "leadership",
    description: [
      "Planned and coordinated seminars, cultural festivals, and sports tournaments.",
      "Managed logistics, marketing, budgeting, volunteer coordination, and event execution.",
      "Improved event engagement through structured feedback collection and process optimization."
    ]
  },
  {
    id: "engineers-connect",
    role: "Event Organizer (Non-Tech Department)",
    company: "Engineers Connect Club",
    period: "Apr 2024 – Aug 2025",
    location: "Pune, India",
    type: "leadership",
    description: [
      "Organized non-technical events and student engagement activities.",
      "Facilitated smooth event operations and strengthened community participation."
    ]
  },
  {
    id: "education-mes",
    role: "Bachelor of Technology (B.Tech) - Computer Engineering",
    company: "Modern Education Society's College of Engineering",
    period: "2023 – 2027",
    location: "Pune, India",
    type: "education",
    description: [
      "Pursuing Computer Engineering degree with core focus on Data Analytics, Algorithms, Databases, and Software Engineering.",
      "Active participant in technical symposiums, leadership activities, and data analytics research projects."
    ]
  },
  {
    id: "education-orbis",
    role: "Higher Secondary Education (Grade 12)",
    company: "The Orbis School Pune",
    period: "2023",
    location: "Pune, India",
    type: "education",
    description: [
      "Completed Higher Secondary Education with strong foundation in Science, Mathematics, and Computer Science."
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Data Analyst Certification (Gold Category)", issuer: "FutureSkills Prime & NASSCOM", category: "core" },
  { title: "LaTeX Training Certificate", issuer: "IIT Bombay", category: "core" },
  { title: "RDBMS PostgreSQL Training Certificate", issuer: "IIT Bombay", category: "core" },
  { title: "Tata GenAI Powered Data Analytics Job Simulation", issuer: "Forage", category: "job-sim" },
  { title: "Tata Data Visualisation Job Simulation", issuer: "Forage", category: "job-sim" },
  { title: "Goldman Sachs Software Engineering Job Simulation", issuer: "Forage", category: "job-sim" },
  { title: "Verizon Cloud Platform Job Simulation", issuer: "Forage", category: "job-sim" },
  { title: "Introduction to Data Science", issuer: "Simplilearn", category: "course" },
  { title: "Python Basics Course", issuer: "Udemy Labs / KodeKloud", category: "course" },
  { title: "C and C++ Completion Certificate", issuer: "The Code Culture", category: "course" },
  { title: "Python Completion Certificate", issuer: "The Code Culture", category: "course" },
  { title: "Cybersecurity Terminology & Threat Landscape", issuer: "LinkedIn Learning", category: "course" },
  { title: "Generative AI: Thoughtful Online Search", issuer: "LinkedIn Learning", category: "course" },
  { title: "Google Play Academy Store Listing Certificate", issuer: "Google Play Academy", category: "course" }
];
