import {useMemo, useState} from 'react';

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
    focus: string;
    quickWins: string[];
    contributions: string[];
    technologies: string[];
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

interface ResumeData {
    name: string;
    title: string;
    location: string;
    citizenship: string;
    availability: string;
    summary: string;
    contact: {
        email: string;
        whatsapp: string;
        whatsappLink: string;
        linkedin: string;
    };
    highlights: Highlight[];
    metrics: Metric[];
    experiences: Experience[];
    education: EducationItem[];
    skills: SkillCategory[];
}

const resumeData: ResumeData = {
    name: 'Donald Clements',
    title: 'Senior Full Stack Angular/.NET Web Developer',
    location: 'Remote (Global)',
    citizenship: 'United States (Texas)',
    availability: 'Open to senior/staff frontend & UI leadership roles · Remote only',
    summary:
        'Full-stack developer turned frontend leader with 7+ years delivering enterprise Angular/.NET systems for a global oilfield services client. I architect UI modules, mentor teams, and turn business requirements into value-driven, maintainable frontends that ship reliably.',
    contact: {
        email: 'donald.d.clements@gmail.com',
        whatsapp: '+1 (706) 910-2470',
        whatsappLink:
            'https://wa.me/17069102470?text=Hi%20Silver%2C%20I%E2%80%99d%20love%20to%20connect%20about%20a%20frontend%20opportunity.',
        linkedin:'https://www.linkedin.com/in/donald-duane-clements/'
    },
    highlights: [
        {
            title: 'Enterprise UI leadership',
            description:
                "Lead frontend developer for a team building a global logistics platform; handled onboarding, and code reviews.",
        },
        {
            title: 'Modern Angular expertise',
            description:
                'Angular 11 → 19 progression, Signals adoption, modular architecture, custom workflow orchestration.',
        },
        {
            title: 'Operational outcomes',
            description:
                'Delivered production modules improving visibility and automation while keeping legacy compatibility intact.',
        },
    ],
    metrics: [
        {label: 'Experience', value: '7 yrs 2 mos'},
        {label: 'Frontend focus', value: 'Angular · RxJS · UI Architecture'},
        {label: 'Leadership', value: 'Mentorship (5+ mentees), code reviews'},
    ],
    experiences: [
        {
            company: 'Infosys – Major Oilfield Services Client',
            location: 'Remote 5 years, Houston, TX 2 years',
            employmentType: 'Full-time',
            timeframe: 'Sep 2018 – Oct 2025',
            summaryPoints: [
                'Delivered multi-year enterprise logistics and materials management systems; progressed from backend to frontend leadership.',
                'Shipped large Angular modules, standardized UI patterns, and mentored engineers across a 45+ person program.',
            ],
            roles: [
                {
                    title: 'Frontend Architecture, Feature Ownership & Co-Leadership',
                    period: 'Mar 2022 – Oct 2025',
                    focus:
                        'Enhancement and modernization of a large-scale enterprise logistics platform; primary frontend focus and team co-leadership.',
                    quickWins: [
                        'Architected complete Angular modules (Roadmap Overview, Advanced Search, LCT Overview, Shipment Workspace, +many more).',
                        'Introduced a custom workflow orchestrator for flexible state/transition management.',
                        'Pioneered Angular Signals integration to improve performance and maintainability.',
                    ],
                    contributions: [
                        'Built dynamic rule validation (e.g., MoT-based Pre-Alert) with centralized services and reactive forms.',
                        'Enhanced reusable component libraries and enforced architectural consistency via PR reviews.',
                        'Led onboarding/mentorship for new UI devs and backend devs; provided guidance on coding standards and feature integration.',
                        'Collaborated with UX and Product to iterate user flows; participated in Agile ceremonies.'
                    ],
                    technologies: [
                        'Angular 11–19',
                        'TypeScript',
                        'RxJS',
                        'Angular Signals',
                        'Flux-like state management (NgRx/Redux patterns)',
                        'MongoDB',
                        'AI Augmented Coding',
                        'Webstorm/Rider (IDEs)',
                        'MSTest',
                        '.NET Core',
                        'C#',
                    ],
                },
                {
                    title: 'Intelligent Middleware + SRE Integration',
                    period: 'Jan 2021 – Feb 2022',
                    focus:
                        'Stabilized cross-system integrations and observability for production environments powering global logistics.',
                    quickWins: [
                        'Built fault-tolerant middleware normalizing data between field systems and enterprise platforms.',
                        'Introduced actionable dashboards and alerting to detect issues before users felt impact.',
                    ],
                    contributions: [
                        'Engineered microservice boundaries and caching approaches to insulate UIs from upstream volatility.',
                        'Instrumented apps with Azure Log Analytics; used KQL to surface trends.',
                        'Authored SRE playbooks and response cadences to standardize on-call and incident handling.',
                    ],
                    technologies: [
                        '.NET Core',
                        'Azure Functions',
                        'MongoDB',
                        'KQL (Kusto)',
                        'Azure Log Analytics',
                        'Azure App Insights',
                        'SQL Server',
                    ],
                },
                {
                    title: 'Enterprise Logistics Modernization (Initial Phase)',
                    period: 'Sep 2018 – Dec 2020',
                    focus:
                        'Ground-up development of logistics platform; backend services, integrations, and UI feature development.',
                    quickWins: [
                        'Developed backend APIs (.NET Framework → Core) and Angular features for early modules.',
                        'Implemented automation to generate/link downstream logistics documents across stages.',
                    ],
                    contributions: [
                        'Built integration adapters for legacy and external systems, synchronizing inventory and shipment data.',
                        'Designed and refined microservice-level CRUD logic for numerous MongoDB document types, addressing concurrency challenges and complex business validations to ensure data consistency and reliability under evolving schemas.',
                        'Collaborated with QA to validate workflows; strengthened test coverage and defect resolution.',
                    ],
                    technologies: [
                        '.NET Framework',
                        '.NET Core',
                        'Entity Framework',
                        'MongoDB',
                        'Angular 6+',
                        'TypeScript',
                        'MSTest',
                        'Azure DevOps',
                        'C#',
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
                    title: '.NET Web Developer – Residency',
                    period: 'Apr 2018 – Sep 2018',
                    focus:
                        'Project-based training and simulated client work across APIs, SPAs, and automated testing.',
                    quickWins: [
                        'Built ASP.NET MVC/Web API apps with Entity Framework (Code First/DB First).',
                        'Integrated Angular SPAs with RESTful backends; improved UI responsiveness with TypeScript.',
                    ],
                    contributions: [
                        'Set up Jenkins CI/CD deploying to AWS EC2/RDS across four systems.',
                        'Containerized services with Docker; improved onboarding and environment parity.',
                        'Established testing with xUnit, nUnit, MSTest, Moq, and FluentMvcTesting; added centralized logging (NLog).',
                    ],
                    technologies: [
                        'C#',
                        'ASP.NET MVC',
                        'ASP.NET Web API',
                        'Entity Framework',
                        'Angular',
                        'TypeScript',
                        'Jenkins',
                        'Docker',
                        'AWS EC2/RDS',
                        'SQL Server',
                        'xUnit/nUnit/MSTest',
                        'Moq',
                        'FluentMvcTesting',
                        'NLog',
                    ],
                },
            ],
        },
        {
            company: 'Blackboard',
            location: 'Killeen/Temple, TX',
            employmentType: 'Full-time',
            timeframe: 'Dec 2016 – Feb 2018',
            summaryPoints: [
                'Maintained the technical backbone of a high-volume call center; ensured staff productivity and system uptime.',
            ],
            roles: [
                {
                    title: 'Desktop Support Technician',
                    period: 'Nov 2017 – Feb 2018',
                    focus: 'Frontline support for workstations, VMs, networking equipment, and telecom systems.',
                    quickWins: [
                        'Reduced ticket backlog through efficient triage of hardware, OS, and network issues.',
                        'Coordinated maintenance windows with network engineers to minimize user disruption.',
                    ],
                    contributions: [
                        'Installed, repaired, and maintained endpoints and telecom hardware under strict SLAs.',
                        'Documented recurring issues to inform preventative maintenance strategies.',
                        'Created internal troubleshooting guides that improved knowledge sharing and onboarding.',
                    ],
                    technologies: ['Windows', 'VMs', 'Networking hardware', 'Telecom systems'],
                },
                {
                    title: 'Customer Care & Technical Support (CCTS)',
                    period: 'Dec 2016 – Oct 2017',
                    focus: 'Technical support for endpoints, peripherals, and connectivity; SLA-driven incident resolution.',
                    quickWins: [
                        'Improved first-contact resolution rates through accurate triage and clear documentation.',
                    ],
                    contributions: [
                        'Provided Tier-1/2 support for laptops, desktops, printers, and network connectivity.',
                        'Maintained documentation of recurring issues and escalated emerging trends to engineering.',
                    ],
                    technologies: ['Windows', 'Printers', 'Networking basics'],
                },
            ],
        },
        {
            company: 'Teleperformance (UnitedHealthcare)',
            location: 'Killeen/Temple, TX',
            employmentType: 'Full-time',
            timeframe: 'Jul 2015 – Apr 2016',
            summaryPoints: [
                'Delivered accurate, empathetic support for Medicare Advantage members; resolved complex claims and benefit inquiries.',
            ],
            roles: [
                {
                    title: 'Member Services Representative',
                    period: 'Jul 2015 – Apr 2016',
                    focus: 'Plan benefits guidance, claims analysis, and issue resolution.',
                    quickWins: [
                        'Improved customer satisfaction through effective handling of complex claim scenarios.',
                    ],
                    contributions: [
                        'Investigated claim discrepancies and ensured accurate cost-sharing communication.',
                        'Maintained precise documentation to support downstream processing and compliance.',
                    ],
                    technologies: ['CRM tooling', 'Call-center platforms'],
                },
            ],
        },
        {
            company: 'House Husband / Stay-at-Home Father',
            location: 'Various Locations',
            employmentType: 'Full-time Domestic Leadership',
            timeframe: 'Feb 2007 – Jul 2015',
            summaryPoints: [
                'Led complete household, educational, financial, and emotional operations through multiple family relocations and spousal military deployments, while maintaining high academic achievement.',
            ],
            roles: [
                {
                    title: 'Lead Caregiver & Family Operations Manager',
                    period: 'Feb 2007 – Jul 2015',
                    focus: 'Managed logistics, homeschooling, budgeting, support systems, and transitions to ensure stability and growth.',
                    quickWins: [
                        'Achieved academic excellence (4.0 GPA and Honors) while fully responsible for home and children.',
                        'Provided leadership and support to aid child development and sustain family resilience during deployments.',
                    ],
                    contributions: [
                        'Controlled household budgets and resource allocation amid changing environments.',
                        'Designed and adjusted homeschooling curriculum to children’s evolving needs and contexts.',
                        'Orchestrated relocations, schooling changes, and family transitions seamlessly.',
                        'Provided relational and emotional scaffolding through periods of separation and adjustment.',
                        'Regularly researched and adapted parenting methodologies to best support development.',
                    ],
                    technologies: ['Scheduling / planning tools', 'Budgeting & tracking software', 'Educational tools'],
                },
            ],
        },
        {
            company: 'U.S. Army',
            location: 'Various locations',
            employmentType: 'Military Service',
            timeframe: 'Aug 2002 – Feb 2007',
            summaryPoints: [
                'Operated, maintained, and secured multichannel communications systems in dynamic and austere environments; upheld COMSEC compliance and mission-critical uptime.',
            ],
            roles: [
                {
                    title: '25Q · Multichannel Transmission Systems Operator/Maintainer',
                    period: 'Aug 2002 – Feb 2007',
                    focus: 'Deploy, operate, and maintain tactical radio, LOS/HCLOS, tropospheric scatter, and secure communications systems supporting forward and command elements.',
                    quickWins: [
                        'Coordinated deployment and site setup of multichannel comm systems to ensure uninterrupted command connectivity across dispersed units.',
                        'Diagnosed and resolved system outages under tight timelines using BIT/BITE diagnostics and structured fault isolation procedures.',
                    ],
                    contributions: [
                        'Managed COMSEC devices and secure keying protocols to maintain classified communications integrity.',
                        'Trained and mentored junior operators in PMCS, system-level maintenance, and field troubleshooting to reduce operational downtime.',
                        'Collaborated with allied signal units during joint operations to integrate communications networks across coalition forces.',
                        'Authored SOPs and maintained operational logs for system deployments and maintenance cycles.',
                    ],
                    technologies: ['Line-of-sight & tropospheric radio systems', 'COMSEC / secure communications', 'Signal diagnostics & BIT/BITE tools', 'Tactical antennas, power generators, radios'],
                },
            ],
        },
    ],
    education: [
        {
            institution: 'Florida Institute of Technology',
            degree: 'B.S. · Computer Information Systems',
            period: '2013 – 2017',
            distinction: 'Summa Cum Laude · Faculties Honors Award (4.0 GPA)',
        },
    ],
    skills: [
        {
            title: 'Frontend & UX',
            items: [
                'Angular (11–19)',
                'TypeScript / JavaScript',
                'RxJS & Reactive Architecture',
                'Angular Signals',
                'Design Systems & Component Architecture',
                'Responsive & Accessible UI',
            ],
        },
        {
            title: 'Platform & Backend',
            items: [
                '.NET Core / .NET 6',
                'ASP.NET Web API',
                'Azure Functions & Cloud Services',
                'MongoDB & SQL Server',
                'Microservices & Integration middleware',
            ],
        },
        {
            title: 'Delivery & Operations',
            items: [
                'Mentorship & Onboarding',
                'Code Review & Standards',
                'Agile / DevOps workflows',
                'CI/CD (Azure DevOps, Jenkins)',
                'Observability (Dynatrace, KQL)',
            ],
        },
    ],
};

const sections = [
    {id: 'overview', label: 'Overview'},
    {id: 'experience', label: 'Experience'},
    {id: 'skills', label: 'Skills'},
    {id: 'education', label: 'Education'},
];

const baseDetailOptions: { id: DetailLevel; label: string; description: string }[] = [
    {id: 'snapshot', label: 'Snapshot', description: 'Essentials; expand sections on demand.'},
    {id: 'standard', label: 'Standard', description: 'Show quick wins and contributions.'},
    {id: 'deep', label: 'Deep Dive', description: 'Also show technologies by default.'},
];

const chipClass =
    'inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 shadow-sm';

const sectionTitleClass = 'text-2xl font-semibold tracking-tight text-slate-900';

export default function Resume() {
    // Determine support for detail levels based on available data
    const hasAnyQuickWins = useMemo(
        () =>
            resumeData.experiences.some((exp) =>
                exp.roles.some((r) => Array.isArray(r.quickWins) && r.quickWins.length > 0),
            ),
        [],
    );
    const hasAnyContributions = useMemo(
        () =>
            resumeData.experiences.some((exp) =>
                exp.roles.some((r) => Array.isArray(r.contributions) && r.contributions.length > 0),
            ),
        [],
    );
    const hasAnyTechnologies = useMemo(
        () =>
            resumeData.experiences.some((exp) =>
                exp.roles.some((r) => Array.isArray(r.technologies) && r.technologies.length > 0),
            ),
        [],
    );

    const standardSupported = hasAnyQuickWins || hasAnyContributions;
    const deepSupported = hasAnyTechnologies;

    const availableDetailOptions = useMemo(() => {
        return baseDetailOptions.filter((opt) => {
            if (opt.id === 'snapshot') return true;
            if (opt.id === 'standard') return standardSupported;
            if (opt.id === 'deep') return deepSupported;
            return false;
        });
    }, [standardSupported, deepSupported]);

    const [detailLevel, setDetailLevel] = useState<DetailLevel>(() =>
        standardSupported ? 'standard' : 'snapshot',
    );
    const effectiveDetailLevel: DetailLevel = useMemo(() => {
        const ids = new Set(availableDetailOptions.map((o) => o.id));
        if (ids.has(detailLevel)) return detailLevel;
        return standardSupported ? 'standard' : 'snapshot';
    }, [availableDetailOptions, detailLevel, standardSupported]);
    const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({});

    const quickNav = useMemo(
        () =>
            sections.map((section) => ({
                ...section,
                onClick: () => {
                    if (typeof window === 'undefined') return;
                    const element = document.getElementById(section.id);
                    if (element) {
                        element.scrollIntoView({behavior: 'smooth', block: 'start'});
                    }
                },
            })),
        [],
    );

    const handleToggleRole = (key: string) => {
        setExpandedRoles((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const shouldShowContributions = (key: string) => {
        if (effectiveDetailLevel === 'deep') return true;
        if (effectiveDetailLevel === 'standard') return true;
        return expandedRoles[key] ?? false;
    };

    const shouldShowTechnologies = (key: string) =>
        effectiveDetailLevel === 'deep' || expandedRoles[key] === true;

    const shouldShowQuickWins = (key: string) =>
        effectiveDetailLevel !== 'snapshot' || expandedRoles[key] === true;

    return (
        <div
            className="relative min-h-screen bg-slate-100 px-4 py-10 text-slate-900 print:bg-white print:px-0 print:py-0">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-violet-500/15 via-slate-100 to-transparent"
            />

            <article className="relative mx-auto max-w-5xl space-y-16">
                <header id="overview"
                        className="space-y-8 rounded-3xl bg-white/80 p-8 shadow-xl ring-1 ring-slate-900/5 backdrop-blur print:bg-white print:shadow-none print:ring-0">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-2xl space-y-4">
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
                                        <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-emerald-400"/>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">{highlight.title}</p>
                                            <p className="text-sm text-slate-600">{highlight.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <aside
                            className="w-full max-w-sm space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-md print:border-slate-200 print:shadow-none">
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
                                </div>
                                <p className="text-xs text-slate-500">Preferred contact: WhatsApp for quick
                                    coordination, or email for detailed notes.</p>
                            </div>

                            <div className="space-y-3 border-t border-slate-200 pt-4">
                                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Snapshot</p>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    {resumeData.metrics.map((metric) => (
                                        <li key={metric.label} className="flex flex-col">
                                            <span className="font-semibold text-slate-800">{metric.value}</span>
                                            <span
                                                className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</span>
                                            {metric.helper &&
                                                <span className="text-xs text-slate-400">{metric.helper}</span>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </div>

                    <div className="print:hidden">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">View depth</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {availableDetailOptions.map((option) => {
                                const isActive = option.id === effectiveDetailLevel;
                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => setDetailLevel(option.id)}
                                        className={`flex flex-col rounded-2xl border px-4 py-3 text-left text-xs shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 sm:text-sm ${
                                            isActive
                                                ? 'border-violet-500 bg-violet-500/10 text-violet-700'
                                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                        }`}
                                    >
                                        <span className="font-semibold uppercase tracking-wide">{option.label}</span>
                                        <span className="mt-1 text-[0.7rem] leading-relaxed text-slate-500 sm:text-xs">
                      {option.description}
                    </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </header>

                <nav className="sticky top-4 z-30 hidden items-center justify-center print:hidden lg:flex">
                    <div
                        className="flex max-w-3xl flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm shadow backdrop-blur">
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

                <section id="experience" className="space-y-10">
                    <header className="space-y-2">
                        <h2 className={sectionTitleClass}>Experience</h2>
                        <p className="text-sm text-slate-600">
                            Layered for rapid scanning: skim the summary in seconds, expand any role for delivery
                            specifics, or switch to Deep Dive to
                            view everything at once.
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
                                        <li key={`${experience.company}-summary-${index}`}
                                            className="flex items-start gap-3">
                                            <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-violet-400"/>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="space-y-6">
                                    {experience.roles.map((role, roleIndex) => {
                                        const key = `${experienceIndex}-${roleIndex}`;
                                        const showContributions = shouldShowContributions(key);
                                        const showTechnologies = shouldShowTechnologies(key);
                                        const showQuickWins = shouldShowQuickWins(key);

                                        return (
                                            <div
                                                key={key}
                                                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm print:border-slate-200 print:shadow-none"
                                            >
                                                <div
                                                    className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-800">{role.title}</p>
                                                        <p className="text-xs uppercase tracking-wide text-slate-500">{role.period}</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleRole(key)}
                                                        className="inline-flex items-center gap-1 rounded-full border border-transparent px-3 py-1 text-xs font-medium text-violet-600 transition hover:border-violet-200 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 print:hidden"
                                                    >
                                                        {detailLevel === 'snapshot'
                                                            ? expandedRoles[key]
                                                                ? 'Hide details'
                                                                : 'Expand details'
                                                            : expandedRoles[key]
                                                                ? 'Hide extra'
                                                                : 'More depth'}
                                                    </button>
                                                </div>

                                                <p className="mt-3 text-sm leading-relaxed text-slate-700">{role.focus}</p>

                                                {showQuickWins && (
                                                    <div className="mt-4 space-y-2">
                                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Immediate
                                                            impact</p>
                                                        <ul className="space-y-2 text-sm text-slate-700">
                                                            {role.quickWins.map((win, winIndex) => (
                                                                <li key={`${key}-quick-${winIndex}`}
                                                                    className="flex items-start gap-3">
                                                                    <span aria-hidden
                                                                          className="mt-1 h-2 w-2 rounded-full bg-emerald-400"/>
                                                                    <span>{win}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {showContributions && (
                                                    <div className="mt-5 space-y-2">
                                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Key
                                                            contributions</p>
                                                        <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
                                                            {role.contributions.map((contribution, contributionIndex) => (
                                                                <li key={`${key}-contribution-${contributionIndex}`}
                                                                    className="flex gap-3">
                                                                    <span aria-hidden
                                                                          className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-400"/>
                                                                    <span>{contribution}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {showTechnologies && (
                                                    <div className="mt-5">
                                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Technologies
                                                            & supports</p>
                                                        <div className="mt-2 flex flex-wrap gap-2">
                                                            {role.technologies.map((technology) => (
                                                                <span key={`${key}-${technology}`}
                                                                      className={chipClass}>
                                  {technology}
                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="skills" className="space-y-6">
                    <header className="space-y-2">
                        <h2 className={sectionTitleClass}>Skills & Focus Areas</h2>
                        <p className="text-sm text-slate-600">
                            Curated to reflect how I operate day-to-day—frontend leadership grounded in strong platform
                            awareness and collaborative habits.
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
                                            <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-400"/>
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
                        <h2 className={sectionTitleClass}>Education</h2>
                        <p className="text-sm text-slate-600">Academic foundation underpinning systems thinking and
                            applied technology leadership.</p>
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
                                {education.distinction &&
                                    <p className="mt-2 text-sm text-slate-700">{education.distinction}</p>}
                            </div>
                        ))}
                    </div>
                </section>

                <footer
                    className="rounded-3xl border border-slate-200 bg-white/70 p-6 text-sm text-slate-500 shadow-md print:hidden">
                    <p>
                        Need a tailored PDF or have a specific brief? Message me on WhatsApp or email me directly and I
                        can share a focused case study or
                        deeper project walk-through.
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
