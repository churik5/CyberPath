import { quizQuestions } from "@/lib/data/cyberpath";
import type {
  QuizQuestion,
  SignalScoreMap,
  SignalSlug,
  SingleChoiceQuestion,
  ScaleQuestion,
} from "@/lib/types";
import { localized, pickLocalized, type Locale, type LocalizedValue } from "@/lib/i18n";

const signalCopy: Record<
  SignalSlug,
  {
    label: LocalizedValue;
    reason: LocalizedValue;
    strength: LocalizedValue;
  }
> = {
  builder: {
    label: localized("Builder", "Builder"),
    reason: localized(
      "ты регулярно тянулся к созданию более безопасных систем, guardrails и удобных технических процессов",
      "you consistently leaned toward creating safer systems, guardrails, and technical workflows",
    ),
    strength: localized("системное мышление", "systems thinking"),
  },
  defender: {
    label: localized("Defender", "Defender"),
    reason: localized(
      "тебе ближе prevention, visibility и ежедневная defensive-работа по устойчивости систем",
      "you preferred prevention, visibility, and the day-to-day work of keeping systems resilient",
    ),
    strength: localized("спокойное defensive-мышление", "calm defensive judgment"),
  },
  investigator: {
    label: localized("Investigator", "Investigator"),
    reason: localized(
      "у тебя сильная тяга к инцидентам, evidence и восстановлению реальной картины событий",
      "you showed a strong pull toward incidents, evidence, and reconstructing what happened",
    ),
    strength: localized("любознательность к evidence", "evidence-based curiosity"),
  },
  analyst: {
    label: localized("Analyst", "Analyst"),
    reason: localized(
      "ты склоняешься к research, pattern analysis и превращению слабых сигналов в полезные выводы",
      "you gravitated to research, pattern analysis, and turning weak signals into useful insight",
    ),
    strength: localized("распознавание паттернов", "pattern recognition"),
  },
  strategist: {
    label: localized("Strategist", "Strategist"),
    reason: localized(
      "для тебя важны структура, правила и frameworks, которые помогают командам управлять риском",
      "you valued structure, rules, and the frameworks that help teams manage risk",
    ),
    strength: localized("структурное принятие решений", "structured decision-making"),
  },
  people: {
    label: localized("People", "People"),
    reason: localized(
      "тебе важны коммуникация, доверие и человеческие решения, которые влияют на безопасность",
      "you cared about communication, trust, and the human decisions that shape security outcomes",
    ),
    strength: localized("ясная коммуникация", "clear communication"),
  },
};

const localizedQuizCopy = {
  q1: {
    prompt: localized(
      "Какой тип работы в кибербезопасности кажется тебе самым заряжающим?",
      "Which kind of cybersecurity work feels most energizing to you?",
    ),
    helper: localized(
      "Выбери то, что звучит по-настоящему интересно, а не просто престижно.",
      "Pick the work that sounds satisfying, not the one that sounds impressive.",
    ),
    options: {
      "q1-break": {
        label: localized(
          "Исследовать, как системы ломаются, и уметь ясно показать риск",
          "Exploring how systems can fail and how to prove the risk clearly",
        ),
        description: localized(
          "Тебя привлекают структурированные offensive simulations и техническое любопытство.",
          "You enjoy structured offensive simulation and technical curiosity.",
        ),
      },
      "q1-defend": {
        label: localized(
          "Защищать системы до того, как проблема разрастется",
          "Protecting systems before problems spread",
        ),
        description: localized(
          "Тебе близки visibility, resilience и prevention.",
          "You care about visibility, resilience, and prevention.",
        ),
      },
      "q1-build": {
        label: localized(
          "Проектировать более безопасные продукты и технические guardrails",
          "Designing safer products and technical guardrails",
        ),
        description: localized(
          "Тебе нравится работать рядом с software и systems.",
          "You like working close to software and systems.",
        ),
      },
      "q1-structure": {
        label: localized(
          "Превращать риск в policy, controls или privacy-решения",
          "Turning risk into policies, controls, or privacy decisions",
        ),
        description: localized(
          "Тебе нравится структурная работа и trust-oriented роли.",
          "You enjoy structured decisions and trust-oriented work.",
        ),
      },
      "q1-people": {
        label: localized(
          "Помогать людям принимать более безопасные решения",
          "Helping people make better security decisions",
        ),
        description: localized(
          "Тебе интересны поведение, коммуникация и security culture.",
          "You care about behavior, communication, and culture.",
        ),
      },
    },
  },
  q2: {
    prompt: localized(
      "Когда сервис ведет себя странно, что тебе хочется посмотреть первым?",
      "When a service behaves strangely, what do you want to inspect first?",
    ),
    helper: localized(
      "Так мы понимаем, куда естественно направляется твое внимание.",
      "This helps us understand where your attention naturally goes.",
    ),
    options: {
      "q2-logs": {
        label: localized(
          "Алерты, логи и сигналы вокруг события",
          "The alerts, logs, and signals around the event",
        ),
        description: localized(
          "Тебе интересны visibility и triage.",
          "You like defensive visibility and triage.",
        ),
      },
      "q2-code": {
        label: localized(
          "Кодовый путь или feature design, который это допустил",
          "The code path or feature design that allowed it",
        ),
        description: localized(
          "Ты смотришь на проблему с точки зрения безопасной разработки.",
          "You focus on building safer software.",
        ),
      },
      "q2-access": {
        label: localized(
          "Cloud-конфигурацию, permissions и platform setup",
          "The cloud setup, permissions, and platform configuration",
        ),
        description: localized(
          "Ты думаешь про инфраструктуру и access models.",
          "You think in infrastructure and access models.",
        ),
      },
      "q2-process": {
        label: localized(
          "Policy, process или control, которые должны были это предотвратить",
          "The policy, process, or control that should have prevented confusion",
        ),
        description: localized(
          "Ты смотришь на governance-слой behind the issue.",
          "You look for the governance layer behind the issue.",
        ),
      },
    },
  },
  q3: {
    prompt: localized(
      "Мне нравится работать напрямую с кодом или техническими системами.",
      "I enjoy working directly with code or technical systems.",
    ),
    helper: localized(
      "Здесь нет правильного ответа. Это просто влияет на тип рекомендованного пути.",
      "There is no correct answer. This simply shapes the kind of path we recommend.",
    ),
    minLabel: localized("Скорее нет", "Not really"),
    maxLabel: localized("Очень даже", "Very much"),
  },
  q4: {
    prompt: localized(
      "Какой результат работы тебе было бы приятнее всего отдавать команде?",
      "Which deliverable sounds most satisfying to produce?",
    ),
    helper: localized(
      "Выбери тот формат, которым тебе было бы приятно гордиться.",
      "Choose the output you would be proud to hand off.",
    ),
    options: {
      "q4-report": {
        label: localized(
          "Короткая risk memo или policy recommendation",
          "A concise risk memo or policy recommendation",
        ),
        description: localized(
          "Тебе нравится делать сложные решения более ясными для других.",
          "You like making decisions clearer for others.",
        ),
      },
      "q4-guidance": {
        label: localized(
          "Понятный fix plan для разработчиков или secure design recommendation",
          "A developer-friendly fix plan or secure design recommendation",
        ),
        description: localized(
          "Тебе нравится делать technical work безопаснее и удобнее.",
          "You like making technical work safer and easier.",
        ),
      },
      "q4-timeline": {
        label: localized(
          "Incident timeline, который объясняет, что произошло",
          "An incident timeline that explains what happened",
        ),
        description: localized(
          "Тебе нравятся evidence, context и последовательность событий.",
          "You like evidence, context, and sequencing.",
        ),
      },
      "q4-detection": {
        label: localized(
          "Улучшение detection, которое уменьшит шум в будущем",
          "A detection improvement that reduces future noise",
        ),
        description: localized(
          "Тебе нравится повышать качество defensive signals.",
          "You like defensive signal quality.",
        ),
      },
      "q4-campaign": {
        label: localized(
          "Небольшая awareness-кампания, которую люди реально запомнят",
          "A short training or awareness campaign people actually remember",
        ),
        description: localized(
          "Тебе нравится менять поведение и помогать людям понять, что делать.",
          "You like behavior change and communication.",
        ),
      },
    },
  },
  q5: {
    prompt: localized(
      "Мне нравятся структурированные правила, frameworks и понятные критерии решений.",
      "I like structured rules, frameworks, and clear decision criteria.",
    ),
    helper: localized(
      "Подумай, для тебя структура — это опора или ограничение.",
      "Think about whether structure feels helpful or restrictive to you.",
    ),
    minLabel: localized("Люблю гибкость", "I prefer flexibility"),
    maxLabel: localized("Люблю понятные frameworks", "I like clear frameworks"),
  },
  q6: {
    prompt: localized(
      "Какую среду тебе было бы интереснее всего исследовать?",
      "Which environment sounds most interesting to explore?",
    ),
    helper: localized(
      "Это помогает понять, к каким доменам тебя тянет естественно.",
      "This points us toward the domains you may naturally gravitate to.",
    ),
    options: {
      "q6-product": {
        label: localized(
          "Продуктовую команду, которая выпускает web/mobile features",
          "A product team shipping web or mobile features",
        ),
        description: localized(
          "Тебе близка product security рядом с engineering.",
          "You like secure product work close to engineering.",
        ),
      },
      "q6-cloud": {
        label: localized(
          "Cloud-платформу с identities, services и infrastructure layers",
          "A cloud platform with identities, services, and infrastructure layers",
        ),
        description: localized(
          "Тебя привлекают architecture и platform trust.",
          "You like architecture and platform trust.",
        ),
      },
      "q6-soc": {
        label: localized(
          "Мониторинговую среду с alert’ами, контекстом и быстрыми решениями",
          "A monitoring room with alerts, context, and decisions moving quickly",
        ),
        description: localized(
          "Тебе интересны defensive operations и pattern recognition.",
          "You like defensive operations and pattern recognition.",
        ),
      },
      "q6-board": {
        label: localized(
          "Кросс-функциональную комнату с risk, audit и data handling decisions",
          "A cross-functional room aligning on risk, audits, or data handling",
        ),
        description: localized(
          "Тебе нравится governance и trust-building work.",
          "You like governance and trust-building work.",
        ),
      },
      "q6-behavior": {
        label: localized(
          "People-focused программу, улучшающую привычки и коммуникацию",
          "A people-focused program improving habits and communication",
        ),
        description: localized(
          "Тебе близка human-centered security работа.",
          "You like human-centered security work.",
        ),
      },
    },
  },
  q7: {
    prompt: localized(
      "Fast-paced monitoring и triage мне подходят.",
      "Fast-paced monitoring and triage work sounds appealing to me.",
    ),
    helper: localized(
      "Кому-то нравятся очереди сигналов. Кому-то комфортнее медленная и глубокая работа.",
      "Some people love signal-rich queues. Others would rather work more slowly and deeply.",
    ),
    minLabel: localized("Не мое", "Not my style"),
    maxLabel: localized("Да, очень", "Very appealing"),
  },
  q8: {
    prompt: localized(
      "Какое утверждение больше всего похоже на тебя?",
      "Which statement sounds most like you?",
    ),
    helper: localized(
      "Выбери то, что звучит естественно именно для тебя.",
      "Choose the one that feels natural on your best day.",
    ),
    options: {
      "q8-prevention": {
        label: localized(
          "Мне нравится проектировать так, чтобы проблемы возникали реже",
          "I like designing things so problems are less likely in the first place",
        ),
        description: localized(
          "Такое prevention-мышление часто ведет к builder tracks.",
          "Prevention-oriented thinking often aligns with builder tracks.",
        ),
      },
      "q8-investigation": {
        label: localized(
          "Мне нравится восстанавливать картину событий после инцидента",
          "I like reconstructing what happened after something goes wrong",
        ),
        description: localized(
          "Такое мышление часто ведет к response tracks.",
          "Investigation-oriented thinking often aligns with response tracks.",
        ),
      },
      "q8-structure": {
        label: localized(
          "Мне нравится делать ожидания и решения понятными для команд",
          "I like making expectations and decisions clear for teams",
        ),
        description: localized(
          "Governance-мышление помогает создавать консистентность и доверие.",
          "Governance-oriented thinking shapes consistency and trust.",
        ),
      },
      "q8-people": {
        label: localized(
          "Мне нравится помогать людям принимать более правильные решения под давлением",
          "I like helping people make better choices under pressure",
        ),
        description: localized(
          "Human-centered мышление важно для многих security programs.",
          "Human-centered thinking matters across security programs.",
        ),
      },
    },
  },
  q9: {
    prompt: localized(
      "Мне интересны cloud-платформы, identity-модели и инфраструктура.",
      "I’m curious about cloud platforms, identities, and infrastructure.",
    ),
    helper: localized(
      "Так мы понимаем, стоит ли выше ранжировать platform-oriented paths.",
      "This helps us see whether platform-oriented paths should rank higher.",
    ),
    minLabel: localized("Не особенно", "Not especially"),
    maxLabel: localized("Да, определенно", "Definitely"),
  },
  q10: {
    prompt: localized(
      "Какой учебный мини-проект ты бы хотел попробовать первым?",
      "What kind of learning project would you most want to try first?",
    ),
    helper: localized(
      "Представь, что у тебя есть выходные и безопасный starter-project.",
      "Imagine you have a weekend and a safe starter project.",
    ),
    options: {
      "q10-app": {
        label: localized(
          "Разобрать простую app feature и предложить более безопасный дизайн",
          "Review a simple app feature and suggest safer design choices",
        ),
        description: localized(
          "Тебе нравятся product security и coding-adjacent learning.",
          "You like product security and coding-adjacent learning.",
        ),
      },
      "q10-blue": {
        label: localized(
          "Разобрать набор alert’ов и решить, что нужно эскалировать",
          "Analyze a set of alerts and decide what deserves escalation",
        ),
        description: localized(
          "Тебе интересны сигналы и defensive operations.",
          "You like signal interpretation and defensive work.",
        ),
      },
      "q10-risk": {
        label: localized(
          "Написать короткую risk assessment для нового business workflow",
          "Write a short risk assessment for a new business workflow",
        ),
        description: localized(
          "Тебе близки структурное reasoning и коммуникация.",
          "You like structured reasoning and communication.",
        ),
      },
      "q10-awareness": {
        label: localized(
          "Сделать понятный security onboarding guide для новых сотрудников",
          "Create a clear security onboarding guide for new hires",
        ),
        description: localized(
          "Тебе нравятся human-centered enablement задачи.",
          "You like human-centered enablement work.",
        ),
      },
      "q10-lab": {
        label: localized(
          "Подготовить authorized test plan для безопасного lab-сценария",
          "Document an authorized test plan for a safe lab scenario",
        ),
        description: localized(
          "Тебя привлекают structured offensive simulations.",
          "You like structured offensive simulation.",
        ),
      },
    },
  },
  q11: {
    prompt: localized(
      "Мне нравится сначала исследовать паттерны, а потом делать вывод.",
      "I enjoy researching patterns before I make a conclusion.",
    ),
    helper: localized(
      "Подумай, насколько тебя заряжает медленный и аккуратный синтез информации.",
      "Think about whether slow, careful synthesis feels energizing to you.",
    ),
    minLabel: localized("Сначала действие", "I prefer action first"),
    maxLabel: localized("Люблю глубокий анализ", "I enjoy deep pattern analysis"),
  },
  q12: {
    prompt: localized(
      "Какая роль в команде кажется тебе самой естественной?",
      "Which kind of teammate role sounds most natural?",
    ),
    helper: localized(
      "Представь, как именно ты бы усиливал кросс-функциональную команду.",
      "Picture how you would contribute in a cross-functional team.",
    ),
    options: {
      "q12-builder": {
        label: localized(
          "Человек, который улучшает систему и делает безопасную работу масштабируемой",
          "The person who improves the system so everyone can work more safely",
        ),
        description: localized(
          "У тебя естественная склонность к durable technical improvements.",
          "You naturally think in durable technical improvements.",
        ),
      },
      "q12-defender": {
        label: localized(
          "Человек, который замечает сигналы рано и помогает response",
          "The person who notices signals early and helps coordinate response",
        ),
        description: localized(
          "У тебя strong defensive operations instincts.",
          "You have defensive operations instincts.",
        ),
      },
      "q12-analyst": {
        label: localized(
          "Человек, который превращает сложные паттерны в понятные выводы",
          "The person who makes complex patterns easier to understand",
        ),
        description: localized(
          "Ты приносишь research и synthesis strength.",
          "You bring research and synthesis strength.",
        ),
      },
      "q12-strategist": {
        label: localized(
          "Человек, который держит risk, policy и ожидания согласованными",
          "The person who keeps risk, policy, and expectations aligned",
        ),
        description: localized(
          "Ты приносишь governance clarity.",
          "You bring structure and governance clarity.",
        ),
      },
      "q12-guide": {
        label: localized(
          "Человек, который помогает другим понять, что делать и почему",
          "The person who helps others understand what to do and why",
        ),
        description: localized(
          "Ты приносишь communication и behavior strength.",
          "You bring behavior and communication strength.",
        ),
      },
    },
  },
  q13: {
    prompt: localized(
      "Мне интересны privacy, data protection и ответственное использование данных.",
      "I’m interested in privacy, data protection, and responsible data use.",
    ),
    helper: localized(
      "Это показывает, насколько тебе важна trust и data lifecycle сторона security.",
      "This measures how much the trust and lifecycle side of security matters to you.",
    ),
    minLabel: localized("Не главный интерес", "Not a major interest"),
    maxLabel: localized("Сильный интерес", "A strong interest"),
  },
  q14: {
    prompt: localized(
      "Какой тип задачи ощущается для тебя самым мотивирующим?",
      "Which kind of challenge feels most motivating?",
    ),
    helper: localized(
      "Выбери проблему, за которую ты бы взялся первым сам.",
      "Pick the problem you would choose first if nobody assigned it to you.",
    ),
    options: {
      "q14-auth": {
        label: localized(
          "Замечать слабые trust-assumptions в login или API flow",
          "Spotting weak trust assumptions in a login or API flow",
        ),
        description: localized(
          "Тебе нравится product и design-level security thinking.",
          "You like product and design-level security thinking.",
        ),
      },
      "q14-cloud": {
        label: localized(
          "Разбирать запутанную access model в cloud-среде",
          "Untangling a confusing access model in a cloud environment",
        ),
        description: localized(
          "Тебе близки platform trust и architecture.",
          "You like platform trust and architecture.",
        ),
      },
      "q14-incident": {
        label: localized(
          "Восстанавливать инцидент по неполным evidence",
          "Reconstructing an incident from partial evidence",
        ),
        description: localized(
          "Тебе нравится аккуратное расследование.",
          "You like careful investigation.",
        ),
      },
      "q14-patterns": {
        label: localized(
          "Осмыслять повторяющиеся threat patterns по отчетам и алертам",
          "Making sense of repeated threat patterns across reports or alerts",
        ),
        description: localized(
          "Тебе нравятся research и pattern synthesis.",
          "You enjoy research and pattern synthesis.",
        ),
      },
      "q14-policy": {
        label: localized(
          "Делать сложные требования простыми для исполнения командами",
          "Making a complicated requirement easy for teams to follow",
        ),
        description: localized(
          "Тебе близки operational clarity и governance.",
          "You like operational clarity and governance.",
        ),
      },
    },
  },
  q15: {
    prompt: localized(
      "Мне нравится помогать людям менять привычки и принимать более правильные решения.",
      "I like helping people change habits and make better decisions.",
    ),
    helper: localized(
      "Подумай, насколько meaningful для тебя behavior-change работа.",
      "Think about whether behavior change work feels meaningful to you.",
    ),
    minLabel: localized("Не особенно", "Not especially"),
    maxLabel: localized("Очень", "Very much"),
  },
  q16: {
    prompt: localized(
      "Какая формулировка больше всего похожа на твою будущую роль?",
      "Which sentence sounds most like the future role you want?",
    ),
    helper: localized(
      "Это влияет на тон roadmap и примеры, которые CyberPath покажет дальше.",
      "We use this to shape the roadmap style and examples we show you later.",
    ),
    options: {
      "q16-ship": {
        label: localized(
          "Я хочу помогать командам выпускать продукты, безопасные по умолчанию",
          "I want to help teams ship products that are secure by default",
        ),
        description: localized(
          "Ты тянешься к product-facing security work.",
          "You want product-facing security work.",
        ),
      },
      "q16-scale": {
        label: localized(
          "Я хочу строить системы и автоматизации, которые делают security устойчивой",
          "I want to create systems and automations that make security sustainable",
        ),
        description: localized(
          "Тебя привлекает builder-heavy security engineering.",
          "You want builder-heavy security engineering work.",
        ),
      },
      "q16-watch": {
        label: localized(
          "Я хочу раньше замечать suspicious activity и помогать командам response",
          "I want to see suspicious activity early and help teams respond well",
        ),
        description: localized(
          "Тебя интересуют visibility и response-oriented roles.",
          "You want visibility and response-oriented work.",
        ),
      },
      "q16-advise": {
        label: localized(
          "Я хочу направлять решения по risk, trust и data handling между командами",
          "I want to guide risk, trust, and data decisions across teams",
        ),
        description: localized(
          "Тебя привлекают governance и privacy-oriented roles.",
          "You want governance or privacy-oriented work.",
        ),
      },
      "q16-simulate": {
        label: localized(
          "Я хочу безопасно тестировать assumptions и показывать, где защита слаба",
          "I want to safely test assumptions and show where defenses need improvement",
        ),
        description: localized(
          "Тебя интересуют offensive simulations, grounded in learning and reporting.",
          "You want offensive simulation grounded in learning and reporting.",
        ),
      },
    },
  },
  q17: {
    prompt: localized(
      "Мне ближе prevention и architecture work, чем incident-driven работа.",
      "I prefer prevention and architecture work over incident-driven work.",
    ),
    helper: localized(
      "Ни один вариант не лучше. Это просто сдвигает приоритет в рекомендованном пути.",
      "Neither side is better. This just shifts the kind of path we prioritize.",
    ),
    minLabel: localized("Мне ближе incident-driven работа", "I prefer incident-driven work"),
    maxLabel: localized("Мне ближе prevention и architecture", "I prefer prevention and architecture"),
  },
  q18: {
    prompt: localized(
      "Какой feedback loop мотивирует тебя сильнее всего?",
      "What kind of feedback loop motivates you most?",
    ),
    helper: localized(
      "Выбери сигнал, по которому ты бы ощущал, что работа действительно приносит результат.",
      "Pick the signal that would make the work feel rewarding.",
    ),
    options: {
      "q18-engineers": {
        label: localized(
          "Инженеры принимают твои рекомендации, и следующие фичи выходят сильнее",
          "Engineers adopt your guidance and future features come out stronger",
        ),
        description: localized(
          "Тебе нравится product influence и technical enablement.",
          "You like product influence and technical enablement.",
        ),
      },
      "q18-alerts": {
        label: localized(
          "Алерты становятся чище, а команда реагирует увереннее",
          "Alerts become clearer and the team responds with more confidence",
        ),
        description: localized(
          "Тебе нравится измеримое defensive improvement.",
          "You like measurable defensive improvement.",
        ),
      },
      "q18-leaders": {
        label: localized(
          "Лидеры лучше понимают риск и быстрее принимают решения",
          "Leaders understand the risk and make better decisions faster",
        ),
        description: localized(
          "Тебе нравится strategic communication.",
          "You like strategic communication.",
        ),
      },
      "q18-people": {
        label: localized(
          "Люди начинают следовать guidance, потому что оно наконец стало понятным",
          "People follow guidance because it finally feels clear and useful",
        ),
        description: localized(
          "Тебе нравятся behavior-focused outcomes.",
          "You like behavior-focused outcomes.",
        ),
      },
      "q18-report": {
        label: localized(
          "Хороший отчет напрямую приводит к более сильным controls или safer design",
          "A clear report leads directly to stronger controls or safer design",
        ),
        description: localized(
          "Тебе нравится переводить findings в action.",
          "You like translating findings into action.",
        ),
      },
    },
  },
  q19: {
    prompt: localized(
      "Мне нравится писать или объяснять выводы разным аудиториям.",
      "I like writing or presenting insights to different audiences.",
    ),
    helper: localized(
      "Это влияет на то, насколько мы поднимем роли с сильной stakeholder-коммуникацией.",
      "This affects whether we lean toward roles with more stakeholder communication.",
    ),
    minLabel: localized("Не особенно", "Not really"),
    maxLabel: localized("Да, очень", "Yes, a lot"),
  },
  q20: {
    prompt: localized(
      "Какой фразой ты бы хотел описать свой будущий опыт в кибербезопасности?",
      "Which phrase best describes what you want cybersecurity to feel like for you?",
    ),
    helper: localized(
      "Это помогает подобрать тон и направление рекомендованного roadmap.",
      "This helps us choose the tone of your recommended roadmap.",
    ),
    options: {
      "q20-build": {
        label: localized(
          "Техническое ремесло, где я постепенно делаю системы безопаснее",
          "A technical craft where I make systems safer over time",
        ),
        description: localized(
          "Тебе нужен builder path.",
          "You want a builder path.",
        ),
      },
      "q20-defend": {
        label: localized(
          "Миссия, где я помогаю замечать, защищать и отвечать",
          "A mission where I help detect, protect, and respond",
        ),
        description: localized(
          "Тебе нужен defender path.",
          "You want a defender path.",
        ),
      },
      "q20-research": {
        label: localized(
          "Область, где я исследую паттерны и объясняю, что важно",
          "A field where I investigate patterns and explain what matters",
        ),
        description: localized(
          "Тебе нужен analytical path.",
          "You want an analytical path.",
        ),
      },
      "q20-guidance": {
        label: localized(
          "Trust-focused роль, где я помогаю командам принимать ответственные решения",
          "A trust-focused role where I help teams make responsible decisions",
        ),
        description: localized(
          "Тебе нужен policy/privacy path.",
          "You want a policy or privacy path.",
        ),
      },
      "q20-human": {
        label: localized(
          "Human-centered направление, где security становится понятнее и удобнее",
          "A people-centered path where security becomes clearer and more usable",
        ),
        description: localized(
          "Тебе нужен human-centered security path.",
          "You want a human-centered security path.",
        ),
      },
    },
  },
} as const;

function getTopSignalKeys(signalScores: SignalScoreMap) {
  return (Object.keys(signalCopy) as SignalSlug[])
    .sort((left, right) => signalScores[right] - signalScores[left])
    .slice(0, 3);
}

export function getLocalizedResultSignals(signalScores: SignalScoreMap, locale: Locale) {
  const topSignals = getTopSignalKeys(signalScores);

  return {
    reasons: topSignals.map((signal) => {
      const label = pickLocalized(locale, signalCopy[signal].label);
      const reason = pickLocalized(locale, signalCopy[signal].reason);
      return `${label}: ${reason}.`;
    }),
    strengths: topSignals.map((signal) =>
      pickLocalized(locale, signalCopy[signal].strength),
    ),
    labels: Object.fromEntries(
      (Object.keys(signalCopy) as SignalSlug[]).map((signal) => [
        signal,
        pickLocalized(locale, signalCopy[signal].label),
      ]),
    ) as Record<SignalSlug, string>,
  };
}

export function getLocalizedQuizQuestion(question: QuizQuestion, locale: Locale) {
  const copy = localizedQuizCopy[question.id as keyof typeof localizedQuizCopy];

  if (!copy) {
    return question;
  }

  if (question.type === "single") {
    const optionCopy = ("options" in copy
      ? copy.options
      : undefined) as
      | Record<
          string,
          {
            label: LocalizedValue<string>;
            description: LocalizedValue<string>;
          }
        >
      | undefined;

    return {
      ...question,
      prompt: pickLocalized(locale, copy.prompt),
      helper: pickLocalized(locale, copy.helper),
      options: question.options.map((option) => ({
        ...option,
        label: optionCopy?.[option.id]
          ? pickLocalized(
              locale,
              optionCopy[option.id].label,
            )
          : option.label,
        description: optionCopy?.[option.id]
          ? pickLocalized(
              locale,
              optionCopy[option.id].description,
            )
          : option.description,
      })),
    } satisfies SingleChoiceQuestion;
  }

  return {
    ...question,
    prompt: pickLocalized(locale, copy.prompt),
    helper: pickLocalized(locale, copy.helper),
    minLabel:
      "minLabel" in copy && copy.minLabel
        ? pickLocalized(locale, copy.minLabel)
        : question.minLabel,
    maxLabel:
      "maxLabel" in copy && copy.maxLabel
        ? pickLocalized(locale, copy.maxLabel)
        : question.maxLabel,
  } satisfies ScaleQuestion;
}

export function getLocalizedQuizQuestions(locale: Locale) {
  return quizQuestions.map((question) => getLocalizedQuizQuestion(question, locale));
}
