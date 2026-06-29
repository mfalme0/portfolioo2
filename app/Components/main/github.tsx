'use client';

import React, { useMemo, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { FaGithubAlt } from "react-icons/fa";
import { useTheme } from "../../Context/theme";

export default function Github() {
  const { accent: accentColor } = useTheme();
  const nowYear = new Date().getFullYear();
  const [year, setYear] = useState(nowYear);

  const githubTheme = useMemo(() => ({
    light: ['#ebedf0', `${accentColor}22`, `${accentColor}44`, `${accentColor}88`, accentColor],
    dark: ['#2d2d2f', `${accentColor}22`, `${accentColor}44`, `${accentColor}88`, accentColor],
  }), [accentColor]);

  return (
    <section className="relative w-full py-32 md:py-44 bg-background overflow-hidden vintage-frame" id="github">
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] w-8 rounded-full origin-left"
            style={{ background: accentColor }}
          />
          <span className="apple-eyebrow">GitHub</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="apple-heading"
            >
              Commit<br />
              <span className="font-semibold" style={{ color: accentColor }}>
                Activity.
              </span>
            </motion.h2>
          </div>
          <div className="md:col-span-5 md:col-start-7">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="apple-subtitle text-sm"
            >
              Daily contribution history across all public repositories.
              Consistent delivery, every week.
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="apple-card-flat p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <FaGithubAlt className="text-lg" style={{ color: 'var(--color-muted)' }} />
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'var(--color-muted)' }}>
                  Profile
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                  github.com/mfalme0
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ border: '1px solid var(--color-border)' }}>
              <span className="text-[10px] font-semibold tracking-[0.06em] uppercase" style={{ color: 'var(--color-muted)' }}>
                Year
              </span>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="bg-transparent text-xs font-medium outline-none cursor-pointer"
                style={{ color: accentColor }}
                aria-label="Select GitHub contribution year"
              >
                {[nowYear, nowYear - 1, nowYear - 2, nowYear - 3].map(y => (
                  <option key={y} value={y} className="bg-(--color-background)">{y}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto pb-2">
            <GitHubCalendar
              username="mfalme0"
              year={year}
              blockSize={13}
              blockMargin={4}
              fontSize={13}
              theme={githubTheme}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
