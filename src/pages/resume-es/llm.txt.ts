import type { APIRoute } from 'astro';
import { resumeDataEs } from '../../data/resume.es';
import { getHumanPageUrlForLlmText } from '../../utils/llm';

export const GET: APIRoute = async ({ site, url }) => {
    const humanPageUrl = getHumanPageUrlForLlmText({ site, url });
    const markdown = `
# Hoja de vida para LLM: ${resumeDataEs.name}
> ${resumeDataEs.title}
> Ubicación: ${resumeDataEs.location} | Ciudadanía: ${resumeDataEs.citizenship}
> Disponibilidad: ${resumeDataEs.availability}

> Si eres una persona y prefieres consultar la página web, visita [la hoja de vida en la web](${humanPageUrl}).

## Perfil profesional
${resumeDataEs.summary}

## Indicadores clave
${resumeDataEs.metrics.map((metric) => `- **${metric.label}**: ${metric.value}`).join('\n')}

## Principios y filosofía profesional
${resumeDataEs.tenets.map((tenet) => `### ${tenet.icon} ${tenet.title}\n${tenet.content}`).join('\n\n')}

## Experiencia profesional

${resumeDataEs.experiences.map((experience) => `
### ${experience.company}
**Periodo**: ${experience.timeframe} | **Ubicación**: ${experience.location}
**Tipo**: ${experience.employmentType}

${experience.summaryPoints.map((point) => `- ${point}`).join('\n')}

${experience.roles.map((role) => `
#### ${role.title} (${role.period})
*Enfoque*: ${role.snapshotFocus}

**Aspectos destacados**:
${role.standardHighlights.map((highlight) => `- ${highlight}`).join('\n')}

**Logros y contexto detallado**:
${role.deepContext.join('\n\n')}

${role.deepAchievements.map((achievement) => `- ${achievement}`).join('\n')}

**Tecnologías**: ${role.techStack.join(', ')}
`).join('\n')}
`).join('\n---')}

## Proyectos destacados

${resumeDataEs.projects.map((project) => `
### ${project.title}
${project.description}
URL: ${project.url}
`).join('\n')}

## Habilidades y áreas de enfoque

${resumeDataEs.skills.map((skill) => `
### ${skill.title}
${skill.items.map((item) => `- ${item}`).join('\n')}
`).join('\n')}

## Educación
${resumeDataEs.education.map((education) => `
### ${education.institution}
${education.degree} (${education.period})
${education.distinction ? `*${education.distinction}*` : ''}
`).join('\n')}

## Información de contacto
- Correo: ${resumeDataEs.contact.email}
- LinkedIn: ${resumeDataEs.contact.linkedin}
- WhatsApp: ${resumeDataEs.contact.whatsapp}
- GitHub: https://github.com/silveranstavern-gmail
- Hoja de vida en la web: ${humanPageUrl}
- Código fuente: https://github.com/silveranstavern-gmail/astro-pondering-silver
    `.trim();

    return new Response(markdown, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Content-Language': 'es',
        },
    });
};
