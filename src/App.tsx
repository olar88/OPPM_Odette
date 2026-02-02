import React, { useState, useMemo, useCallback } from 'react';
import { Download, Settings, Save, Home } from 'lucide-react';
import { Resource, Task, Issue } from './type/type';
import TaskRow from './components/TaskRow';
import IssueManagement from './components/IssueManagement';
import ProjectSummary from './components/ProjectSummary';
import AddTaskButton from './components/AddTaskButton';
import SettingsModal from './components/SettingsModal';
import HomePage from './components/HomePage';
import ProjectSelectorModal from './components/ProjectSelectorModal';
import { tw } from './styles';
import { projectDB, ProjectData } from './utils/projectDB';

type AppView = 'home' | 'project';

const App: React.FC = () => {
  // --- 應用狀態管理 ---
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [isProjectSelectorOpen, setIsProjectSelectorOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // --- 專案基本設定 ---
  const [projectName, setProjectName] = useState<string>('專案管理示範');
  
  // --- 資源設定 (參考 PDF 費率) ---
  const [resources, setResources] = useState<Resource[]>([
    { name: 'Alex', rate: 350 },
    { name: 'Bob', rate: 350 },
    { name: 'Chris', rate: 500 },
    { name: 'Dell', rate: 150 },
    { name: 'Eric', rate: 500 },
    { name: 'Frank', rate: 120 },
  ]);

  const [timelineDates, setTimelineDates] = useState<string[]>(['1/1', '1/2', '1/3', '1/4', '1/5', '1/6', '1/7', '1/8', '1/9', '1/10', '1/11', '1/12']);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // --- 初始任務數據 (參考 PDF 案例) ---
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: '1.0', 
      name: '計劃 A', 
      fixedCost: 0, 
      duration: 2, 
      completion: 0,
      resourceAlloc: { 'Alex': 16 }, 
      timelineData: { '1/1': 8, '1/2': 8 } 
    },
    { 
      id: '1.1', 
      name: '計劃 B', 
      fixedCost: 0, 
      duration: 3, 
      completion: 0,
      resourceAlloc: { 'Bob': 24 }, 
      timelineData: { '1/3': 8, '1/4': 8, '1/5': 8 } 
    },
    { 
      id: '1.2', 
      name: '計劃 C', 
      fixedCost: 0, 
      duration: 5, 
      completion: 0,
      resourceAlloc: { 'Chris': 40 }, 
      timelineData: { '1/3': 8, '1/4': 8, '1/5': 8, '1/6': 8, '1/7': 8 } 
    }
  ]);

  const [issues, setIssues] = useState<Issue[]>([
    { id: 1, desc: '資源衝突預警', owner: 'Alex', status: 'yellow', impact: '計劃 B' }
  ]);

  // --- 計算邏輯 ---
  const calculateTaskCosts = useCallback((task: Task) => {
    let variableCost = 0;
    Object.entries(task.resourceAlloc).forEach(([name, hours]) => {
      const res = resources.find(r => r.name === name);
      if (res) variableCost += res.rate * hours;
    });
    return {
      variable: variableCost,
      total: variableCost + task.fixedCost
    };
  }, [resources]);

  const periodCosts = useMemo(() => {
    return timelineDates.map(date => {
      return tasks.reduce((sum, task) => {
        const hours = task.timelineData[date] || 0;
        // 簡單推算當天成本：(該任務總變動成本 / 總投入小時) * 當天小時
        const costs = calculateTaskCosts(task);
        const totalHours = Object.values(task.resourceAlloc).reduce((a, b) => a + b, 0);
        const hourlyRate = totalHours > 0 ? costs.variable / totalHours : 0;
        return sum + (hours * hourlyRate);
      }, 0);
    });
  }, [tasks, calculateTaskCosts, timelineDates]);

  const cumulativeCosts = useMemo(() => {
    let runningTotal = 0;
    return periodCosts.map(cost => {
      runningTotal += cost;
      return runningTotal;
    });
  }, [periodCosts]);

  // --- 操作處理 ---
  const updateTimeline = useCallback((taskId: string, date: string, value: number): void => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const newData = { ...t.timelineData };
        if (value === 0) delete newData[date];
        else newData[date] = value;
        return { ...t, timelineData: newData };
      }
      return t;
    }));
  }, []);

  const updateTask = useCallback((taskId: string, updates: Partial<Task>): void => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates } : t));
  }, []);

  const addTask = useCallback((): void => {
    const newId = `${tasks.length + 1}.0`;
    const newTask: Task = {
      id: newId,
      name: '新任務',
      fixedCost: 0,
      duration: 1,
      completion: 0,
      resourceAlloc: {},
      timelineData: {}
    };
    setTasks(prev => [...prev, newTask]);
  }, [tasks.length]);

  const removeTask = useCallback((taskId: string): void => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  }, []);

  const updateResource = useCallback((index: number, updates: Partial<Resource>): void => {
    setResources(prev => prev.map((r, i) => i === index ? { ...r, ...updates } : r));
  }, []);

  const addResource = useCallback((): void => {
    const newResource: Resource = { name: '新資源', rate: 300 };
    setResources(prev => [...prev, newResource]);
  }, []);

  const removeResource = useCallback((index: number): void => {
    setResources(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateIssue = useCallback((issueId: number, updates: Partial<Issue>): void => {
    setIssues(prev => prev.map(i => i.id === issueId ? { ...i, ...updates } : i));
  }, []);

  const addIssue = useCallback((): void => {
    const newId = Math.max(...issues.map(i => i.id), 0) + 1;
    const newIssue: Issue = {
      id: newId,
      desc: '新議題',
      owner: '待指派',
      status: 'yellow',
      impact: '待評估'
    };
    setIssues(prev => [...prev, newIssue]);
  }, [issues]);

  const removeIssue = useCallback((issueId: number): void => {
    setIssues(prev => prev.filter(i => i.id !== issueId));
  }, []);

  const updateTimelineDates = useCallback((dates: string[]): void => {
    setTimelineDates(dates);
    // 清理任務中不存在的時間點數據
    setTasks(prev => prev.map(task => {
      const newTimelineData: Record<string, number> = {};
      dates.forEach(date => {
        if (task.timelineData[date]) {
          newTimelineData[date] = task.timelineData[date];
        }
      });
      return { ...task, timelineData: newTimelineData };
    }));
  }, []);

  // --- 專案管理功能 ---
  const saveCurrentProject = useCallback(async (): Promise<void> => {
    try {
      setIsSaving(true);
      const projectData: ProjectData = {
        id: currentProjectId || Date.now().toString(),
        name: projectName,
        tasks,
        resources,
        issues,
        timelineDates,
        lastModified: new Date(),
      };
      
      const savedId = await projectDB.saveProject(projectData);
      setCurrentProjectId(savedId);
      
      // 簡單的成功提示
      console.log(`專案「${projectName}」已成功保存！`);
    } catch (error) {
      console.error('保存專案時發生錯誤：', error);
    } finally {
      setIsSaving(false);
    }
  }, [currentProjectId, projectName, tasks, resources, issues, timelineDates]);

  const loadProject = useCallback(async (projectId: string): Promise<void> => {
    try {
      const projectData = await projectDB.getProject(projectId);
      if (projectData) {
        setCurrentProjectId(projectData.id);
        setProjectName(projectData.name);
        setTasks(projectData.tasks);
        setResources(projectData.resources);
        setIssues(projectData.issues);
        setTimelineDates(projectData.timelineDates);
        setCurrentView('project');
        setIsProjectSelectorOpen(false);
      }
    } catch (error) {
      console.error('載入專案時發生錯誤：', error);
    }
  }, []);

  const createNewProject = useCallback((): void => {
    setCurrentProjectId(null);
    setProjectName('新專案');
    setTasks([]);
    setResources([
      { name: 'Alex', rate: 200 },
      { name: 'Bob', rate: 180 },
      { name: 'Chris', rate: 250 },
    ]);
    setIssues([]);
    setTimelineDates(['1/1', '1/2', '1/3', '1/4', '1/5', '1/6', '1/7']);
    setCurrentView('project');
  }, []);

  const goToHome = useCallback((): void => {
    setCurrentView('home');
  }, []);

  const openProjectSelector = useCallback((): void => {
    setIsProjectSelectorOpen(true);
  }, []);

  // 根據當前視圖渲染不同內容
  if (currentView === 'home') {
    return (
      <div className={`min-h-screen ${tw.neutral.bgLighter}`}>
        <HomePage 
          onNewProject={createNewProject}
          onContinueProject={openProjectSelector}
        />
        {isProjectSelectorOpen && (
          <ProjectSelectorModal 
            isOpen={isProjectSelectorOpen}
            onClose={() => setIsProjectSelectorOpen(false)}
            onSelectProject={(project: ProjectData) => loadProject(project.id)}
          />
        )}
         <footer className="text-center text-[#c4b5a8] text-[10px] tracking-[0.25em] font-medium uppercase mt-[-20px]">
        © 2026 One-Page Project Management System | Curated by Odette
      </footer>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${tw.neutral.bgLighter} p-4 font-sans text-xs`}>
      <div className={`max-w-[1400px] mx-auto bg-white shadow-2xl rounded-sm ${tw.neutral.borderLight} border overflow-hidden`}>
        
        {/* Header */}
        <div className={`${tw.neutral.bg} text-white p-4 flex justify-between items-center`}>
          <div>
            <h1 className={`text-xl font-bold tracking-tight text-white`}>{projectName}</h1>
            <p className={`${tw.neutral.textPrimary} text-opacity-80`}>專案成本與進度實時追蹤系統</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={goToHome}
              className={`${tw.secondary.bg} ${tw.secondary.bgHover} hover:${tw.secondary.bgHover} px-4 py-2 rounded flex items-center gap-2 text-white transition-colors`}
            >
              <Home size={14} /> 首頁
            </button>
            <button 
              onClick={() => setIsSettingsModalOpen(true)} 
              className={`${tw.secondary.bg} ${tw.secondary.bgHover} hover:${tw.secondary.bgHover} px-4 py-2 rounded flex items-center gap-2 text-white transition-colors`}
            >
              <Settings size={14} /> 設定
            </button>
            <button 
              onClick={() => window.print()} 
              className={`${tw.primary.bg} ${tw.primary.bgHover} hover:${tw.primary.bgHover} px-4 py-2 rounded flex items-center gap-2 text-white transition-colors`}
            >
              <Download size={14} /> 匯出 PDF 報表
            </button>
            <button 
              onClick={saveCurrentProject}
              disabled={isSaving}
              className={`${isSaving ? tw.neutral.bg : tw.accent.bg} ${tw.accent.bgHover} hover:${tw.accent.bgHover} px-4 py-2 rounded flex items-center gap-2 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Save size={14} /> {isSaving ? '保存中...' : '儲存專案'}
            </button>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="p-4">
          <AddTaskButton onAddTask={addTask} />
        </div>

        {/* Main Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-spacing-0">
            <thead>
              <tr className={`${tw.neutral.bgLight} ${tw.neutral.textSecondary}`}>
                <th className={`${tw.neutral.border} border p-2 w-12`} rowSpan={2}>ID</th>
                <th className={`${tw.neutral.border} border p-2 w-[150px] min-w-[60px] max-w-[200px]`} rowSpan={2}>
                  <div className="text-xs leading-tight break-words">工作名稱/任務</div>
                </th>
                <th className={`${tw.neutral.border} border p-2`} colSpan={resources.length}>資源投入 (人/工時)</th>
                <th className={`${tw.neutral.border} border p-2`} colSpan={3}>成本資訊 (TWD)</th>
                <th className={`${tw.neutral.border} border p-2 w-12`} rowSpan={2}>工期</th>
                <th className={`${tw.neutral.border} border p-2 w-12`} rowSpan={2}>完成%</th>
                <th className={`${tw.neutral.border} border p-2`} colSpan={timelineDates.length}>時間軸 / 每日工時</th>
                <th className={`${tw.neutral.border} border p-2 w-16`} rowSpan={2}>操作</th>
              </tr>
              <tr className={`${tw.neutral.bgLighter} ${tw.neutral.textTertiary}`}>
                {resources.map(r => (
                  <th key={r.name} className={`${tw.neutral.border} border p-1 min-w-[50px]`}>{r.name}<br/>({r.rate})</th>
                ))}
                <th className={`${tw.neutral.border} border p-1 w-20`}>變動成本</th>
                <th className={`${tw.neutral.border} border p-1 w-20`}>固定成本</th>
                <th className={`${tw.neutral.border} ${tw.accent.bgLight} border p-1 w-20`}>總成本</th>
                {timelineDates.map(d => (
                  <th key={d} className={`${tw.neutral.border} border p-1 w-10`}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  resources={resources}
                  timelineDates={timelineDates}
                  onTaskUpdate={updateTask}
                  onTimelineUpdate={updateTimeline}
                  onTaskRemove={removeTask}
                  calculateTaskCosts={calculateTaskCosts}
                />
              ))}
              
              {/* Summary Rows (Like PDF) */}
              <tr className={`${tw.neutral.bgLight} font-bold`}>
                <td colSpan={resources.length + 6} className={`${tw.neutral.border} border p-2 text-right`}>計畫當期成本 (Period Cost)</td>
                {periodCosts.map((cost, idx) => (
                  <td key={idx} className={`${tw.neutral.border} ${tw.info.textDk} border p-1 text-center`}>
                    ${Math.round(cost).toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className={`${tw.neutral.bgLighter} font-bold`}>
                <td colSpan={resources.length + 6} className={`${tw.neutral.border} border p-2 text-right`}>計畫累計金額 (Cumulative)</td>
                {cumulativeCosts.map((cost, idx) => (
                  <td key={idx} className={`${tw.neutral.border} ${tw.success.textDk} border p-1 text-center`}>
                    ${Math.round(cost).toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Issues & Legend Section */}
        <div className={`p-4 grid grid-cols-1 md:grid-cols-2 gap-6 border-t ${tw.neutral.borderLight} ${tw.neutral.bgLighter}`}>
          <IssueManagement
            issues={issues}
            onIssueUpdate={updateIssue}
            onAddIssue={addIssue}
            onRemoveIssue={removeIssue}
          />
          
          <ProjectSummary
            cumulativeCosts={cumulativeCosts}
            totalDuration={timelineDates.length}
          />
        </div>
        
        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          projectTitle={projectName}
          onProjectTitleUpdate={setProjectName}
          resources={resources}
          timelineDates={timelineDates}
          onResourceUpdate={updateResource}
          onAddResource={addResource}
          onRemoveResource={removeResource}
          onTimelineDatesUpdate={updateTimelineDates}
        />
      </div>
       <footer className="mt-16 text-center text-[#c4b5a8] text-[10px] tracking-[0.25em] font-medium uppercase">
        © 2026 One-Page Project Management System | Curated by Odette
      </footer>
    </div>
  );
};

export default App;