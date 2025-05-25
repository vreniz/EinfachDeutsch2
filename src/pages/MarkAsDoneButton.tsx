type Props = {
  done: boolean;
  onClick: () => void;
  label?: string;
};

export default function MarkAsDoneButton({ done, onClick, label }: Props) {
  return (
    <button
      className={`mark-as-done-btn ${done ? 'done' : ''}`}
      onClick={onClick}
      style={{
        background: done ? '#10b981' : '#fbbf24',
        color: done ? '#fff' : '#00375e',
        border: 'none',
        borderRadius: '2rem',
        fontWeight: 700,
        padding: '0.75rem 2.3rem',
        fontSize: '1.09rem',
        cursor: 'pointer',
        marginTop: 20,
        marginBottom: 10,
        transition: 'background 0.18s'
      }}
    >
      {done ? (label ? `✔ ${label} (Done)` : '✔ Marked as done') : (label ? label : 'Mark as done')}
    </button>
  );
}
