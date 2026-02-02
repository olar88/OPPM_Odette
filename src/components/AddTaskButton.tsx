import React from 'react';
import { Plus } from 'lucide-react';
import { tw } from '../styles';

interface AddTaskButtonProps {
  onAddTask: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onAddTask }) => {
  return (
    <button
      onClick={onAddTask}
      className={`mb-4 px-4 py-2 ${tw.success.bg} text-white rounded hover:${tw.success.bgHover} flex items-center gap-2 transition-colors`}
    >
      <Plus size={16} /> 添加新任務
    </button>
  );
};

export default AddTaskButton;