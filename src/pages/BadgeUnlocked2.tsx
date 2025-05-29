import klausBadge from "../assets/KlausBadge.png";
import badge1 from "../assets/badge2.png"; // cambiar la badge a badge 2 
import MarkAsDoneButton from "./MarkAsDoneButton";

type BadgeUnlockedProps = {
  done: boolean;
  onFinish: () => void;
};

export default function BadgeUnlocked({ done, onFinish }: BadgeUnlockedProps) {
  return (
    <div className="flex flex-col items-center my-12 min-h-[60vh] justify-center">
      <div className="flex items-start gap-24 mb-8 flex-wrap justify-center max-sm:gap-8">
        <div className="flex flex-col items-center max-w-[430px]">
          <img src={klausBadge} alt="Klaus celebrates" className="w-[500px] h-auto mb-6 max-sm:w-40" />
        </div>
        <div className="flex flex-col items-center max-w-[370px]">
          <div className="text-blue-700 text-4xl font-bold mb-6 tracking-widest text-center max-sm:text-3xl">BADGE</div>
          <img src={badge1} alt="Badge Section 2" className="w-[250px] mb-3 max-sm:w-40" />
        </div>
      </div>
      <div className="mt-[-1rem] mb-3">
        <MarkAsDoneButton
          done={done}
          onClick={onFinish}
          label="Finish Section 2"
        />
      </div>
    </div>
  );
}

// solo cambio la imagen ahora 