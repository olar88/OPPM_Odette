import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { tw } from '../styles';

interface TimelineSettingsProps {
  onTimelineUpdate: (dates: string[]) => void;
}

const TimelineSettings: React.FC<TimelineSettingsProps> = ({ onTimelineUpdate }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const generateTimelineDates = (start: string, end: string): string[] => {
    if (!start || !end) return [];
    
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const dates: string[] = [];
    
    const currentDate = new Date(startDateObj);
    while (currentDate <= endDateObj) {
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      dates.push(`${month}/${day}`);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  const handleApply = () => {
    const dates = generateTimelineDates(startDate, endDate);
    if (dates.length > 0) {
      onTimelineUpdate(dates);
    }
  };

  const handleQuickSelect = (days: number) => {
    const today = new Date();
    const start = new Date(today);
    const end = new Date(today);
    end.setDate(today.getDate() + days - 1);
    
    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];
    
    setStartDate(startStr);
    setEndDate(endStr);
    
    const dates = generateTimelineDates(startStr, endStr);
    onTimelineUpdate(dates);
  };

  return (
    <div className={`bg-white p-4 ${tw.neutral.border} border rounded shadow-inner`}>
      <h3 className={`font-bold ${tw.neutral.textSecondary} mb-3 flex items-center gap-2`}>
        <Calendar size={16} /> 時間軸設定
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={`block text-sm font-medium ${tw.neutral.textSecondary} mb-1`}>開始日期</label>
            <input
              type="date"
              className={`w-full px-3 py-2 ${tw.neutral.border} border rounded text-sm focus:ring-1 focus:ring-[#8B9DC3]`}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${tw.neutral.textSecondary} mb-1`}>結束日期</label>
            <input
              type="date"
              className={`w-full px-3 py-2 ${tw.neutral.border} border rounded text-sm focus:ring-1 focus:ring-[#8B9DC3]`}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleApply}
            className={`flex-1 px-3 py-2 ${tw.primary.bg} text-white rounded hover:${tw.primary.bgHover} text-sm transition-colors`}
          >
            套用時間範圍
          </button>
        </div>
        
        <div>
          <p className={`text-sm ${tw.neutral.textSecondary} mb-2`}>快速設定：</p>
          <div className="flex gap-2 flex-wrap">
            {[7, 14, 30, 60, 90].map(days => (
              <button
                key={days}
                onClick={() => handleQuickSelect(days)}
                className={`px-3 py-1 ${tw.neutral.bgLight} ${tw.neutral.textSecondary} rounded hover:${tw.neutral.bgLighter} text-sm transition-colors`}
              >
                {days}天
              </button>
            ))}
          </div>
        </div>
        
        <div className={`text-xs ${tw.neutral.text} p-2 ${tw.warning.bgLight} border rounded`}>
          註：系統會自動生成選擇範圍內的日期，並以「月/日」格式顯示在時間軸中。
        </div>
      </div>
    </div>
  );
};

export default TimelineSettings;