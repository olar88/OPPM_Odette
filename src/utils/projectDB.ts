// IndexedDB 工具類用於專案數據管理
import { Resource, Task, Issue } from '../type/type';

export interface ProjectData {
  id: string;
  name: string;
  tasks: Task[];
  resources: Resource[];
  issues: Issue[];
  timelineDates: string[];
  lastModified: Date;
}

class ProjectDB {
  private dbName = 'ProjectManagementDB';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        reject(new Error('Failed to open IndexedDB'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains('projects')) {
          const store = db.createObjectStore('projects', { keyPath: 'id' });
          store.createIndex('name', 'name', { unique: false });
          store.createIndex('lastModified', 'lastModified', { unique: false });
        }
      };
    });
  }

  async saveProject(projectData: ProjectData): Promise<string> {
    if (!this.db) await this.init();
    
    // 如果沒有ID，生成一個新的
    if (!projectData.id) {
      projectData.id = `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // 確保lastModified是當前時間
    projectData.lastModified = new Date();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['projects'], 'readwrite');
      const store = transaction.objectStore('projects');
      const request = store.put(projectData); // 使用put來支持更新

      request.onerror = () => {
        reject(new Error('Failed to save project'));
      };

      request.onsuccess = () => {
        resolve(projectData.id);
      };
    });
  }

  async getProject(id: string): Promise<ProjectData | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['projects'], 'readonly');
      const store = transaction.objectStore('projects');
      const request = store.get(id);

      request.onerror = () => {
        reject(new Error('Failed to get project'));
      };

      request.onsuccess = () => {
        resolve(request.result || null);
      };
    });
  }

  async getAllProjects(): Promise<ProjectData[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['projects'], 'readonly');
      const store = transaction.objectStore('projects');
      const request = store.getAll();

      request.onerror = () => {
        reject(new Error('Failed to get all projects'));
      };

      request.onsuccess = () => {
        // 過濾並驗證數據結構
        const rawProjects = request.result;
        const validProjects = rawProjects.filter((project: any) => {
          // 確保項目有必要的屬性
          return project && 
                 project.id && 
                 (project.name || project.projectTitle) && // 支持舊的projectTitle
                 Array.isArray(project.tasks) &&
                 Array.isArray(project.resources) &&
                 Array.isArray(project.issues) &&
                 Array.isArray(project.timelineDates);
        }).map((project: any) => {
          // 將舊的projectTitle轉換為name
          if (project.projectTitle && !project.name) {
            project.name = project.projectTitle;
          }
          return project as ProjectData;
        });
        
        // 按最後修改時間降序排序
        const sortedProjects = validProjects.sort((a: ProjectData, b: ProjectData) => 
          new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
        );
        
        resolve(sortedProjects);
      };
    });
  }

  async deleteProject(id: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['projects'], 'readwrite');
      const store = transaction.objectStore('projects');
      const request = store.delete(id);

      request.onerror = () => {
        reject(new Error('Failed to delete project'));
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }

  async clearAllProjects(): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['projects'], 'readwrite');
      const store = transaction.objectStore('projects');
      const request = store.clear();

      request.onerror = () => {
        reject(new Error('Failed to clear all projects'));
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }
}

// 創建單例實例
export const projectDB = new ProjectDB();