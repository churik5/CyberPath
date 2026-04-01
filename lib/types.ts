export type TrackSlug =
  | "application-security"
  | "cloud-security"
  | "security-engineering"
  | "soc-blue-team"
  | "dfir"
  | "threat-intelligence"
  | "grc"
  | "security-awareness"
  | "penetration-testing"
  | "privacy-data-protection";

export type SignalSlug =
  | "builder"
  | "defender"
  | "investigator"
  | "analyst"
  | "strategist"
  | "people";

export type TrackIconName =
  | "code-2"
  | "cloud-cog"
  | "workflow"
  | "shield"
  | "fingerprint"
  | "radar"
  | "scale"
  | "users-round"
  | "crosshair"
  | "lock-keyhole";

export type TrackScoreMap = Record<TrackSlug, number>;
export type SignalScoreMap = Record<SignalSlug, number>;
export type WeightMap = Partial<Record<TrackSlug, number>>;
export type SignalWeightMap = Partial<Record<SignalSlug, number>>;

export interface Lesson {
  title: string;
  duration: string;
}

export interface LearningModule {
  id: string;
  title: string;
  summary: string;
  lessons: Lesson[];
}

export interface Track {
  slug: TrackSlug;
  name: string;
  icon: TrackIconName;
  accent: string;
  category: string;
  difficulty: string;
  shortDescription: string;
  roleSummary: string;
  whoItFits: string;
  actualWork: string[];
  recommendedSkills: string[];
  tools: string[];
  roadmap: string[];
  practiceIdeas: string[];
  starterResources: string[];
  modules: LearningModule[];
  relatedTrackSlugs: TrackSlug[];
  salaryNote: string;
}

export interface QuizOption {
  id: string;
  label: string;
  description: string;
  weights: WeightMap;
  signals: SignalWeightMap;
}

export interface SingleChoiceQuestion {
  id: string;
  type: "single";
  prompt: string;
  helper: string;
  options: QuizOption[];
}

export interface ScaleQuestion {
  id: string;
  type: "scale";
  prompt: string;
  helper: string;
  minLabel: string;
  maxLabel: string;
  lowWeights: WeightMap;
  highWeights: WeightMap;
  lowSignals: SignalWeightMap;
  highSignals: SignalWeightMap;
}

export type QuizQuestion = SingleChoiceQuestion | ScaleQuestion;
export type QuizAnswerValue = string | number;
export type QuizAnswerMap = Record<string, QuizAnswerValue>;

export interface RankedTrack {
  track: Track;
  score: number;
  fitPercent: number;
}

export interface QuizResult {
  generatedAt: string;
  primaryTrack: RankedTrack;
  secondaryTrack: RankedTrack;
  tertiaryTrack: RankedTrack;
  rankedTracks: RankedTrack[];
  trackScores: TrackScoreMap;
  signalScores: SignalScoreMap;
  reasons: string[];
  strengths: string[];
  tasksYouMayEnjoy: string[];
}
