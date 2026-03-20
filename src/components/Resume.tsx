import React, { useMemo, useState } from 'react';
import {
    resumeData,
    experienceTotal,
    type DetailLevel,
    type ExperienceRole,
    type Tenet
} from '../data/resume';

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

const TenetCard = ({ tenet }: { tenet: Tenet }) => (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-md ring-1 ring-slate-900/5 transition hover:shadow-lg">
        <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden>{tenet.icon}</span>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-800">{tenet.title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-slate-600">{tenet.content}</p>
    </div>
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
    { id: 'tenets', label: 'Tenets' },
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

                            <div className="space-y-4 border-t border-slate-200 pt-4">
                                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Snapshot</p>
                                <ul className="space-y-3 text-sm text-slate-600">
                                    {resumeData.metrics.map((metric) => (
                                        <li key={metric.label} className="flex flex-col">
                                            <span className="text-[0.8rem] font-semibold leading-snug text-slate-800">{metric.value}</span>
                                            <span className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-slate-500">{metric.label}</span>
                                            {metric.helper && <span className="text-xs text-slate-400">{metric.helper}</span>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </div>
                </header>

                <nav className="sticky top-4 z-30 hidden items-center justify-center print:hidden lg:flex">
                    <div className="flex max-w-4xl flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm shadow backdrop-blur">
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

                {/* --- Core Tenets --- */}
                <section id="tenets" className="space-y-6">
                    <header className="space-y-2">
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Professional Tenets</h2>
                        <p className="text-sm text-slate-600">
                            The principles that guide my approach to engineering and collaboration.
                        </p>
                    </header>
                    <div className="grid gap-6 md:grid-cols-2">
                        {resumeData.tenets.map((tenet) => (
                            <TenetCard key={tenet.title} tenet={tenet} />
                        ))}
                    </div>
                </section>

                {/* --- Experience Section --- */}
                <section id="experience" className="space-y-8">
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
                                className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg ring-1 ring-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl print:border-slate-200 print:shadow-none"
                            >
                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-slate-900">{experience.company}</h3>
                                        <p className="text-sm font-medium uppercase tracking-wide text-emerald-500">{experience.employmentType}</p>
                                        <p className="text-sm text-slate-600">{experience.location}</p>
                                    </div>
                                    <div className="text-sm text-slate-500 md:text-right">
                                        <p className="font-semibold text-slate-700">{experience.timeframe}</p>
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

                    <div className="grid gap-6">
                        {resumeData.projects.map((project) => (
                            <div
                                key={project.title}
                                className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-md ring-1 ring-slate-900/5 transition hover:-translate-y-1 hover:shadow-lg print:border-slate-200 print:shadow-none"
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
                                className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg ring-1 ring-slate-900/5 print:border-slate-200 print:shadow-none"
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

                    <div className="grid gap-6">
                        {resumeData.education.map((education) => (
                            <div
                                key={education.institution}
                                className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-md ring-1 ring-slate-900/5 print:border-slate-200 print:shadow-none"
                            >
                                <h3 className="text-lg font-semibold text-slate-900">{education.institution}</h3>
                                <p className="text-sm font-medium uppercase tracking-wide text-emerald-500">{education.degree}</p>
                                <p className="mt-1 text-sm text-slate-600">{education.period}</p>
                                {education.distinction && <p className="mt-2 text-sm text-slate-700">{education.distinction}</p>}
                            </div>
                        ))}
                    </div>
                </section>

            </article>

            <style>{`
                @media print {
                    body {
                        background: white !important;
                    }
                    nav, .print\\:hidden {
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
