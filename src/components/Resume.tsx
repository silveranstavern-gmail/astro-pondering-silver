import React, { useEffect, useMemo, useState } from 'react';
import {
    resumeData,
    type DetailLevel,
    type ExperienceRole,
    type ResumeData,
    type Tenet,
} from '../data/resume';

export interface ResumeCopy {
    sections: Array<{ id: string; label: string }>;
    more: string;
    evenMore: string;
    less: string;
    technologies: string;
    keyHighlights: string;
    keyContributions: string;
    freelanceLabel: string;
    alternateLanguageLabel: string;
    sectionsAriaLabel: string;
    citizenship: string;
    contact: string;
    whatsapp: string;
    email: string;
    linkedin: string;
    github: string;
    downloadPdf: string;
    preferredContact: string;
    pdfNote: string;
    aiReadyTitle: string;
    aiReadyText: string;
    snapshot: string;
    tenetsTitle: string;
    tenetsDescription: string;
    experienceTitle: string;
    experienceDescription: string;
    projectsTitle: string;
    projectsDescription: string;
    visitProject: string;
    skillsTitle: string;
    skillsDescription: string;
    educationTitle: string;
    educationDescription: string;
}

export interface ResumeRoutes {
    freelance: string;
    alternateLanguage: string;
    alternateLanguageCode: 'en' | 'es';
    llmText: string;
}

export interface ResumeProps {
    data?: ResumeData;
    copy?: ResumeCopy;
    routes?: ResumeRoutes;
}

export const defaultResumeCopy: ResumeCopy = {
    sections: [
        { id: 'overview', label: 'Overview' },
        { id: 'tenets', label: 'Tenets' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'skills', label: 'Skills' },
        { id: 'education', label: 'Education' },
    ],
    more: 'more',
    evenMore: 'even more',
    less: 'less',
    technologies: 'Technologies',
    keyHighlights: 'Key highlights',
    keyContributions: 'Key contributions & technical experience',
    freelanceLabel: 'I also freelance',
    alternateLanguageLabel: 'Español',
    sectionsAriaLabel: 'Resume sections',
    citizenship: 'Citizenship',
    contact: 'Contact',
    whatsapp: 'Message on WhatsApp',
    email: 'Email',
    linkedin: 'View LinkedIn Profile',
    github: 'View GitHub Profile',
    downloadPdf: 'Download PDF Resume',
    preferredContact: 'Preferred contact: WhatsApp for quick coordination, or email for detailed notes.',
    pdfNote: 'The downloadable PDF is a separate formatted resume and is not an exact mirror of this web version.',
    aiReadyTitle: 'AI-Ready Context',
    aiReadyText: 'For LLMs and RAG systems, a machine-readable Markdown version is available at',
    snapshot: 'Snapshot',
    tenetsTitle: 'Professional Tenets',
    tenetsDescription: 'The principles that guide my approach to engineering and collaboration.',
    experienceTitle: 'Experience',
    experienceDescription: 'Layered for rapid scanning: skim summaries in seconds, or expand any role for granular delivery specifics and deeper technical context.',
    projectsTitle: 'Projects',
    projectsDescription: 'Personal projects and side work demonstrating technical capabilities and creative problem-solving.',
    visitProject: 'Visit Project',
    skillsTitle: 'Skills & Focus Areas',
    skillsDescription: 'Curated to reflect how I operate day-to-day – frontend leadership grounded in strong platform awareness and collaborative habits.',
    educationTitle: 'Education',
    educationDescription: 'Academic foundation underpinning systems thinking and applied technology leadership.',
};

export const defaultResumeRoutes: ResumeRoutes = {
    freelance: '/freelance/',
    alternateLanguage: '/resume-es',
    alternateLanguageCode: 'es',
    llmText: '/resume/llm.txt',
};

// --- Components ---

const TenetCard = ({ tenet }: { tenet: Tenet }) => (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-xs ring-1 ring-slate-900/5 transition hover:border-purple-100 hover:shadow-md">
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
                      copy,
                  }: {
    role: ExperienceRole;
    cardDetailLevel: DetailLevel;
    onCycle: () => void;
    copy: ResumeCopy;
}) => {
    const chipClass = 'inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 shadow-xs';

    // Determine button text based on current level
    const getButtonText = () => {
        if (cardDetailLevel === 'snapshot') return copy.more;
        if (cardDetailLevel === 'standard') return copy.evenMore;
        return copy.less;
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 shadow-xs print:border-slate-200 print:shadow-none">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-800">{role.title}</p>
                    <p className="text-xs uppercase tracking-wide text-slate-500">{role.period}</p>
                </div>
                <button
                    type="button"
                    onClick={onCycle}
                    className="inline-flex items-center gap-1 rounded-full border border-transparent px-3 py-1 text-xs font-medium text-violet-600 transition hover:border-violet-200 hover:bg-violet-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 print:hidden"
                >
                    {getButtonText()}
                </button>
            </div>

            {/* SNAPSHOT: Show snapshotFocus + techStack */}
            {cardDetailLevel === 'snapshot' && (
                <>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">{role.snapshotFocus}</p>
                    <div className="mt-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{copy.technologies}</p>
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
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{copy.keyHighlights}</p>
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
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{copy.technologies}</p>
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
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{copy.keyContributions}</p>
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
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{copy.technologies}</p>
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

export default function Resume({
    data = resumeData,
    copy = defaultResumeCopy,
    routes = defaultResumeRoutes,
}: ResumeProps) {
    const sections = copy.sections;
    const [expandedRoles, setExpandedRoles] = useState<Record<string, DetailLevel>>({});
    const [activeSectionId, setActiveSectionId] = useState(sections[0].id);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let frameId = 0;

        const getStickyOffset = () => (window.matchMedia('(min-width: 1024px)').matches ? 128 : 160);

        const updateActiveSection = () => {
            frameId = 0;
            const stickyOffset = getStickyOffset();
            let currentSectionId = sections[0].id;

            for (const section of sections) {
                const element = document.getElementById(section.id);

                if (element && element.getBoundingClientRect().top <= stickyOffset) {
                    currentSectionId = section.id;
                }
            }

            setActiveSectionId((previous) => (previous === currentSectionId ? previous : currentSectionId));
        };

        const scheduleActiveSectionUpdate = () => {
            if (frameId !== 0) return;
            frameId = window.requestAnimationFrame(updateActiveSection);
        };

        updateActiveSection();
        window.addEventListener('scroll', scheduleActiveSectionUpdate, { passive: true });
        window.addEventListener('resize', scheduleActiveSectionUpdate);

        return () => {
            window.removeEventListener('scroll', scheduleActiveSectionUpdate);
            window.removeEventListener('resize', scheduleActiveSectionUpdate);

            if (frameId !== 0) {
                window.cancelAnimationFrame(frameId);
            }
        };
    }, [sections]);

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
                        const stickyOffset = window.matchMedia('(min-width: 1024px)').matches ? 112 : 144;
                        const top = element.getBoundingClientRect().top + window.scrollY - stickyOffset;
                        setActiveSectionId(section.id);
                        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
                    }
                },
            })),
        [sections],
    );

    return (
        <div className="relative min-h-screen bg-gray-100 text-slate-900 print:bg-white">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-violet-500/15 via-gray-100 to-transparent"
            />

            <nav className="sticky top-0 z-40 border-b border-purple-100/80 bg-gray-100/95 px-4 py-3 shadow-xs backdrop-blur print:hidden">
                <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-x-4 gap-y-3 lg:grid-cols-[minmax(0,1fr)_auto]">
                    <div className="flex items-center justify-self-end gap-2 lg:col-start-2">
                        <a
                            href={routes.alternateLanguage}
                            className="inline-flex min-h-10 items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white/80 hover:text-purple-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                            lang={routes.alternateLanguageCode}
                            hrefLang={routes.alternateLanguageCode}
                        >
                            {copy.alternateLanguageLabel}
                        </a>
                        <a
                            href={routes.freelance}
                            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg border border-purple-200 bg-white px-3 py-2 text-sm font-semibold text-purple-700 shadow-xs transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                        >
                            {copy.freelanceLabel}
                        </a>
                    </div>

                    <div className="row-start-2 flex min-w-0 gap-2 overflow-x-auto pb-1 hide-scrollbar lg:col-start-1 lg:row-start-1 lg:justify-center lg:pb-0" aria-label={copy.sectionsAriaLabel}>
                        {quickNav.map((item) => {
                            const isActive = item.id === activeSectionId;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={item.onClick}
                                    className={`min-h-9 shrink-0 rounded-full px-3 py-1 text-sm font-medium transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-1 ${
                                        isActive
                                            ? 'bg-purple-600 text-white shadow-xs'
                                            : 'border border-slate-200 bg-white/80 text-slate-600 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-800'
                                    }`}
                                    aria-current={isActive ? 'true' : undefined}
                                >
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </nav>

            <article className="relative mx-auto max-w-5xl space-y-14 px-4 py-8 print:px-0 print:py-0 sm:px-6 lg:px-0 lg:py-10">
                {/* --- Header --- */}
                <header id="overview" className="space-y-6">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
                        <div className="space-y-5 rounded-2xl border border-purple-100/80 bg-white/90 p-6 shadow-lg ring-1 ring-slate-900/5 backdrop-blur print:border-slate-200 print:bg-white print:shadow-none print:ring-0 sm:p-8">
                            <div>
                                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{data.name}</h1>
                                <p className="mt-2 text-lg font-medium text-slate-600">{data.title}</p>
                                <p className="text-sm uppercase tracking-[0.3em] text-emerald-500">{data.location}</p>
                                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{copy.citizenship}: {data.citizenship}</p>
                                <p className="mt-2 text-sm text-slate-500">{data.availability}</p>
                            </div>

                            <p className="text-base leading-relaxed text-slate-700">{data.summary}</p>

                            <div className="space-y-3">
                                {data.highlights.map((highlight) => (
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
                        <aside className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg ring-1 ring-slate-900/5 print:border-slate-200 print:shadow-none print:ring-0">
                            <div className="space-y-3">
                                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{copy.contact}</p>
                                <div className="flex flex-col gap-3">
                                    <a
                                        href={data.contact.whatsappLink}
                                        className="inline-flex min-h-10 items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-xs transition hover:bg-emerald-600 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
                                    >
                                        {copy.whatsapp}
                                    </a>
                                    <a
                                        href={`mailto:${data.contact.email}`}
                                        className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-xs transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
                                    >
                                        {copy.email} {data.contact.email}
                                    </a>
                                    <a
                                        href={data.contact.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-xs transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
                                    >
                                        {copy.linkedin}
                                    </a>
                                    <a
                                        href="https://github.com/silveranstavern-gmail"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-xs transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
                                    >
                                        {copy.github}
                                    </a>
                                    <a
                                        href={data.resumePdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex min-h-10 items-center justify-center rounded-lg border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 shadow-xs transition hover:border-purple-300 hover:bg-purple-100 hover:text-purple-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
                                    >
                                        {copy.downloadPdf}
                                    </a>
                                    <a
                                        href={routes.freelance}
                                        className="inline-flex min-h-10 items-center justify-center rounded-lg border border-purple-200 bg-white px-4 py-2 text-sm font-medium text-purple-700 shadow-xs transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 print:hidden"
                                    >
                                        {copy.freelanceLabel}
                                    </a>
                                </div>
                                <p className="text-xs text-slate-500">{copy.preferredContact}</p>
                                <p className="text-xs text-slate-500">{copy.pdfNote}</p>
                                <div className="mt-2 rounded-lg border border-violet-100 bg-violet-50/50 p-3 shadow-xs print:hidden">
                                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-violet-600">{copy.aiReadyTitle}</p>
                                    <p className="mt-1 text-[0.7rem] leading-relaxed text-slate-600">
                                        {copy.aiReadyText}{' '}
                                        <a href={routes.llmText} className="font-medium text-violet-700 underline underline-offset-2 hover:text-violet-900">
                                            {routes.llmText}
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 border-t border-slate-200 pt-4">
                                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{copy.snapshot}</p>
                                <ul className="space-y-3 text-sm text-slate-600">
                                    {data.metrics.map((metric) => (
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

                {/* --- Core Tenets --- */}
                <section id="tenets" className="space-y-6">
                    <header className="space-y-2">
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{copy.tenetsTitle}</h2>
                        <p className="text-sm text-slate-600">
                            {copy.tenetsDescription}
                        </p>
                    </header>
                    <div className="grid gap-6 md:grid-cols-2">
                        {data.tenets.map((tenet) => (
                            <TenetCard key={tenet.title} tenet={tenet} />
                        ))}
                    </div>
                </section>

                {/* --- Experience Section --- */}
                <section id="experience" className="space-y-8">
                    <header className="space-y-2">
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{copy.experienceTitle}</h2>
                        <p className="text-sm text-slate-600">
                            {copy.experienceDescription}
                        </p>
                    </header>

                    <div className="space-y-8">
                        {data.experiences.map((experience, experienceIndex) => (
                            <article
                                key={`${experience.company}-${experienceIndex}`}
                                className="space-y-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-md ring-1 ring-slate-900/5 transition hover:border-purple-100 hover:shadow-lg print:border-slate-200 print:shadow-none sm:p-8"
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
                                                copy={copy}
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
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{copy.projectsTitle}</h2>
                        <p className="text-sm text-slate-600">
                            {copy.projectsDescription}
                        </p>
                    </header>

                    <div className="grid gap-6">
                        {data.projects.map((project) => (
                            <div
                                key={project.title}
                                className="rounded-xl border border-slate-200 bg-white/90 p-6 shadow-xs ring-1 ring-slate-900/5 transition hover:border-purple-100 hover:shadow-md print:border-slate-200 print:shadow-none"
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
                                        className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-xs transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-800 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 print:hidden"
                                    >
                                        {copy.visitProject}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SKILLS: Always visible regardless of detail level */}
                <section id="skills" className="space-y-6">
                    <header className="space-y-2">
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{copy.skillsTitle}</h2>
                        <p className="text-sm text-slate-600">
                            {copy.skillsDescription}
                        </p>
                    </header>

                    <div className="grid gap-6 md:grid-cols-2">
                        {data.skills.map((category) => (
                            <div
                                key={category.title}
                                className="space-y-4 rounded-xl border border-slate-200 bg-white/90 p-6 shadow-xs ring-1 ring-slate-900/5 transition hover:border-purple-100 hover:shadow-md print:border-slate-200 print:shadow-none"
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
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{copy.educationTitle}</h2>
                        <p className="text-sm text-slate-600">{copy.educationDescription}</p>
                    </header>

                    <div className="grid gap-6">
                        {data.education.map((education) => (
                            <div
                                key={education.institution}
                                className="rounded-xl border border-slate-200 bg-white/90 p-6 shadow-xs ring-1 ring-slate-900/5 print:border-slate-200 print:shadow-none"
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
                #overview,
                section[id] {
                    scroll-margin-top: 9rem;
                }

                @media (min-width: 1024px) {
                    #overview,
                    section[id] {
                        scroll-margin-top: 7rem;
                    }
                }

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
