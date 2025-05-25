import Navbar from './Navbar';
import './Reminder.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_FREQUENCY = "daily";

function getFrequencyLabel(val: string) {
  switch(val) {
    case "daily": return "Daily";
    case "5days": return "Every 5 days";
    case "weekly": return "Weekly";
    case "15days": return "Every 15 days";
    case "monthly": return "Monthly";
    default: return "";
  }
}

export default function Reminder() {
  const [enabled, setEnabled] = useState(true);
  const [frequency, setFrequency] = useState(DEFAULT_FREQUENCY);
  const [saved, setSaved] = useState(false);
  const [lastSaved, setLastSaved] = useState<{enabled: boolean, frequency: string} | null>(null);
  const navigate = useNavigate();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setLastSaved({ enabled, frequency });
    setTimeout(() => setSaved(false), 1500);
  };

  const handleClose = () => {
    navigate('/home');
  };

  return (
    <>
      <Navbar />
      <div className="reminder-container">
        <div className="reminder-card">
          <button
            className="reminder-close-btn"
            onClick={handleClose}
            title="Close"
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="reminder-title">Practice Reminder Settings</h2>
          <p className="reminder-desc">
            Stay on track! Get practice reminders by email at your preferred frequency.
          </p>
          <form className="reminder-form" onSubmit={handleSave}>
            <div className="reminder-row">
              <label className="reminder-label">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={e => setEnabled(e.target.checked)}
                />
                Enable Email Reminders
              </label>
            </div>
            <div className="reminder-row">
              <label className="reminder-label" htmlFor="frequency">
                Frequency:
              </label>
              <select
                id="frequency"
                className="reminder-select"
                value={frequency}
                onChange={e => setFrequency(e.target.value)}
                disabled={!enabled}
              >
                <option value="daily">Daily</option>
                <option value="5days">Every 5 days</option>
                <option value="weekly">Weekly</option>
                <option value="15days">Every 15 days</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* BADGE Y SAVED ARRIBA DEL BOTÓN */}
            {(lastSaved && lastSaved.enabled) || saved ? (
              <div className="reminder-feedback-row">
                {saved && (
                  <div className="reminder-saved show">✅ Saved!</div>
                )}
                {lastSaved && lastSaved.enabled && (
                  <div className="reminder-frequency-feedback show">
                    <span>
                      <strong>Selected:</strong> {getFrequencyLabel(lastSaved.frequency)}
                    </span>
                  </div>
                )}
              </div>
            ) : null}

            <button className="reminder-btn" type="submit" disabled={!enabled}>
              Save Settings
            </button>
          </form>
          <div className="reminder-note">
            <span>
              ⏳ Email notifications will be powered by AWS SES & EventBridge soon.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
