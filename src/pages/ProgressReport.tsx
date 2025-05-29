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
      className={`flex items-center rounded-[2.3rem] py-3 px-4 text-xl font-semibold shadow-[0_2px_12px_rgba(20,82,135,0.05)] min-h-[54px] transition-all duration-300 ${
        item.value 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-700'
      }`}
    >
      <span className="text-4xl text-left mr-4 ml-1 flex items-center justify-start">{item.value ? "✅" : "❌"}</span>
      <span className="text-xl font-semibold">
        {item.label}: <span className="text-lg font-semibold">{item.value ? "Done" : "Not Done"}</span>
      </span>
    </li>
  );

  return (
    <div className="bg-blue-50 rounded-[2.3rem] shadow-[0_6px_38px_rgba(19,83,189,0.07)] max-w-4xl mx-auto mt-12 p-10 flex flex-col items-center max-lg:max-w-[99vw] max-lg:p-5">
      <h2 className="text-blue-700 text-4xl font-bold mb-10 tracking-widest text-center">Your Progress</h2>
      <div className="flex justify-center w-full gap-9 max-lg:flex-col max-lg:gap-3">
        <ul className="list-none p-0 m-0 min-w-[340px] flex flex-col gap-4 max-lg:min-w-0 max-lg:w-full">{col1.map(renderItem)}</ul>
        <ul className="list-none p-0 m-0 min-w-[340px] flex flex-col gap-4 max-lg:min-w-0 max-lg:w-full">{col2.map(renderItem)}</ul>
      </div>
    </div>
  );
}