import { useState, useEffect, useCallback } from 'react';

export type TemplateStatus = 'none' | 'learned' | 'needs-review';

const STORAGE_KEY = 'GrindSDE-template-progress';

function loadProgress(): Record<string, TemplateStatus> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(data: Record<string, TemplateStatus>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useTemplateProgress() {
  const [progress, setProgress] = useState<Record<string, TemplateStatus>>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const getStatus = useCallback(
    (key: string): TemplateStatus => progress[key] || 'none',
    [progress],
  );

  const cycleStatus = useCallback((key: string) => {
    setProgress(prev => {
      const current = prev[key] || 'none';
      const next: TemplateStatus =
        current === 'none' ? 'learned' :
        current === 'learned' ? 'needs-review' :
        'none';
      return { ...prev, [key]: next };
    });
  }, []);

  const setStatus = useCallback((key: string, status: TemplateStatus) => {
    setProgress(prev => ({ ...prev, [key]: status }));
  }, []);

  const stats = {
    learned: Object.values(progress).filter(s => s === 'learned').length,
    needsReview: Object.values(progress).filter(s => s === 'needs-review').length,
    total: Object.keys(progress).length,
  };

  return { getStatus, cycleStatus, setStatus, stats };
}
