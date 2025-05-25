// ExpBar.tsx
import { useEffect, useState } from "react";
import { getExpPercentage } from "../utils/ExpUtils.ts";


type ExpBarProps = {
  level: string; // Ej: "A1"
};

export default function ExpBar({ level }: ExpBarProps) {
  const [exp, setExp] = useState(0);

  useEffect(() => {
    function updateExp() {
      setExp(getExpPercentage(level));
    }
    updateExp();

    // Optional: escucha cambios de storage para actualización en tiempo real
    window.addEventListener("storage", updateExp);
    return () => window.removeEventListener("storage", updateExp);
  }, [level]);

  return (
    <div style={{ width: "100%", maxWidth: 350, margin: "30px auto 20px auto" }}>
      <div style={{
        background: "#e5e7eb",
        borderRadius: 16,
        height: 28,
        overflow: "hidden",
        position: "relative"
      }}>
        <div
          style={{
            width: `${exp}%`,
            background: "linear-gradient(90deg,#38bdf8,#1769aa)",
            height: "100%",
            borderRadius: 16,
            transition: "width 0.5s"
          }}
        />
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, color: "#1e293b", letterSpacing: 1
        }}>
          EXP: {exp}%
        </div>
      </div>
    </div>
  );
}
