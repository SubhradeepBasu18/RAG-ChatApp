import DarkVeil from "../ui/DarkVeil";
import { ShimmerButton } from './magicui/shimmer-button';

function CTA() {
  return (
    <div className="w-full h-full bg-black">
      <DarkVeil />
      <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="text-6xl text-white font-tracking-wider">Understand </span>
        <span className="text-6xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          Anything
        </span>
        <span className="text-2xl text-gray-300 text-center leading-10 tracking-wider">
          <p>With power AI</p>
        </span>
      </div>
      <div className="absolute bottom-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer">
        <ShimmerButton 
        className="px-6 py-2 text-xl hover:scale-110 transition-all duration-300 ease-in-out"
        onClick={() => window.location.href = "/notebook"}>
          Get Started
        </ShimmerButton>
      </div>
    </div>
  );
}

export default CTA;
