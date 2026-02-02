import React from 'react';
import { Resource } from '../type/type';
import { tw } from '../styles';

interface ResourceManagerProps {
  resources: Resource[];
  onResourceUpdate: (index: number, updates: Partial<Resource>) => void;
  onAddResource: () => void;
  onRemoveResource: (index: number) => void;
}

const ResourceManager: React.FC<ResourceManagerProps> = ({
  resources,
  onResourceUpdate,
  onAddResource,
  onRemoveResource,
}) => {
  return (
    <div className={`bg-white p-4 ${tw.neutral.border} border rounded shadow-inner`}>
      <h3 className={`font-bold ${tw.neutral.textSecondary} mb-3`}>資源管理</h3>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {resources.map((resource, index) => (
          <div key={index} className={`flex items-center gap-2 p-2 ${tw.neutral.borderLight} border rounded`}>
            <input
              type="text"
              placeholder="姓名"
              className={`flex-1 px-2 py-1 ${tw.neutral.border} border rounded text-sm focus:ring-1 focus:ring-[#8B9DC3]`}
              value={resource.name}
              onChange={(e) => onResourceUpdate(index, { name: e.target.value })}
            />
            <input
              type="number"
              placeholder="時薪"
              className={`w-20 px-2 py-1 ${tw.neutral.border} border rounded text-sm focus:ring-1 focus:ring-[#8B9DC3]`}
              value={resource.rate}
              onChange={(e) => onResourceUpdate(index, { rate: parseInt(e.target.value) || 0 })}
            />
            <button
              onClick={() => onRemoveResource(index)}
              className={`px-2 py-1 ${tw.error.bg} text-white rounded text-xs hover:${tw.error.bgHover} transition-colors`}
            >
              刪除
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={onAddResource}
        className={`mt-3 w-full px-3 py-2 ${tw.success.bg} text-white rounded hover:${tw.success.bgHover} text-sm transition-colors`}
      >
        + 添加資源
      </button>
    </div>
  );
};

export default ResourceManager;