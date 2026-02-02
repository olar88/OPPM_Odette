import React from 'react';
import { tw } from '../styles';

interface TimelineManagerProps {
  timelineDates: string[];
  onTimelineDatesUpdate: (dates: string[]) => void;
}

const TimelineManager: React.FC<TimelineManagerProps> = ({
  timelineDates,
  onTimelineDatesUpdate,
}) => {
  const handleDateChange = (index: number, value: string) => {
    const newDates = [...timelineDates];
    newDates[index] = value;
    onTimelineDatesUpdate(newDates);
  };

  const addDate = () => {
    const lastDateNum = timelineDates.length;
    const newDate = `1/${lastDateNum + 1}`;
    onTimelineDatesUpdate([...timelineDates, newDate]);
  };

  const removeDate = (index: number) => {
    if (timelineDates.length > 1) {
      const newDates = timelineDates.filter((_, i) => i !== index);
      onTimelineDatesUpdate(newDates);
    }
  };

  return (
    <div className={`bg-white p-4 ${tw.neutral.border} border rounded shadow-inner`}>
      <h3 className={`font-bold ${tw.neutral.textSecondary} mb-3`}>時間軸設定</h3>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {timelineDates.map((date, index) => (
          <div key={index} className={`flex items-center gap-2 p-2 ${tw.neutral.borderLight} border rounded`}>
            <span className={`text-sm ${tw.neutral.textTertiary} w-8`}>#{index + 1}</span>
            <input
              type="text"
              placeholder="日期"
              className={`flex-1 px-2 py-1 ${tw.neutral.border} border rounded text-sm focus:ring-1 focus:ring-[#8B9DC3]`}
              value={date}
              onChange={(e) => handleDateChange(index, e.target.value)}
            />
            <button
              onClick={() => removeDate(index)}
              disabled={timelineDates.length <= 1}
              className={`px-2 py-1 ${tw.error.bg} text-white rounded text-xs hover:${tw.error.bgHover} disabled:${tw.neutral.bgLight} transition-colors`}
            >
              刪除
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addDate}
        className={`mt-3 w-full px-3 py-2 ${tw.success.bg} text-white rounded hover:${tw.success.bgHover} text-sm transition-colors`}
      >
        + 添加時間點
      </button>
    </div>
  );
};

export default TimelineManager;