export const EXPERIENCE_START_DATE = new Date('2018-04-01');
export const EXPERIENCE_END_DATE = new Date('2025-12-01');

export const calculateExperience = (start: Date, end: Date) => {
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    return `${years} yrs ${months} mos`;
};

export const experienceTotal = calculateExperience(EXPERIENCE_START_DATE, EXPERIENCE_END_DATE);

export type DetailLevel = 'snapshot' | 'standard' | 'deep';

interface Highlight {
    title: string;
    description: string;
}

interface Metric {
    label: string;
    value: string;
    helper?: string;
}

export interface ExperienceRole {
    title: string;
    period: string;
    snapshotFocus: string;
    standardHighlights: string[];
    deepContext: string[];
    deepAchievements: string[];
    techStack: string[];
}

interface Experience {
    company: string;
    location: string;
    employmentType: string;
    timeframe: string;
    summaryPoints: string[];
    roles: ExperienceRole[];
}

interface EducationItem {
    institution: string;
    degree: string;
    period: string;
    distinction?: string;
}

interface SkillCategory {
    title: string;
    items: string[];
}

interface Project {
    title: string;
    description: string;
    url: string;
}

interface ContactInfo {
    email: string;
    whatsapp: string;
    whatsappLink: string;
    linkedin: string;
}

export interface Tenet {
    title: string;
    content: string;
    icon: string;
}

interface ResumeData {
    name: string;
    title: string;
    location: string;
    citizenship: string;
    availability: string;
    summary: string;
    resumePdfUrl: string;
    contact: ContactInfo;
    highlights: Highlight[];
    metrics: Metric[];
    tenets: Tenet[];
    experiences: Experience[];
    projects: Project[];
    education: EducationItem[];
    skills: SkillCategory[];
}

export const resumeData: ResumeData = {
    name: 'Donald Clements',
    title: 'Senior Full Stack Angular/.NET Web Developer',
    location: 'Remote (Global)',
    citizenship: 'United States (Texas)',
    availability: 'Open to Senior/Staff Full Stack or Frontend leadership roles · Remote only',
    summary:
        'Senior Software Engineer and frontend lead with 7+ years delivering enterprise Angular/.NET systems for global oilfield services. I specialize in the analysis and translation of business requirements into technical blueprints – identifying gaps, clarifying complex logic, and turning that clarity into maintainable, production-ready frontend architecture.',
    resumePdfUrl: 'https://drive.google.com/uc?export=download&id=1R4WsWJiwOpMLcbKAfy6hZ1P3EWw3sen0',
    contact: {
        email: 'donald.d.clements@gmail.com',
        whatsapp: '+1 (706) 910-2470',
        whatsappLink:
            'https://wa.me/17069102470?text=Hi%20Donald%2C%20I%E2%80%99d%20love%20to%20connect%20about%20a%20frontend%20opportunity.',
        linkedin: 'https://www.linkedin.com/in/donald-duane-clements/',
    },
    highlights: [
        {
            title: 'Technical Ownership & Analysis',
            description:
                'Technical co-lead for complex, cross-module Angular work; specializes in identifying requirement gaps and translating business logic into robust technical blueprints.',
        },
        {
            title: 'Modern UI Architecture',
            description:
                'Hands-on leadership in Angular 11 – 19 modernization, Signals adoption, and modular design for high-density, workflow-heavy enterprise applications.',
        },
        {
            title: 'Delivery Reliability',
            description:
                'Highly detail-oriented approach to debugging and documentation; known for thorough root-cause analysis, detailed PR feedback, and maintainable code-level documentation.',
        },
    ],
    metrics: [
        { label: 'Experience', value: experienceTotal },
        { label: 'Frontend Focus', value: 'Angular · RxJS · Workflow UI Architecture' },
        { label: 'Leadership', value: 'Mentorship, PR Reviews, & Tech Coordination' },
    ],
    tenets: [
        {
            title: 'Right-Sized Complexity',
            icon: '⚖️',
            content: 'Good engineering is contextual. I favor solutions that are proportionate to the problem – avoiding the drag of over-engineering while ensuring the system is robust enough to last. I value clarity over cleverness every time.',
        },
        {
            title: 'Developer Empathy',
            icon: '🤝',
            content: 'Maintainability is an act of empathy. I push for clear naming, sensible structure, and meaningful commit hygiene because I know what it’s like to debug opaque code. I build for the person who comes after me.',
        },
        {
            title: 'AI-Augmented Craft',
            icon: '🤖',
            content: 'I use AI as a force multiplier for research and implementation, freeing up more attention for high-value judgment and refinement. It accelerates my delivery without compromising my responsibility for the final result.',
        },
        {
            title: 'High-Trust Autonomy',
            icon: '🌊',
            content: 'I thrive when given clear goals and the freedom to determine the implementation path. I favor outcomes over visibility and purposeful, grounded communication over constant meetings.',
        },
    ],
    experiences: [
        {
            company: 'Infosys – Major Oilfield Services Client',
            location: 'Remote (Houston, TX base)',
            employmentType: 'Full-time Contract',
            timeframe: 'Sep 2018 – Dec 2025',
            summaryPoints: [
                'Delivered multi-year enterprise logistics and materials management systems.',
                'Evolved from backend-focused development to frontend leadership and technical design over three major program phases.',
            ],
            roles: [
                {
                    title: 'Frontend Architecture, Feature Ownership & Co-Leadership',
                    period: 'Mar 2022 – Dec 2025',
                    snapshotFocus:
                        'Technical co-lead for a global logistics platform, owning workflow-heavy Angular architecture and ensuring technical feasibility across distributed delivery teams.',
                    standardHighlights: [
                        'Collaborated with POs and BAs to clarify requirements and identify functional gaps, reducing rework and ensuring a stable implementation path.',
                        'Architected and delivered core UI workspaces, including Roadmap Overview, Advanced Search, and Shipment Workspace, using modern Angular paradigms (v11 – 19).',
                        'Built high-density dashboards with advanced grid behavior, focusing on performance-sensitive features like server-side pagination and custom rendering.',
                        'Established custom workflow orchestration and validation patterns that improved reliability across multi-stage business processes.',
                        'Provided mentorship and detailed PR feedback to maintain architectural standards and code quality across the delivery team.',
                    ],
                    deepContext: [
                        'Returned to this project (originally joined in 2018) with a nearly exclusive frontend focus and broader technical coordination responsibilities.',
                        'Focus Areas included Advanced Angular development, module design, and bridging the gap between business specifications and technical implementation.',
                        'Served as a primary technical reference for POs, BAs, and developers; translated business requirements into actionable tasks and communicated technical constraints to stakeholders.',
                    ],
                    deepAchievements: [
                        'Architected and implemented complete Angular modules from design concept through production deployment.',
                        'Introduced a custom workflow orchestrator for state and transition management, simplifying complex multi-form validation logic.',
                        'Built dynamic rule validation systems (e.g., MoT-based Pre-Alert validation) with centralized reactive form logic.',
                        'Pioneered integration of Angular Signals within existing component architecture to improve state predictability.',
                        'Enhanced reusable component libraries, ensuring design consistency and reduced duplication across the monorepo.',
                        'Led frontend onboarding and mentoring for new developers, providing ongoing guidance on coding standards and feature integration.',
                        'Performed rigorous code reviews and PR approvals, emphasizing detail, maintainability, and architectural alignment.',
                        'Supported Agile delivery cycles through active participation in story refinement and backlog grooming with a focus on identifying edge cases.',
                        'Used LLM-assisted workflows selectively for prototyping, refactoring, and test scaffolding within complex UI feature work.',
                        'Investigated and resolved complex UI defects through methodical root-cause analysis and detailed bug reports.',
                        'Managed troubleshooting for Azure DevOps build failures, resolving environment-specific code issues and supporting feature deployments.',
                        'Collaborated with the backend team to strengthen test coverage, contributing to the development and maintenance of MSTest suites for core services.',
                        'Maintained full-stack flexibility by occasionally owning backend stories, delivering .NET Core and Azure Function updates to support frontend feature requirements.',
                    ],
                    techStack: [
                        'Angular 11 – 19',
                        'TypeScript',
                        'RxJS',
                        'Angular Signals',
                        'Sass',
                        'SignalR',
                        'MongoDB Atlas',
                        '.NET Core / C#',
                        'Entity Framework Core',
                        'Azure Functions',
                        'MSTest',
                        'Azure DevOps (CI/CD)',
                        'Collaborative Design Review (UX/UI)',
                        'Agile',
                    ],
                },
                {
                    title: 'Intelligent Middleware + SRE Integration',
                    period: 'Jan 2021 – Feb 2022',
                    snapshotFocus:
                        'Designed backend microservices to bridge legacy and modern systems while establishing observability patterns for reliability.',
                    standardHighlights: [
                        'Improved data consistency across six enterprise systems by identifying and automating self-healing workflows for synchronization failures.',
                        'Established SRE observability patterns (KQL dashboards, Alerts) adopted by internal services to reduce time-to-detection for anomalies.',
                        'Developed monitoring and alerting patterns that surfaced latency and synchronization issues faster across distributed microservices.',
                        'Implemented dynamic configuration management to allow for runtime parameter changes without service redeployment.',
                    ],
                    deepContext: [
                        'Designed and developed backend microservices to bridge legacy and modern enterprise systems.',
                        'Contributed to establishing Site Reliability Engineering (SRE) practices focused on system observability and fault tolerance.',
                        'Core focus areas included .NET Core development, Azure Function orchestration, and cross-system data consistency analysis.',
                    ],
                    deepAchievements: [
                        'Developed Azure Functions to monitor data pipelines and trigger self-healing workflows for known failure modes.',
                        'Built KQL dashboards and workbooks in Azure Log Analytics for real-time observability and trend analysis.',
                        'Implemented automated alerting mechanisms to detect error-rate spikes and transaction anomalies.',
                        'Enhanced middleware reliability through improved logging, fault handling, and diagnostic clarity across shared services.',
                        'Contributed to the internal microservice developer kit, optimizing service scaffolding for new integrations.',
                        'Collaborated with SRE engineers to define operational metrics and system SLIs/SLOs.',
                    ],
                    techStack: [
                        '.NET Core',
                        'C#',
                        'Entity Framework Core',
                        'Azure Functions',
                        'MongoDB',
                        'SQL Server',
                        'KQL (Kusto)',
                        'Azure Log Analytics',
                        'Dynatrace',
                    ],
                },
                {
                    title: 'Enterprise Logistics Modernization (Initial Phase)',
                    period: 'Sep 2018 – Dec 2020',
                    snapshotFocus:
                        'Ground-up development of a logistics platform, focusing on API design, data synchronization, and UI logic.',
                    standardHighlights: [
                        'Contributed to the evolution of the platform from early prototype to production-grade enterprise application.',
                        'Developed backend APIs (.NET Framework to .NET Core) and Angular features with an emphasis on correctness and clean service boundaries.',
                        'Strengthened foundational logistics workflows by identifying and resolving logic gaps in early-stage automation functions.',
                    ],
                    deepContext: [
                        'Ground-up development of an enterprise logistics management platform to streamline and automate material movements.',
                        'Early-stage work included backend service design, data synchronization, and full-stack module development.',
                        'Transitioned from QA/functional validation into full-time development, leveraging a deep domain understanding of logistics workflows.',
                    ],
                    deepAchievements: [
                        'Developed and maintained backend APIs using .NET Framework/Core.',
                        'Worked on adapter modules for integration with legacy and external systems, ensuring data synchronization integrity.',
                        'Implemented automation functions to generate and link downstream logistics documents based on prior stage events.',
                        'Leveraged MongoDB for persistence and optimized document schema updates as requirements evolved.',
                        'Enhanced test reliability using MS Test and established best practices for validation automation.',
                        'Collaborated closely with QA to validate backend workflows and accelerate defect isolation through detailed reproduction steps.',
                        'Supported frontend development with Angular and TypeScript, implementing consistent UI logic and reusable components.',
                    ],
                    techStack: [
                        '.NET Framework',
                        '.NET Core',
                        'C#',
                        'Angular 6+',
                        'MongoDB',
                        'SQL Server',
                        'MSTest',
                    ],
                },
            ],
        },
        {
            company: 'Revature',
            location: 'Florida',
            employmentType: 'Apprenticeship',
            timeframe: 'Apr 2018 – Sep 2018',
            summaryPoints: [
                'Paid live-in professional training; built full-stack .NET and Angular apps with CI/CD and testing.',
            ],
            roles: [
                {
                    title: '.NET Web Developer – Professional Training',
                    period: 'Apr 2018 – Sep 2018',
                    snapshotFocus:
                        'Intensive project-based training in full-stack .NET development, resulting in immediate contract buyout.',
                    standardHighlights: [
                        'Developed loosely coupled full-stack web applications using C#, ASP.NET MVC, and Angular.',
                        'Engineered and exposed RESTful services (SOA) built in ASP.NET Web API to support modular client interactions.',
                        'Configured CI/CD pipelines using Jenkins, automating build/deploy to AWS.',
                        'Applied SOLID and OOP principles to design clean, extensible back-end services.',
                    ],
                    deepContext: [
                        'Revature was a paid, live-in software development apprenticeship designed to train and transition developers into professional client engagements.',
                        'The program emphasized practical, project-based learning through collaborative team environments and agile development practices.',
                        'My client bought out my contract immediately following program completion, transitioning me directly into a full-time engineering role.',
                    ],
                    deepAchievements: [
                        'Developed and deployed full-stack web applications using C#, ASP.NET MVC, and ASP.NET Web API.',
                        'Built RESTful APIs that exposed business logic and integrated with multiple front-end clients.',
                        'Leveraged Entity Framework (Code First and Database First) for ORM mapping against SQL Server.',
                        'Utilized LINQ, Repository, and Unit of Work patterns to implement data access layers.',
                        'Integrated Angular components to build Single Page Applications (SPAs).',
                        'Implemented Docker containers to modularize application components.',
                        'Configured CI/CD pipelines using Jenkins across four interrelated systems hosted on AWS.',
                        'Established automated testing practices using xUnit, nUnit, Moq, and MSTest.',
                        'Implemented centralized logging using NLog.',
                    ],
                    techStack: [
                        'C#',
                        'ASP.NET MVC',
                        'Angular',
                        'SQL Server',
                        'Jenkins',
                        'Docker',
                        'AWS EC2/RDS',
                        'xUnit/nUnit',
                    ],
                },
            ],
        },
        {
            company: 'Previous Experience',
            location: 'Various',
            employmentType: 'Full-time',
            timeframe: '2002 – 2018',
            summaryPoints: [
                'Prior roles in technical support and military service demonstrating reliability, troubleshooting, and leadership.',
            ],
            roles: [
                {
                    title: 'Blackboard – Desktop Support Technician',
                    period: 'Nov 2017 – Feb 2018',
                    snapshotFocus: 'Maintained workstations, VMs, and networking equipment for call center operations.',
                    standardHighlights: [
                        'Installed, repaired, and maintained workstations and networking equipment.',
                        'Collaborated with network engineers to maintain uptime and respond to disruptions.',
                    ],
                    deepContext: [
                        'Provided technical support for a high-volume call center environment.',
                        'Ensured staff productivity through rapid resolution of hardware and software incidents.',
                    ],
                    deepAchievements: [
                        'Reduced ticket backlog through efficient triage.',
                        'Documented recurring issues to inform preventative maintenance.',
                        'Coordinated maintenance windows with network engineers.',
                    ],
                    techStack: ['Windows', 'VMware', 'Networking', 'Ticketing Systems'],
                },
                {
                    title: 'U.S. Army – 25Q Multichannel Systems Operator',
                    period: 'Aug 2002 – Feb 2007',
                    snapshotFocus:
                        'Operated and maintained mission-critical communications systems in dynamic environments.',
                    standardHighlights: [
                        'Set up, operated, and maintained mission-critical communications systems.',
                        'Managed site operations, equipment troubleshooting, and secure maintenance protocols in high-pressure environments.',
                    ],
                    deepContext: [
                        'Served as a Multichannel Transmission Systems Operator/Maintainer.',
                        'Responsible for the setup, operation, and maintenance of radio communications sites.',
                        'Developed a disciplined, methodical approach to troubleshooting and procedural reliability that I now apply to production debugging.',
                    ],
                    deepAchievements: [
                        'Managed COMSEC devices and secure keying protocols.',
                        'Trained and mentored junior operators in system-level maintenance.',
                        'Interpreted technical manuals for diagnostics and fault resolution.',
                    ],
                    techStack: ['RF Systems', 'COMSEC', 'Signal Diagnostics', 'Tactical Generators'],
                },
            ],
        },
    ],
    projects: [
        {
            title: 'Conversations Woven',
            description: 'Architected a privacy-focused, local-first LLM workspace. Implemented Zero-Trust security via Web Crypto API (PBKDF2 + AES-GCM) for client-side API key encryption and local-first persistence using IndexedDB (Dexie.js). Built with Angular 19 and Zoneless change detection.',
            url: 'https://conversations-woven.vercel.app/chat',
        },
        {
            title: 'PonderingSilver.com',
            description: 'Engineering portfolio demonstrating React 19 competency within an Astro "Islands Architecture" environment. Features a complex, stateful resume builder with nested expansion logic and print-optimized UI.',
            url: 'https://ponderingsilver.com/',
        },
    ],
    education: [
        {
            institution: 'Florida Institute of Technology',
            degree: 'B.S. · Computer Information Systems',
            period: '2013 – 2017',
            distinction: 'Summa Cum Laude (4.0 GPA) · Faculties Honors Award',
        },
    ],
    skills: [
        {
            title: 'Leadership & Analysis',
            items: [
                'Technical Requirements Analysis',
                'Bridging Business & Developer Communication',
                'Mentorship & Onboarding',
                'Code Review Standards & PR Feedback',
                'Root-Cause Analysis (RCA)',
                'Detailed Technical Documentation',
                'Proactive Gap Identification',
            ],
        },
        {
            title: 'Frontend & UI',
            items: [
                'Angular (6 – 19)',
                'TypeScript / JavaScript',
                'RxJS & Reactive Architecture',
                'Angular Signals',
                'Design Systems & UI Consistency',
                'Performance optimization for data-intensive UIs',
                'Responsive & Accessible UI',
            ],
        },
        {
            title: 'Platform & Operations',
            items: [
                '.NET Core / .NET 6 / Web API',
                'REST API Design & Contract Coordination',
                'Azure Functions & Cloud Services',
                'MongoDB & SQL Server',
                'Microservices & Integration middleware',
                'CI/CD & Deployment Workflows (Azure DevOps, Jenkins)',
                'Observability (Dynatrace, KQL)',
            ],
        },
    ],
};
