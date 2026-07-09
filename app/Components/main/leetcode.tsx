'use client';

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { motion } from "framer-motion";
import { SiLeetcode } from "react-icons/si";
import { useTheme } from "../../Context/theme";

type Activity = {
  date: string;
  count: number;
  level: number;
};

function fillYear(raw: Record<string, number>): Activity[] {
  const year = new Date().getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  const map = new Map(Object.entries(raw));
  const result: Activity[] = [];
  const current = new Date(start);
  while (current <= end) {
    const key = current.toISOString().split('T')[0];
    const count = map.get(key) ?? 0;
    result.push({
      date: key,
      count,
      level: count === 0 ? 0 : Math.min(Math.floor(count / 2), 4),
    });
    current.setDate(current.getDate() + 1);
  }
  return result;
}

export default function Leetcode() {
  const { accent: accentColor } = useTheme();
  const nowYear = new Date().getFullYear();
  const [year, setYear] = useState(nowYear);
  const [data, setData] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://leetcode-sub-endpoint.vercel.app/leetcode/JoeMfalme`
      );
      const raw = await res.json();
      setData(fillYear(raw));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const theme = useMemo(() => ({
    light: ['#ebedf0', `${accentColor}22`, `${accentColor}44`, `${accentColor}88`, accentColor],
    dark: ['#2d2d2f', `${accentColor}22`, `${accentColor}44`, `${accentColor}88`, accentColor],
  }), [accentColor]);

  const labels = useMemo(() => ({
    totalCount: `{{count}} submissions in {{year}}`,
  }), []);

  return (
    <section className="section-grid relative w-full pt-20 md:pt-24 pb-12 md:pb-16 bg-background vintage-frame" id="leetcode">
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] w-8 rounded-full origin-left"
            style={{ background: accentColor }}
          />
          <span className="apple-eyebrow">LeetCode</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          <div className="md:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="apple-heading-compact"
            >
              Problem{' '}
              <span className="font-bold" style={{ color: accentColor }}>
                Solving.
              </span>
            </motion.h2>
          </div>
          <div className="md:col-span-5 md:col-start-7">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="apple-subtitle"
            >
              Daily submission activity across all LeetCode problems.
              Sharpening the mind, one algorithm at a time.
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="apple-card-flat p-4 md:p-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <SiLeetcode className="text-lg" style={{ color: 'var(--color-muted)' }} />
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'var(--color-muted)' }}>
                  Profile
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                  leetcode.com/u/JoeMfalme
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
                aria-label="Select LeetCode submission year"
              >
                {[nowYear, nowYear - 1, nowYear - 2, nowYear - 3].map(y => (
                  <option key={y} value={y} className="bg-(--color-background)">{y}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto pb-2">
            <ActivityCalendar
              data={data ?? []}
              loading={loading}
              blockSize={13}
              blockMargin={4}
              fontSize={13}
              theme={theme}
              labels={labels}
              showWeekdayLabels={false}
            />
            {error && (
              <p className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>
                Could not load LeetCode data.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
