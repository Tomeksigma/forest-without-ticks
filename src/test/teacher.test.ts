import { describe, expect, it } from "vitest";
import { LESSON_A_TIMES, LESSON_B_TIMES, lessonMinutes, STATION_MAX, TOTAL_MAX, PASS_POINTS, isTeamPassed, clampPoints, wardrobeScore } from "@/lib/teacher";

describe("Strefa Nauczyciela", () => {
  it("lekcja A trwa 15 minut", () => expect(lessonMinutes(LESSON_A_TIMES)).toBe(15));
  it("lekcja B trwa 45 minut", () => expect(lessonMinutes(LESSON_B_TIMES)).toBe(45));
  it("punktacja stacji 6+8+8+9+5=36", () => { expect([...STATION_MAX]).toEqual([6, 8, 8, 9, 5]); expect(TOTAL_MAX).toBe(36); });
  it("zaliczenie od 26 pkt", () => { expect(PASS_POINTS).toBe(26); expect(isTeamPassed(26)).toBe(true); expect(isTeamPassed(25)).toBe(false); });
  it("punkty ręczne nie przekraczają maksimum stacji", () => { expect(clampPoints(12, 0)).toBe(6); expect(clampPoints(-3, 3)).toBe(0); });
  it("szafa leśnika: idealny zestaw = 8 pkt", () => expect(wardrobeScore({ spodnie: true, buty: true, dlugi: true, repelent: true, peseta: true })).toBe(8));
});
