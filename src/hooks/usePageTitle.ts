import { useEffect } from 'react';

const BASE_TITLE = 'DoomLeet';

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE_TITLE}` : `${BASE_TITLE} — NeetCode 150 & Striver's SDE Sheet with C++ Solutions`;
  }, [title]);
}
