import { useState, useEffect } from 'react';

export function useRotatingData<T>(datasets: T[], intervalMs: number = 30000): T {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % datasets.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [datasets.length, intervalMs]);

  return datasets[currentIndex] || datasets[0];
}