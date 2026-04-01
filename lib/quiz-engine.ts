import {
  QuizAnswerMap,
  QuizQuestion,
  QuizResult,
  RankedTrack,
  ScaleQuestion,
  SignalScoreMap,
  SignalSlug,
  SingleChoiceQuestion,
  TrackScoreMap,
  TrackSlug,
} from "@/lib/types";
import {
  quizQuestions,
  sampleAnswerMap,
  signalLabels,
  signalNarratives,
  strengthLabels,
  trackMap,
  trackSlugs,
  tracks,
} from "@/lib/data/cyberpath";

export const STORAGE_KEYS = {
  quizProgress: "cyberpath.quiz.progress",
  quizResult: "cyberpath.quiz.result",
  savedTracks: "cyberpath.saved.tracks",
} as const;

const signalSlugs = Object.keys(signalLabels) as SignalSlug[];

function getEmptyTrackScores(): TrackScoreMap {
  return trackSlugs.reduce(
    (accumulator, slug) => {
      accumulator[slug] = 0;
      return accumulator;
    },
    {} as TrackScoreMap,
  );
}

function getEmptySignalScores(): SignalScoreMap {
  return signalSlugs.reduce(
    (accumulator, slug) => {
      accumulator[slug] = 0;
      return accumulator;
    },
    {} as SignalScoreMap,
  );
}

function applyTrackWeights(scores: TrackScoreMap, weights: Partial<Record<TrackSlug, number>>, multiplier = 1) {
  for (const [slug, value] of Object.entries(weights)) {
    if (!value) continue;
    scores[slug as TrackSlug] += value * multiplier;
  }
}

function applySignalWeights(scores: SignalScoreMap, weights: Partial<Record<SignalSlug, number>>, multiplier = 1) {
  for (const [slug, value] of Object.entries(weights)) {
    if (!value) continue;
    scores[slug as SignalSlug] += value * multiplier;
  }
}

function scoreSingleQuestion(
  question: SingleChoiceQuestion,
  answer: string,
  trackScores: TrackScoreMap,
  signalScores: SignalScoreMap,
) {
  const selectedOption = question.options.find((option) => option.id === answer);

  if (!selectedOption) {
    return;
  }

  applyTrackWeights(trackScores, selectedOption.weights);
  applySignalWeights(signalScores, selectedOption.signals);
}

function scoreScaleQuestion(
  question: ScaleQuestion,
  value: number,
  trackScores: TrackScoreMap,
  signalScores: SignalScoreMap,
) {
  const safeValue = Math.min(5, Math.max(1, value));
  const lowMultiplier = 6 - safeValue;
  const highMultiplier = safeValue;

  applyTrackWeights(trackScores, question.lowWeights, lowMultiplier);
  applyTrackWeights(trackScores, question.highWeights, highMultiplier);
  applySignalWeights(signalScores, question.lowSignals, lowMultiplier);
  applySignalWeights(signalScores, question.highSignals, highMultiplier);
}

function rankTracks(trackScores: TrackScoreMap): RankedTrack[] {
  const highestScore = Math.max(...Object.values(trackScores), 1);

  return tracks
    .map((track) => ({
      track,
      score: trackScores[track.slug],
      fitPercent: Math.round((trackScores[track.slug] / highestScore) * 100),
    }))
    .sort((left, right) => right.score - left.score);
}

function getTopSignals(signalScores: SignalScoreMap) {
  return [...signalSlugs]
    .sort((left, right) => signalScores[right] - signalScores[left])
    .slice(0, 3);
}

function buildReasons(signalScores: SignalScoreMap) {
  return getTopSignals(signalScores).map((signal) => {
    const label = signalLabels[signal];
    return `${label}: ${signalNarratives[signal]}.`;
  });
}

function buildStrengths(signalScores: SignalScoreMap) {
  return getTopSignals(signalScores).map((signal) => strengthLabels[signal]);
}

function buildTasks(rankedTracks: RankedTrack[]) {
  return rankedTracks
    .slice(0, 2)
    .flatMap((entry) => entry.track.actualWork.slice(0, 2))
    .slice(0, 4);
}

export function computeQuizResult(
  answers: QuizAnswerMap,
  questions: QuizQuestion[] = quizQuestions,
): QuizResult {
  const trackScores = getEmptyTrackScores();
  const signalScores = getEmptySignalScores();

  for (const question of questions) {
    const answer = answers[question.id];

    if (answer === undefined) {
      continue;
    }

    if (question.type === "single" && typeof answer === "string") {
      scoreSingleQuestion(question, answer, trackScores, signalScores);
    }

    if (question.type === "scale" && typeof answer === "number") {
      scoreScaleQuestion(question, answer, trackScores, signalScores);
    }
  }

  const rankedTracks = rankTracks(trackScores);

  return {
    generatedAt: new Date().toISOString(),
    primaryTrack: rankedTracks[0],
    secondaryTrack: rankedTracks[1],
    tertiaryTrack: rankedTracks[2],
    rankedTracks,
    trackScores,
    signalScores,
    reasons: buildReasons(signalScores),
    strengths: buildStrengths(signalScores),
    tasksYouMayEnjoy: buildTasks(rankedTracks),
  };
}

export function getFallbackResult() {
  return computeQuizResult(sampleAnswerMap);
}

export function getTrackBySlug(slug: string) {
  return trackMap[slug as TrackSlug] ?? null;
}
