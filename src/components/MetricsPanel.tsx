import React, { useEffect, useState } from 'react';
import { TypingMetrics } from '../types';

interface MetricsPanelProps {
  metrics: TypingMetrics;
  isCompleted: boolean;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics, isCompleted }) => {
  const [displayTime, setDisplayTime] = useState<number>(0);

  // Update time display while typing
  useEffect(() => {
    if (!isCompleted && metrics.startTime !== null) {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - metrics.startTime) / 1000;
        setDisplayTime(elapsedTime);
      }, 100);

      return () => clearInterval(interval);
    } else if (isCompleted && metrics.totalTime > 0) {
      setDisplayTime(metrics.totalTime);
    }
  }, [metrics.startTime, metrics.totalTime, isCompleted]);

  return (
    <div className="grid grid-cols-3 gap-4 bg-slate-700 p-4 rounded-md mb-4">
      <div className="text-center">
        <h3 className="text-sm text-slate-300 uppercase font-semibold">Tempo</h3>
        <p className="text-xl font-mono text-amber-400">
          {displayTime.toFixed(1)}s
        </p>
      </div>
      <div className="text-center">
        <h3 className="text-sm text-slate-300 uppercase font-semibold">Precisão</h3>
        <p className="text-xl font-mono text-amber-400">
          {metrics.accuracy.toFixed(1)}%
        </p>
      </div>
      <div className="text-center">
        <h3 className="text-sm text-slate-300 uppercase font-semibold">Erros</h3>
        <p className="text-xl font-mono text-amber-400">
          {metrics.errorCount}
        </p>
      </div>
    </div>
  );
};

export default MetricsPanel;