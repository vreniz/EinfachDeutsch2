import './ProgressReport.css';

type ProgressProps = {
  progress: {
    lessons: boolean;
    activity1: boolean;
    activity2: boolean;
    activity3: boolean;
    quizDone: boolean;
    sectionDone: boolean;
  };
};

export default function ProgressReport({ progress }: ProgressProps) {
  const items = [
    { label: "Lessons", value: progress.lessons },
    { label: "Activity 1", value: progress.activity1 },
    { label: "Activity 2", value: progress.activity2 },
    { label: "Activity 3", value: progress.activity3 },
    { label: "Quiz", value: progress.quizDone },
    { label: "Section", value: progress.sectionDone }
  ];

  // Split into two columns
  const mid = Math.ceil(items.length / 2);
  const col1 = items.slice(0, mid);
  const col2 = items.slice(mid);

  const renderItem = (item: {label: string, value: boolean}, idx: number) => (
    <li
      key={idx}
      className={`progress-list-item ${item.value ? 'done' : 'notdone'}`}
    >
      <span className="progress-emoji">{item.value ? "✅" : "❌"}</span>
      <span className="progress-label">
        {item.label}: <span className="progress-status">{item.value ? "Done" : "Not Done"}</span>
      </span>
    </li>
  );

  return (
    <div className="progress-report-container">
      <h2 className="progress-title">Your Progress</h2>
      <div className="progress-cols">
        <ul className="progress-list">{col1.map(renderItem)}</ul>
        <ul className="progress-list">{col2.map(renderItem)}</ul>
      </div>
    </div>
  );
}