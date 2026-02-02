import React from 'react';
import { Issue } from '../type/type';
import { AlertCircle } from 'lucide-react';
import { tw } from '../styles';

interface IssueManagementProps {
  issues: Issue[];
  onIssueUpdate: (issueId: number, updates: Partial<Issue>) => void;
  onAddIssue: () => void;
  onRemoveIssue: (issueId: number) => void;
}

const IssueManagement: React.FC<IssueManagementProps> = ({
  issues,
  onIssueUpdate,
  onAddIssue,
  onRemoveIssue,
}) => {
  return (
    <div className="col-span-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className={`text-sm font-bold ${tw.neutral.textSecondary} flex items-center gap-2`}>
          <AlertCircle size={16} /> 專案議題與說明 (Issues Log)
        </h3>
        <button
          onClick={onAddIssue}
          className={`px-3 py-1 ${tw.primary.bg} text-white rounded text-xs hover:${tw.primary.bgHover} transition-colors`}
        >
          + 新增議題
        </button>
      </div>
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className={tw.neutral.bgLight}>
            <th className={`${tw.neutral.border} border p-2 text-left`}>議題說明</th>
            <th className={`${tw.neutral.border} border p-2 w-24`}>負責人</th>
            <th className={`${tw.neutral.border} border p-2 w-20`}>燈號</th>
            <th className={`${tw.neutral.border} border p-2 w-24`}>影響活動</th>
            <th className={`${tw.neutral.border} border p-2 w-16`}>操作</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(issue => (
            <tr key={issue.id}>
              <td className={`${tw.neutral.border} border p-2`}>
                <input
                  type="text"
                  className={`w-full bg-transparent border-none focus:ring-1 focus:ring-[#8B9DC3] rounded px-1`}
                  value={issue.desc}
                  onChange={(e) => onIssueUpdate(issue.id, { desc: e.target.value })}
                />
              </td>
              <td className={`${tw.neutral.border} border p-2`}>
                <input
                  type="text"
                  className={`w-full text-center bg-transparent border-none focus:ring-1 focus:ring-[#8B9DC3] rounded px-1`}
                  value={issue.owner}
                  onChange={(e) => onIssueUpdate(issue.id, { owner: e.target.value })}
                />
              </td>
              <td className={`${tw.neutral.border} border p-2 text-center`}>
                <select
                  className={`w-full bg-transparent border-none focus:ring-1 focus:ring-[#8B9DC3] rounded`}
                  value={issue.status}
                  onChange={(e) => onIssueUpdate(issue.id, { status: e.target.value as 'red' | 'yellow' | 'green' })}
                >
                  <option value="red">🔴</option>
                  <option value="yellow">🟡</option>
                  <option value="green">🟢</option>
                </select>
              </td>
              <td className={`${tw.neutral.border} border p-2`}>
                <input
                  type="text"
                  className={`w-full text-center bg-transparent border-none focus:ring-1 focus:ring-[#8B9DC3] rounded px-1`}
                  value={issue.impact}
                  onChange={(e) => onIssueUpdate(issue.id, { impact: e.target.value })}
                />
              </td>
              <td className={`${tw.neutral.border} border p-2 text-center`}>
                <button
                  onClick={() => onRemoveIssue(issue.id)}
                  className={`px-2 py-1 ${tw.error.bg} text-white rounded text-xs hover:${tw.error.bgHover} transition-colors`}
                >
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueManagement;