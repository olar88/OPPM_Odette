import React from 'react';
import { X, Settings } from 'lucide-react';
import { Resource } from '../type/type';
import ResourceManager from './ResourceManager';
import TimelineSettings from './TimelineSettings';
import { tw } from '../styles';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  onProjectTitleUpdate: (title: string) => void;
  resources: Resource[];
  timelineDates: string[];
  onResourceUpdate: (index: number, updates: Partial<Resource>) => void;
  onAddResource: () => void;
  onRemoveResource: (index: number) => void;
  onTimelineDatesUpdate: (dates: string[]) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  projectTitle,
  onProjectTitleUpdate,
  resources,
  timelineDates,
  onResourceUpdate,
  onAddResource,
  onRemoveResource,
  onTimelineDatesUpdate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${tw.neutral.border} border`}>
        <div className={`${tw.neutral.bg} text-white p-4 flex justify-between items-center`}>
          <div className="flex items-center gap-2">
            <Settings size={20} />
            <h2 className="text-lg font-bold text-white">專案設定</h2>
          </div>
          <button
            onClick={onClose}
            className={`${tw.neutral.textTertiary} hover:text-white transition-colors`}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 專案基本設定 */}
            <div className={`bg-white p-4 ${tw.neutral.border} border rounded shadow-inner`}>
              <h3 className={`font-bold ${tw.neutral.textSecondary} mb-3`}>專案基本設定</h3>
              <div className="space-y-3">
                <div>
                  <label className={`block text-sm font-medium ${tw.neutral.textSecondary} mb-1`}>
                    專案標題
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 ${tw.neutral.border} border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B9DC3] focus:border-transparent`}
                    value={projectTitle}
                    onChange={(e) => onProjectTitleUpdate(e.target.value)}
                    placeholder="輸入專案標題"
                  />
                </div>
              </div>
            </div>

            <div>
              <ResourceManager
                resources={resources}
                onResourceUpdate={onResourceUpdate}
                onAddResource={onAddResource}
                onRemoveResource={onRemoveResource}
              />
            </div>
            
            <div className="md:col-span-2">
              <TimelineSettings
                onTimelineUpdate={onTimelineDatesUpdate}
              />
            </div>
          </div>
          
          <div className={`mt-6 p-4 ${tw.info.bgLight} ${tw.info.bg || tw.neutral.border} border rounded`}>
            <h4 className={`font-bold ${tw.info.text} mb-2`}>設定說明</h4>
            <div className={`text-sm ${tw.neutral.textSecondary} space-y-1`}>
              <p>• <strong>資源管理：</strong>添加或編輯專案成員及其時薪費率</p>
              <p>• <strong>時間軸設定：</strong>使用日期選擇器設定專案時間範圍，自動產生月/日格式的時間軸</p>
              <p>• <strong>注意：</strong>修改資源或時間軸會影響現有任務的數據分配</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className={`px-6 py-2 ${tw.primary.bg} text-white rounded hover:${tw.primary.bgHover} transition-colors`}
            >
              完成設定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;