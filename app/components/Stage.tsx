type StageProps = {
  stageNumber: number;
  title: string;
  expandedStage: number | null;
  toggleStage: (stageNum: number) => void;
  children: React.ReactNode;
}

export function Stage({ stageNumber, title, expandedStage, toggleStage, children }: StageProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => toggleStage(stageNumber)}
        className="w-full p-4 text-left bg-blue-50 hover:bg-blue-100 transition-colors flex justify-between items-center"
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        <svg
          className={`w-6 h-6 transform transition-transform ${
            expandedStage === stageNumber ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expandedStage === stageNumber && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
} 