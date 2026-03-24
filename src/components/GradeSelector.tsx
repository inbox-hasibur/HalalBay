'use client'

import { useState } from "react";
import { Grade } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h3 className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>
            Select verified Grade
          </h3>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            100% transparent. No hidden info.
          </p>
        </motion.div>
        <motion.a 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          href="#grade-explainer" className="text-sm font-semibold hover:text-white transition-colors"
          style={{ color: 'var(--color-brand-gold)' }}>
          Compare Grades
        </motion.a>
      </div>

      {/* Grade Cards */}
      <div className="flex flex-col gap-4 relative">
        {grades.map((grade) => {
          const gs = GRADE_STYLES[grade.label] || GRADE_STYLES["C"];
          const isSelected = selected.label === grade.label;
          const isUnavailable = !grade.inStock;

          return (
            <motion.button
              key={grade.label}
              onClick={() => handleSelect(grade)}
              disabled={isUnavailable}
              layout
              className="w-full text-left rounded-3xl p-5 relative overflow-hidden group transition-colors duration-300 focus:outline-none"
              style={{
                background: isSelected ? gs.activeBg : gs.bg,
                border: `2px solid ${isSelected ? gs.activeBorder : gs.border}`,
                opacity: isUnavailable ? 0.4 : 1,
                cursor: isUnavailable ? 'not-allowed' : 'pointer',
              }}>
              
              {/* Animated active border glow */}
              {isSelected && (
                <motion.div 
                  layoutId="activeGradeGlow"
                  className="absolute inset-0 z-0 opacity-20"
                  style={{ background: `radial-gradient(circle at 100% 50%, ${gs.color}, transparent 60%)` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <div className="flex items-start justify-between gap-4 relative z-10">
                {/* Left: grade badge + name */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Category Letter */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-300"
                    style={{
                      background: isSelected ? gs.color : gs.bg,
                      color: isSelected ? '#000' : gs.color,
                      border: `1px solid ${gs.border}`,
                      boxShadow: isSelected ? `0 0 20px ${gs.ring}` : 'none'
                    }}>
                    {grade.label}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold text-lg tracking-tight" style={{ color: isSelected ? '#fff' : gs.color }}>
                        {grade.name}
                      </span>
                      {grade.tag && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-surface-4)]"
                          style={{ color: gs.color, border: `1px solid ${gs.border}` }}>
                          {grade.tag}
                        </span>
                      )}
                      {isUnavailable && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold"
                          style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-muted)' }}>
                          Out of stock
                        </span>
                      )}
                    </div>
                    <p className="text-sm mt-1.5 leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
                      {grade.description}
                    </p>
                  </div>
                </div>

                {/* Right: price + radio */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="font-black text-xl tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                      {formatPrice(grade.price)}
                    </div>
                    {grade.originalPrice && (
                      <div className="text-sm line-through mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                        {formatPrice(grade.originalPrice)}
                      </div>
                    )}
                  </div>
                  
                  {/* Animated Radio indicator */}
                  <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors duration-300"
                    style={{ borderColor: isSelected ? gs.color : gs.border, background: 'rgba(0,0,0,0.2)' }}>
                    {isSelected && (
                      <motion.div 
                        layoutId="activeRadio"
                        className="w-3 h-3 rounded-full" 
                        style={{ background: gs.color }} 
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Expandable Details */}
              <AnimatePresence>
                {isSelected && grade.details.length > 0 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 pt-4 grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10" style={{ borderTop: `1px solid ${gs.border}` }}>
                      {grade.details.map((detail, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 + 0.2 }}
                          key={detail} className="flex items-start gap-2.5 text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                            style={{ color: gs.color }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {detail}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.button>
          );
        })}
      </div>

      {/* Sticky Selected Bottom Summary */}
      <motion.div 
        layout
        className="p-5 rounded-2xl flex items-center justify-between border shadow-2xl backdrop-blur-md"
        style={{ 
          background: 'rgba(20, 30, 27, 0.7)', 
          borderColor: style.border,
          boxShadow: `0 10px 40px ${style.ring}`
        }}>
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Currently Selected</span>
          <span className="font-bold text-lg" style={{ color: style.color }}>Grade {selected.label} — {selected.name}</span>
        </div>
        <div className="font-black text-2xl tracking-tighter" style={{ color: 'var(--color-text-primary)' }}>
          {formatPrice(selected.price)}
        </div>
      </motion.div>
    </div>
  );
}

export { type GradeSelectorProps };
