export const localeStorageKey = "cyberpath.locale";

export const locales = ["ru", "en"] as const;

export type Locale = (typeof locales)[number];

export type LocalizedValue<T = string> = Record<Locale, T>;

export const defaultLocale: Locale = "ru";

export const localeLabels: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
};

export function localized<T>(ru: T, en: T): LocalizedValue<T> {
  return { ru, en };
}

export function pickLocalized<T>(locale: Locale, value: LocalizedValue<T>) {
  return value[locale];
}

export const uiDictionary = {
  appName: localized("CyberPath", "CyberPath"),
  tagline: localized(
    "Навигатор по карьере в кибербезопасности",
    "Cybersecurity career pathfinder",
  ),
  nav: {
    quiz: localized("Квиз", "Assessment"),
    tracks: localized("Треки", "Tracks"),
    dashboard: localized("Дашборд", "Dashboard"),
    about: localized("О проекте", "About"),
    settings: localized("Настройки", "Settings"),
    auth: localized("Вход", "Sign in"),
  },
  header: {
    takeQuiz: localized("Пройти квиз", "Take the quiz"),
    exploreTracks: localized("Смотреть треки", "Explore tracks"),
    signIn: localized("Войти", "Sign in"),
    signOut: localized("Выйти", "Sign out"),
    dashboard: localized("Открыть дашборд", "Open dashboard"),
    guest: localized("Гость", "Guest"),
  },
  hero: {
    badge: localized(
      "Платформа выбора пути в кибербезопасности",
      "Cybersecurity career pathfinder platform",
    ),
    title: localized(
      "Найди направление в кибербезопасности, которое действительно тебе подходит.",
      "Find the cybersecurity path that actually fits you.",
    ),
    subtitle: localized(
      "CyberPath помогает новичкам понять, куда им идти в кибербезопасности: через умный квиз, персональные совпадения по доменам и понятную стартовую дорожную карту.",
      "CyberPath helps beginners discover where they fit in cybersecurity through a smart assessment, ranked domain matches, and a clear beginner roadmap.",
    ),
    primaryCta: localized("Пройти квиз", "Take the quiz"),
    secondaryCta: localized("Войти", "Sign in"),
    tertiaryCta: localized("Смотреть треки", "Explore tracks"),
    afterAuthPrimary: localized("Открыть дашборд", "Open dashboard"),
  },
  footer: {
    description: localized(
      "CyberPath помогает новичкам понять, где они лучше всего подходят в кибербезопасности, через assessment, matched-треки и персональные roadmaps. Это образовательный продукт, а не хакерский инструмент.",
      "CyberPath helps beginners discover where they fit in cybersecurity through assessment, matched tracks, and personalized roadmaps. It is an educational product, not a hacking tool.",
    ),
    product: localized("Продукт", "Product"),
    company: localized("Компания", "Company"),
    privacy: localized("Политика конфиденциальности", "Privacy policy"),
    terms: localized("Условия использования", "Terms of use"),
    contact: localized("Контакты", "Contact"),
  },
  quiz: {
    badge: localized("Интерактивный квиз", "Interactive assessment"),
    title: localized(
      "Пойми, какая роль в кибербезопасности тебе ближе.",
      "Discover your cybersecurity fit.",
    ),
    subtitle: localized(
      "По одному вопросу за экран. Прогресс сохраняется локально, так что можно вернуться позже.",
      "One question at a time. Progress is saved locally so you can return later.",
    ),
    questionOf: localized("Вопрос", "Question"),
    assessmentPrompt: localized("Вопрос оценки", "Assessment prompt"),
    preparing: localized(
      "Готовим твой CyberPath assessment...",
      "Preparing your CyberPath assessment...",
    ),
    back: localized("Назад", "Back"),
    next: localized("Дальше", "Next"),
    seeResults: localized("Показать результат", "See my results"),
    exploreFirst: localized("Сначала посмотреть треки", "Explore tracks first"),
    liveFit: localized("Предварительный матч", "Live fit preview"),
    liveFitEmpty: localized(
      "Ответь хотя бы на несколько вопросов, и CyberPath начнет показывать самые сильные совпадения прямо здесь.",
      "Once you answer a few questions, CyberPath will start surfacing your strongest track signals here.",
    ),
    currentBestFit: localized("Сейчас лучший матч", "Current best fit"),
    secondaryFit: localized("Второй матч", "Secondary"),
    thirdFit: localized("Третий матч", "Third match"),
    measures: localized("Что измеряет CyberPath", "What CyberPath measures"),
    measureItems: {
      builder: localized("технический builder-инстинкт", "technical builder instinct"),
      defender: localized(
        "предпочтение defensive / monitoring задач",
        "defensive and monitoring preference",
      ),
      investigator: localized(
        "склонность к расследованиям и evidence-based работе",
        "investigation and evidence style",
      ),
      analyst: localized(
        "аналитическое и research-мышление",
        "research and analytical strength",
      ),
      strategist: localized(
        "ориентацию на policy, risk и frameworks",
        "policy and framework orientation",
      ),
      people: localized(
        "human-centered и communication fit",
        "human-centered communication fit",
      ),
    },
  },
  results: {
    badge: localized("Результат assessment", "Assessment result"),
    topMatch: localized("Твой strongest match", "Your strongest match"),
    scoreDistribution: localized("Распределение очков", "Score distribution"),
    whyMatched: localized("Почему именно это совпадение", "Why you matched"),
    whyMatchedTitle: localized(
      "Результат основан на повторяющихся сигналах из твоих ответов.",
      "The result is based on your strongest recurring signals.",
    ),
    whyMatchedDescription: localized(
      "CyberPath не угадывает по одному ответу. Он складывает повторяющиеся паттерны по всему квизу и ранжирует домены, которые тебе ближе всего.",
      "CyberPath doesn’t guess from one answer. It stacks repeated patterns from across the assessment and turns them into a ranked profile.",
    ),
    strengths: localized("Сильные стороны", "Strengths summary"),
    tasks: localized("Что тебе может понравиться", "What you may enjoy"),
    topTracks: localized("Лучшие направления", "Top matches"),
    topTracksTitle: localized(
      "Три направления, которые стоит сравнить дальше.",
      "Three paths worth exploring next.",
    ),
    topTracksDescription: localized(
      "CyberPath всегда показывает основной матч и соседние варианты, потому что многие новички подходят сразу под несколько доменов.",
      "CyberPath always gives you a primary fit plus adjacent directions, because many beginners fit more than one domain.",
    ),
    primary: localized("Основной", "Primary"),
    secondary: localized("Второй", "Secondary"),
    tertiary: localized("Третий", "Tertiary"),
    fit: localized("совпадение", "fit"),
    startPath: localized("Начать рекомендованный путь", "Start recommended path"),
    retake: localized("Пройти заново", "Retake quiz"),
    createAccount: localized(
      "Создать аккаунт и сохранить roadmap",
      "Create account and save roadmap",
    ),
    signIn: localized("Войти в аккаунт", "Sign in"),
    authGateTitle: localized(
      "Квиз пройден. Теперь сохрани результат в аккаунт.",
      "Quiz complete. Now save your result to an account.",
    ),
    authGateDescription: localized(
      "После регистрации CyberPath привяжет результат к профилю, откроет персональный dashboard и сможет отправить приветственное письмо с твоим первым roadmap.",
      "After sign-up, CyberPath can attach the result to your profile, unlock your personalized dashboard, and send a welcome email with your first roadmap.",
    ),
  },
  auth: {
    signInTitle: localized("Вход в CyberPath", "Sign in to CyberPath"),
    signUpTitle: localized("Создай аккаунт CyberPath", "Create your CyberPath account"),
    signInSubtitle: localized(
      "Войди, чтобы открыть dashboard, сохраненные треки и персональный прогресс.",
      "Sign in to access your dashboard, saved tracks, and personalized progress.",
    ),
    signUpSubtitle: localized(
      "Зарегистрируйся после квиза, чтобы сохранить результат, открыть roadmap и продолжить обучение.",
      "Sign up after the quiz to save your result, unlock your roadmap, and continue learning.",
    ),
    name: localized("Имя", "Name"),
    email: localized("Email", "Email"),
    password: localized("Пароль", "Password"),
    submitSignIn: localized("Войти", "Sign in"),
    submitSignUp: localized("Создать аккаунт", "Create account"),
    switchToSignUp: localized("Нужен аккаунт?", "Need an account?"),
    switchToSignIn: localized("Уже есть аккаунт?", "Already have an account?"),
    quizContext: localized("Результат квиза готов к сохранению", "Your quiz result is ready to save"),
    quizContextDescription: localized(
      "После создания аккаунта мы откроем results page и dashboard с твоим лучшим матчем.",
      "After account creation, we’ll open your results page and dashboard with your best match.",
    ),
    successCheckEmail: localized(
      "Аккаунт создан. Проверь почту, если в проекте включено подтверждение email в Supabase.",
      "Account created. Check your inbox if email confirmation is enabled in Supabase.",
    ),
    successSignedIn: localized(
      "Готово. Переходим в твой CyberPath dashboard.",
      "Done. Taking you to your CyberPath dashboard.",
    ),
    integrationMissing: localized(
      "Нужно добавить env-переменные Supabase, чтобы auth заработал локально и на Vercel.",
      "Supabase environment variables are required before auth can work locally and on Vercel.",
    ),
    resendNote: localized(
      "Приветственное письмо через Resend отправляется, когда серверные env настроены.",
      "The Resend welcome email is sent when server environment variables are configured.",
    ),
  },
  dashboard: {
    badge: localized("Дашборд обучения", "Learning dashboard"),
    titlePrefix: localized("Твоя дорожная карта начинается с", "Your roadmap starts with"),
    subtitle: localized(
      "CyberPath превращает результат квиза в практический beginner-path с модулями, mini-practice задачами, сохраненными треками и видимым прогрессом.",
      "CyberPath turns your quiz result into a practical beginner path with modules, mini-practice ideas, saved tracks, and visible progress.",
    ),
    chosenTrack: localized("Выбранный трек", "Chosen track"),
    progress: localized("Прогресс", "Progress"),
    quizzesCompleted: localized("Пройдено квизов", "Quizzes completed"),
    pathOverview: localized("Обзор пути", "Path overview"),
    roadmapCompletion: localized("Прогресс по roadmap", "Roadmap completion"),
    modules: localized("Рекомендуемые модули", "Recommended modules"),
    modulesTitle: localized(
      "Beginner roadmap под выбранный трек.",
      "A beginner roadmap tailored to your chosen track.",
    ),
    modulesDescription: localized(
      "Первые модули дают базовые концепции, словарь и реальные рабочие паттерны, чтобы уверенность появилась раньше специализации.",
      "The first modules focus on core concepts, vocabulary, and realistic work habits so confidence comes before specialization.",
    ),
    milestones: localized("Майлстоуны", "Milestones"),
    savedTracks: localized("Сохраненные треки", "Saved tracks"),
    nextAction: localized("Следующее действие", "Next action"),
    nextActionDescription: localized(
      "Начни с первого активного модуля, а потом сравни основной матч с соседним направлением, чтобы выбор был осознанным, а не случайным.",
      "Start with the first active module, then compare your primary result against one adjacent path so your choice feels informed, not accidental.",
    ),
    reviewResults: localized("Пересмотреть результаты", "Review results"),
    compareTracks: localized("Сравнить треки", "Compare tracks"),
    authGateTitle: localized(
      "Войди, чтобы открыть персональный dashboard.",
      "Sign in to unlock your personalized dashboard.",
    ),
    authGateDescription: localized(
      "Dashboard привязан к аккаунту: здесь сохраняются результат квиза, прогресс по модулям, bookmarks и будущие достижения.",
      "The dashboard is account-based: this is where your quiz result, module progress, bookmarks, and future achievements are stored.",
    ),
  },
  settings: {
    title: localized("Настройки", "Settings"),
    subtitle: localized(
      "Управляй языком интерфейса CyberPath. Выбор сохраняется в браузере и применяется к основным пользовательским сценариям.",
      "Manage the CyberPath interface language. Your choice is saved in the browser and applied across the core user flows.",
    ),
    languageTitle: localized("Язык интерфейса", "Interface language"),
    languageDescription: localized(
      "Переключение применяется ко всем основным пользовательским потокам CyberPath и сохраняется в браузере.",
      "The language setting applies to the core CyberPath flows and is stored in the browser.",
    ),
    ready: localized("Готово", "Ready"),
    missing: localized("Не настроено", "Missing"),
  },
  integration: {
    supabase: localized("Supabase auth", "Supabase auth"),
    resend: localized("Resend email", "Resend email"),
    vercel: localized("Vercel deployment", "Vercel deployment"),
  },
  common: {
    loading: localized("Загрузка...", "Loading..."),
    save: localized("Сохранить", "Save"),
    openSettings: localized("Настройки", "Settings"),
  },
} as const;
