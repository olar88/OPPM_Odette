import React from 'react';
import { Trash2 } from 'lucide-react';
import { Resource, Task } from '../type/type';
import { tw } from '../styles';

interface TaskRowProps {
  task: Task;
  resources: Resource[];
  timelineDates: string[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onTimelineUpdate: (taskId: string, date: string, value: number) => void;
  onTaskRemove: (taskId: string) => void;
  calculateTaskCosts: (task: Task) => { variable: number; total: number };
}

const TaskRow: React.FC<TaskRowProps> = ({
  task,
  resources,
  timelineDates,
  onTaskUpdate,
  onTimelineUpdate,
  onTaskRemove,
  calculateTaskCosts,
}) => {
  const costs = calculateTaskCosts(task);

  const handleNameChange = (name: string) => {
    onTaskUpdate(task.id, { name });
  };

  const handleResourceChange = (resourceName: string, hours: number) => {
    onTaskUpdate(task.id, {
      resourceAlloc: { ...task.resourceAlloc, [resourceName]: hours }
    });
  };

  const handleFixedCostChange = (fixedCost: number) => {
    onTaskUpdate(task.id, { fixedCost });
  };

  const handleDurationChange = (duration: number) => {
    onTaskUpdate(task.id, { duration });
  };

  const handleCompletionChange = (completion: number) => {
    onTaskUpdate(task.id, { completion });
  };

  return (
    <tr className={`hover:${tw.accent.bgLight} transition-colors`}>
      <td className={`${tw.neutral.border} border p-2 text-center font-mono`}>{task.id}</td>
      <td className={`${tw.neutral.border} border p-2 w-[60px] min-w-[60px] max-w-[60px]`}>
        <input
          type="text"
          className={`w-full font-medium bg-transparent border-none focus:ring-1 focus:ring-[${tw.primary.bg.replace('bg-', '')}] rounded px-1 text-xs leading-tight whitespace-normal break-words`}
          value={task.name}
          onChange={(e) => handleNameChange(e.target.value)}
          style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}
        />
      </td>
      {resources.map(r => (
        <td key={r.name} className={`${tw.neutral.border} border p-1 text-center`}>
          <input 
            type="number"
            className={`w-full text-center bg-transparent border-none focus:ring-1 focus:ring-[#8B9DC3] rounded`}
            value={task.resourceAlloc[r.name] || ''}
            onChange={(e) => handleResourceChange(r.name, parseInt(e.target.value) || 0)}
          />
        </td>
      ))}
      <td className={`${tw.neutral.border} border p-2 text-right`}>${costs.variable.toLocaleString()}</td>
      <td className={`${tw.neutral.border} border p-2`}>
        <input
          type="number"
          className={`w-full text-right bg-transparent border-none focus:ring-1 focus:ring-[#8B9DC3] rounded px-1`}
          value={task.fixedCost}
          onChange={(e) => handleFixedCostChange(parseInt(e.target.value) || 0)}
        />
      </td>
      <td className={`${tw.neutral.border} ${tw.accent.bgLight} border p-2 text-right font-bold`}>${costs.total.toLocaleString()}</td>
      <td className={`${tw.neutral.border} border p-2`}>
        <input
          type="number"
          className={`w-full text-center bg-transparent border-none focus:ring-1 focus:ring-[#8B9DC3] rounded`}
          value={task.duration}
          onChange={(e) => handleDurationChange(parseInt(e.target.value) || 0)}
        />
      </td>
      <td className={`${tw.neutral.border} border p-2`}>
        <input
          type="number"
          min="0"
          max="100"
          className={`w-full text-center bg-transparent border-none focus:ring-1 focus:ring-[#8B9DC3] rounded`}
          value={task.completion}
          onChange={(e) => handleCompletionChange(parseInt(e.target.value) || 0)}
        />
      </td>
      {timelineDates.map(date => (
        <td key={date} className={`${tw.neutral.border} border p-1 text-center ${task.timelineData[date] ? tw.warning.bgLight + ' font-bold' : ''}`}>
          <input 
            type="text"
            className={`w-full text-center bg-transparent border-none focus:ring-1 focus:ring-[#8B9DC3] rounded`}
            value={task.timelineData[date] || ''}
            onChange={(e) => onTimelineUpdate(task.id, date, parseInt(e.target.value) || 0)}
          />
        </td>
      ))}
      <td className={`${tw.neutral.border} border p-1 text-center`}>
        <button
          onClick={() => onTaskRemove(task.id)}
          className={`px-2 py-1 ${tw.error.bg} text-white rounded text-xs hover:${tw.error.bgHover} transition-colors`}
          title="刪除任務"
        >
          <Trash2 size={12} />
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;