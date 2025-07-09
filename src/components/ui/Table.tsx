import React from "react";
interface TableProps {
  columns: string[];
  data: Record<string, any>[];
  renderActions?: (index: number) => React.ReactNode;
  totalAmount?: number;
}

const Table: React.FC<TableProps> = ({ columns, data, renderActions, totalAmount }) => {
  return (
    <div className="overflow-x-auto rounded shadow">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider font-bold"
              >
                {col}
              </th>
            ))}
            {renderActions && (
              <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider font-bold">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col} className="px-6 py-4 text-sm text-gray-800">
                  {row[col]}
                </td>
              ))}
              {renderActions && (
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {renderActions(row['id'])}
                  </div>
                </td>
              )}
            </tr>
          ))}
          { totalAmount !== undefined && (
            <tr className="bg-gray-100">
              <td colSpan={4} className="px-6 py-4 text-right font-semibold text-gray-900">
                Total:
              </td>
              <td colSpan={renderActions?2:1} className="px-6 py-4 font-semibold text-gray-900">
                {totalAmount}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
