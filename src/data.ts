import { Project, Education, Skill, Certification } from './types';

export const PERSONAL_INFO = {
  name: 'ASAIKUMARAN M',
  title: 'Computer Science Student & Software Developer',
  phone: '9786671212',
  email: 'anbuasai90@gmail.com',
  location: 'Kumbakonam, Tamil Nadu, India',
  github: '#',
  linkedin: 'https://linkedin.com/in/asaikumaran-m',
  summary:
    'Computer Science Engineering student with knowledge in Software Development, Data Structures, and Machine Learning. Experienced in building applications such as flood prediction and deepfake detection systems using Python and AI techniques. Strong problem-solving skills with interest in developing intelligent solutions.',
  declaration:
    'I hereby declare that all the information furnished above is true and correct to the best of my knowledge and belief.',
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'fan-controller',
    title: 'Smart Fan Speed Controller with Temperature Sensing',
    description: 'An automated microcontroller-based system that dynamically adjusts fan speed in response to ambient temperatures.',
    longDescription:
      'Developed a smart hardware-software integration project that operates a microcontroller-driven cooling system. It measures ambient temperature via specialized sensors and maps it to a dynamic fan speed control algorithm using Pulse Width Modulation (PWM), improving energy efficiency and maintaining optimal cooling conditions in real-time.',
    status: 'Completed',
    tags: ['Python', 'Sensors', 'Embedded Systems', 'IoT'],
    keyAchievements: [
      'Built an automated system that dynamically adjusts fan speed based on ambient temperature.',
      'Integrated physical temperature sensors with a microcontroller-based control unit.',
      'Improved energy efficiency and maintained optimal cooling conditions.'
    ],
    demoType: 'fan',
    role: 'Lead Developer',
  },
  {
    id: 'deepfake-detection',
    title: 'Deepfake Digital Asset Detection System',
    description: 'An AI-powered system designed to analyze facial landmarks, textures, and anomalies to identify deepfake manipulations.',
    longDescription:
      'Developed a machine learning model to scan audio-visual content for synthetic manipulations. By analyzing texture inconsistency, deep neural pattern abnormalities, and facial mesh variations, the system calculates a deepfake risk score. Perfect for preserving digital media integrity.',
    status: 'Prototype',
    tags: ['Python', 'AI/ML', 'OpenCV', 'Neural Networks'],
    keyAchievements: [
      'Developed neural model scanning to look for digital manipulation telltales.',
      'Implemented OpenCV tracking of facial features and orientation vectors.',
      'Aimed at mitigating misinformation via content authentication interfaces.'
    ],
    demoType: 'deepfake',
    role: 'ML Developer',
  },
  {
    id: 'flood-prediction',
    title: 'AI Flood Prediction & Risk Risk Modeler',
    description: 'A mathematical and machine learning model designed to forecast flood risks by evaluating rainfall, reservoir levels, and soil moisture.',
    longDescription:
      'Created a predictive analytics dashboard utilizing hydrological data patterns to forecast regional flood risk indicators. The algorithm evaluates factors such as live rainfall intensity, historical flood occurrences, soils moisture, and local reservoir limits to warn communities ahead of hazard peaks.',
    status: 'Prototype',
    tags: ['Python', 'Scikit-learn', 'Predictive Analysis', 'DBMS'],
    keyAchievements: [
      'Engineered machine learning estimators to evaluate flood risks on real-time factors.',
      'Developed regression formulas linking rainfall intensity and drainage capacities.',
      'Formatted database storage patterns securely to preserve historic sensor inputs.'
    ],
    demoType: 'flood',
    role: 'Hydrology ML Analyst',
  },
];

export const EDUCATION_DATA: Education[] = [
  {
    id: 'college',
    institution: 'Dhanalakshmi Srinivasan Engineering College (Autonomous)',
    location: 'Perambalur, India',
    period: '2023 – Present',
    degree: 'Bachelor of Engineering (B.E.) in Computer Science',
    details: 'Focussing on core curriculum including Data Structures, Algorithms, Databases, Machine Learning, and Software Development.',
    scoreLabel: 'CGPA',
    scoreValue: '7.5',
  },
  {
    id: 'school',
    institution: 'Little Flower Higher Secondary School',
    location: 'Kumbakonam, Tamil Nadu, India',
    period: '2022 – 2023',
    degree: 'Higher Secondary Certificate (Class XII)',
    details: 'Completed senior secondary education focusing on Physics, Chemistry, Computer Science, and Mathematics.',
    scoreLabel: 'Percentage',
    scoreValue: '70%',
  },
];

export const SKILLS_DATA: Skill[] = [
  // Languages
  { name: 'Python', category: 'Languages', proficiency: 88 },
  { name: 'Java', category: 'Languages', proficiency: 75 },
  { name: 'C', category: 'Languages', proficiency: 80 },

  // Database
  { name: 'MySQL', category: 'Database', proficiency: 82 },
  { name: 'DBMS Concepts', category: 'Database', proficiency: 85 },

  // Tools & Platforms
  { name: 'VS Code', category: 'Tools & Platforms', proficiency: 90 },
  { name: 'Excel / Spreadsheet', category: 'Tools & Platforms', proficiency: 75 },

  // Concepts
  { name: 'Data Structures', category: 'Concepts', proficiency: 82 },
  { name: 'Algorithms', category: 'Concepts', proficiency: 78 },
  { name: 'Machine Learning Basics', category: 'Concepts', proficiency: 80 },
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: 'azure-ai',
    title: 'Microsoft Certified: Azure AI Solution Certification',
    issuer: 'Microsoft',
    date: 'Certified',
    badgeColor: 'from-blue-600 to-indigo-600',
    description: 'Validates specialized core knowledge in designing and implementing AI workloads, cognitive services, and machine learning models on the Microsoft Azure cloud ecosystem.',
  },
];
