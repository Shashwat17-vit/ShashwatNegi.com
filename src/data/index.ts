import type { Project, Testimonial, ExperienceItem, EducationItem, Certification } from '../types';

export const projects: Project[] = [
  {
    id: 'personal-website',
    title: 'Personal Website',
    description: 'Self-managed portfolio website with modern tech stack',
    longDescription:
      'A fully responsive portfolio website rebuilt from scratch using React 18 and TypeScript, designed with a dark minimalist aesthetic inspired by studio-identite.com. Features smooth scroll animations, dynamic project filtering, a testimonial carousel, and a backend-ready contact form. Deployed via Docker + Nginx on AWS and GCP with full CI/CD through GitHub Actions.',
    image: '/assets/img/portfolio/WebsiteProj6.png',
    category: 'software',
    tags: ['React', 'TypeScript', 'Vite', 'Framer Motion', 'Docker', 'Nginx', 'AWS', 'GitHub Actions'],
    githubUrl: 'https://github.com/Shashwat17-vit/ShashwatNegi.com',
    liveUrl: 'https://shashwatnegi.com',
    metrics: ['Full CI/CD pipeline', 'Docker + Nginx deployment', 'AWS & GCP hosted'],
  },
  {
    id: 'insightmate',
    title: 'InsightMate.ai',
    description: 'AI-powered environmental impact analysis application',
    longDescription:
      'An end-to-end AI application for environmental impact analysis powered by a fine-tuned Llama 3 8B model with LoRA adapters. Uses LangChain for orchestration, Sentence-BERT + Pinecone for semantic retrieval, and Streamlit for the interactive UI. Containerized with Docker for reproducible deployment.',
    image: '/assets/img/portfolio/InsightMate.ai Proj1.png',
    category: 'software',
    tags: ['Python', 'Llama 3 8B', 'LoRA', 'LangChain', 'Sentence-BERT', 'Pinecone', 'Streamlit', 'Docker'],
    githubUrl: 'https://github.com/Shashwat17-vit/InsightMate.ai',
    metrics: ['Fine-tuned Llama 3 8B', 'Semantic search via Pinecone', 'Containerized deployment'],
  },
  {
    id: 'leaf-vein',
    title: 'Leaf Vein Segmentation',
    description: 'Deep learning model for agricultural disease detection',
    longDescription:
      'Developed for a Hackathon Challenge, this project focuses on infected tomato leaf vein segmentation using deep learning. A U-Net architecture with a ResNet backbone and CLAHE preprocessing achieved high segmentation accuracy despite a limited dataset — IoU: 0.85, Dice Coefficient: 0.89.',
    image: '/assets/img/portfolio/Leaf Vein Segmentation Proj3.png',
    category: 'ai',
    tags: ['Python', 'TensorFlow/Keras', 'U-Net', 'ResNet', 'Computer Vision', 'CLAHE', 'Data Augmentation'],
    githubUrl: 'https://github.com/Shashwat17-vit/Leaf-Vein-Segmentation-using-ResNet-UNet',
    metrics: ['IoU: 0.85', 'Dice Coefficient: 0.89', 'Hackathon project'],
  },
  {
    id: 'face-age',
    title: 'Face Age Editing',
    description: 'Research study using Diffusion Models for face aging',
    longDescription:
      'Research study exploring face-age editing techniques using Stable Diffusion models. Achieved 1.8× faster inference by exporting fine-tuned models to TensorRT fp32, and recorded a lowest FID of 44.3 on UTKFace and Cross-Age Celebrity Dataset using LoRA with an object-oriented modular pipeline.',
    image: '/assets/img/portfolio/Diffusion Proj2.png',
    category: 'data',
    tags: ['Python', 'Stable Diffusion', 'TensorRT', 'Hugging Face Diffusers', 'LoRA', 'PyTorch', 'Generative AI'],
    githubUrl: 'https://github.com/Shashwat17-vit/Comparative-Study-of-FaceAge-Editing-Using-Diffusion-Models',
    extraLinks: [{ label: 'Research Report', url: '#' }],
    metrics: ['1.8× faster inference via TensorRT', 'FID: 44.3', 'UTKFace & CACD datasets'],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'ankit',
    name: 'Ankit Mangal',
    role: 'Engineering Manager, Mortgage Dept.',
    organization: 'Infrrd.ai',
    image: '/assets/img/AnkitInfrrd.jpg',
    quote:
      'Shashwat distinguished himself through ownership, sound judgment, and steady focus on doing the right thing for the team. He refactored our agentic document pipeline using LangGraph, integrated MCP servers, and added reliability safeguards that made our system easier to operate. He was consistently professional, kept commitments, communicated clearly, and sought feedback to improve results. I recommend him without reservation for roles in applied AI.',
  },
  {
    id: 'dane',
    name: 'Dr. Dane Leigh Gogoshin',
    role: 'Supervisor & Professor',
    organization: 'University of Wisconsin-Madison',
    image: '/assets/img/DaneUW.png',
    quote:
      'Shash is highly dependable, an excellent communicator, a fair and objective grader, a good team player, and extremely diligent and methodical in his work. He has responded in a timely and flexible manner to the ongoing and variable demands made of him, has collaborated sensitively with me and other members and has been rigorous at every level — in planning and communicating.',
  },
  {
    id: 'mayank',
    name: 'Mr. Mayank A Gupta',
    role: 'Manager',
    organization: 'ZS Associates',
    image: '/assets/img/MayankZS.jpg',
    quote:
      'Shashwat has consistently demonstrated a strong work ethic and the ability to take charge of major projects. He has been an asset to our organization, excelling at managing projects and teams with confidence and skill.',
  },
  {
    id: 'geetha',
    name: 'Dr. Geetha Mary A',
    role: 'Professor',
    organization: 'VIT, Vellore',
    image: '/assets/img/GeethaVIT.jpg',
    quote:
      'Shashwat was a resourceful and enterprising individual with the impeccable skill of researching and extending his general purview to real-world applications. He is well-liked by his peers for his willingness to help others and excels as a team player, which was evident in his project work and lab sessions.',
  },
  {
    id: 'aws',
    name: 'AWS Cloud Practitioner',
    role: 'Certification',
    organization: 'Amazon Web Services',
    image: '/assets/img/testimonials/AWS Logo.png',
    quote:
      'The certification demonstrates foundational knowledge of AWS services, cloud computing concepts, and AWS global infrastructure. It covers pricing, billing, security, and basic management of AWS resources — providing a strong foundation for future cloud expertise.',
    isCertification: true,
    certLink: 'https://drive.google.com/file/d/1XVt_VooijlyF9PONWQX_sAzH3KYp2z6L/view?usp=sharing',
  },
];

export const experience: ExperienceItem[] = [
  {
    company: 'Infrrd.ai',
    location: 'San Jose, CA',
    role: 'AI Engineer, Summer Intern',
    period: 'Jun 2025 – Aug 2025',
    bullets: [
      'Improved financial entity extraction by developing a LangGraph-based multimodal agentic prompt optimization framework in Python, featuring NLP classification with dynamic GPT-4/Claude routing on AWS Bedrock.',
      'Lowered LLM inference costs by 35% via a human-in-the-loop DPO pipeline using Model Context Protocol server exposed through FastAPI microservice, with MongoDB feedback storage.',
      'Processed 1K documents per hour, improving the scalable AI system with Pydantic schema, pytest, and LangSmith tracing.',
      'Cut human annotation by 90% by delivering enterprise-grade Java Spring Boot microservices that invoked PyTorch-finetuned LLMs for accurate data extraction, deployed through Jenkins CI/CD.',
    ],
  },
  {
    company: 'ZS Associates',
    location: 'New Delhi, India',
    role: 'Software Engineer, Business Technology Solutions',
    period: 'Aug 2021 – May 2024',
    bullets: [
      'Achieved 15% lift in call-to-conversion by engineering DBSCAN clustering and XGBoost classification models with MLflow, deployed via API Gateway + Lambda and evaluated through A/B testing.',
      'Built scalable ETL pipeline ingesting IQVIA data in compliance with GDPR and HIPAA medical standards.',
      'Cut analytics runtime by 50% by building AWS Airflow (MWAA) DAGs and optimizing SQL reports on PostgreSQL.',
      'Created SLA-focused Tableau dashboards monitoring KPIs, enabling effective storytelling to non-technical stakeholders.',
      'Reduced PR review time by enforcing coding standards and tracking Agile Scrum workflows in Jira.',
    ],
    subRole: 'Software Engineer, Intern',
    subPeriod: 'Feb 2021 – Jul 2021',
    subBullets: [
      'Increased system uptime with a 45% reduction in ops costs by migrating legacy workflows to Apache Airflow on Kubernetes (AWS EKS), refactoring Python/Bash scripts, and building Spark jobs on AWS EMR with auto-scaling.',
    ],
  },
  {
    company: 'iSCHOOL, University of Wisconsin-Madison',
    location: 'Madison, WI',
    role: 'Teaching Assistant',
    period: 'Sept 2024 – Present',
    bullets: [
      'Led discussion sections and office hours for 200+ undergraduate students, providing academic support on data science concepts, algorithms, ethical considerations, and digital footprints.',
      'Courses: LIS 461: Data and Algorithms · LIS 220: Digital Footprints',
    ],
  },
];

export const education: EducationItem[] = [
  {
    institution: 'University of Wisconsin, Madison',
    degree: 'Master of Science in Data Science · WiSH Scholarship',
    period: 'Expected May 2026',
    gpa: '3.8 / 4.0',
    coursework: 'Statistical Analysis, Data Structures & Algorithms, Machine Learning, Big Data Systems, Deep Learning for CV',
  },
  {
    institution: 'Vellore Institute of Technology, India',
    degree: 'Bachelor of Technology in Computer Science · magna cum laude',
    period: 'Jul 2017 – Jul 2021',
    gpa: '4.0 / 4.0',
    coursework: 'Data Structures & Algorithms, Operating Systems, Software Engineering, Database Systems, Internet of Things',
  },
];

export const certifications: Certification[] = [
  {
    title: 'AWS Cloud Practitioner & Solutions Architect',
    issuer: 'Amazon Web Services',
    url: 'https://drive.google.com/file/d/1XVt_VooijlyF9PONWQX_sAzH3KYp2z6L/view?usp=sharing',
  },
  {
    title: 'Cloud Computing Applications, Part 2: Big Data and Applications in the Cloud',
    issuer: 'University of Illinois Urbana-Champaign (Coursera)',
    url: 'https://coursera.org/share/11e7847d48838ca9f47b04094e8f4bad',
  },
  {
    title: 'Python Data Visualization',
    issuer: 'Rice University (Coursera)',
    url: 'https://coursera.org/share/482b22c34bff2209ef642e97296b154f',
  },
];

export const skills = {
  'Programming Languages': ['Python', 'Java', 'R', 'JavaScript', 'TypeScript', 'Linux Bash'],
  'AI / ML Frameworks': ['LangChain', 'LangGraph', 'OpenAI SDK', 'HuggingFace', 'MLflow', 'FastAPI', 'TensorFlow', 'PyTorch', 'scikit-learn'],
  'Data & Cloud': ['Terraform', 'Kafka', 'Hadoop', 'BigQuery', 'Docker', 'Azure Databricks', 'Grafana', 'AWS (Bedrock, EMR, Lambda, EKS)', 'Kubernetes'],
};

export const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/Shashwat17-vit', icon: 'github' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shashwat-negi-b57a8115b/', icon: 'linkedin' },
  { label: 'LeetCode', url: 'https://leetcode.com/u/ShashwatNegiUW-M/', icon: 'code' },
  { label: 'Instagram', url: 'https://www.instagram.com/shashwat.negi/', icon: 'instagram' },
];
