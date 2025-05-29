import Navbar from '../../components/NAVBAR';
import { useNavigate, useParams } from 'react-router-dom';
export default function Section2View() {
  const navigate = useNavigate();
  // Obtén el nivel de la URL (ejemplo: /sections/A1/section-2)
  const rawParams = useParams();
  const level = (rawParams.level as string) || "A1";

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center mt-8 mb-4">
        <button className="bg-blue-600 text-white border-none rounded-[2rem] font-bold text-xl px-8 py-4 cursor-pointer transition-colors duration-200 hover:bg-blue-700" onClick={() => navigate(`/sections/${level}`)}>
          ← SECTION 3
        </button>
      </div>
      <div className="my-12 mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Section 3</h2>
        <p className="text-lg text-gray-600">This is the placeholder for Section 3 content. Coming Soon...</p>
      </div>
    </div>
  );
}
