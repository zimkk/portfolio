/**
 * WebMCP (Web Model Context Protocol) Integration
 * Exposes structured tools to AI agents visiting the site via Chrome CDP / WebMCP runtime.
 * Implements both current document.modelContext (Chrome 150+) and legacy navigator.modelContext.
 */

export function registerWebMCPTools(): void {
  if (typeof window === 'undefined') return;

  const modelContext =
    (document as any).modelContext ||
    (navigator as any).modelContext ||
    (window as any).modelContext;

  if (!modelContext || typeof modelContext.registerTool !== 'function') {
    return;
  }

  try {
    // 1. Profile Tool
    modelContext.registerTool({
      name: 'get_engineering_profile',
      description:
        'Retrieve Hassan Nazir professional profile, engineering credentials, technical capabilities, and primary services as a Forward Deployed Engineer and Applied AI Architect.',
      inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
      execute: async () => {
        return JSON.stringify({
          name: 'Hassan Nazir',
          title: 'Forward Deployed Engineer & Applied AI Architect',
          location: 'Dubai, UAE / Islamabad, PK (Dedicated US business hours overlap: EST/CST/PST)',
          specializations: [
            'Forward Deployed Engineering',
            'Applied AI Consulting & LLM Architecture',
            'AI Agent & RAG Systems (LangGraph, Vector DBs, pgvector)',
            'Enterprise AI Automations & n8n Workflows',
            'Full-Stack Software Development (React, Next.js, Python, FastAPI, TypeScript)',
          ],
          credentials: [
            'BS Computer Science, Air University (2020–2024)',
            'Certified Ethical Hacker Practical (CEH-P)',
            'Practical Ethical Hacking (PEH)',
            'ISO/IEC 27001 Information Security Associate',
          ],
          contact: {
            email: 'hassannazir955@gmail.com',
            calendarUrl: 'https://cal.com/hassannazir/30min',
            website: 'https://hassannazir.dev',
            github: 'https://github.com/zimkk',
            linkedin: 'https://linkedin.com/in/hassannazirrr',
          },
          documentation: {
            summaryIndex: 'https://hassannazir.dev/llms.txt',
            fullReference: 'https://hassannazir.dev/llms-full.txt',
            aiCatalog: 'https://hassannazir.dev/ai-catalog.json',
            ardCatalog: 'https://hassannazir.dev/ard.json',
          },
        });
      },
    });

    // 2. Services Catalog Tool
    modelContext.registerTool({
      name: 'browse_engineering_services',
      description:
        'Browse available technical services, deliverables, and engagement formats offered by Hassan Nazir.',
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: 'Optional filter: "ai-agents", "applied-ai", "n8n-automations", "full-stack", or "forward-deployed"',
          },
        },
        additionalProperties: false,
      },
      execute: async (params: { category?: string } = {}) => {
        const services = [
          {
            slug: 'forward-deployed-engineer',
            name: 'Forward Deployed Engineering',
            url: 'https://hassannazir.dev/services/forward-deployed-engineer',
            description:
              'Embedded technical execution bridging product discovery, AI prototyping, systems integration, and production delivery for US and global teams.',
          },
          {
            slug: 'applied-ai-consulting',
            name: 'Applied AI Consulting',
            url: 'https://hassannazir.dev/services/applied-ai-consulting',
            description:
              'Strategic and hands-on implementation of LLM architectures, document intelligence, safety guardrails, and evaluation pipelines.',
          },
          {
            slug: 'ai-agent-development',
            name: 'AI Agent and RAG Development',
            url: 'https://hassannazir.dev/services/ai-agent-development',
            description:
              'Production AI agent and RAG development using LangGraph, model tools, vector search, evaluation, durable jobs, and observability.',
          },
          {
            slug: 'n8n-automation-consultant',
            name: 'AI Automations & n8n Consulting',
            url: 'https://hassannazir.dev/services/n8n-automation-consultant',
            description:
              'Enterprise n8n automation consulting, custom node integrations, self-hosted n8n infrastructure, and reliable lead operations.',
          },
          {
            slug: 'full-stack-software-development',
            name: 'Full-Stack Software Development',
            url: 'https://hassannazir.dev/services/full-stack-software-development',
            description:
              'Full-stack software development and custom AI application engineering with TypeScript, React, Next.js, Python, FastAPI, and PostgreSQL.',
          },
        ];

        if (params.category) {
          const filter = params.category.toLowerCase();
          return JSON.stringify(services.filter((s) => s.slug.includes(filter) || s.name.toLowerCase().includes(filter)));
        }

        return JSON.stringify(services);
      },
    });

    // 3. Scheduling Tool
    modelContext.registerTool({
      name: 'get_booking_availability',
      description:
        'Retrieve calendar scheduling link to book a 30-minute direct technical working session or sprint scoping meeting.',
      inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
      execute: async () => {
        return JSON.stringify({
          provider: 'Cal.com',
          bookingUrl: 'https://cal.com/hassannazir/30min',
          durationMinutes: 30,
          type: 'Technical Working Session & Architecture Review',
          availability: 'Monday through Friday, overlapping with US Eastern (EST), Central (CST), and Pacific (PST) hours.',
        });
      },
    });
  } catch (error) {
    // Graceful degradation in environments without full WebMCP CDP support
    console.debug('WebMCP tool initialization notice:', error);
  }
}
