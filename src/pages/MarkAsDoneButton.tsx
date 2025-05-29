type Props = {
  done: boolean;
  onClick: () => void;
  label?: string;
};

export default function MarkAsDoneButton({ done, onClick, label }: Props) {
  return (
    <button
      className={`border-none rounded-2xl font-bold px-8 py-3 text-lg cursor-pointer transition-all duration-200 ${
        done 
          ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-[0_4px_25px_rgba(34,197,94,0.4),_0_2px_12px_rgba(34,197,94,0.3)] shadow-[0_3px_20px_rgba(34,197,94,0.25)] transform hover:scale-105' 
          : 'bg-amber-400 text-amber-800 hover:bg-amber-500 hover:text-white hover:shadow-[0_4px_25px_rgba(245,158,11,0.4),_0_2px_12px_rgba(245,158,11,0.3)] shadow-[0_3px_20px_rgba(245,158,11,0.25)] transform hover:scale-105'
      }`}
      onClick={onClick}
    >
      {done ? (label ? `✔ ${label} (Done)` : '✔ Marked as done') : (label ? label : 'Mark as done')}
    </button>
  );
}
