// ExpBar.tsx
import { useUser } from "../../Context/UserContext";

export default function ExpBar() {
  const { progress } = useUser();

  // Calculate progress based on the UserContext progress data
  const calculateExpPercentage = (): number => {
    if (!progress) return 0;

    // Count completed sections
    let completedSections = 0;
    const totalSections = 8; // section1, section2, section3

    // Check each section if it's complete
    if (progress.section1?.section_complete) completedSections++;
    if (progress.section2?.section_complete) completedSections++;
    if (progress.section3?.section_complete) completedSections++;

    // Calculate percentage
    return Math.round((completedSections / totalSections) * 100);
  };

  const exp = calculateExpPercentage();

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
