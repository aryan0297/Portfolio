import type { Project } from '@/types';

/**
 * Case-study content for the projects section.
 *
 * Impact entries are deliberately qualitative — no invented metrics.
 * TODO(aryan): if you have measured numbers (call volume, response time,
 * deflection rate), replace the `value` fields with the real figures.
 * TODO(aryan): add `githubUrl` / `liveUrl` once repos or demos are public.
 */
export const projects: readonly Project[] = [
  {
    id: 'ai-voice-calling-platform',
    title: 'AI Voice Calling Platform',
    tagline:
      'Production-ready AI voice automation integrating conversational AI, telephony, backend APIs, and PostgreSQL.',
    category: 'Voice AI · Telephony',
    year: '2025',
    overview:
      'A backend platform that places and receives phone calls handled by a conversational AI agent. Telephony events stream into backend services over webhooks, the agent drives the conversation, and every turn is persisted to PostgreSQL so calls can be reviewed and acted on afterwards.',
    problem:
      'Routine outbound and inbound calls consumed human time that scaled linearly with volume. Call outcomes lived in people’s notes rather than in a system, so nothing downstream could act on them automatically.',
    solution:
      'A backend service layer that owns the call lifecycle end to end: initiate the call, stream telephony webhook events, drive the conversation through a conversational AI model, and write structured outcomes back to the database for downstream workflows.',
    architecture: [
      'Node.js + Express.js REST API as the orchestration layer for call lifecycle endpoints.',
      'Telephony provider webhooks received, verified, and normalized before entering internal workflows.',
      'Conversational AI layer driving turn-by-turn dialogue with prompt-controlled behaviour.',
      'PostgreSQL as the system of record for calls, transcripts, and call outcomes.',
      'JWT-protected internal endpoints separating operator actions from provider callbacks.',
    ],
    challenges: [
      'Webhook events arrive out of order and can be redelivered — call state had to be idempotent rather than assume a clean sequence.',
      'Voice interactions are latency-sensitive; slow work had to move out of the request path so responses stayed conversational.',
      'Model output is free-form by nature, so responses needed validation before anything was written to the database.',
      'Failures mid-call cannot silently drop a conversation — partial state still has to be recoverable and reviewable.',
    ],
    features: [
      'Outbound and inbound AI-handled calls',
      'Webhook-driven call state machine',
      'Conversation persistence and transcript storage',
      'JWT-secured operator API',
      'Structured call outcomes for downstream automation',
      'Retry-safe, idempotent event handling',
    ],
    tech: ['Node.js', 'Express.js', 'PostgreSQL', 'REST APIs', 'Webhooks', 'JWT', 'OpenAI API', 'Voice AI'],
    impact: [
      { label: 'Call handling', value: 'Automated' },
      { label: 'Call records', value: 'Structured & queryable' },
      { label: 'Availability', value: 'Round-the-clock' },
    ],
    githubUrl: null,
    liveUrl: null,
    accent: 'blue',
  },
  {
    id: 'ai-customer-support-chatbot',
    title: 'AI Customer Support Chatbot',
    tagline:
      'AI-powered support chatbot with backend APIs, secure authentication, OpenAI integration, and conversation workflows.',
    category: 'Conversational AI · APIs',
    year: '2025',
    overview:
      'A support assistant backed by a proper API layer rather than a direct browser-to-model call. Requests are authenticated, conversation history is stored and replayed as context, and the model is constrained by prompt design plus server-side validation.',
    problem:
      'Repetitive support questions absorbed most of the response effort, while answers varied between responders. Calling a model directly from the client would have exposed credentials and left no record of what was said.',
    solution:
      'A backend service that owns the conversation: authenticate the user, load prior turns from PostgreSQL, build a bounded context window, call the OpenAI API server-side, validate the response, and persist the exchange.',
    architecture: [
      'Express.js REST API exposing conversation and message endpoints.',
      'JWT authentication with per-user conversation scoping.',
      'PostgreSQL schema for conversations, messages, and session metadata.',
      'Server-side OpenAI API calls so provider keys never reach the client.',
      'Context-window assembly from stored history with explicit token budgeting.',
    ],
    challenges: [
      'Conversation context grows without bound — history had to be trimmed while keeping the exchange coherent.',
      'Model calls fail or time out; the API needed graceful degradation instead of a broken chat window.',
      'Answers had to stay inside a defined scope, which is a prompt-engineering problem as much as a code one.',
      'Every message is user input reaching an external service, so validation and sanitisation sit before the model call.',
    ],
    features: [
      'Authenticated multi-turn conversations',
      'Persistent chat history per user',
      'Server-side OpenAI integration',
      'Scoped, prompt-engineered responses',
      'Graceful failure handling on model errors',
      'Conversation retrieval API for review',
    ],
    tech: ['Node.js', 'Express.js', 'PostgreSQL', 'REST APIs', 'JWT', 'OpenAI API', 'Prompt Engineering'],
    impact: [
      { label: 'Repeat questions', value: 'Self-served' },
      { label: 'Answer consistency', value: 'Standardised' },
      { label: 'API keys', value: 'Never client-side' },
    ],
    githubUrl: null,
    liveUrl: null,
    accent: 'cyan',
  },
  {
    id: 'ai-workflow-automation-platform',
    title: 'AI Workflow Automation Platform',
    tagline:
      'Backend workflow automation for customer engagement, business processes, and API-driven workflows.',
    category: 'Automation · Backend Systems',
    year: '2025',
    overview:
      'A backend system that turns manual, multi-step business processes into defined workflows. An event — a webhook, a schedule, or an API call — triggers a sequence of steps, some of which are AI-driven, with each run recorded so it can be inspected and re-run.',
    problem:
      'Customer engagement and internal processes were stitched together by hand across separate tools. Steps were skipped, timing drifted, and there was no single place to see whether a process had actually completed.',
    solution:
      'A workflow engine on top of Express.js and PostgreSQL: triggers start a run, steps execute in order against internal APIs and AI actions, and the run’s state is persisted at each transition so failures resume instead of restarting.',
    architecture: [
      'Trigger layer accepting webhooks, scheduled events, and authenticated API calls.',
      'Workflow definitions stored in PostgreSQL, decoupled from the execution code.',
      'Step executor with per-step status, retries, and durable state transitions.',
      'AI-powered steps calling the OpenAI API for content and decision support.',
      'REST API for creating, triggering, and inspecting workflow runs.',
    ],
    challenges: [
      'Steps call external services that fail intermittently — retries had to be safe to repeat without duplicating side effects.',
      'A run can outlive a single request, so execution state belongs in the database rather than in memory.',
      'Debugging a failed run requires knowing exactly which step failed and with what input, which drove the logging model.',
      'Workflow definitions had to stay data, not code, so behaviour could change without a redeploy.',
    ],
    features: [
      'Webhook, schedule, and API triggers',
      'Multi-step workflow execution engine',
      'Durable run state with resume-on-failure',
      'AI-driven automation steps',
      'Per-step logging and run inspection',
      'Configurable workflows stored as data',
    ],
    tech: ['Node.js', 'Express.js', 'PostgreSQL', 'REST APIs', 'Webhooks', 'OpenAI API', 'AI Agents'],
    impact: [
      { label: 'Manual steps', value: 'Automated' },
      { label: 'Process runs', value: 'Auditable' },
      { label: 'Failed runs', value: 'Resumable' },
    ],
    githubUrl: null,
    liveUrl: null,
    accent: 'indigo',
  },
] as const;
