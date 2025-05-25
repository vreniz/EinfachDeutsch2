import klausBadge from "../assets/KlausBadge.png";
import badge1 from "../assets/badge2.png";//cambiar la badge a badge 2 
import './BadgeUnlocked1.css';
import MarkAsDoneButton from "./MarkAsDoneButton";

type BadgeUnlockedProps = {
  done: boolean;
  onFinish: () => void;
};

export default function BadgeUnlocked({ done, onFinish }: BadgeUnlockedProps) {
  return (
    <div className="badge-unlocked-container">
      <div className="badge-unlocked-row">
        <div className="klaus-badge-side">
          <img src={klausBadge} alt="Klaus celebrates" className="klaus-badge-img" />
        </div>
        <div className="badge-section-side">
          <div className="badge-section-title">BADGE</div>
          <img src={badge1} alt="Badge Section 1" className="badge-img" />
        </div>
      </div>
      <MarkAsDoneButton
        done={done}
        onClick={onFinish}
        label="Finish Section 2"
      />
    </div>
  );
}

// solo cambio la imagen ahora 