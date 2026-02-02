import React from 'react';
import { tw } from '../styles';

interface ProjectSummaryProps {
  cumulativeCosts: number[];
  totalDuration: number;
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({
  cumulativeCosts,
  totalDuration,
}) => {
  return (
    <div className={`bg-white p-4 ${tw.neutral.border} border rounded shadow-inner`}>
      <h3 className={`font-bold ${tw.neutral.textSecondary} mb-2`}>資源與成本摘要</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>總計畫預算 (BAC):</span>
          <span className={`font-bold ${tw.primary.text}`}>
            ${(cumulativeCosts[cumulativeCosts.length - 1] || 0).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span>總計畫工期:</span>
          <span className="font-bold">{totalDuration} Days</span>
        </div>
        <div className={`mt-4 p-2 ${tw.warning.bgLight} ${tw.neutral.text} border rounded text-[10px]`}>
          註：變動成本根據各資源投入工時乘以對應費率自動計算。時間軸儲存格可填入每日工時。
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;