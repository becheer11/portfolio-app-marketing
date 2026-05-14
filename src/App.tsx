import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import { CustomCursor } from './components/CustomCursor';
import { ArrowUpRight, Cpu, Network, Database, Terminal, Code2, ChevronRight, Activity, Layers, Sun, Moon, Globe, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { trackEvent, useAnalyticsTracking } from './lib/analytics';
import { CookieConsent } from './components/CookieConsent';

const DATA_EN = {
  name: 'Bechir Guerriche',
  title: 'Business Intelligence Specialist & Data Architect',
  shortIntro: 'Business Intelligence Specialist, Data Architect, and Full-Stack Software Engineer based in Tunis. Building scalable data systems and performing advanced analytics.',
  email: 'bechirguerriche@gmail.com',
  instagram: '@bechirg',
  linkedin: 'https://linkedin.com/in/guerriche-bechir',
  github: 'https://github.com/becheer11/',
  city: 'Tunis, Tunisia',
  years: '3+',
  intro: "I am a Business Intelligence Specialist with a strong foundation in Full Stack development and AI. After building comprehensive software solutions, I realized that writing code was just the beginning. Today, I dive deep into data architectures, orchestrating robust ETL pipelines, and designing OLAP models that translate complex metrics into actionable insights. I bridge technical expertise with strategic intelligence to optimize performance and tell meaningful stories through data.",
  skills: {
    core: ['React', 'Node.js', 'Python', 'Java', 'PHP', 'Angular', 'Symfony'],
    database: ['MongoDB', 'SQL', 'Data Analytics', 'BI'],
    tools: ['Git', 'Scrum', 'UML', 'Data Scraping', 'OpenAI Integrations']
  },
  experience: [
    {
      role: 'Software Engineering Intern',
      company: 'Access Content Agency',
      period: 'Jan 2025 – May 2025',
      description: 'Developed "Colab", a platform for collaborations between advertisers and content creators. Implemented automated scoring using Instagram data scraping and OpenAI GPT. Built with MERN stack.'
    },
    {
      role: 'Advanced Intern',
      company: 'Soroubat',
      period: 'Jan 2024 – Feb 2024',
      description: 'Designed and deployed a Real Estate Management Application with complete technical specifications, intuitive dashboards, and system modeling.'
    },
    {
      role: 'Swimming Coach',
      company: 'CNBA',
      period: 'Nov 2023 – Present',
      description: 'Planning and leading training sessions for different skill levels. Helping others build discipline, motor skills, and self-confidence.'
    },
    {
      role: 'Summer Intern',
      company: 'Smartitek',
      period: 'Jun 2023 – Aug 2023',
      description: 'Analyzed requirements, designed UML diagrams, and deployed a Stock Management Application.'
    }
  ],
  education: [
    {
      degree: "Master's Degree in Business Intelligence",
      institution: 'Higher Institute of Technological Studies of Rades (Iset Rades)',
      period: '2025 – Present'
    },
    {
      degree: "Bachelor's Degree in Computer Science and Technology",
      institution: 'Higher Institute of Technological Studies of Zaghouan',
      period: '2022 – 2025'
    },
    {
      degree: "Baccalaureate Diploma in Computer Science",
      institution: 'Ben Arous High School',
      period: '2021 – 2022'
    }
  ],
  activities: [
    {
      title: 'Hackathon Mission 3.0 Winner',
      description: 'Secured 1st spot with "Chahrity", a solution addressing employment injustice, powered by HiiL.'
    },
    {
      title: 'Finance & Sponsorship Manager',
      organization: 'Enactus ISET Zaghouan',
      description: 'Lead Nopaleer, a sustainable cactus leather alternative (90% less water, 86% less CO2). Secured 3rd place National Exposition, Race4Green Finalist, and featured on IFM radio.'
    },
    {
      title: 'Hack for Heritage',
      description: 'Participated in the Hack for Heritage Hackathon, building tech solutions to preserve cultural heritage.'
    }
  ],
  projects: [
    {
      id: 1,
      name: 'Data Warehouse & Cube OLAP',
      category: 'Business Intelligence',
      role: 'Data Engineer / BI Specialist',
      techStack: ['SQL Server 2014', 'Visual Studio 2015', 'SSIS', 'SSAS', 'MDX', 'Star Schema'],
      description: 'Decision support system based on YouTube statistics for advertisers, creators, and market analysts.',
      problem: 'A lack of temporal history in snapshot data restricted reliable cohort analysis and continuous trend tracking.',
      intervention: 'Designed a Star Schema DW and a multidimensional OLAP Cube (SSAS), orchestrating robust ETL workflows while resolving UTF-8 ingestion limits.',
      outcome: 'Enabled high-level analysis on complex MDX metrics like RPM, Reach Ratio, and Subscriber Life Time Value.',
      highlights: [
        "Designed a Star Schema Data Warehouse and a multidimensional OLAP Cube to evaluate global YouTube performance in 2023.",
        "Configured Incremental Lookup ETL patterns manually for robustness, enabling replayability without key duplication errors.",
        "Executed a 'Shift Left' strategy directly in SQL (BULK INSERT) to resolve UTF-8 decoding problems originating from SSIS.",
        "Developed advanced MDX scripts and named queries to fix aggregation failures and build complex strategic metrics (RPM, Life Time Value)."
      ],
      image: '/youtube.png',
    },
    {
      id: 2,
      name: 'Industrial Production ETL',
      category: 'Data Engineering',
      role: 'Data Engineer',
      techStack: ['SQL Server', 'SSIS', 'Change Data Capture (CDC)', 'Data Profiling', 'Master ETL'],
      description: 'Comprehensive ETL pipeline to analyze industrial production efficiency.',
      problem: 'Valuable production insights were scattered across disconnected OLTP tables, blinding managers to actual costs and scrap rates.',
      intervention: 'Engineered a highly optimized ETL process with Microsoft SSIS featuring Change Data Capture (CDC) for incremental updates.',
      outcome: 'Centralized analytics, automating the tracking of production delays, real costs, and equipment efficiency.',
      highlights: [
        "Engineered a comprehensive ETL pipeline with SSIS migrating scattered and complex manufacturing data from OLTP into a structured Data Warehouse.",
        "Implemented Incremental Change Data Capture (CDC) to efficiently track insertions, updates, and deletions from source databases.",
        "Constructed a precise Star Schema consisting of specific dimension tables (Date, Location, Product, Transaction Type) to fuel decision-making.",
        "Orchestrated a Master ETL workflow, including error-routing, orphaned record staging, and automated success/failure notification systems."
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Colab',
      category: 'Platform / AI',
      role: 'Full-Stack Developer & AI Specialist',
      techStack: ['React', 'Node.js', 'GPT API', 'Instagram Scraping', 'MongoDB'],
      description: 'Analysis and Management Platform for Advertiser-Content Creator Collaborations.',
      problem: 'Manual influencer vetting caused a 40% drain on marketing resources across major campaigns.',
      intervention: 'Engineered an automated creator scoring system using public Instagram scraping and custom OpenAI GPT models for content analysis.',
      outcome: 'Reduced vetting time by 85% and increased campaign ROI.',
      highlights: [
        "Built an integrated platform for seamless advertiser and creator lifecycle management.",
        "Orchestrated a highly functional web scraping engine to extract deep audience analytics from public Instagram accounts.",
        "Deployed a custom large-language model evaluator using OpenAI's GPT to score content quality and brand safety dynamically."
      ],
      image: '/acces-pfe-project.jpg',
    },
    {
      id: 4,
      name: 'Nopaleer',
      category: 'Sustainable Tech',
      role: 'Co-Founder & Technical Lead',
      techStack: ['Clean Technology', 'Sustainable Sourcing', 'Agri-Tech', 'Product Development'],
      description: 'Sustainable cactus-based vegan leather alternative.',
      problem: 'Traditional leather production consumed excessive water and generated high carbon emissions.',
      intervention: 'Developed a cactus-based alternative leveraging sustainable agricultural practices.',
      outcome: '90% less water usage, 86% reduced carbon emissions. 3rd place National Exposition.',
      highlights: [
        "Led the technical research and development of a vegan, cactus-based leather substitute tailored for eco-friendly fashion.",
        "Achieved drastic resource footprint reductions, requiring 90% less water usage and reducing carbon emissions by 86%.",
        "Presented and demonstrated the prototype successfully, leading to 3rd place in the Enactus Tunisia National Exposition 2024."
      ],
      image: '/nopaleer.png',
    },
    {
      id: 5,
      name: 'Soroubat Real Estate',
      category: 'Web App',
      role: 'Full-Stack Developer',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Dashboards'],
      description: 'Custom Real Estate Management System with intuitive dashboards.',
      problem: 'Fragmented project monitoring and document management led to operational delays.',
      intervention: 'Architected a centralized management system with interactive dashboards using React and Node.js.',
      outcome: 'Streamlined operational workflow and reduced document retrieval time by 60%.',
      highlights: [
        "Designed and implemented a full-stack real estate property and document management system.",
        "Built interactive dashboards for real-time monitoring of project status, tasks, and budgets.",
        "Optimized backend queries in MongoDB to support fast data retrieval for complex reporting."
      ],
      image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=1600&auto=format&fit=crop',
    },
    {
      id: 6,
      name: 'The Parisian',
      category: 'E-commerce',
      role: 'Full-Stack Developer',
      techStack: ['React', 'Node.js', 'E-commerce', 'Inventory Management'],
      description: 'Specialized makeup retailer management platform with real-time interactive sales dashboards.',
      problem: 'Inaccurate stock tracking and delayed sales reporting affected inventory decisions.',
      intervention: 'Built a real-time tracking interface integrating interactive sales and stock dashboards.',
      outcome: 'Achieved 99.9% inventory accuracy and enabled instant sales reporting.',
      highlights: [
        "Developed a tailored inventory and sales management platform for a makeup retail business.",
        "Integrated real-time sales dashboards to track daily revenue and stock depletion.",
        "Implemented an automated alert system for low-stock products to prevent inventory shortages."
      ],
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1600&auto=format&fit=crop',
    },
  ],
  highlights: [
    {
      id: 1,
      title: "Hackathon Triumphs",
      description: "Participated in 5+ hackathons including Hack for Heritage and emerged as the winner of the Gotham Hackathon Mission 3.0.",
      image: '/hakathon-wining-mission.3.0.jpg'
    },
    {
      id: 2,
      title: "Radio Feature",
      description: "Featured on Express FM and IFM's 'Etudionet' with Aziz Bachtarzi, presenting Nopaleer and discussing the future of sustainable vegan leather.",
      image: '/radio-talk-about-our-club-expressfm.jpg'
    },
    {
      id: 3,
      title: "Ambassadorial Visit",
      description: "Honored to welcome Ambassadrice Anne Guéguen at ISET Zaghouan to present Nopaleer's eco-friendly innovations in vegan leather production.",
      image: '/ambassadrice.png',
    },
    {
      id: 4,
      title: "National Podium",
      description: "Secured 3rd place at the Enactus Tunisia National Exposition 2024 presenting Nopaleer, our sustainable vegan leather.",
      image: '/third-place-in-national-compet-enactus.jpg',
    },
    {
      id: 5,
      title: "Swimming Coaching & Team Leadership",
      description: "Passionate swimming coach dedicated to fostering discipline, technique, and teamwork. Guiding athletes to push their boundaries and achieve competitive excellence.",
      image: '/swimmin-coaching.jpg',
    }
  ],
  images: {
    hero: '/og-image.jpg',
  },
  ui: {
    intelActive: 'Intelligence Core Active',
    projects: 'Projects',
    arch: 'Architecture',
    connect: 'Connect',
    nextLevel: 'Next Level',
    dataSystems: 'Data Systems.',
    basedIn: 'Building scalable software architectures, optimizing business intelligence models, and engineering sustainable technical solutions. Based in ',
    btnResume: 'Download Data Core [CV]',
    status: 'Status',
    statusActive: 'Active',
    masterBi: "Master's BI @ Iset Rades",
    logProj: '[ DATA.PROJECTS ]',
    deployments: 'Deployments',
    yearsExp: 'Years Exp',
    lblDeploy: 'System Deployments',
    logHi: '[ SYS.LOG: HIGHLIGHTS ]',
    lblHi: 'Achievement Logs',
    record: 'RECORD',
    logBio: '[ ROOT.BIOGRAPHY ]',
    logTools: '[ ASSET.DATA_TOOLS ]',
    logStack: '[ ASSET.CORE_STACK ]',
    logExp: '[ SYS.LOG: EXPERIENCE ]',
    logEdu: '[ SYS.LOG: EDUCATION ]',
    logAct: '[ EXTRA.CURRICULAR ]',
    endOfTrans: '[ END OF TRANSMISSION ]',
    initContact: 'Initiate Contact',
    initProto: 'Initialize Protocol',
  }
};

const DATA_FR = {
  name: 'Bechir Guerriche',
  title: 'Spécialiste Business Intelligence & Data Architecte',
  shortIntro: 'Spécialiste en Business Intelligence, Architecte Data et Ingénieur Logiciel Full-Stack basé à Tunis. Création de systèmes robustes et d\'analyses de données.',
  email: 'bechirguerriche@gmail.com',
  instagram: '@bechirg',
  linkedin: 'https://linkedin.com/in/guerriche-bechir',
  github: 'https://github.com/becheer11/',
  city: 'Tunis, Tunisie',
  years: '3+',
  intro: "Je suis un Spécialiste en Business Intelligence doté de solides bases en développement Full Stack et en Intelligence Artificielle. Après avoir conçu des applications complexes, j'ai réalisé que la programmation n'était que le commencement. Actuellement, je me consacre aux architectures de données, au développement de pipelines ETL robustes et à la modélisation OLAP pour révéler des insights stratégiques. Mon objectif est d'optimiser les performances via l'ingénierie des données.",
  skills: {
    core: ['React', 'Node.js', 'Python', 'Java', 'PHP', 'Angular', 'Symfony'],
    database: ['MongoDB', 'SQL', 'Analyse de Données', 'BI'],
    tools: ['Git', 'Scrum', 'UML', 'Data Scraping', 'IA OpenAI']
  },
  experience: [
    {
      role: 'Stagiaire Ingénieur Logiciel',
      company: 'Access Content Agency',
      period: 'Jan 2025 – Mai 2025',
      description: 'Développement de "Colab", une plateforme de collaborations annonceurs-créateurs. Mise en place d\'un système de scoring automatisé avec scraping Instagram et GPT. Stack MERN.'
    },
    {
      role: 'Stagiaire en Perfectionnement',
      company: 'Soroubat',
      period: 'Jan 2024 – Fév 2024',
      description: 'Conception et déploiement d\'une application de gestion immobilière avec des spécifications techniques complètes et tableaux de bord intuitifs.'
    },
    {
      role: 'Coach de Natation',
      company: 'CNBA',
      period: 'Nov 2023 – Présent',
      description: 'Planification et animation de séances d\'entraînement. Accompagnement dans le développement de la discipline et la confiance en soi.'
    },
    {
      role: 'Stagiaire PFE',
      company: 'Smartitek',
      period: 'Juin 2023 – Août 2023',
      description: 'Analyse des besoins, conception de diagrammes UML et déploiement d\'une application de gestion de stock.'
    }
  ],
  education: [
    {
      degree: "Master en Business Intelligence",
      institution: 'Institut Supérieur des Études Technologiques de Radès (Iset Rades)',
      period: '2025 – Présent'
    },
    {
      degree: "Licence en Technologies de l'Informatique",
      institution: 'Institut Supérieur des Études Technologiques de Zaghouan',
      period: '2022 – 2025'
    },
    {
      degree: "Baccalauréat en Informatique",
      institution: 'Lycée Ben Arous',
      period: '2021 – 2022'
    }
  ],
  activities: [
    {
      title: 'Gagnant Hackathon Mission 3.0',
      description: '1ère place avec "Chahrity", une solution contre l\'injustice de l\'emploi soutenue par HiiL.'
    },
    {
      title: 'Responsable Finance & Sponsoring',
      organization: 'Enactus ISET Zaghouan',
      description: 'Projet Nopaleer : alternative de cuir végétal à base de cactus (90% d\'eau en moins). 3ème place Nationale.'
    },
    {
      title: 'Hack for Heritage',
      description: 'Participation pour développer des solutions tech préservant le patrimoine culturel.'
    }
  ],
  projects: [
    {
      id: 1,
      name: 'Data Warehouse & Cube OLAP',
      category: 'Business Intelligence',
      role: 'Data Engineer / Spécialiste BI',
      techStack: ['SQL Server 2014', 'Visual Studio 2015', 'SSIS', 'SSAS', 'MDX', 'Star Schema'],
      description: 'Système d\'aide à la décision basé sur l\'écosystème YouTube 2023 pour les annonceurs et analystes.',
      problem: 'L\'absence d\'historique temporel dans les données snapshot empêchait l\'analyse précise des cohortes.',
      intervention: 'Modélisation en schéma en étoile (Star Schema), création d\'un Cube OLAP Multidimensionnel (SSAS) et pipeline ETL robuste via SQL Server & SSIS.',
      outcome: 'Calcul direct de KPIs stratégiques complexes (RPM, Ratio de portée, LTV Abonné) grâce à des requêtes MDX.',
      highlights: [
        "Conception d'un Data Warehouse en étoile et d'un Cube OLAP multidimensionnel pour évaluer la performance mondiale de YouTube en 2023.",
        "Configuration manuelle de modèles ETL 'Incremental Lookup' robustes, permettant une fiabilité sans erreur de duplication de clés.",
        "Exécution d'une stratégie 'Shift Left' en SQL (BULK INSERT) pour résoudre les problèmes de décodage UTF-8 venant de SSIS.",
        "Développement de scripts MDX avancés et de requêtes nommées pour corriger les échecs d'agrégation et construire des métriques stratégiques (RPM, LTV)."
      ],
      image: '/youtube.png',
    },
    {
      id: 2,
      name: 'Projet ETL Production Industrielle',
      category: 'Data Engineering',
      role: 'Data Engineer',
      techStack: ['SQL Server', 'SSIS', 'Change Data Capture (CDC)', 'Data Profiling', 'Master ETL'],
      description: 'Pipeline ETL complet pour analyser l\'efficacité de la production industrielle.',
      problem: 'La dispersion des données dans les tables transactionnelles rendait le calcul des retards et des taux de rebut extrêmement coûteux.',
      intervention: 'Création d\'une architecture ETL structurée, avec zones de Staging et chargement incrémental via Change Data Capture (CDC).',
      outcome: 'Automatisation complète de l\'analyse de la performance industrielle et de l\'intégration de données fiables.',
      highlights: [
        "Ingénierie d'un pipeline ETL complet avec SSIS migrant des données de fabrication disparates depuis l'OLTP vers un Data Warehouse structuré.",
        "Implémentation du 'Change Data Capture' (CDC) incrémental pour suivre efficacement les insertions, mises à jour et suppressions.",
        "Construction d'un schéma en étoile précis (dimensions Date, Location, Product, Transaction Type) pour appuyer la prise de décision.",
        "Orchestration d'un flux Master ETL incluant le routage des erreurs, la gestion des enregistrements orphelins et les notifications automatisées."
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Colab',
      category: 'Plateforme / IA',
      role: 'Développeur Full-Stack & Spécialiste IA',
      techStack: ['React', 'Node.js', 'GPT API', 'Instagram Scraping', 'MongoDB'],
      description: 'Plateforme de gestion pour collaborateurs et annonceurs.',
      problem: 'La vérification manuelle des influenceurs entraînait une perte de ressources de 40% sur les campagnes majeures.',
      intervention: 'Développement d\'un système de scoring automatisé avec scraping Instagram et GPT.',
      outcome: 'Réduction du temps de vérification de 85% et augmentation du ROI des campagnes.',
      highlights: [
        "Construction d'une plateforme intégrée pour la gestion complète du cycle de vie des annonceurs et créateurs.",
        "Conception d'un moteur de web scraping hautement fonctionnel pour extraire l'audience des comptes publics Instagram.",
        "Déploiement d'un évaluateur basé sur les grands modèles de langage (OpenAI GPT) pour noter dynamiquement la qualité du contenu."
      ],
      image: '/acces-pfe-project.jpg',
    },
    {
      id: 4,
      name: 'Nopaleer',
      category: 'Tech Durable',
      role: 'Cofondateur & Technical Lead',
      techStack: ['Clean Technology', 'Approvisionnement durable', 'Agri-Tech', 'Développement de produits'],
      description: 'Alternative végane au cuir, à base de cactus.',
      problem: 'La production traditionnelle de cuir consommait trop d\'eau et générait d\'importantes émissions de carbone.',
      intervention: 'Développement d\'une alternative à base de cactus exploitant des pratiques agricoles durables.',
      outcome: '90% d\'eau en moins, 86% d\'émissions CO2 en moins. 3ème place nationale.',
      highlights: [
        "Direction de la R&D technique pour un substitut de cuir vegan à base de cactus conçu pour la mode écoresponsable.",
        "Réduction drastique de l'empreinte écologique : nécessitant -90% d'eau et réduisant les émissions de carbone de 86%.",
        "Présentation et démonstration réussie du prototype ayant remporté la 3ème place à l'Exposition Nationale Enactus Tunisie 2024."
      ],
      image: '/nopaleer.png',
    },
    {
      id: 5,
      name: 'Soroubat Immo',
      category: 'Web App',
      role: 'Développeur Full-Stack',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Dashboards'],
      description: 'Système personnalisé de gestion immobilière avec tableaux de bord.',
      problem: 'Le suivi de projet et la gestion documentaire fragmentés entraînaient des retards opérationnels.',
      intervention: 'Architecture d\'un système centralisé avec tableaux de bord interactifs (React, Node.js).',
      outcome: 'Fluidification du flux opérationnel et réduction du temps de recherche de documents de 60%.',
      highlights: [
        "Conception et implémentation d'un système full-stack de gestion des propriétés immobilières et des documents.",
        "Création de tableaux de bord interactifs pour le suivi en temps réel de l'état des projets, des tâches et des budgets.",
        "Optimisation des requêtes backend dans MongoDB pour accélérer la récupération des données de reporting complexes."
      ],
      image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=1600&auto=format&fit=crop',
    },
    {
      id: 6,
      name: 'The Parisian',
      category: 'E-commerce',
      role: 'Développeur Full-Stack',
      techStack: ['React', 'Node.js', 'E-commerce', 'Gestion des Stocks'],
      description: 'Plateforme de gestion pour revendeur de maquillage avec des tableaux de bord en temps réel.',
      problem: 'Un suivi inexact des stocks et des rapports de ventes retardés affectaient les décisions d\'inventaire.',
      intervention: 'Création d\'une interface de suivi en temps réel intégrant des tableaux de bord interactifs.',
      outcome: 'Précision des stocks de 99,9% et possibilité de reporting instantané.',
      highlights: [
        "Développement d'une plateforme sur-mesure de gestion des stocks et des ventes pour une entreprise de vente de maquillage.",
        "Intégration de tableaux de bord de ventes en temps réel pour suivre les revenus quotidiens et l'épuisement des stocks.",
        "Mise en place d'un système d'alerte automatisé pour les produits en rupture de stock afin d'éviter les pénuries."
      ],
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1600&auto=format&fit=crop',
    },
  ],
  highlights: [
    {
      id: 1,
      title: "Succès Hackathons",
      description: "Participation à plus de 5 hackathons, dont Hack for Heritage et victoire au Hackathon Mission 3.0.",
      image: '/hakathon-wining-mission.3.0.jpg'
    },
    {
      id: 2,
      title: "Passage Radio",
      description: "Intervention sur Express FM et IFM pour présenter Nopaleer et discuter de l'avenir du cuir vegan durable.",
      image: '/radio-talk-about-our-club-expressfm.jpg'
    },
    {
      id: 3,
      title: "Visite d'Ambassade",
      description: "Honneur d'accueillir l'ambassadrice Anne Guéguen à l'ISET Zaghouan pour présenter l'innovation écologique Nopaleer.",
      image: '/ambassadrice.png',
    },
    {
      id: 4,
      title: "Podium National",
      description: "3ème place à l'Exposition Nationale Enactus Tunisie 2024 avec Nopaleer.",
      image: '/third-place-in-national-compet-enactus.jpg',
    },
    {
      id: 5,
      title: "Coaching de Natation",
      description: "Coach de natation passionné, dédié à l'enseignement de la discipline, de la technique et du travail d'équipe. J'accompagne les athlètes pour repousser leurs limites.",
      image: '/swimmin-coaching.jpg',
    }
  ],
  images: {
    hero: '/og-image.jpg',
  },
  ui: {
    intelActive: 'Noyau Actif',
    projects: 'Projets',
    arch: 'Architecture',
    connect: 'Contact',
    nextLevel: 'Niveau Sup',
    dataSystems: 'Systèmes Data.',
    basedIn: 'Création d\'architectures logicielles évolutives, optimisation de modèles BI et ingénierie de solutions tech durables. Basé à ',
    btnResume: 'Télécharger le CV',
    status: 'Statut',
    statusActive: 'Actif',
    masterBi: "Master BI @ Iset Rades",
    logProj: '[ DATA.PROJETS ]',
    deployments: 'Déploiements',
    yearsExp: 'Années Exp',
    lblDeploy: 'Déploiements Système',
    logHi: '[ SYS.LOG: FAITS SAILLANTS ]',
    lblHi: 'Logs de Réussite',
    record: 'ARCHIVE',
    logBio: '[ ROOT.BIOGRAPHIE ]',
    logTools: '[ ASSET.OUTILS_DATA ]',
    logStack: '[ ASSET.STACK_CORE ]',
    logExp: '[ SYS.LOG: EXPÉRIENCE ]',
    logEdu: '[ SYS.LOG: ÉDUCATION ]',
    logAct: '[ EXTRA.CURSION ]',
    endOfTrans: '[ FIN DE TRANSMISSION ]',
    initContact: 'Initier le Contact',
    initProto: 'Initialiser le Protocole',
  }
};

const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div
      className={`group relative overflow-hidden bg-brand-bg/50 border border-brand-accent/10 hover:border-brand-accent/40 transition-colors duration-500 rounded-sm ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay"></div>
      {children}
    </div>
  );
};


const contentLocales = {
  en: DATA_EN,
  fr: DATA_FR
};

export default function App() {
  const [lang, setLang] = useState<'en'|'fr'>('en');
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const DATA = contentLocales[lang];
  useAnalyticsTracking();

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text bg-grid-texture selection:bg-brand-accent selection:text-brand-bg relative overflow-x-hidden flex flex-col font-sans">
      <Helmet>
        <title>{DATA.name} | {DATA.title}</title>
        <meta name="description" content={DATA.shortIntro} />
        <meta name="keywords" content="Portfolio, Software Engineer, Business Intelligence, BI Developer, IA, AI, Entrepreneurship, Coach, Developer, Data Analytics, React, Node.js" />
        <meta property="og:title" content={`${DATA.name} | ${DATA.title}`} />
        <meta property="og:description" content={DATA.shortIntro} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={DATA.images.hero} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${DATA.name} | ${DATA.title}`} />
        <meta name="twitter:description" content={DATA.shortIntro} />
        <meta name="twitter:image" content={DATA.images.hero} />
        <link rel="canonical" href="https://guerriche.dev" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": DATA.name,
            "jobTitle": DATA.title,
            "url": "https://guerriche.dev",
            "sameAs": [
              DATA.linkedin,
              DATA.github,
              `https://instagram.com/${DATA.instagram.replace('@', '')}`
            ],
            "knowsAbout": [
              "Business Intelligence",
              "BI Developer",
              "System Architecture",
              "Data Analytics",
              "Software Engineering",
              "Artificial Intelligence",
              "IA",
              "Entrepreneurship",
              "Coach",
              "React",
              "Node.js",
              "ETL Processing"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": `${DATA.name} | Portfolio`,
            "url": "https://guerriche.dev",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://guerriche.dev/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <CustomCursor />
      
      {/* Space Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute inset-0 bg-grid-texture" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/90 to-transparent" />
      </div>

      {/* Subtle ambient light */}
      <motion.div 
        className="fixed top-[-20%] left-[20%] w-[60%] h-[60%] bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <main className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 flex flex-col flex-1">
        {/* TOP HUD HEADER */}
        <header className="flex justify-between items-end border-b border-brand-accent/10 pb-4 mb-24 relative backdrop-blur-md sticky top-0 z-50 pt-4">
          <div className="flex flex-col">
            <span className="text-brand-accent text-[10px] font-mono tracking-widest uppercase mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-accent animate-pulse rounded-full shadow-[0_0_10px_var(--color-brand-accent)]" />
              {DATA.ui.intelActive}
            </span>
            <div className="text-2xl font-bold tracking-tighter uppercase flex items-center gap-2">
              <Layers className="text-brand-accent w-6 h-6" />
              {DATA.name}
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-12 text-xs uppercase font-mono tracking-[0.2em] text-brand-muted font-bold">
            <a href="#projects" className="hover:text-brand-accent hover:neon-glow transition-all hover-target translate-y-0 hover:-translate-y-1">{DATA.ui.projects}</a>
            <a href="#about" className="hover:text-brand-accent hover:neon-glow transition-all hover-target translate-y-0 hover:-translate-y-1">{DATA.ui.arch}</a>
            <a href="#contact" className="text-brand-accent hover:text-white hover:neon-glow transition-all hover-target translate-y-0 hover:-translate-y-1">{DATA.ui.connect}</a>
            
            <div className="flex items-center gap-4 ml-4">
              <button onClick={() => setLang(l => l === 'en' ? 'fr' : 'en')} className="hover:text-brand-accent transition-colors flex items-center gap-2" title="Toggle Language">
                <Globe size={16} />
                <span>{lang.toUpperCase()}</span>
              </button>
              <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="hover:text-brand-accent transition-colors" title="Toggle Theme">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </nav>
        </header>

        {/* HERO - 3D Layout */}
        <motion.section 
          style={{ y: heroY, opacity: opacityHero, scale: scaleHero }}
          className="flex-1 min-h-[70vh] flex flex-col justify-center relative z-10 mb-32 perspective-1000"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center preserve-3d">
            <div className="md:col-span-7 flex flex-col justify-center relative z-20">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, type: "spring" }}
                className="mb-8 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-brand-accent flex flex-wrap items-center gap-3 drop-shadow-[0_0_15px_rgba(255,106,0,0.5)]"
              >
                <Terminal size={16} className="flex-shrink-0" />
                <span className="leading-relaxed">{DATA.title}</span>
              </motion.div>
              
              <h1 className="sr-only">{DATA.name} - {DATA.title}</h1>
              <h2 className="text-4xl sm:text-5xl lg:text-[5.5rem] leading-[1.1] font-black uppercase tracking-tighter mb-8 text-brand-text relative z-10">
                <div className="overflow-hidden py-2">
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, type: "spring", bounce: 0.4 }}>
                    {DATA.ui.nextLevel}
                  </motion.div>
                </div>
                <div className="overflow-hidden py-2">
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0.1 }} className="flex flex-wrap items-center gap-x-4">
                    Data <span className="text-transparent bg-clip-text bg-gradient-to-b from-brand-accent to-brand-accent-hover select-none">{DATA.ui.dataSystems}</span>
                  </motion.div>
                </div>
              </h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
                className="max-w-xl text-lg opacity-90 leading-relaxed font-sans border-l-2 border-brand-accent pl-6 py-2 bg-brand-bg/50 backdrop-blur-md rounded-r-md"
              >
                {DATA.ui.basedIn} {DATA.city}.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
                className="mt-12 flex gap-4 flex-wrap"
              >
                {["System Architecture", "BI Models", "Full-Stack"].map((tag, i) => (
                  <div key={i} className="px-6 py-3 text-[10px] font-bold font-mono uppercase tracking-widest text-brand-muted flex items-center gap-2 border border-brand-accent/20 rounded-sm">
                    <Activity size={12} className="text-brand-accent" />
                    {tag}
                  </div>
                ))}
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
                className="mt-8 flex gap-4"
              >
                <a 
                  href="/CV_Bechir_Guerriche.pdf" 
                  download="CV_Bechir_Guerriche.pdf"
                  onClick={() => trackEvent('resume_download', { file_name: 'CV_Bechir_Guerriche.pdf' })}
                  className="px-6 py-3 bg-brand-accent text-brand-bg font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold hover:bg-brand-accent-hover transition-colors flex items-center gap-2 rounded-sm"
                >
                  {DATA.ui.btnResume}
                </a>
              </motion.div>
            </div>

            {/* Data-Driven Minimalist Visual */}
            <div className="md:col-span-5 relative flex justify-end h-full min-h-[400px]">
               <div className="w-full max-w-sm aspect-square border-l border-b border-brand-accent/20 relative p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-8 h-8 border-t border-l border-brand-accent/60" />
                    <div className="text-[10px] uppercase font-mono tracking-widest text-brand-muted">Vol. 1</div>
                  </div>
                  
                  <div className="space-y-6 my-auto">
                    <div>
                      <div className="flex justify-between text-[10px] font-mono tracking-widest uppercase mb-2"><span>System Architecture</span><span>98%</span></div>
                      <div className="h-[2px] w-full bg-brand-accent/10 overflow-hidden relative">
                         <motion.div initial={{ width: 0 }} animate={{ width: '98%' }} transition={{ duration: 1.5, delay: 0.5 }} className="absolute inset-y-0 left-0 bg-brand-accent" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] font-mono tracking-widest uppercase mb-2"><span>Data Intelligence</span><span>95%</span></div>
                      <div className="h-[2px] w-full bg-brand-accent/10 overflow-hidden relative">
                         <motion.div initial={{ width: 0 }} animate={{ width: '95%' }} transition={{ duration: 1.5, delay: 0.7 }} className="absolute inset-y-0 left-0 bg-brand-accent" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="text-5xl font-light tracking-tighter text-brand-accent">0{DATA.years}<span className="text-[10px] tracking-widest uppercase font-mono text-brand-muted block mt-2">Years Exp</span></div>
                    <div className="text-right">
                       <div className="flex items-center gap-2 justify-end mb-1 text-brand-accent">
                         <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
                         <span className="text-[10px] uppercase font-mono tracking-widest font-bold">{DATA.ui.statusActive}</span>
                       </div>
                       <div className="text-[10px] uppercase tracking-widest opacity-70 font-mono">{DATA.ui.masterBi}</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </motion.section>

        {/* PROJECTS - 3D Grid */}
        <section id="projects" className="py-32 relative z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="relative">
                     <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-4 relative z-10">{DATA.ui.logProj}</h3>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter relative z-10">{DATA.ui.lblDeploy}</h2>
            </div>
            <div className="flex gap-8 bg-brand-bg/50 border border-brand-accent/10 backdrop-blur-md px-8 py-4 rounded-sm">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-accent">12+</div>
                <div className="text-xs font-mono uppercase font-bold tracking-widest text-brand-text mt-2">{DATA.ui.deployments}</div>
              </div>
              <div className="w-[1px] bg-brand-accent/20" />
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-accent">0{DATA.years}</div>
                <div className="text-xs font-mono uppercase font-bold tracking-widest text-brand-text mt-2">{DATA.ui.yearsExp}</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {DATA.projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} ui={DATA.ui} onClick={setSelectedProject} />
            ))}
          </div>
        </section>

        {/* HIGHLIGHTS CAROUSEL / GRID (NEW ADDITION) */}
        <section className="py-32 relative z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />
          
          <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-4 text-center">{DATA.ui.logHi}</h3>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-20 text-center text-glow">{DATA.ui.lblHi}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
             {DATA.highlights.map((item, i) => (
                <TiltCard key={item.id} className="h-full group">
                  <motion.div 
                    initial={{ opacity: 0, y: 50, rotateX: -20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
                    className="glass-3d h-full rounded-2xl overflow-hidden flex flex-col relative preserve-3d border border-brand-accent/20 hover:border-brand-accent/60 transition-colors duration-500"
                  >
                    <div className="h-48 md:h-56 relative overflow-hidden bg-black flex items-center justify-center p-4">
                       <div className="absolute inset-0 bg-brand-accent/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                       {item.image && (
                         <img 
                           src={item.image} 
                           alt={item.title} 
                           loading="lazy"
                           className="w-full h-full object-contain filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 relative z-0 pointer-events-none" 
                         />
                       )}
                       <div className="absolute inset-0 bg-gradient-to-t from-brand-bg to-transparent z-20 top-1/2 pointer-events-none" />
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col relative preserve-3d translate-z-20 -mt-12 z-30 pointer-events-none">
                       <div className="text-[10px] font-mono tracking-widest text-brand-accent bg-brand-bg border border-brand-accent/50 px-3 py-1 rounded-full w-fit mb-4 shadow-[0_0_10px_rgba(255,106,0,0.2)]">
                         [ {DATA.ui.record}: 0{i+1} ]
                       </div>
                       <h4 className="text-2xl font-bold uppercase mb-4 group-hover:text-brand-accent transition-colors">{item.title}</h4>
                       <p className="text-sm opacity-80 leading-relaxed font-sans">{item.description}</p>
                    </div>
                  </motion.div>
                </TiltCard>
             ))}
          </div>
        </section>

        {/* ARCHITECTURE (About / Skills) */}
        <section id="about" className="py-32 relative z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-5 relative preserve-3d perspective-1000">
               <TiltCard>
                 <div className="glass-3d p-10 rounded-3xl relative overflow-hidden border border-brand-accent/30 shadow-[0_0_50px_rgba(255,106,0,0.1)] translate-z-20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 blur-3xl rounded-full pointer-events-none" />
                    <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-8">{DATA.ui.logBio}</h3>
                    <p className="text-xl leading-relaxed opacity-90 font-sans">
                      {DATA.intro}
                    </p>
                 </div>
               </TiltCard>
            </div>
            
            <div className="lg:col-span-7 flex flex-col gap-12 perspective-1000">
               <TiltCard>
                  <div className="glass-3d p-8 rounded-3xl border border-brand-accent/20 preserve-3d translate-z-20">
                    <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-6 flex items-center gap-3">
                      <Database size={18} /> {DATA.ui.logTools}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {[...DATA.skills.database, ...DATA.skills.tools].map((tool, i) => (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          key={tool} 
                          className="bg-brand-bg/80 border border-brand-accent/30 px-5 py-3 rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-brand-accent hover:text-brand-bg hover:shadow-[0_0_15px_rgba(255,106,0,0.6)] transition-all cursor-default"
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </div>
               </TiltCard>
               
               <TiltCard>
                  <div className="glass-3d p-8 rounded-3xl border border-brand-accent/20 preserve-3d translate-z-20">
                    <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-6 flex items-center gap-3">
                      <Code2 size={18} /> {DATA.ui.logStack}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {DATA.skills.core.map((skill, i) => (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          key={skill} 
                          className="bg-brand-bg/80 border border-brand-accent/30 px-5 py-3 rounded-xl text-xs uppercase font-bold tracking-widest text-brand-text hover:border-brand-accent hover:shadow-[0_0_15px_rgba(255,106,0,0.3)] transition-all cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
               </TiltCard>
            </div>
          </div>
        </section>

        {/* LOGS (Experience & Education) */}
        <section className="py-32 relative z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Experience */}
            <div>
              <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-12 flex items-center gap-4">
                 <span className="w-12 h-[1px] bg-brand-accent"></span>
                 {DATA.ui.logExp}
              </h3>
              <div className="flex flex-col gap-8 relative border-l-2 border-brand-accent/20 pl-8 ml-4">
                {DATA.experience.map((exp, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    key={i} 
                    className="glass-3d p-8 rounded-2xl relative group hover:border-brand-accent/50 transition-colors"
                  >
                    <div className="absolute top-10 -left-[35px] w-4 h-4 rounded-full bg-brand-bg border-2 border-brand-accent group-hover:bg-brand-accent group-hover:shadow-[0_0_15px_rgba(255,106,0,0.8)] transition-all z-10" />
                    
                    <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                      <div>
                        <div className="text-xs font-mono uppercase font-bold tracking-widest text-brand-accent mb-2">{exp.company}</div>
                        <h4 className="text-2xl font-black">{exp.role}</h4>
                      </div>
                      <div className="text-[10px] font-mono uppercase font-bold tracking-widest bg-brand-accent/10 border border-brand-accent/30 px-3 py-1.5 rounded-full whitespace-nowrap text-brand-accent shadow-[0_0_10px_rgba(255,106,0,0.1)]">
                        {exp.period}
                      </div>
                    </div>
                    <p className="text-base opacity-80 leading-relaxed font-sans">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education & Extracurricular */}
            <div className="flex flex-col gap-20">
               <div>
                 <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-12 flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-brand-accent"></span>
                    {DATA.ui.logEdu}
                 </h3>
                 <div className="flex flex-col gap-6">
                   {DATA.education.map((edu, i) => (
                     <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.5, delay: i * 0.1 }}
                       key={i} 
                       className="glass-3d p-6 rounded-2xl border-l-4 border-l-brand-accent"
                     >
                       <div className="flex justify-between items-start gap-4 mb-3">
                          <h4 className="text-lg font-bold">{edu.degree}</h4>
                          <div className="text-[10px] font-mono uppercase font-bold tracking-widest bg-brand-accent/10 px-2 py-1 rounded text-brand-accent flex-shrink-0">{edu.period}</div>
                       </div>
                       <div className="text-sm opacity-70 font-mono text-brand-muted">{edu.institution}</div>
                     </motion.div>
                   ))}
                 </div>
               </div>

               <div>
                 <h3 className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-12 flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-brand-accent"></span>
                    {DATA.ui.logAct}
                 </h3>
                 <div className="flex flex-col gap-6">
                   {DATA.activities.map((act, i) => (
                     <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.5, delay: i * 0.1 }}
                       key={i} 
                       className="glass-3d p-6 rounded-2xl hover:bg-brand-accent/5 transition-all group border border-transparent hover:border-brand-accent/30"
                     >
                       <h4 className="text-xl font-bold mb-3 group-hover:text-brand-accent transition-colors">{act.title}</h4>
                       {act.organization && <div className="text-[10px] font-mono uppercase font-bold tracking-widest text-brand-text mb-4 bg-brand-bg border border-brand-accent/20 w-fit px-3 py-1 rounded-md">{act.organization}</div>}
                       <p className="text-sm opacity-80 leading-relaxed font-sans">{act.description}</p>
                     </motion.div>
                   ))}
                 </div>
               </div>
            </div>
            
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="py-24 relative z-20 flex flex-col items-center gap-12 text-center mt-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50 pointer-events-none" />
          
          <div className="relative">
            <div className="absolute inset-0 bg-brand-accent/20 blur-3xl rounded-full pointer-events-none" />
            <div className="text-sm uppercase font-mono tracking-[0.3em] font-bold text-brand-accent mb-6 relative z-10">{DATA.ui.endOfTrans}</div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 relative z-10 text-glow">{DATA.ui.initContact}</h2>
            
            <TiltCard className="inline-block relative z-10">
               <a 
                 href={`mailto:${DATA.email}`} 
                 onClick={() => trackEvent('contact_click', { method: 'email' })}
                 className="block glass-3d px-8 md:px-12 py-6 rounded-2xl text-xl md:text-2xl font-bold text-brand-text border border-brand-accent/40 hover:bg-brand-accent hover:text-brand-bg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,106,0,0.6)] hover-target"
               >
                 {DATA.email}
               </a>
            </TiltCard>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <TiltCard>
              <a 
                href={DATA.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => trackEvent('social_click', { platform: 'LinkedIn' })}
                className="flex items-center gap-4 glass-3d px-8 py-4 rounded-xl hover:bg-brand-accent/10 transition-colors hover:border-brand-accent border border-transparent group hover-target w-full sm:w-auto relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-10 h-10 rounded-lg bg-brand-bg border border-brand-accent/30 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] transition-shadow">
                  <Network className="text-brand-accent" size={18} />
                </div>
                <span className="font-bold tracking-widest font-mono uppercase text-sm">LinkedIn</span>
              </a>
            </TiltCard>
            
            <TiltCard>
              <a 
                href={`https://instagram.com/${DATA.instagram.replace('@','')}`} 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => trackEvent('social_click', { platform: 'Instagram' })}
                className="flex items-center gap-4 glass-3d px-8 py-4 rounded-xl hover:bg-brand-accent/10 transition-colors hover:border-brand-accent border border-transparent group hover-target w-full sm:w-auto relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-10 h-10 rounded-lg bg-brand-bg border border-brand-accent/30 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] transition-shadow">
                  <Activity className="text-brand-accent" size={18} />
                </div>
                <span className="font-bold tracking-widest font-mono uppercase text-sm">Instagram</span>
              </a>
            </TiltCard>

            <TiltCard>
              <a 
                href={DATA.github} 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => trackEvent('social_click', { platform: 'GitHub' })}
                className="flex items-center gap-4 glass-3d px-8 py-4 rounded-xl hover:bg-brand-accent/10 transition-colors hover:border-brand-accent border border-transparent group hover-target w-full sm:w-auto relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-10 h-10 rounded-lg bg-brand-bg border border-brand-accent/30 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] transition-shadow">
                  <Terminal className="text-brand-accent" size={18} />
                </div>
                <span className="font-bold tracking-widest font-mono uppercase text-sm">GitHub</span>
              </a>
            </TiltCard>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <CookieConsent />
    </div>
  );
}

// Subcomponent for Project Modal
const ProjectModal: import('react').FC<{ project: any; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-brand-bg relative flex flex-col border border-brand-accent/20 rounded-md shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 hover:bg-brand-accent/20 rounded-full transition-colors text-brand-accent hover-target"
        >
          <X size={24} />
        </button>

        <div className="relative h-64 md:h-80 w-full overflow-hidden border-b border-brand-accent/20 shrink-0">
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover filter grayscale-[40%] hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 md:left-12 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="text-[10px] uppercase font-mono tracking-widest text-brand-bg bg-brand-accent px-3 py-1 rounded-sm w-fit font-bold shadow-md">
                {project.category}
              </div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-brand-accent border border-brand-accent/40 bg-brand-bg/50 backdrop-blur-md px-3 py-1 rounded-sm w-fit">
                {project.role}
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-brand-text drop-shadow-md mb-2">
              {project.name}
            </h2>
            <p className="text-sm md:text-base font-sans opacity-90 leading-relaxed text-brand-text max-w-2xl font-medium">
              {project.description}
            </p>
          </div>
        </div>

        <div className="p-6 md:p-12 flex flex-col gap-10 flex-1">
          {/* Tech Stack */}
          {project.techStack && (
            <div>
              <h3 className="text-xs uppercase font-mono tracking-widest text-brand-accent/70 mb-4 font-bold">Tech Stack & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string, i: number) => (
                  <span key={i} className="text-[10px] font-mono tracking-widest uppercase border border-brand-accent/20 px-3 py-1.5 rounded-sm bg-brand-accent/5 text-brand-muted">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Professional Highlights (CV Style) */}
          {project.highlights && (
             <div className="mb-4">
                <h3 className="text-xs uppercase font-mono tracking-widest text-brand-accent/70 mb-6 font-bold">Key Achievements</h3>
                <ul className="space-y-4 font-sans text-sm md:text-base opacity-90 leading-relaxed list-none">
                  {project.highlights.map((highlight: string, i: number) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="w-1.5 h-1.5 bg-brand-accent rounded-sm mt-2 shrink-0 pointer-events-none" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
             </div>
          )}

          {/* The Campaign Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-brand-accent/10">
            <div className="bg-brand-bg/40 border border-brand-accent/10 p-6 rounded-sm">
              <div className="flex items-center gap-2 mb-4 border-b border-brand-accent/10 pb-3">
                <div className="w-2 h-2 bg-red-500/80 rounded-full" />
                <div className="text-[10px] uppercase font-mono tracking-widest text-brand-muted font-bold">Problem</div>
              </div>
              <p className="text-sm font-sans opacity-80 leading-relaxed">{project.problem}</p>
            </div>
            <div className="bg-brand-bg/40 border border-brand-accent/10 p-6 rounded-sm">
              <div className="flex items-center gap-2 mb-4 border-b border-brand-accent/10 pb-3">
                <div className="w-2 h-2 bg-yellow-500/80 rounded-full" />
                <div className="text-[10px] uppercase font-mono tracking-widest text-brand-muted font-bold">Intervention</div>
              </div>
              <p className="text-sm font-sans opacity-80 leading-relaxed">{project.intervention}</p>
            </div>
            <div className="bg-brand-bg/40 border border-brand-accent/20 p-6 rounded-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-brand-accent/5 pointer-events-none" />
              <div className="flex items-center gap-2 mb-4 border-b border-brand-accent/20 pb-3 relative z-10">
                <div className="w-2 h-2 bg-green-500/80 rounded-full animate-pulse" />
                <div className="text-[10px] uppercase font-mono tracking-widest text-brand-accent font-bold">Outcome</div>
              </div>
              <p className="text-sm font-sans text-brand-text font-medium leading-relaxed relative z-10">{project.outcome}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Subcomponent for Clean Corporate Project Card
const ProjectCard: import('react').FC<{ project: any; index: number; ui: any; onClick?: (project: any) => void; }> = ({ project, index, ui, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group hover-target cursor-pointer flex flex-col"
      onClick={() => {
        trackEvent('project_view', { project_name: project.name });
        if (onClick) onClick(project);
      }}
    >
      <div className="flex flex-col overflow-hidden h-full">
        {/* Minimalist Image Container */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden mb-8 border border-brand-accent/10 rounded-sm">
          <div className="absolute inset-0 bg-brand-bg/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <img 
            src={project.image} 
            alt={project.name} 
            loading="lazy"
            className="w-full h-full object-cover filter grayscale-[100%] group-hover:grayscale-[20%] transition-all duration-700 transform group-hover:scale-[1.02]"
          />
          <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-brand-bg/90 border border-brand-accent/20 text-[10px] font-mono font-bold uppercase text-brand-accent backdrop-blur-md">
            ID: 0{index + 1}
          </div>
        </div>
        
        {/* Content Segment */}
        <div className="flex-1 flex flex-col">
          <div className="text-[10px] uppercase font-mono tracking-widest text-brand-muted mb-2 font-bold">
            {project.category}
          </div>
          <h3 className="text-3xl font-bold uppercase tracking-tight mb-4 group-hover:text-brand-accent transition-colors">
            {project.name}
          </h3>
          <p className="font-sans opacity-80 text-base leading-relaxed mb-8 block">
            {project.description}
          </p>

          {/* Rule of Three Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-auto border-t border-brand-accent/10 pt-6">
            <div>
              <div className="text-[9px] uppercase font-mono tracking-widest text-brand-accent/70 mb-2">Problem Statement</div>
              <p className="text-xs font-sans opacity-80 leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <div className="text-[9px] uppercase font-mono tracking-widest text-brand-accent/70 mb-2">Strategic Intervention</div>
              <p className="text-xs font-sans opacity-80 leading-relaxed">{project.intervention}</p>
            </div>
            <div>
              <div className="text-[9px] uppercase font-mono tracking-widest text-brand-accent/70 mb-2">Measurable Outcome</div>
              <p className="text-xs font-sans text-brand-accent font-medium leading-relaxed">{project.outcome}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
