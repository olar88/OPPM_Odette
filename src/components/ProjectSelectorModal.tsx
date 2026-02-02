import React, { useState, useEffect } from 'react';
import { X, FileText, Calendar, Trash2, Search } from 'lucide-react';
import { tw } from '../styles';
import { projectDB, ProjectData } from '../utils/projectDB';

interface ProjectSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectData) => void;
}

const ProjectSelectorModal: React.FC<ProjectSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadProjects();
    }
  }, [isOpen]);

  useEffect(() => {
    const filtered = projects.filter(project =>
      project && 
      project.name && 
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [projects, searchTerm]);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const allProjects = await projectDB.getAllProjects();
      console.log('Loaded projects:', allProjects); // 調試信息
      setProjects(allProjects);
    } catch (err) {
      setError('載入專案時發生錯誤');
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (window.confirm('確定要刪除此專案嗎？此操作無法復原。')) {
      try {
        await projectDB.deleteProject(projectId);
        await loadProjects();
      } catch (err) {
        setError('刪除專案時發生錯誤');
        console.error('Error deleting project:', err);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleProjectSelect = (project: ProjectData) => {
    onSelectProject(project);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${tw.neutral.border} border`}>
        
        {/* Header */}
        <div className={`${tw.neutral.bg} text-white p-4 flex justify-between items-center`}>
          <div className="flex items-center gap-2">
            <FileText size={20} />
            <h2 className="text-lg font-bold text-white">選擇專案</h2>
          </div>
          <button
            onClick={onClose}
            className={`${tw.neutral.textTertiary} hover:text-white transition-colors`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${tw.neutral.textTertiary}`} />
            <input
              type="text"
              placeholder="搜尋專案名稱..."
              className={`w-full pl-10 pr-4 py-2 ${tw.neutral.border} border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B9DC3] focus:border-transparent`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className={`text-center ${tw.neutral.textSecondary}`}>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                載入中...
              </div>
            </div>
          )}

          {error && (
            <div className={`p-4 ${tw.error.bgLight} ${tw.error.text} border rounded-lg mb-4`}>
              {error}
            </div>
          )}

          {!loading && !error && filteredProjects.length === 0 && (
            <div className={`text-center py-12 ${tw.neutral.textSecondary}`}>
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">沒有找到專案</p>
              <p className="text-sm">
                {searchTerm ? '請嘗試其他搜尋關鍵字' : '您還沒有建立任何專案'}
              </p>
            </div>
          )}

          {!loading && !error && filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((project) => {
                // 確保項目有必要的屬性
                if (!project || !project.id || !project.name) {
                  return null;
                }
                
                return (
                <div
                  key={project.id}
                  className={`group cursor-pointer p-4 ${tw.neutral.borderLight} border rounded-lg hover:shadow-md transition-all duration-200 hover:${tw.accent.bgLight}`}
                  onClick={() => handleProjectSelect(project)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileText size={20} className={tw.primary.text} />
                      <div className="min-w-0 flex-1">
                        <h3 className={`font-semibold ${tw.neutral.textPrimary} truncate`}>
                          {project.name || '未命名專案'}
                        </h3>
                        <p className={`text-sm ${tw.neutral.textSecondary} truncate`}>
                          專案ID: {project.id}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteProject(project.id, e)}
                      className={`opacity-0 group-hover:opacity-100 p-1 ${tw.error.text} hover:${tw.error.bg} hover:text-white rounded transition-all`}
                      title="刪除專案"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className={`space-y-2 text-sm ${tw.neutral.textSecondary}`}>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>最後修改: {formatDate(project.lastModified.toString())}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>{project.tasks?.length || 0} 個任務</span>
                      <span>{project.resources?.length || 0} 個資源</span>
                      <span>{project.issues?.length || 0} 個議題</span>
                    </div>
                  </div>

                  <div className={`mt-3 text-xs ${tw.accent.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    點擊載入此專案
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${tw.neutral.borderLight} flex justify-end`}>
          <button
            onClick={onClose}
            className={`px-6 py-2 ${tw.neutral.bgLight} ${tw.neutral.textSecondary} rounded hover:${tw.neutral.bgLighter} transition-colors`}
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSelectorModal;