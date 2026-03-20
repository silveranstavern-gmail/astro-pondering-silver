import React, { useMemo, useState } from 'react';

// --- Types & Interfaces ---

type DetailLevel = 'snapshot' | 'standard' | 'deep';

interface Highlight {
    title: string;
    description: string;
}

interface Metric {
    label: string;
    value: string;
    helper?: string;
}

interface ExperienceRole {
    title: string;
    period: string;

    // Level 1: Snapshot
    // A 1-2 sentence high-level summary of the role's purpose.
    snapshotFocus: string;

    // Level 2: Standard
    // 3-5 punchy, high-impact bullet points. (Condensed version of achievements).
    standardHighlights: string[];

    // Level 3: Deep Dive
    // Detailed context paragraph(s) from the source markdown.
    deepContext: string[];
    // The full, exhaustive list of bullet points from the source markdown.
    deepAchievements: string[];
    // The tech stack used in this specific role.
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
    experiences: Experience[];
    projects: Project[];
    education: EducationItem[];
    skills: SkillCategory[];
}

// --- Data Population ---

const resumeData: ResumeData = {
    name: 'Donald Clements',
    title: 'Senior Full Stack Angular/.NET Web Developer',
    location: 'Remote (Global)',
    citizenship: 'United States (Texas)',
    availability: 'Open to senior/staff frontend & UI leadership roles · Remote only',
    summary:
        'Senior Software Engineer and frontend lead with 7+ years delivering enterprise Angular/.NET systems for global oilfield services. I specialize in the analysis and translation of business requirements into technical blueprints—identifying gaps, clarifying complex logic, and turning that clarity into maintainable, production-ready frontend architecture.',
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
                'Hands-on leadership in Angular 11 → 19 modernization, Signals adoption, and modular design for high-density, workflow-heavy enterprise applications.',
        },
        {
            title: 'Delivery Reliability',
            description:
                'Highly detail-oriented approach to debugging and documentation; known for thorough root-cause analysis, detailed PR feedback, and maintainable code-level documentation.',
        },
    ],
    metrics: [
        { label: 'Experience', value: '7 yrs 2 mos' },
        { label: 'Frontend Focus', value: 'Angular · RxJS · Workflow UI Architecture' },
        { label: 'Leadership', value: 'Mentorship, code reviews, and technical coordination' },
    ],
    experiences: [
        {
            company: 'Infosys – Major Oilfield Services Client',
            location: 'Remote (Houston, TX base)',
            employmentType: 'Full-time Contract',
            timeframe: 'Sep 2018 – Oct 2025',
            summaryPoints: [
                'Delivered multi-year enterprise logistics and materials management systems.',
                'Evolved from backend-focused development to frontend leadership and technical design over three major program phases.',
            ],
            roles: [
                {
                    title: 'Frontend Architecture, Feature Ownership & Co-Leadership',
                    period: 'Mar 2022 – Oct 2025',
                    snapshotFocus:
                        'Technical co-lead for a global logistics platform, owning workflow-heavy Angular architecture and ensuring technical feasibility across distributed delivery teams.',
                    standardHighlights: [
                        'Collaborated with POs and BAs to clarify requirements and identify functional gaps, reducing rework and ensuring a stable implementation path.',
                        'Architected and delivered core UI workspaces, including Roadmap Overview, Advanced Search, and Shipment Workspace, using modern Angular paradigms (v11–19).',
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
                    ],
                    techStack: [
                        'Angular 11–19',
                        'TypeScript',
                        'RxJS',
                        'Angular Signals',
                        'Sass',
                        'MongoDB',
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
                        'Azure Functions',
                        'MongoDB',
                        'SQL Server',
                        'KQL (Kusto)',
                        'Azure Log Analytics',
                        'Docker',
                        'Kubernetes',
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
                        'Azure DevOps (Workflows & CI/CD)',
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
                        'Developed full-stack web applications using C#, ASP.NET MVC, and Angular.',
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
            description: 'Chat interface for Open Router, requires API key from Open Router to work. Hosted on Vercel hobby tier',
            url: 'https://conversations-woven.vercel.app/chat',
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
                'Angular (11–19)',
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

// --- Components ---

const DetailButton = ({
                          isActive,
                          onClick,
                          label,
                          description,
                      }: {
    isActive: boolean;
    onClick: () => void;
    label: string;
    description: string;
}) => (
    <button
        type="button"
        onClick={onClick}
        className={`flex flex-col rounded-xl border px-4 py-2 text-left text-xs shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 sm:text-sm ${
            isActive
                ? 'border-violet-500 bg-violet-50 text-violet-700 ring-1 ring-violet-500/20'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
        }`}
    >
        <span className="font-bold uppercase tracking-wide">{label}</span>
        <span className="mt-0.5 text-[0.7rem] font-normal leading-relaxed text-slate-500 sm:text-xs">
      {description}
    </span>
    </button>
);

const RoleCard = ({
                      role,
                      cardDetailLevel,
                      onCycle,
                  }: {
    role: ExperienceRole;
    cardDetailLevel: DetailLevel;
    onCycle: () => void;
}) => {
    const chipClass = 'inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 shadow-sm';

    // Determine button text based on current level
    const getButtonText = () => {
        if (cardDetailLevel === 'snapshot') return 'more';
        if (cardDetailLevel === 'standard') return 'even more';
        return 'less';
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm print:border-slate-200 print:shadow-none">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-800">{role.title}</p>
                    <p className="text-xs uppercase tracking-wide text-slate-500">{role.period}</p>
                </div>
                <button
                    type="button"
                    onClick={onCycle}
                    className="inline-flex items-center gap-1 rounded-full border border-transparent px-3 py-1 text-xs font-medium text-violet-600 transition hover:border-violet-200 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 print:hidden"
                >
                    {getButtonText()}
                </button>
            </div>

            {/* SNAPSHOT: Show snapshotFocus + techStack */}
            {cardDetailLevel === 'snapshot' && (
                <>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">{role.snapshotFocus}</p>
                    <div className="mt-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Technologies</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {role.techStack.map((tech) => (
                                <span key={tech} className={chipClass}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* STANDARD: Show snapshotFocus + standardHighlights + techStack */}
            {cardDetailLevel === 'standard' && (
                <>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">{role.snapshotFocus}</p>
                    <div className="mt-4 space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Key highlights</p>
                        <ul className="space-y-2 text-sm text-slate-700">
                            {role.standardHighlights.map((highlight, highlightIndex) => (
                                <li key={`highlight-${highlightIndex}`} className="flex items-start gap-3">
                                    <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Technologies</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {role.techStack.map((tech) => (
                                <span key={tech} className={chipClass}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* DEEP: Show deepContext + deepAchievements + techStack */}
            {cardDetailLevel === 'deep' && (
                <>
                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
                        {role.deepContext.map((paragraph, pIndex) => (
                            <p key={`context-${pIndex}`}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="mt-5 space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Key contributions & technical experience</p>
                        <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
                            {role.deepAchievements.map((achievement, achievementIndex) => (
                                <li key={`achievement-${achievementIndex}`} className="flex gap-3">
                                    <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-400" />
                                    <span>{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Technologies</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {role.techStack.map((tech) => (
                                <span key={tech} className={chipClass}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
];

export default function Resume() {
    const [expandedRoles, setExpandedRoles] = useState<Record<string, DetailLevel>>({});

    const cycleDepth = (id: string) => {
        setExpandedRoles((prev) => {
            const currentLevel = prev[id] || 'snapshot';
            let nextLevel: DetailLevel;
            if (currentLevel === 'snapshot') {
                nextLevel = 'standard';
            } else if (currentLevel === 'standard') {
                nextLevel = 'deep';
            } else {
                nextLevel = 'snapshot';
            }
            return { ...prev, [id]: nextLevel };
        });
    };

    const quickNav = useMemo(
        () =>
            sections.map((section) => ({
                ...section,
                onClick: () => {
                    if (typeof window === 'undefined') return;
                    const element = document.getElementById(section.id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                },
            })),
        [],
    );

    return (
        <div className="relative min-h-screen bg-slate-100 px-4 py-10 text-slate-900 print:bg-white print:px-0 print:py-0">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-violet-500/15 via-slate-100 to-transparent"
            />

            <article className="relative mx-auto max-w-5xl space-y-16">
                {/* --- Header --- */}
                <header id="overview" className="space-y-8 rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-900/5 backdrop-blur print:bg-white print:shadow-none print:ring-0">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1 space-y-4 lg:min-w-0 lg:max-w-2xl">
                            <div>
                                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{resumeData.name}</h1>
                                <p className="mt-2 text-lg font-medium text-slate-600">{resumeData.title}</p>
                                <p className="text-sm uppercase tracking-[0.3em] text-emerald-500">{resumeData.location}</p>
                                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">Citizenship: {resumeData.citizenship}</p>
                                <p className="mt-2 text-sm text-slate-500">{resumeData.availability}</p>
                            </div>

                            <p className="text-base leading-relaxed text-slate-700">{resumeData.summary}</p>

                            <div className="space-y-3">
                                {resumeData.highlights.map((highlight) => (
                                    <div key={highlight.title} className="flex items-start gap-3">
                                        <span aria-hidden className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-slate-800">{highlight.title}</p>
                                            <p className="text-sm leading-relaxed text-slate-600">{highlight.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact & Metrics Sidebar */}
                        <aside className="w-full max-w-sm space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-md print:border-slate-200 print:shadow-none">
                            <div className="space-y-3">
                                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Contact</p>
                                <div className="flex flex-col gap-3">
                                    <a
                                        href={resumeData.contact.whatsappLink}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
                                    >
                                        <span aria-hidden>💬</span>
                                        Message on WhatsApp
                                    </a>
                                    <a
                                        href={`mailto:${resumeData.contact.email}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
                                    >
                                        <span aria-hidden>✉️</span>
                                        Email {resumeData.contact.email}
                                    </a>
                                    <a
                                        href={resumeData.contact.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
                                    >
                                        <span aria-hidden>🔗</span>
                                        View LinkedIn Profile
                                    </a>
                                    <a
                                        href="https://github.com/silveranstavern-gmail"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
                                    >
                                        <span aria-hidden>🔗</span>
                                        View GitHub Profile
                                    </a>
                                    <a
                                        href={resumeData.resumePdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-100 hover:text-violet-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
                                    >
                                        <span aria-hidden>⬇️</span>
                                        Download PDF Resume
                                    </a>
                                </div>
                                <p className="text-xs text-slate-500">Preferred contact: WhatsApp for quick coordination, or email for detailed notes.</p>
                                <p className="text-xs text-slate-500">The downloadable PDF is a separate formatted resume and is not an exact mirror of this web version.</p>
                            </div>

                            <div className="space-y-3 border-t border-slate-200 pt-4">
                                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Snapshot</p>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    {resumeData.metrics.map((metric) => (
                                        <li key={metric.label} className="flex flex-col">
                                            <span className="font-semibold text-slate-800">{metric.value}</span>
                                            <span className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</span>
                                            {metric.helper && <span className="text-xs text-slate-400">{metric.helper}</span>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </div>
                </header>

                <nav className="sticky top-4 z-30 hidden items-center justify-center print:hidden lg:flex">
                    <div className="flex max-w-3xl flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm shadow backdrop-blur">
                        {quickNav.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={item.onClick}
                                className="rounded-full px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-1"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* --- Experience Section --- */}
                <section id="experience" className="space-y-10">
                    <header className="space-y-2">
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Experience</h2>
                        <p className="text-sm text-slate-600">
                            Layered for rapid scanning: skim the summary in seconds, expand any role for delivery specifics, or switch to Deep Dive to view everything at once.
                        </p>
                    </header>

                    <div className="space-y-8">
                        {resumeData.experiences.map((experience, experienceIndex) => (
                            <article
                                key={`${experience.company}-${experienceIndex}`}
                                className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl print:border-slate-200 print:shadow-none"
                            >
                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-slate-900">{experience.company}</h3>
                                        <p className="text-sm font-medium uppercase tracking-wide text-emerald-500">{experience.employmentType}</p>
                                        <p className="text-sm text-slate-600">{experience.location}</p>
                                    </div>
                                    <div className="text-sm text-slate-500 md:text-right">
                                        <p className="font-semibold text-slate-700">{experience.timeframe}</p>
                                        <p>Primary role: {experience.summaryPoints[0]}</p>
                                    </div>
                                </div>

                                <ul className="grid gap-3 text-sm text-slate-700">
                                    {experience.summaryPoints.map((point, index) => (
                                        <li key={`${experience.company}-summary-${index}`} className="flex items-start gap-3">
                                            <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-violet-400" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="space-y-6">
                                    {experience.roles.map((role, roleIndex) => {
                                        const key = `${experienceIndex}-${roleIndex}`;
                                        const cardDetailLevel = expandedRoles[key] || 'snapshot';

                                        return (
                                            <RoleCard
                                                key={key}
                                                role={role}
                                                cardDetailLevel={cardDetailLevel}
                                                onCycle={() => cycleDepth(key)}
                                            />
                                        );
                                    })}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* --- Projects Section --- */}
                <section id="projects" className="space-y-6">
                    <header className="space-y-2">
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Projects</h2>
                        <p className="text-sm text-slate-600">
                            Personal projects and side work demonstrating technical capabilities and creative problem-solving.
                        </p>
                    </header>

                    <div className="space-y-4">
                        {resumeData.projects.map((project) => (
                            <div
                                key={project.title}
                                className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg print:border-slate-200 print:shadow-none"
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                                        <p className="text-sm leading-relaxed text-slate-700">{project.description}</p>
                                    </div>
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 print:hidden"
                                    >
                                        <span aria-hidden>🔗</span>
                                        Visit Project
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SKILLS: Always visible regardless of detail level */}
                <section id="skills" className="space-y-6">
                    <header className="space-y-2">
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Skills & Focus Areas</h2>
                        <p className="text-sm text-slate-600">
                            Curated to reflect how I operate day-to-day – frontend leadership grounded in strong platform awareness and collaborative habits.
                        </p>
                    </header>

                    <div className="grid gap-6 md:grid-cols-2">
                        {resumeData.skills.map((category) => (
                            <div
                                key={category.title}
                                className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg print:border-slate-200 print:shadow-none"
                            >
                                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{category.title}</h3>
                                <ul className="space-y-2 text-sm text-slate-700">
                                    {category.items.map((item) => (
                                        <li key={`${category.title}-${item}`} className="flex items-start gap-3">
                                            <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-400" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="education" className="space-y-6">
                    <header className="space-y-2">
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Education</h2>
                        <p className="text-sm text-slate-600">Academic foundation underpinning systems thinking and applied technology leadership.</p>
                    </header>

                    <div className="space-y-4">
                        {resumeData.education.map((education) => (
                            <div
                                key={education.institution}
                                className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-md print:border-slate-200 print:shadow-none"
                            >
                                <h3 className="text-lg font-semibold text-slate-900">{education.institution}</h3>
                                <p className="text-sm font-medium uppercase tracking-wide text-emerald-500">{education.degree}</p>
                                <p className="mt-1 text-sm text-slate-600">{education.period}</p>
                                {education.distinction && <p className="mt-2 text-sm text-slate-700">{education.distinction}</p>}
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="rounded-3xl border border-slate-200 bg-white/70 p-6 text-sm text-slate-500 shadow-md print:hidden">
                    <p>
                        Need a tailored PDF or have a specific brief? Message me on WhatsApp or email me directly and I can share a focused case study or deeper project walk-through.
                    </p>
                </footer>
            </article>

            <style>{`
                @media print {
                    body {
                        background: white !important;
                    }
                    nav, footer, .print\\:hidden {
                        display: none !important;
                    }
                    .print\\:show {
                        display: block !important;
                    }
                    article {
                        box-shadow: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
