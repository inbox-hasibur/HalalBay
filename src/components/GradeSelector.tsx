'use client'

import { useState } from "react";
import { Grade } from "@/lib/mockData";

function formatPrice(n: number) {
  return "৳" + n.toLocaleString("en-BD");
}

const GRADE_STYLES: Record<string, {
  color: string; bg: string; activeBg: string; border: string; activeBorder: string; label: string; ring: string;
}> = {
  A: {
    color: "#c9a84c", bg: "rgba(201,168,76,0.06)", activeBg: "rgba(201,168,76,0.14)",
    border: "rgba(201,168,76,0.2)", activeBorder: "#c9a84c", label: "Grade A", ring: "rgba(201,168,76,0.3)"
  },
  B: {
    color: "#9ea3ae", bg: "rgba(158,163,174,0.06)", activeBg: "rgba(158,163,174,0.14)",
    border: "rgba(158,163,174,0.2)", activeBorder: "#9ea3ae", label: "Grade B", ring: "rgba(158,163,174,0.3)"
  },
  C: {
    color: "#a0522d", bg: "rgba(160,82,45,0.06)", activeBg: "rgba(160,82,45,0.14)",
    border: "rgba(160,82,45,0.2)", activeBorder: "#a0522d", label: "Grade C", ring: "rgba(160,82,45,0.3)"
  },
};

interface GradeSelectorProps {
  grades: Grade[];
  onGradeChange?: (grade: Grade) => void;
}

export default function GradeSelector({ grades, onGradeChange }: GradeSelectorProps) {
  const defaultGrade = grades.find(g => g.inStock) || grades[0];
  const [selected, setSelected] = useState<Grade>(defaultGrade);

  const handleSelect = (grade: Grade) => {
    if (!grade.inStock) return;
    setSelected(grade);
    onGradeChange?.(grade);
  };

  const style = GRADE_STYLES[selected.label] || GRADE_STYLES["C"];

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-base" style={{ color: 'var(--color-text-primary)' }}>
            Select Grade
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            HalalBay grades are 100% transparent — no hidden info.
          </p>
        </div>
        <a href="#grade-explainer" className="text-xs font-medium underline underline-offset-2"
          style={{ color: 'var(--color-brand-green-light)' }}>
          What&apos;s this?
        </a>
      </div>

      {/* Grade Cards */}
      <div className="flex flex-col gap-3">
        {grades.map((grade) => {
          const gs = GRADE_STYLES[grade.label] || GRADE_STYLES["C"];
          const isSelected = selected.label === grade.label;
          const isUnavailable = !grade.inStock;

          return (
            <button
              key={grade.label}
              onClick={() => handleSelect(grade)}
              disabled={isUnavailable}
              className="w-full text-left rounded-2xl p-4 transition-all duration-200"
              style={{
                background: isSelected ? gs.activeBg : gs.bg,
                border: `2px solid ${isSelected ? gs.activeBorder : gs.border}`,
                boxShadow: isSelected ? `0 0 0 4px ${gs.ring}` : 'none',
                opacity: isUnavailable ? 0.45 : 1,
                cursor: isUnavailable ? 'not-allowed' : 'pointer',
              }}>

              <div className="flex items-start justify-between gap-3">
                {/* Left: grade badge + name */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Grade letter badge */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
                    style={{
                      background: isSelected ? gs.color : gs.bg,
                      color: isSelected ? '#000' : gs.color,
                      border: `1px solid ${gs.border}`,
                      transition: 'all 0.2s',
                    }}>
                    {grade.label}
                  </div>

                  {/* Name + description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm" style={{ color: gs.color }}>
                        {grade.name}
                      </span>
                      {grade.tag && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: gs.activeBg, color: gs.color, border: `1px solid ${gs.border}` }}>
                          {grade.tag}
                        </span>
                      )}
                      {isUnavailable && (
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--color-text-muted)' }}>
                          Out of stock
                        </span>
                      )}
                    </div>
                    <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
                      {grade.description}
                    </p>
                  </div>
                </div>

                {/* Right: price + radio */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className="text-right">
                    <div className="font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>
                      {formatPrice(grade.price)}
                    </div>
                    {grade.originalPrice && (
                      <div className="text-xs line-through" style={{ color: 'var(--color-text-muted)' }}>
                        {formatPrice(grade.originalPrice)}
                      </div>
                    )}
                  </div>
                  {/* Radio indicator */}
                  <div className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      border: `2px solid ${isSelected ? gs.activeBorder : gs.border}`,
                      background: isSelected ? gs.color : 'transparent',
                      transition: 'all 0.2s',
                    }}>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full" style={{ background: '#000' }} />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded details when selected */}
              {isSelected && grade.details.length > 0 && (
                <div className="mt-3 pt-3 grid grid-cols-1 gap-1"
                  style={{ borderTop: `1px solid ${gs.border}` }}>
                  {grade.details.map((detail) => (
                    <div key={detail} className="flex items-start gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                        style={{ color: gs.color }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {detail}
                    </div>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected summary */}
      <div className="p-3 rounded-xl flex items-center justify-between"
        style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-surface-border)' }}>
        <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Selected: <span className="font-semibold" style={{ color: style.color }}>Grade {selected.label} — {selected.name}</span>
        </div>
        <div className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
          {formatPrice(selected.price)}
        </div>
      </div>
    </div>
  );
}

export { type GradeSelectorProps };
