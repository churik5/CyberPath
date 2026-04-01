import {
  QuizAnswerMap,
  QuizQuestion,
  SignalSlug,
  SignalWeightMap,
  Track,
  TrackSlug,
  WeightMap,
} from "@/lib/types";

const defineModule = (
  id: string,
  title: string,
  summary: string,
  lessons: Array<[title: string, duration: string]>,
) => ({
  id,
  title,
  summary,
  lessons: lessons.map(([lessonTitle, duration]) => ({
    title: lessonTitle,
    duration,
  })),
});

const option = (
  id: string,
  label: string,
  description: string,
  weights: WeightMap,
  signals: SignalWeightMap,
) => ({
  id,
  label,
  description,
  weights,
  signals,
});

const scale = (
  id: string,
  prompt: string,
  helper: string,
  minLabel: string,
  maxLabel: string,
  lowWeights: WeightMap,
  highWeights: WeightMap,
  lowSignals: SignalWeightMap,
  highSignals: SignalWeightMap,
) => ({
  id,
  type: "scale" as const,
  prompt,
  helper,
  minLabel,
  maxLabel,
  lowWeights,
  highWeights,
  lowSignals,
  highSignals,
});

const single = (
  id: string,
  prompt: string,
  helper: string,
  options: ReturnType<typeof option>[],
) => ({
  id,
  type: "single" as const,
  prompt,
  helper,
  options,
});

export const signalLabels: Record<SignalSlug, string> = {
  builder: "Builder",
  defender: "Defender",
  investigator: "Investigator",
  analyst: "Analyst",
  strategist: "Strategist",
  people: "People",
};

export const signalNarratives: Record<SignalSlug, string> = {
  builder: "you consistently leaned toward creating safer systems, workflows, and technical guardrails",
  defender: "you preferred prevention, visibility, and the day-to-day work of keeping systems resilient",
  investigator: "you showed a strong pull toward incidents, evidence, and understanding what really happened",
  analyst: "you gravitated to research, pattern recognition, and turning weak signals into useful insight",
  strategist: "you valued structure, rules, and the frameworks that help teams manage security risk",
  people: "you cared about communication, trust, and the human decisions that shape security outcomes",
};

export const strengthLabels: Record<SignalSlug, string> = {
  builder: "systems thinking",
  defender: "calm defensive judgment",
  investigator: "evidence-based curiosity",
  analyst: "pattern recognition",
  strategist: "structured decision-making",
  people: "clear communication",
};

export const trackSlugs: TrackSlug[] = [
  "application-security",
  "cloud-security",
  "security-engineering",
  "soc-blue-team",
  "dfir",
  "threat-intelligence",
  "grc",
  "security-awareness",
  "penetration-testing",
  "privacy-data-protection",
];

export const tracks: Track[] = [
  {
    slug: "application-security",
    name: "Application Security",
    icon: "code-2",
    accent: "#52E5FF",
    category: "Product Security",
    difficulty: "Beginner friendly with coding interest",
    shortDescription:
      "Help product teams ship features that are secure by design, not patched at the end.",
    roleSummary:
      "Application Security sits close to software delivery. You review designs, spot risky patterns early, improve secure defaults, and help engineers build trust into products.",
    whoItFits:
      "Great for people who like software, product thinking, APIs, authentication, and partnering with builders instead of working in isolation.",
    actualWork: [
      "Review authentication, session, and API designs before features launch",
      "Translate common vulnerability themes into secure engineering guidance",
      "Improve developer workflows with secure defaults, checklists, and code review support",
    ],
    recommendedSkills: [
      "web architecture fundamentals",
      "authentication and access control",
      "OWASP-style vulnerability awareness",
      "threat modeling",
      "developer communication",
    ],
    tools: [
      "GitHub pull requests",
      "static analysis tools",
      "dependency scanning",
      "API clients",
      "architecture diagrams",
    ],
    roadmap: [
      "Learn how modern web apps handle auth, sessions, APIs, and data flows",
      "Study secure coding patterns and common classes of implementation mistakes",
      "Practice reviewing feature changes for security tradeoffs",
      "Build a habit of turning findings into fixes that engineering teams can use quickly",
    ],
    practiceIdeas: [
      "Review a sample login journey and identify where trust decisions happen",
      "Map how user data moves through a small product and where controls belong",
      "Write a lightweight threat model for a password reset or payment flow",
    ],
    starterResources: [
      "secure coding basics",
      "auth and access control",
      "common web vulnerability patterns",
      "API security thinking",
    ],
    modules: [
      defineModule(
        "appsec-fundamentals",
        "Secure Coding Foundations",
        "Build the mental model behind secure product work.",
        [
          ["How trust boundaries appear in apps", "18 min"],
          ["Auth, sessions, and permissions", "22 min"],
          ["Input handling without panic thinking", "16 min"],
        ],
      ),
      defineModule(
        "appsec-review",
        "Application Review Workflow",
        "Learn how security reviews fit into product delivery.",
        [
          ["Threat modeling for features", "20 min"],
          ["Reviewing pull requests for risk", "24 min"],
          ["Turning findings into guidance", "15 min"],
        ],
      ),
      defineModule(
        "appsec-career",
        "From Beginner to Product Security Teammate",
        "See how AppSec becomes a real career path.",
        [
          ["Typical AppSec responsibilities", "12 min"],
          ["Partnering with engineers", "14 min"],
          ["Starter portfolio ideas", "10 min"],
        ],
      ),
    ],
    relatedTrackSlugs: ["security-engineering", "cloud-security", "privacy-data-protection"],
    salaryNote:
      "Market note placeholder: often strong demand in product-led companies, especially when paired with software fluency.",
  },
  {
    slug: "cloud-security",
    name: "Cloud Security",
    icon: "cloud-cog",
    accent: "#7B8CFF",
    category: "Platform Security",
    difficulty: "Technical and infrastructure-oriented",
    shortDescription:
      "Protect cloud platforms, identities, and infrastructure patterns before misconfigurations become incidents.",
    roleSummary:
      "Cloud Security focuses on safe infrastructure. You work with identity models, architecture, deployment pipelines, and platform services to reduce exposure at scale.",
    whoItFits:
      "Best for people who are curious about cloud platforms, infrastructure diagrams, identity, permissions, and the relationship between reliability and security.",
    actualWork: [
      "Review cloud architectures for risky trust relationships and weak access controls",
      "Improve IAM, secrets, and infrastructure standards across environments",
      "Partner with platform teams to build guardrails into deployment workflows",
    ],
    recommendedSkills: [
      "cloud service fundamentals",
      "identity and access management",
      "networking basics",
      "infrastructure as code concepts",
      "risk assessment",
    ],
    tools: [
      "AWS, Azure, or GCP consoles",
      "Terraform or similar IaC workflows",
      "policy checks",
      "cloud posture dashboards",
      "identity review documentation",
    ],
    roadmap: [
      "Learn shared responsibility and the cloud building blocks teams rely on",
      "Understand IAM deeply before chasing advanced tooling",
      "Study secure network and secret handling patterns",
      "Practice turning platform findings into reusable standards",
    ],
    practiceIdeas: [
      "Design a least-privilege access model for a small team",
      "Review a sample architecture and call out exposed trust paths",
      "Write a cloud security checklist for a new environment launch",
    ],
    starterResources: [
      "cloud identity basics",
      "infrastructure guardrails",
      "logging and visibility in cloud platforms",
      "secure deployment habits",
    ],
    modules: [
      defineModule(
        "cloud-core",
        "Cloud Security Core Concepts",
        "Build a foundation in infrastructure thinking.",
        [
          ["Shared responsibility in practice", "14 min"],
          ["IAM without guesswork", "21 min"],
          ["Network boundaries and service trust", "19 min"],
        ],
      ),
      defineModule(
        "cloud-ops",
        "Guardrails and Platform Safety",
        "Learn how cloud security gets operationalized.",
        [
          ["Security checks in delivery pipelines", "17 min"],
          ["Secrets and configuration hygiene", "15 min"],
          ["Responding to misconfiguration themes", "16 min"],
        ],
      ),
      defineModule(
        "cloud-career",
        "Cloud Security Career Orientation",
        "Understand where this path sits across modern teams.",
        [
          ["Common cloud security roles", "10 min"],
          ["Platform collaboration habits", "11 min"],
          ["Starter project ideas", "10 min"],
        ],
      ),
    ],
    relatedTrackSlugs: ["security-engineering", "application-security", "soc-blue-team"],
    salaryNote:
      "Market note placeholder: often attractive in teams scaling cloud environments and internal platform security programs.",
  },
  {
    slug: "security-engineering",
    name: "Security Engineering",
    icon: "workflow",
    accent: "#52D6B2",
    category: "Engineering",
    difficulty: "Technical and builder-heavy",
    shortDescription:
      "Build the internal systems, automations, and guardrails that make security durable across the company.",
    roleSummary:
      "Security Engineering is about shipping security capabilities. You automate repetitive work, create internal tooling, and design scalable controls that other teams can adopt.",
    whoItFits:
      "A strong fit for people who enjoy coding, workflows, platform thinking, and building reliable systems that make the whole organization safer.",
    actualWork: [
      "Design internal tooling for risk detection, workflows, or review automation",
      "Create secure defaults that improve developer and operator experience",
      "Connect product, infrastructure, and operations signals into better processes",
    ],
    recommendedSkills: [
      "software engineering basics",
      "automation and scripting",
      "system design",
      "security fundamentals",
      "cross-team collaboration",
    ],
    tools: [
      "Python or TypeScript",
      "CI/CD pipelines",
      "internal service integrations",
      "dashboards and alerts",
      "version control workflows",
    ],
    roadmap: [
      "Strengthen programming and debugging confidence first",
      "Study how security programs translate into repeatable systems",
      "Practice building small tools that remove manual friction",
      "Learn to prioritize what should become platform capability versus team habit",
    ],
    practiceIdeas: [
      "Build a simple intake form for security review requests",
      "Turn a manual checklist into a lightweight automation concept",
      "Design a service that centralizes findings from multiple sources",
    ],
    starterResources: [
      "security automation basics",
      "detection and workflow design",
      "secure CI/CD habits",
      "internal tooling patterns",
    ],
    modules: [
      defineModule(
        "seceng-systems",
        "Security Systems Thinking",
        "Understand how engineering work turns policy into productized controls.",
        [
          ["Where security engineering fits", "16 min"],
          ["Reliable workflows over heroics", "14 min"],
          ["Designing for scale and usability", "18 min"],
        ],
      ),
      defineModule(
        "seceng-automation",
        "Automation and Guardrails",
        "Learn the mechanics of reducing repetitive security work.",
        [
          ["Automating review touchpoints", "20 min"],
          ["Pipelines, checks, and feedback loops", "18 min"],
          ["Making tools adoptable by default", "15 min"],
        ],
      ),
      defineModule(
        "seceng-career",
        "Career Pathways in Security Engineering",
        "See where this path branches next.",
        [
          ["Platform security vs product security", "12 min"],
          ["Skills that compound fastest", "11 min"],
          ["Portfolio ideas for builders", "10 min"],
        ],
      ),
    ],
    relatedTrackSlugs: ["application-security", "cloud-security", "soc-blue-team"],
    salaryNote:
      "Market note placeholder: often strong when paired with engineering depth and a portfolio of automation or platform work.",
  },
  {
    slug: "soc-blue-team",
    name: "SOC / Blue Team",
    icon: "shield",
    accent: "#4AB9FF",
    category: "Operations",
    difficulty: "Fast-paced and analytical",
    shortDescription:
      "Monitor, triage, and improve defensive visibility so suspicious activity gets caught early.",
    roleSummary:
      "SOC and Blue Team roles sit in the flow of defensive operations. You work with logs, alerts, detections, and response handoffs to keep organizations aware of what is happening.",
    whoItFits:
      "Ideal for people who like monitoring, pattern recognition, calm decisions under time pressure, and making noisy signals easier to understand.",
    actualWork: [
      "Review alerts and determine what is real, urgent, or likely noise",
      "Improve detection logic and escalation quality over time",
      "Collaborate with response, IT, or engineering teams during suspicious events",
    ],
    recommendedSkills: [
      "log analysis",
      "network and endpoint basics",
      "detection mindset",
      "incident triage",
      "clear note-taking",
    ],
    tools: [
      "SIEM platforms",
      "EDR dashboards",
      "ticketing systems",
      "knowledge bases",
      "case escalation workflows",
    ],
    roadmap: [
      "Get comfortable reading raw activity before chasing advanced detections",
      "Learn the difference between events, alerts, indicators, and confirmed incidents",
      "Practice triage writing and escalation quality",
      "Build context around how business systems behave normally",
    ],
    practiceIdeas: [
      "Classify a small set of alerts into noise, suspicious, or urgent",
      "Write a triage note that explains why a signal matters",
      "Map which teams would need to collaborate during a suspicious login event",
    ],
    starterResources: [
      "logs and alerts",
      "SIEM basics",
      "incident triage",
      "detection mindset",
    ],
    modules: [
      defineModule(
        "soc-basics",
        "Blue Team Foundations",
        "Start with the mental model behind defensive monitoring.",
        [
          ["How alerts are generated", "15 min"],
          ["Separating noise from signal", "17 min"],
          ["Writing useful triage notes", "14 min"],
        ],
      ),
      defineModule(
        "soc-detect",
        "Detection and Visibility",
        "Learn what makes visibility practical, not just noisy.",
        [
          ["Detection logic basics", "18 min"],
          ["Indicators and contextual clues", "16 min"],
          ["Escalation quality and handoffs", "14 min"],
        ],
      ),
      defineModule(
        "soc-career",
        "Working in a SOC",
        "See how the role grows from entry level to specialist work.",
        [
          ["Analyst role expectations", "11 min"],
          ["Developing calm under pressure", "9 min"],
          ["Building a defensive portfolio", "10 min"],
        ],
      ),
    ],
    relatedTrackSlugs: ["dfir", "threat-intelligence", "cloud-security"],
    salaryNote:
      "Market note placeholder: broad entry point into cybersecurity with strong growth into detection, IR, and engineering-adjacent roles.",
  },
  {
    slug: "dfir",
    name: "DFIR",
    icon: "fingerprint",
    accent: "#FF9F6E",
    category: "Incident Response",
    difficulty: "Analytical and investigation-heavy",
    shortDescription:
      "Reconstruct incidents, preserve context, and help teams understand what happened and what to do next.",
    roleSummary:
      "Digital Forensics and Incident Response focuses on clarity during and after security events. You gather evidence, build timelines, reduce uncertainty, and support containment and recovery.",
    whoItFits:
      "A strong fit for people who enjoy investigations, timelines, evidence, and careful reasoning more than speculation or rapid-fire feature work.",
    actualWork: [
      "Build incident timelines from available evidence and system context",
      "Support containment decisions with clear technical findings",
      "Document lessons learned so future incidents become easier to handle",
    ],
    recommendedSkills: [
      "incident response fundamentals",
      "evidence handling mindset",
      "timeline building",
      "host and account activity analysis",
      "clear reporting",
    ],
    tools: [
      "case management systems",
      "timeline analysis notes",
      "endpoint evidence sources",
      "log and identity records",
      "response playbooks",
    ],
    roadmap: [
      "Understand the lifecycle of an incident before diving into tooling",
      "Practice turning scattered data into a clear sequence of events",
      "Learn how to communicate uncertainty and confidence honestly",
      "Study how remediation and post-incident learning connect back to prevention",
    ],
    practiceIdeas: [
      "Turn a fictional incident summary into a minute-by-minute timeline",
      "List which evidence sources would matter during an account takeover case",
      "Write a short incident recap for a non-technical stakeholder",
    ],
    starterResources: [
      "incident response basics",
      "evidence and timelines",
      "host and identity signals",
      "post-incident reporting",
    ],
    modules: [
      defineModule(
        "dfir-foundations",
        "Incident Response Foundations",
        "Build the vocabulary and process for response work.",
        [
          ["Incident phases and roles", "18 min"],
          ["Evidence types and confidence", "16 min"],
          ["Communicating during uncertainty", "15 min"],
        ],
      ),
      defineModule(
        "dfir-analysis",
        "Timeline and Root-Cause Analysis",
        "Learn how responders turn fragments into a coherent story.",
        [
          ["Timeline construction", "20 min"],
          ["Identity, host, and cloud clues", "17 min"],
          ["Containment vs longer-term fixes", "14 min"],
        ],
      ),
      defineModule(
        "dfir-career",
        "DFIR Career Orientation",
        "Understand how this path differs from SOC and intel work.",
        [
          ["Response-focused roles", "10 min"],
          ["Specialist growth areas", "9 min"],
          ["Starter practice portfolio", "8 min"],
        ],
      ),
    ],
    relatedTrackSlugs: ["soc-blue-team", "threat-intelligence", "privacy-data-protection"],
    salaryNote:
      "Market note placeholder: valued in organizations that need strong response maturity, investigation depth, and incident documentation.",
  },
  {
    slug: "threat-intelligence",
    name: "Threat Intelligence",
    icon: "radar",
    accent: "#A78BFA",
    category: "Research",
    difficulty: "Analytical and research-oriented",
    shortDescription:
      "Connect external trends, adversary behavior, and internal context so teams focus on what matters most.",
    roleSummary:
      "Threat Intelligence turns scattered information into useful understanding. You research patterns, track themes, and translate evolving threats into decisions for defenders and leaders.",
    whoItFits:
      "Great for people who love research, context gathering, written analysis, and answering ‘what does this mean for us?’ with evidence.",
    actualWork: [
      "Research relevant threat activity and summarize likely business impact",
      "Track patterns across incidents, campaigns, or industry changes",
      "Brief defenders and leaders on what deserves attention right now",
    ],
    recommendedSkills: [
      "structured research",
      "threat landscape awareness",
      "pattern analysis",
      "writing concise assessments",
      "contextual prioritization",
    ],
    tools: [
      "intel feeds",
      "knowledge bases",
      "research documents",
      "ATT&CK-style mapping",
      "briefing decks",
    ],
    roadmap: [
      "Learn to separate interesting information from actionable intelligence",
      "Practice summarizing patterns for different audiences",
      "Study how operations teams consume intelligence in real workflows",
      "Develop a habit of linking external reporting to internal relevance",
    ],
    practiceIdeas: [
      "Compare two fictional threat reports and extract what overlaps",
      "Write a short weekly intelligence brief for a small company",
      "Map a campaign summary to likely defender actions without technical deep-dives",
    ],
    starterResources: [
      "intelligence cycle basics",
      "pattern analysis",
      "threat reporting structures",
      "briefing different stakeholders",
    ],
    modules: [
      defineModule(
        "intel-cycle",
        "Threat Intelligence Cycle",
        "Learn how raw information becomes something teams can act on.",
        [
          ["Collection vs analysis", "13 min"],
          ["Turning notes into assessment", "16 min"],
          ["Confidence and caveats", "11 min"],
        ],
      ),
      defineModule(
        "intel-ops",
        "Operationalizing Intelligence",
        "Make intelligence useful to blue teams, leaders, and risk owners.",
        [
          ["What defenders need from intel", "17 min"],
          ["Prioritizing relevance", "15 min"],
          ["Building clear briefings", "14 min"],
        ],
      ),
      defineModule(
        "intel-career",
        "Threat Intel Career Path",
        "See how this path grows from research skill into strategic impact.",
        [
          ["Research habits that compound", "9 min"],
          ["Portfolio ideas for analysts", "10 min"],
          ["Where intel intersects with DFIR", "8 min"],
        ],
      ),
    ],
    relatedTrackSlugs: ["soc-blue-team", "dfir", "grc"],
    salaryNote:
      "Market note placeholder: often strongest in mature security teams where insight quality shapes prioritization.",
  },
  {
    slug: "grc",
    name: "GRC / Policy / Risk / Compliance",
    icon: "scale",
    accent: "#FFC857",
    category: "Governance",
    difficulty: "Structured and communication-heavy",
    shortDescription:
      "Turn security expectations into policies, controls, risk decisions, and audit-ready clarity.",
    roleSummary:
      "GRC helps organizations make security consistent and understandable. You translate frameworks into action, document controls, coordinate stakeholders, and keep risk visible.",
    whoItFits:
      "A strong choice for people who like structure, frameworks, documentation, stakeholder work, and making complex requirements manageable.",
    actualWork: [
      "Run risk discussions and document realistic mitigation plans",
      "Map controls to policies, frameworks, and operating evidence",
      "Coordinate audit readiness and cross-functional security expectations",
    ],
    recommendedSkills: [
      "risk assessment",
      "framework literacy",
      "policy writing",
      "project coordination",
      "clear stakeholder communication",
    ],
    tools: [
      "risk registers",
      "policy libraries",
      "control matrices",
      "spreadsheets or GRC platforms",
      "evidence tracking workflows",
    ],
    roadmap: [
      "Learn why controls exist before memorizing frameworks",
      "Practice translating technical detail into business language",
      "Study how audits, risks, and policies connect to real operations",
      "Build confidence facilitating decisions across different teams",
    ],
    practiceIdeas: [
      "Write a short acceptable use policy for a small company",
      "Create a simple risk register with likelihood and impact",
      "Map one security requirement to the evidence a team would need to keep",
    ],
    starterResources: [
      "risk assessment basics",
      "security policy writing",
      "compliance foundations",
      "controls and audits",
    ],
    modules: [
      defineModule(
        "grc-risk",
        "Risk and Governance Foundations",
        "Understand the operating model behind governance work.",
        [
          ["What risk ownership really means", "16 min"],
          ["Controls, policies, and outcomes", "14 min"],
          ["Communicating tradeoffs clearly", "13 min"],
        ],
      ),
      defineModule(
        "grc-frameworks",
        "Frameworks Without the Jargon Trap",
        "Learn how to use standards as tools instead of checklists.",
        [
          ["Reading framework language", "15 min"],
          ["Evidence and control mapping", "17 min"],
          ["Preparing for audits calmly", "14 min"],
        ],
      ),
      defineModule(
        "grc-career",
        "Career Paths in GRC",
        "See how policy, compliance, and risk roles branch out.",
        [
          ["GRC role types", "10 min"],
          ["Portfolio ideas for non-coders", "8 min"],
          ["Growing into leadership pathways", "9 min"],
        ],
      ),
    ],
    relatedTrackSlugs: ["privacy-data-protection", "security-awareness", "threat-intelligence"],
    salaryNote:
      "Market note placeholder: broad opportunity across regulated industries and growing companies building formal security programs.",
  },
  {
    slug: "security-awareness",
    name: "Security Awareness / Human Factor",
    icon: "users-round",
    accent: "#FF7AA2",
    category: "Human-Centered Security",
    difficulty: "Beginner friendly and communication-led",
    shortDescription:
      "Improve how people understand, trust, and act on security through education, behavior design, and program feedback.",
    roleSummary:
      "Security Awareness and Human Factor roles focus on people, not just systems. You design guidance, build habits, measure behavior change, and make security feel usable instead of abstract.",
    whoItFits:
      "Excellent for people who enjoy communication, learning design, psychology, storytelling, and helping others change behavior without fear tactics.",
    actualWork: [
      "Create training, campaigns, and clear guidance that people can actually use",
      "Measure where confusion or risky habits are showing up",
      "Partner with teams to improve security culture, not just awareness completion rates",
    ],
    recommendedSkills: [
      "clear writing",
      "instructional design basics",
      "behavioral thinking",
      "program measurement",
      "stakeholder empathy",
    ],
    tools: [
      "training platforms",
      "campaign metrics",
      "survey tools",
      "internal comms channels",
      "presentation decks",
    ],
    roadmap: [
      "Understand the difference between awareness, behavior, and culture",
      "Study what makes security guidance easy or hard to follow",
      "Practice writing short, specific messaging that reduces confusion",
      "Learn to measure progress with behavior signals, not vanity metrics",
    ],
    practiceIdeas: [
      "Rewrite a confusing phishing warning into plain language",
      "Design a short onboarding security checklist for new hires",
      "Plan a monthly awareness theme around password resets or MFA adoption",
    ],
    starterResources: [
      "behavior-driven security",
      "phishing and scam awareness",
      "program metrics",
      "clear policy communication",
    ],
    modules: [
      defineModule(
        "awareness-basics",
        "Human-Centered Security Basics",
        "Learn how people and systems influence each other.",
        [
          ["Why awareness alone is not enough", "12 min"],
          ["Security habits and friction", "14 min"],
          ["Writing for clarity, not fear", "13 min"],
        ],
      ),
      defineModule(
        "awareness-program",
        "Designing Awareness Programs",
        "Build a program that feels useful instead of mandatory.",
        [
          ["Planning learning journeys", "15 min"],
          ["Phishing and social engineering education", "16 min"],
          ["Measuring behavior change", "14 min"],
        ],
      ),
      defineModule(
        "awareness-career",
        "Career Paths in Human Factor Security",
        "See how this path connects to policy, privacy, and culture work.",
        [
          ["Typical role responsibilities", "9 min"],
          ["Communications portfolio ideas", "8 min"],
          ["Growing into program ownership", "10 min"],
        ],
      ),
    ],
    relatedTrackSlugs: ["grc", "privacy-data-protection", "threat-intelligence"],
    salaryNote:
      "Market note placeholder: valuable wherever organizations want security programs that people actually adopt.",
  },
  {
    slug: "penetration-testing",
    name: "Penetration Testing / Red Team",
    icon: "crosshair",
    accent: "#FF5F7A",
    category: "Offensive Simulation",
    difficulty: "Technical and lab-oriented",
    shortDescription:
      "Safely simulate attacker thinking in authorized environments to validate where defenses and assumptions break down.",
    roleSummary:
      "Penetration Testing and Red Team work helps organizations understand exposure through approved simulations. The goal is learning and improving, not showing off exploits.",
    whoItFits:
      "Best for people who enjoy curiosity, systems exploration, technical challenge, and translating security weaknesses into clear remediation guidance.",
    actualWork: [
      "Assess how controls hold up inside approved test scopes and lab environments",
      "Document realistic attack paths without drifting into vague fear or unsafe advice",
      "Work closely with defenders and engineers so findings become practical fixes",
    ],
    recommendedSkills: [
      "network and web fundamentals",
      "methodical testing habits",
      "clear scoping and ethics",
      "technical reporting",
      "defender empathy",
    ],
    tools: [
      "authorized lab environments",
      "testing playbooks",
      "note-taking and reporting workflows",
      "proxy and debugging tools",
      "scoping documentation",
    ],
    roadmap: [
      "Start with core system and web concepts before advanced testing workflows",
      "Practice thinking in attack paths, not isolated tricks",
      "Build reporting habits that emphasize business impact and remediation",
      "Keep defensive context close so the work stays constructive and safe",
    ],
    practiceIdeas: [
      "Write an assessment plan for a fictional lab environment",
      "Turn a hypothetical weakness into a clear remediation report",
      "Compare how offensive findings might inform blue team improvements",
    ],
    starterResources: [
      "authorized testing mindset",
      "web and network foundations",
      "reporting findings clearly",
      "offense-to-defense learning loop",
    ],
    modules: [
      defineModule(
        "redteam-foundations",
        "Authorized Testing Foundations",
        "Understand the purpose and boundaries of offensive simulation.",
        [
          ["Scope, ethics, and rules of engagement", "16 min"],
          ["Thinking in attack paths", "17 min"],
          ["Reporting for improvement", "14 min"],
        ],
      ),
      defineModule(
        "redteam-method",
        "Testing Workflow Basics",
        "Learn the phases of structured assessment work.",
        [
          ["Planning a test safely", "13 min"],
          ["Capturing evidence and observations", "14 min"],
          ["Writing findings people can act on", "16 min"],
        ],
      ),
      defineModule(
        "redteam-career",
        "Career Pathways in Offensive Security",
        "See how this path differs from AppSec and security engineering.",
        [
          ["Different offensive role types", "10 min"],
          ["How to build credibility responsibly", "9 min"],
          ["Portfolio ideas for lab learners", "8 min"],
        ],
      ),
    ],
    relatedTrackSlugs: ["application-security", "security-engineering", "soc-blue-team"],
    salaryNote:
      "Market note placeholder: often attractive for technically strong candidates who can pair testing depth with excellent reporting and ethics.",
  },
  {
    slug: "privacy-data-protection",
    name: "Privacy / Data Protection",
    icon: "lock-keyhole",
    accent: "#88F0C4",
    category: "Privacy",
    difficulty: "Structured and cross-functional",
    shortDescription:
      "Help organizations collect, use, retain, and protect data responsibly across products and operations.",
    roleSummary:
      "Privacy and Data Protection work sits between policy, product, and trust. You think about data lifecycle, retention, consent, risk, and how organizations can respect users while operating responsibly.",
    whoItFits:
      "A strong fit for people who care about data use, customer trust, documentation, and how legal, product, and security teams align around responsible choices.",
    actualWork: [
      "Map where sensitive data is collected, stored, and shared",
      "Support privacy reviews for new features and business changes",
      "Improve retention, consent, and data handling practices with clear guidance",
    ],
    recommendedSkills: [
      "data lifecycle thinking",
      "privacy principles",
      "documentation and coordination",
      "risk communication",
      "cross-functional judgment",
    ],
    tools: [
      "data inventories",
      "privacy impact assessments",
      "retention schedules",
      "policy documents",
      "feature review templates",
    ],
    roadmap: [
      "Learn how products create data footprints over time",
      "Study privacy principles and how they influence design decisions",
      "Practice reviewing features through a data minimization lens",
      "Build confidence explaining privacy tradeoffs without legal jargon overload",
    ],
    practiceIdeas: [
      "Map the data lifecycle of a signup and profile feature",
      "Draft a privacy review checklist for a new analytics event",
      "Create a retention recommendation for a simple product dataset",
    ],
    starterResources: [
      "privacy principles",
      "data mapping basics",
      "retention and minimization",
      "feature privacy reviews",
    ],
    modules: [
      defineModule(
        "privacy-core",
        "Privacy Foundations",
        "Start with the principles behind responsible data use.",
        [
          ["Data lifecycle basics", "15 min"],
          ["Minimization, retention, and purpose", "17 min"],
          ["Customer trust as a product outcome", "12 min"],
        ],
      ),
      defineModule(
        "privacy-practice",
        "Privacy Reviews in Product Work",
        "Learn how privacy shows up during real decisions.",
        [
          ["Reviewing feature changes", "16 min"],
          ["Working with engineering and legal teams", "15 min"],
          ["Documenting decisions clearly", "14 min"],
        ],
      ),
      defineModule(
        "privacy-career",
        "Career Pathways in Privacy",
        "Understand how privacy work branches across organizations.",
        [
          ["Common privacy role types", "10 min"],
          ["Starter portfolio ideas", "8 min"],
          ["Privacy plus security overlap", "9 min"],
        ],
      ),
    ],
    relatedTrackSlugs: ["grc", "application-security", "security-awareness"],
    salaryNote:
      "Market note placeholder: demand often rises in data-heavy or regulated environments where trust and governance are product-critical.",
  },
];

export const trackMap = Object.fromEntries(
  tracks.map((track) => [track.slug, track]),
) as Record<TrackSlug, Track>;

export const howItWorksSteps = [
  {
    title: "Answer questions",
    description:
      "Move through a calm, product-style assessment that measures preferences, strengths, and work style instead of testing memorized facts.",
  },
  {
    title: "Get matched to cybersecurity tracks",
    description:
      "See your best-fit domains, the signals behind the match, and how technical, analytical, defensive, or policy-oriented your profile looks.",
  },
  {
    title: "Start learning",
    description:
      "Open a personalized beginner roadmap with modules, mini-practice ideas, and career context tailored to your strongest tracks.",
  },
];

export const platformBenefits = [
  "personalized guidance built around your preferences and strengths",
  "structured paths that make cybersecurity feel easier to enter",
  "beginner-friendly explanations without cringe hacker stereotypes",
  "progress-based learning with visible milestones and next steps",
];

export const sampleMilestones = [
  "Quiz completed",
  "First roadmap unlocked",
  "Three lessons finished",
  "First practice scenario reviewed",
];

export const quizQuestions: QuizQuestion[] = [
  single(
    "q1",
    "Which kind of cybersecurity work feels most energizing to you?",
    "Pick the work that sounds satisfying, not the one that sounds impressive.",
    [
      option(
        "q1-break",
        "Exploring how systems can fail and how to prove the risk clearly",
        "You enjoy structured offensive simulation and technical curiosity.",
        {
          "penetration-testing": 4,
          "application-security": 2,
          "threat-intelligence": 1,
        },
        { builder: 1, analyst: 1 },
      ),
      option(
        "q1-defend",
        "Protecting systems before problems spread",
        "You care about visibility, resilience, and prevention.",
        {
          "soc-blue-team": 3,
          dfir: 2,
          "cloud-security": 1,
        },
        { defender: 3, investigator: 1 },
      ),
      option(
        "q1-build",
        "Designing safer products and technical guardrails",
        "You like working close to software and systems.",
        {
          "application-security": 3,
          "security-engineering": 3,
          "cloud-security": 1,
        },
        { builder: 3, defender: 1 },
      ),
      option(
        "q1-structure",
        "Turning risk into policies, controls, or privacy decisions",
        "You enjoy structured decisions and trust-oriented work.",
        {
          grc: 3,
          "privacy-data-protection": 3,
          "security-awareness": 1,
        },
        { strategist: 3, people: 1 },
      ),
      option(
        "q1-people",
        "Helping people make better security decisions",
        "You care about behavior, communication, and culture.",
        {
          "security-awareness": 4,
          "privacy-data-protection": 1,
          grc: 1,
        },
        { people: 3, strategist: 1 },
      ),
    ],
  ),
  single(
    "q2",
    "When a service behaves strangely, what do you want to inspect first?",
    "This helps us understand where your attention naturally goes.",
    [
      option(
        "q2-logs",
        "The alerts, logs, and signals around the event",
        "You like defensive visibility and triage.",
        {
          "soc-blue-team": 3,
          dfir: 2,
          "threat-intelligence": 1,
        },
        { defender: 2, investigator: 2 },
      ),
      option(
        "q2-code",
        "The code path or feature design that allowed it",
        "You focus on building safer software.",
        {
          "application-security": 3,
          "security-engineering": 2,
        },
        { builder: 3 },
      ),
      option(
        "q2-access",
        "The cloud setup, permissions, and platform configuration",
        "You think in infrastructure and access models.",
        {
          "cloud-security": 4,
          "security-engineering": 2,
          "soc-blue-team": 1,
        },
        { builder: 2, defender: 1 },
      ),
      option(
        "q2-process",
        "The policy, process, or control that should have prevented confusion",
        "You look for the governance layer behind the issue.",
        {
          grc: 3,
          "privacy-data-protection": 2,
          "security-awareness": 1,
        },
        { strategist: 3 },
      ),
    ],
  ),
  scale(
    "q3",
    "I enjoy working directly with code or technical systems.",
    "There is no correct answer. This simply shapes the kind of path we recommend.",
    "Not really",
    "Very much",
    {
      grc: 2,
      "security-awareness": 2,
      "privacy-data-protection": 1,
    },
    {
      "application-security": 3,
      "security-engineering": 3,
      "cloud-security": 2,
      "penetration-testing": 2,
    },
    { strategist: 1, people: 1 },
    { builder: 3 },
  ),
  single(
    "q4",
    "Which deliverable sounds most satisfying to produce?",
    "Choose the output you would be proud to hand off.",
    [
      option(
        "q4-report",
        "A concise risk memo or policy recommendation",
        "You like making decisions clearer for others.",
        {
          grc: 3,
          "privacy-data-protection": 2,
          "threat-intelligence": 1,
        },
        { strategist: 3, analyst: 1 },
      ),
      option(
        "q4-guidance",
        "A developer-friendly fix plan or secure design recommendation",
        "You like making technical work safer and easier.",
        {
          "application-security": 3,
          "security-engineering": 2,
          "cloud-security": 1,
        },
        { builder: 3 },
      ),
      option(
        "q4-timeline",
        "An incident timeline that explains what happened",
        "You like evidence, context, and sequencing.",
        {
          dfir: 4,
          "soc-blue-team": 2,
          "threat-intelligence": 1,
        },
        { investigator: 3, analyst: 1 },
      ),
      option(
        "q4-detection",
        "A detection improvement that reduces future noise",
        "You like defensive signal quality.",
        {
          "soc-blue-team": 3,
          "security-engineering": 1,
          dfir: 1,
        },
        { defender: 3, builder: 1 },
      ),
      option(
        "q4-campaign",
        "A short training or awareness campaign people actually remember",
        "You like behavior change and communication.",
        {
          "security-awareness": 4,
          grc: 1,
        },
        { people: 3 },
      ),
    ],
  ),
  scale(
    "q5",
    "I like structured rules, frameworks, and clear decision criteria.",
    "Think about whether structure feels helpful or restrictive to you.",
    "I prefer flexibility",
    "I like clear frameworks",
    {
      "penetration-testing": 2,
      "application-security": 1,
      dfir: 1,
    },
    {
      grc: 3,
      "privacy-data-protection": 2,
      "security-awareness": 1,
    },
    { builder: 1, investigator: 1 },
    { strategist: 3 },
  ),
  single(
    "q6",
    "Which environment sounds most interesting to explore?",
    "This points us toward the domains you may naturally gravitate to.",
    [
      option(
        "q6-product",
        "A product team shipping web or mobile features",
        "You like secure product work close to engineering.",
        {
          "application-security": 4,
          "security-engineering": 2,
        },
        { builder: 3 },
      ),
      option(
        "q6-cloud",
        "A cloud platform with identities, services, and infrastructure layers",
        "You like architecture and platform trust.",
        {
          "cloud-security": 4,
          "security-engineering": 2,
        },
        { builder: 2, defender: 1 },
      ),
      option(
        "q6-soc",
        "A monitoring room with alerts, context, and decisions moving quickly",
        "You like defensive operations and pattern recognition.",
        {
          "soc-blue-team": 4,
          dfir: 2,
        },
        { defender: 3, investigator: 1 },
      ),
      option(
        "q6-board",
        "A cross-functional room aligning on risk, audits, or data handling",
        "You like governance and trust-building work.",
        {
          grc: 3,
          "privacy-data-protection": 3,
        },
        { strategist: 3, people: 1 },
      ),
      option(
        "q6-behavior",
        "A people-focused program improving habits and communication",
        "You like human-centered security work.",
        {
          "security-awareness": 4,
          "privacy-data-protection": 1,
        },
        { people: 3 },
      ),
    ],
  ),
  scale(
    "q7",
    "Fast-paced monitoring and triage work sounds appealing to me.",
    "Some people love signal-rich queues. Others would rather work more slowly and deeply.",
    "Not my style",
    "Very appealing",
    {
      "application-security": 1,
      grc: 2,
      "privacy-data-protection": 1,
    },
    {
      "soc-blue-team": 3,
      dfir: 2,
      "threat-intelligence": 1,
    },
    { builder: 1, strategist: 1 },
    { defender: 3, investigator: 1 },
  ),
  single(
    "q8",
    "Which statement sounds most like you?",
    "Choose the one that feels natural on your best day.",
    [
      option(
        "q8-prevention",
        "I like designing things so problems are less likely in the first place",
        "Prevention-oriented thinking often aligns with builder tracks.",
        {
          "application-security": 3,
          "cloud-security": 2,
          "security-engineering": 2,
        },
        { builder: 2, defender: 2 },
      ),
      option(
        "q8-investigation",
        "I like reconstructing what happened after something goes wrong",
        "Investigation-oriented thinking often aligns with response tracks.",
        {
          dfir: 3,
          "soc-blue-team": 2,
          "threat-intelligence": 2,
        },
        { investigator: 3, analyst: 1 },
      ),
      option(
        "q8-structure",
        "I like making expectations and decisions clear for teams",
        "Governance-oriented thinking shapes consistency and trust.",
        {
          grc: 3,
          "privacy-data-protection": 2,
          "security-awareness": 1,
        },
        { strategist: 3, people: 1 },
      ),
      option(
        "q8-people",
        "I like helping people make better choices under pressure",
        "Human-centered thinking matters across security programs.",
        {
          "security-awareness": 3,
          "privacy-data-protection": 2,
          grc: 1,
        },
        { people: 3, strategist: 1 },
      ),
    ],
  ),
  scale(
    "q9",
    "I’m curious about cloud platforms, identities, and infrastructure.",
    "This helps us see whether platform-oriented paths should rank higher.",
    "Not especially",
    "Definitely",
    {
      "security-awareness": 1,
      grc: 1,
      "privacy-data-protection": 1,
    },
    {
      "cloud-security": 4,
      "security-engineering": 2,
      "soc-blue-team": 1,
    },
    { people: 1 },
    { builder: 2, defender: 1 },
  ),
  single(
    "q10",
    "What kind of learning project would you most want to try first?",
    "Imagine you have a weekend and a safe starter project.",
    [
      option(
        "q10-app",
        "Review a simple app feature and suggest safer design choices",
        "You like product security and coding-adjacent learning.",
        {
          "application-security": 4,
          "security-engineering": 1,
        },
        { builder: 3 },
      ),
      option(
        "q10-blue",
        "Analyze a set of alerts and decide what deserves escalation",
        "You like signal interpretation and defensive work.",
        {
          "soc-blue-team": 4,
          dfir: 2,
        },
        { defender: 2, investigator: 2 },
      ),
      option(
        "q10-risk",
        "Write a short risk assessment for a new business workflow",
        "You like structured reasoning and communication.",
        {
          grc: 4,
          "privacy-data-protection": 2,
        },
        { strategist: 3 },
      ),
      option(
        "q10-awareness",
        "Create a clear security onboarding guide for new hires",
        "You like human-centered enablement work.",
        {
          "security-awareness": 4,
          grc: 1,
        },
        { people: 3 },
      ),
      option(
        "q10-lab",
        "Document an authorized test plan for a safe lab scenario",
        "You like structured offensive simulation.",
        {
          "penetration-testing": 4,
          "application-security": 1,
        },
        { builder: 1, analyst: 1 },
      ),
    ],
  ),
  scale(
    "q11",
    "I enjoy researching patterns before I make a conclusion.",
    "Think about whether slow, careful synthesis feels energizing to you.",
    "I prefer action first",
    "I enjoy deep pattern analysis",
    {
      "security-engineering": 1,
      "penetration-testing": 1,
      "cloud-security": 1,
    },
    {
      "threat-intelligence": 4,
      dfir: 2,
      "privacy-data-protection": 1,
    },
    { builder: 1 },
    { analyst: 3, investigator: 1 },
  ),
  single(
    "q12",
    "Which kind of teammate role sounds most natural?",
    "Picture how you would contribute in a cross-functional team.",
    [
      option(
        "q12-builder",
        "The person who improves the system so everyone can work more safely",
        "You naturally think in durable technical improvements.",
        {
          "security-engineering": 3,
          "cloud-security": 2,
          "application-security": 2,
        },
        { builder: 3 },
      ),
      option(
        "q12-defender",
        "The person who notices signals early and helps coordinate response",
        "You have defensive operations instincts.",
        {
          "soc-blue-team": 3,
          dfir: 2,
        },
        { defender: 3, investigator: 1 },
      ),
      option(
        "q12-analyst",
        "The person who makes complex patterns easier to understand",
        "You bring research and synthesis strength.",
        {
          "threat-intelligence": 3,
          dfir: 1,
          grc: 1,
        },
        { analyst: 3 },
      ),
      option(
        "q12-strategist",
        "The person who keeps risk, policy, and expectations aligned",
        "You bring structure and governance clarity.",
        {
          grc: 3,
          "privacy-data-protection": 2,
        },
        { strategist: 3 },
      ),
      option(
        "q12-guide",
        "The person who helps others understand what to do and why",
        "You bring behavior and communication strength.",
        {
          "security-awareness": 3,
          "privacy-data-protection": 1,
          grc: 1,
        },
        { people: 3 },
      ),
    ],
  ),
  scale(
    "q13",
    "I’m interested in privacy, data protection, and responsible data use.",
    "This measures how much the trust and lifecycle side of security matters to you.",
    "Not a major interest",
    "A strong interest",
    {
      "penetration-testing": 1,
      "soc-blue-team": 1,
      "security-engineering": 1,
    },
    {
      "privacy-data-protection": 4,
      grc: 2,
      "application-security": 1,
    },
    { builder: 1 },
    { strategist: 2, people: 1 },
  ),
  single(
    "q14",
    "Which kind of challenge feels most motivating?",
    "Pick the problem you would choose first if nobody assigned it to you.",
    [
      option(
        "q14-auth",
        "Spotting weak trust assumptions in a login or API flow",
        "You like product and design-level security thinking.",
        {
          "application-security": 4,
          "security-engineering": 1,
        },
        { builder: 3 },
      ),
      option(
        "q14-cloud",
        "Untangling a confusing access model in a cloud environment",
        "You like platform trust and architecture.",
        {
          "cloud-security": 4,
          "security-engineering": 1,
        },
        { builder: 2, defender: 1 },
      ),
      option(
        "q14-incident",
        "Reconstructing an incident from partial evidence",
        "You like careful investigation.",
        {
          dfir: 4,
          "soc-blue-team": 1,
          "threat-intelligence": 1,
        },
        { investigator: 3 },
      ),
      option(
        "q14-patterns",
        "Making sense of repeated threat patterns across reports or alerts",
        "You enjoy research and pattern synthesis.",
        {
          "threat-intelligence": 4,
          "soc-blue-team": 1,
        },
        { analyst: 3 },
      ),
      option(
        "q14-policy",
        "Making a complicated requirement easy for teams to follow",
        "You like operational clarity and governance.",
        {
          grc: 3,
          "privacy-data-protection": 2,
          "security-awareness": 1,
        },
        { strategist: 2, people: 1 },
      ),
    ],
  ),
  scale(
    "q15",
    "I like helping people change habits and make better decisions.",
    "Think about whether behavior change work feels meaningful to you.",
    "Not especially",
    "Very much",
    {
      "security-engineering": 1,
      "penetration-testing": 1,
      "cloud-security": 1,
    },
    {
      "security-awareness": 4,
      grc: 1,
      "privacy-data-protection": 1,
    },
    { builder: 1 },
    { people: 3 },
  ),
  single(
    "q16",
    "Which sentence sounds most like the future role you want?",
    "We use this to shape the roadmap style and examples we show you later.",
    [
      option(
        "q16-ship",
        "I want to help teams ship products that are secure by default",
        "You want product-facing security work.",
        {
          "application-security": 4,
          "security-engineering": 2,
        },
        { builder: 3, defender: 1 },
      ),
      option(
        "q16-scale",
        "I want to create systems and automations that make security sustainable",
        "You want builder-heavy security engineering work.",
        {
          "security-engineering": 4,
          "cloud-security": 2,
        },
        { builder: 3 },
      ),
      option(
        "q16-watch",
        "I want to see suspicious activity early and help teams respond well",
        "You want visibility and response-oriented work.",
        {
          "soc-blue-team": 4,
          dfir: 2,
        },
        { defender: 3, investigator: 1 },
      ),
      option(
        "q16-advise",
        "I want to guide risk, trust, and data decisions across teams",
        "You want governance or privacy-oriented work.",
        {
          grc: 3,
          "privacy-data-protection": 3,
        },
        { strategist: 3 },
      ),
      option(
        "q16-simulate",
        "I want to safely test assumptions and show where defenses need improvement",
        "You want offensive simulation grounded in learning and reporting.",
        {
          "penetration-testing": 4,
          "application-security": 1,
        },
        { builder: 1, analyst: 1 },
      ),
    ],
  ),
  scale(
    "q17",
    "I prefer prevention and architecture work over incident-driven work.",
    "Neither side is better. This just shifts the kind of path we prioritize.",
    "I prefer incident-driven work",
    "I prefer prevention and architecture",
    {
      "soc-blue-team": 2,
      dfir: 2,
      "threat-intelligence": 1,
    },
    {
      "application-security": 3,
      "cloud-security": 2,
      "security-engineering": 2,
    },
    { defender: 1, investigator: 1 },
    { builder: 3, defender: 1 },
  ),
  single(
    "q18",
    "What kind of feedback loop motivates you most?",
    "Pick the signal that would make the work feel rewarding.",
    [
      option(
        "q18-engineers",
        "Engineers adopt your guidance and future features come out stronger",
        "You like product influence and technical enablement.",
        {
          "application-security": 3,
          "security-engineering": 2,
        },
        { builder: 2, people: 1 },
      ),
      option(
        "q18-alerts",
        "Alerts become clearer and the team responds with more confidence",
        "You like measurable defensive improvement.",
        {
          "soc-blue-team": 3,
          dfir: 1,
        },
        { defender: 3 },
      ),
      option(
        "q18-leaders",
        "Leaders understand the risk and make better decisions faster",
        "You like strategic communication.",
        {
          grc: 3,
          "threat-intelligence": 1,
          "privacy-data-protection": 1,
        },
        { strategist: 2, analyst: 1 },
      ),
      option(
        "q18-people",
        "People follow guidance because it finally feels clear and useful",
        "You like behavior-focused outcomes.",
        {
          "security-awareness": 3,
          "privacy-data-protection": 1,
        },
        { people: 3 },
      ),
      option(
        "q18-report",
        "A clear report leads directly to stronger controls or safer design",
        "You like translating findings into action.",
        {
          "penetration-testing": 2,
          "application-security": 2,
          "cloud-security": 1,
        },
        { analyst: 1, builder: 1 },
      ),
    ],
  ),
  scale(
    "q19",
    "I like writing or presenting insights to different audiences.",
    "This affects whether we lean toward roles with more stakeholder communication.",
    "Not really",
    "Yes, a lot",
    {
      "penetration-testing": 1,
      "cloud-security": 1,
      "security-engineering": 1,
    },
    {
      grc: 2,
      "security-awareness": 2,
      "threat-intelligence": 2,
      "privacy-data-protection": 1,
    },
    { builder: 1 },
    { strategist: 1, people: 1, analyst: 1 },
  ),
  single(
    "q20",
    "Which phrase best describes what you want cybersecurity to feel like for you?",
    "This helps us choose the tone of your recommended roadmap.",
    [
      option(
        "q20-build",
        "A technical craft where I make systems safer over time",
        "You want a builder path.",
        {
          "security-engineering": 3,
          "application-security": 3,
          "cloud-security": 2,
        },
        { builder: 3 },
      ),
      option(
        "q20-defend",
        "A mission where I help detect, protect, and respond",
        "You want a defender path.",
        {
          "soc-blue-team": 3,
          dfir: 2,
          "cloud-security": 1,
        },
        { defender: 3, investigator: 1 },
      ),
      option(
        "q20-research",
        "A field where I investigate patterns and explain what matters",
        "You want an analytical path.",
        {
          "threat-intelligence": 3,
          dfir: 2,
          grc: 1,
        },
        { analyst: 3, investigator: 1 },
      ),
      option(
        "q20-guidance",
        "A trust-focused role where I help teams make responsible decisions",
        "You want a policy or privacy path.",
        {
          grc: 3,
          "privacy-data-protection": 3,
          "security-awareness": 1,
        },
        { strategist: 3, people: 1 },
      ),
      option(
        "q20-human",
        "A people-centered path where security becomes clearer and more usable",
        "You want a human-centered security path.",
        {
          "security-awareness": 4,
          grc: 1,
          "privacy-data-protection": 1,
        },
        { people: 3 },
      ),
    ],
  ),
];

export const sampleAnswerMap: QuizAnswerMap = {
  q1: "q1-build",
  q2: "q2-code",
  q3: 5,
  q4: "q4-guidance",
  q5: 3,
  q6: "q6-product",
  q7: 2,
  q8: "q8-prevention",
  q9: 4,
  q10: "q10-app",
  q11: 4,
  q12: "q12-builder",
  q13: 3,
  q14: "q14-auth",
  q15: 2,
  q16: "q16-ship",
  q17: 5,
  q18: "q18-engineers",
  q19: 4,
  q20: "q20-build",
};
