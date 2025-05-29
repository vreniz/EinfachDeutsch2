import Navbar from './Navbar';
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
      <div className="bg-gradient-to-br from-blue-100 to-blue-400 min-h-screen flex justify-center items-start pt-18">
        <div className="relative bg-white rounded-[2.3rem] shadow-[0_8px_48px_rgba(37,99,235,0.2),0_2px_18px_rgba(96,165,250,0.13)] px-11 py-12 max-w-[410px] w-full flex flex-col items-center animate-[popin_0.6s_cubic-bezier(0.55,1.35,0.45,1)] overflow-visible">
          <button
            className="absolute top-6 left-6 bg-blue-600 border-none rounded-full w-11 h-11 text-3xl font-bold text-white cursor-pointer shadow-[0_4px_18px_rgba(37,99,235,0.33),0_0_0_5px_rgba(224,242,254,1)] flex items-center justify-center outline-none transition-all duration-150 z-10 p-0 hover:bg-blue-700 hover:scale-110 hover:-rotate-[10deg] hover:shadow-[0_8px_26px_rgba(37,99,235,0.53),0_0_0_7px_rgba(186,230,253,1)] focus:bg-blue-700 focus:scale-110 focus:-rotate-[10deg] focus:shadow-[0_8px_26px_rgba(37,99,235,0.53),0_0_0_7px_rgba(186,230,253,1)]"
            onClick={handleClose}
            title="Close"
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="text-3xl text-blue-600 font-extrabold mb-1 tracking-wide text-center flex gap-2 items-center">
            <span className="inline-block text-[1.17em] animate-[reminderBell_1.8s_infinite_cubic-bezier(0.5,0.2,0.4,1)]">⏰</span>
            Practice Reminder Settings
          </h2>
          <p className="text-blue-600/80 text-center mb-6 text-lg font-medium">
            Stay on track! Get practice reminders by email at your preferred frequency.
          </p>
          <form className="w-full flex flex-col gap-5 mt-1" onSubmit={handleSave}>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 text-blue-700 font-semibold text-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={e => setEnabled(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                />
                Enable Email Reminders
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-blue-700 font-semibold text-lg" htmlFor="frequency">
                Frequency:
              </label>
              <select
                id="frequency"
                className="bg-blue-50 border-2 border-blue-200 rounded-xl py-3 px-4 text-blue-700 font-medium text-base outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
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

            {(lastSaved && lastSaved.enabled) || saved ? (
              <div className="flex flex-col gap-2 items-center">
                {saved && (
                  <div className="text-green-600 font-bold text-lg opacity-100 transition-opacity duration-300">✅ Saved!</div>
                )}
                {lastSaved && lastSaved.enabled && (
                  <div className="bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-xl text-center opacity-100 transition-opacity duration-300">
                    <span>
                      <strong>Selected:</strong> {getFrequencyLabel(lastSaved.frequency)}
                    </span>
                  </div>
                )}
              </div>
            ) : null}

            <button 
              className="bg-blue-600 text-white font-bold text-lg py-4 px-8 rounded-2xl border-none cursor-pointer shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all duration-200 mt-2 hover:bg-blue-700 hover:shadow-[0_6px_28px_rgba(37,99,235,0.4)] hover:scale-105 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100" 
              type="submit" 
              disabled={!enabled}
            >
              Save Settings
            </button>
          </form>
          <div className="bg-blue-50 text-blue-600 text-sm py-3 px-4 rounded-xl text-center mt-5 font-medium">
            <span>
              ⏳ Email notifications will be powered by AWS SES & EventBridge soon.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
