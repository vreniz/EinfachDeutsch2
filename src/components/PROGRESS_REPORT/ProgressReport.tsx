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
    { 
      label: "Lessons", 
      value: progress.lessons,
      icon: "📚",
      description: "Complete all lesson content"
    },
    { 
      label: "Activity 1", 
      value: progress.activity1,
      icon: "📝",
      description: "Practice exercises"
    },
    { 
      label: "Activity 2", 
      value: progress.activity2,
      icon: "🎯",
      description: "Interactive challenges"
    },
    { 
      label: "Activity 3", 
      value: progress.activity3,
      icon: "🔤",
      description: "Language drills"
    },
    { 
      label: "Quiz", 
      value: progress.quizDone,
      icon: "🧠",
      description: "Knowledge assessment"
    },
    { 
      label: "Section", 
      value: progress.sectionDone,
      icon: "🏆",
      description: "Complete section mastery"
    }
  ];

  const completedCount = items.filter(item => item.value).length;
  const completionPercentage = Math.round((completedCount / items.length) * 100);

  const renderItem = (item: {label: string, value: boolean, icon: string, description: string}, idx: number) => (
    <div
      key={idx}
      className={`group relative bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
        item.value 
          ? 'border-green-200 bg-green-50 hover:border-green-300' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          {/* Status Icon */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            item.value
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-400'
          }`}>
            {item.value ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                item.value ? 'text-green-800' : 'text-gray-900'
              }`}>
                {item.label}
              </h3>
              <span className="text-xl">{item.icon}</span>
            </div>
            
            <p className={`text-sm transition-colors duration-300 ${
              item.value ? 'text-green-600' : 'text-gray-500'
            }`}>
              {item.description}
            </p>
            
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-2 ${
              item.value
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {item.value ? '✅ Completed' : '⏳ Pending'}
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className={`h-1 rounded-b-2xl transition-all duration-300 ${
        item.value ? 'bg-green-500' : 'bg-gray-200'
      }`}></div>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 max-w-6xl mx-auto mt-12 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Your Progress</h2>
            <p className="text-blue-100">Track your learning milestones and achievements</p>
          </div>
          
          {/* Completion Badge */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
            <div className="text-3xl font-bold mb-1">{completionPercentage}%</div>
            <div className="text-blue-100 text-sm font-medium">Complete</div>
            <div className="w-16 h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Content */}
      <div className="p-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-gray-600 text-sm">Completed</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-orange-600">{items.length - completedCount}</div>
            <div className="text-gray-600 text-sm">Remaining</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{items.length}</div>
            <div className="text-gray-600 text-sm">Total Tasks</div>
          </div>
        </div>

        {/* Progress Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(renderItem)}
        </div>

        {/* Motivational Message */}
        {completionPercentage === 100 ? (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">🎉 Congratulations!</h3>
                <p className="text-green-700">
                  You've completed all tasks in this section! Keep up the great work on your German learning journey.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-1">💪 Keep Going!</h3>
                <p className="text-blue-700">
                  You're {completionPercentage}% of the way through this section. 
                  Complete the remaining {items.length - completedCount} task{items.length - completedCount !== 1 ? 's' : ''} to master this content!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}