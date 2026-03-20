import type { APIRoute } from 'astro';
import { resumeData, experienceTotal } from '../../data/resume';

export const GET: APIRoute = async () => {
    const markdown = `
# LLM Resume: ${resumeData.name}
> ${resumeData.title}
> Location: ${resumeData.location} | Citizenship: ${resumeData.citizenship}
> Availability: ${resumeData.availability}

## Executive Summary
${resumeData.summary}

## Key Metrics
${resumeData.metrics.map(m => `- **${m.label}**: ${m.value}`).join('\n')}

## Core Tenets & Professional Philosophy
${resumeData.tenets.map(t => `### ${t.icon} ${t.title}\n${t.content}`).join('\n\n')}

## Professional Experience

${resumeData.experiences.map(exp => `
### ${exp.company}
**Timeframe**: ${exp.timeframe} | **Location**: ${exp.location}
**Type**: ${exp.employmentType}

${exp.summaryPoints.map(p => `- ${p}`).join('\n')}

${exp.roles.map(role => `
#### ${role.title} (${role.period})
*Focus*: ${role.snapshotFocus}

**Key Highlights**:
${role.standardHighlights.map(h => `- ${h}`).join('\n')}

**Achievements & Deep Context**:
${role.deepContext.join('\n\n')}

${role.deepAchievements.map(a => `- ${a}`).join('\n')}

**Tech Stack**: ${role.techStack.join(', ')}
`).join('\n')}
`).join('\n---')}

## Featured Projects

${resumeData.projects.map(p => `
### ${p.title}
${p.description}
URL: ${p.url}
`).join('\n')}

## Skills & Focus Areas

${resumeData.skills.map(s => `
### ${s.title}
${s.items.map(i => `- ${i}`).join('\n')}
`).join('\n')}

## Education
${resumeData.education.map(e => `
### ${e.institution}
${e.degree} (${e.period})
${e.distinction ? `*${e.distinction}*` : ''}
`).join('\n')}

## Contact Information
- Email: ${resumeData.contact.email}
- LinkedIn: ${resumeData.contact.linkedin}
- WhatsApp: ${resumeData.contact.whatsapp}
- GitHub: https://github.com/silveranstavern-gmail
- Live Resume: https://ponderingsilver.com/resume/
- Source Code: https://github.com/silveranstavern-gmail/astro-pondering-silver
    `.trim();

    return new Response(markdown, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
};
