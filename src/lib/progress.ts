import { useSyncExternalStore } from "react";
import { modules } from "@/lib/content";

export const PASS_THRESHOLD = 0.7;

/** Final quiz is passed only when every module's part reaches the threshold. */
export const isFinalPassed = (scores: Record<number, number>) =>
  modules.every((m) => (scores[m.n] ?? 0) >= PASS_THRESHOLD * 100);

/** Module n (1-based) is unlocked when the key question of every previous module is answered. */
export const isUnlocked = (n: number, passed: Record<number, boolean>) => {
  for (let i = 1; i < n; i++) if (!passed[i]) return false;
  return true;
};

/** passed = key question answered; scores = % per module from the final quiz. */
export type Progress = { passed: Record<number, boolean>; scores: Record<number, number>; finalPassed: boolean };
const empty: Progress = { passed: {}, scores: {}, finalPassed: false };

// In-memory only: nothing is written to storage, so progress disappears on page refresh.
let state: Progress = empty;
const listeners = new Set<() => void>();
const subscribe = (l: () => void) => { listeners.add(l); return () => listeners.delete(l); };
const emit = () => listeners.forEach((l) => l());

export function saveKey(mod: number) {
  state = { ...state, passed: { ...state.passed, [mod]: true } };
  emit();
}
/** Saves the final quiz: per-module percentages and whether the whole quiz reached 70%. */
export function saveFinal(scores: Record<number, number>, ok: boolean) {
  if (state.finalPassed && !ok) return; // nie nadpisuj zaliczonego wyniku słabszym
  state = { ...state, scores, finalPassed: state.finalPassed || ok };
  emit();
}
export const getProgress = () => state;
export const resetProgress = () => { state = empty; emit(); };

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, () => state, () => empty);
  return { progress };
}
