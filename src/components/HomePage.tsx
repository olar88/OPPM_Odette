import React from 'react';
import { Plus, FolderOpen, FileText, Clock } from 'lucide-react';
import { tw } from '../styles';

interface HomePageProps {
  onNewProject: () => void;
  onContinueProject: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNewProject, onContinueProject }) => {
  return (
    <div className={`min-h-screen ${tw.neutral.bgLighter} flex items-center justify-center p-4`}>
      <div className={`max-w-2xl w-full bg-white rounded-lg shadow-2xl ${tw.neutral.border} border overflow-hidden`}>
        
        {/* Header */}
        <div className={`${tw.neutral.bg} text-white p-8 text-center`}>
          <div className="flex justify-center mb-4">
            <FileText size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">專案管理系統</h1>
        
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className={`text-xl font-semibold ${tw.neutral.textPrimary} mb-4`}>
              開始您的專案管理之旅
            </h2>
            <p className={`${tw.neutral.textSecondary} mb-8`}>
              創建新的專案計畫或繼續編輯之前儲存的專案
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* New Project Button */}
            <button
              onClick={onNewProject}
              className={`group p-6 ${tw.primary.bg} hover:${tw.primary.bgHover} text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-white bg-opacity-20 rounded-full group-hover:bg-opacity-30 transition-all">
                  <Plus size={32} />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-1">新增專案</h3>
                  <p className="text-sm opacity-90">
                    創建一個全新的專案計畫
                  </p>
                </div>
              </div>
            </button>

            {/* Load Project Button */}
            <button
              onClick={onContinueProject}
              className={`group p-6 ${tw.secondary.bg} hover:${tw.secondary.bgHover} text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-white bg-opacity-20 rounded-full group-hover:bg-opacity-30 transition-all">
                  <FolderOpen size={32} />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-1">繼續編輯專案</h3>
                  <p className="text-sm opacity-90">
                    載入並編輯已儲存的專案
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Features Overview */}
          <div className={`mt-12 p-6 ${tw.neutral.bgLighter} rounded-lg`}>
            <h3 className={`text-lg font-semibold ${tw.neutral.textSecondary} mb-4 text-center`}>
              系統特色
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center space-y-2">
                <Clock size={24} className={tw.accent.text} />
                <p className={`text-sm ${tw.neutral.textSecondary}`}>實時成本追蹤</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <FileText size={24} className={tw.accent.text} />
                <p className={`text-sm ${tw.neutral.textSecondary}`}>任務管理</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <FolderOpen size={24} className={tw.accent.text} />
                <p className={`text-sm ${tw.neutral.textSecondary}`}>專案儲存</p>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default HomePage;