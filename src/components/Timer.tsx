import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  formatTime: string;
}

export const Timer: React.FC<TimerProps> = ({ timeRemaining, formatTime }) => {
  const isWarning = timeRemaining <= 300; // 5 minutes
  const isCritical = timeRemaining <= 60; // 1 minute

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      isCritical 
        ? 'bg-red-100 text-red-800 border border-red-200' 
        : isWarning 
          ? 'bg-orange-100 text-orange-800 border border-orange-200'
          : 'bg-blue-100 text-blue-800 border border-blue-200'
    }`}>
      {isCritical ? (
        <AlertTriangle className="w-5 h-5 animate-pulse" />
      ) : (
        <Clock className="w-5 h-5" />
      )}
      <span className="font-mono font-semibold text-lg">
        {formatTime}
      </span>
      {isWarning && (
        <span className="text-sm font-medium">
          {isCritical ? 'Critical!' : 'Hurry up!'}
        </span>
      )}
    </div>
  );
};