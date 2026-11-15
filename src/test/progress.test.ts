import { describe, expect, it, vi } from "vitest";
import { isFinalPassed, isUnlocked, getProgress, resetProgress, saveFinal, saveKey, PASS_THRESHOLD } from "@/lib/progress";
import { countStem, keyQuestion } from "@/lib/key-question";
import { modules } from "@/lib/content";

describe("quiz rules", () => {
  it("passes when every module part is at least 70%", () => expect(isFinalPassed({ 1: 70, 2: 100, 3: 85 })).toBe(true));
  it("fails when one module part is below 70% even if the total is high", () => expect(isFinalPassed({ 1: 100, 2: 100, 3: 60 })).toBe(false));
  it("fails when a module part is missing", () => expect(isFinalPassed({ 1: 100, 2: 100 })).toBe(false));
  it("threshold is 70%", () => expect(PASS_THRESHOLD).toBe(0.7));
  it("module 2 locked until key question of module 1 answered", () => {
    expect(isUnlocked(2, {})).toBe(false);
    expect(isUnlocked(2, { 1: true })).toBe(true);
    expect(isUnlocked(3, { 1: true })).toBe(false);
  });
  it("counts word forms in text", () => expect(countStem("Borelioza, boreliozy i kleszcz", "borelioz")).toBe(2));
  it("each module's key question includes the correct count among options", () => {
    for (const m of modules) { const k = keyQuestion(m); expect(k.options).toContain(k.answer); expect(k.answer).toBeGreaterThan(0); }
  });
  it("final quiz stores one score per module and requires each part above 70%", () => {
    resetProgress();
    saveFinal({ 1: 80, 2: 100, 3: 70 }, true);
    expect(getProgress().scores).toEqual({ 1: 80, 2: 100, 3: 70 });
    expect(getProgress().finalPassed).toBe(true);
    resetProgress();
    saveFinal({ 1: 90, 2: 90, 3: 60 }, false);
    expect(getProgress().finalPassed).toBe(false);
  });
});

describe("no persistent storage", () => {
  it("keeps results only in memory, never in browser storage", () => {
    resetProgress();
    const spy = vi.spyOn(Storage.prototype, "setItem");
    saveKey(1);
    expect(getProgress().passed[1]).toBe(true);
    expect(spy).not.toHaveBeenCalled();
  });
});
