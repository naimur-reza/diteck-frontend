export const ETableSkeleton = ({
  columns = 5,
  rows = 10,
}: {
  columns?: number;
  rows?: number;
}) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-sm text-left text-gray-700 border border-gray-300">
        <thead className="bg-gray-200 text-xs uppercase text-gray-600">
          <tr>
            {Array.from({ length: columns }).map((_, idx) => (
              <th
                key={idx}
                className="px-2 py-3 font-semibold text-gray-700 border-b border-gray-300"
              >
                <div className="h-3 w-20 bg-gray-300 rounded-md animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
            >
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="px-2 py-3 border-b border-gray-300"
                >
                  <div className="h-3 w-full bg-gray-300 rounded-md animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
