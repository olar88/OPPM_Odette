// TypeScript 介面定義
export interface Resource {
  name: string;
  rate: number;
}

export interface Task {
  id: string;
  name: string;
  fixedCost: number;
  duration: number;
  completion: number;
  resourceAlloc: Record<string, number>;
  timelineData: Record<string, number>;
}

export interface Issue {
  id: number;
  desc: string;
  owner: string;
  status: 'red' | 'yellow' | 'green';
  impact: string;
}

export interface TaskCosts {
  variable: number;
  total: number;
}