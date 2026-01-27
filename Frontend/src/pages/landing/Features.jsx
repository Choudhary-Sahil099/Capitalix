import {useState} from "react";
import SmartInvesting from "./SmartInvesting";
import Secure from "./Secure";
import Tracking from "./Tracking";
import Planning from "./Planing";




const Features = () => {
  const [activeFeature , setActiveFeature] = useState("investing");
  return (
    <section id="features" className="min-h-min w-full flex flex-col bg-[#000000] px-20 pt-20 gap-12">
      <div className="text-center">
        <h1 className="text-white text-6xl">
          Invest Smart from Day One —<br />{" "}
          <span className="textSan">Zero Investment Required</span>
        </h1>
      </div>
      <div className="flex justify-center items-center gap-25 text-xl pt-8 text-white">
       <button onClick={() => setActiveFeature("investing")} className={`feature-a ${activeFeature === "investing" ? "text-[#919191]" : ""}`}>Smart Investing</button>
       <button onClick={() => setActiveFeature("secure")} className={`feature-a ${activeFeature === "secure" ? "text-[#919191]" : ""}`}>Secure Assets</button>
       <button onClick={() => setActiveFeature("tracking")} className={`feature-a ${activeFeature === "tracking" ? "text-[#919191]" : ""}`}>Real-Time Tracking</button>
       <button onClick={() => setActiveFeature("planning")} className={`feature-a ${activeFeature === "planning" ? "text-[#919191]" : ""}`}>Easy Planning</button>

      </div>
      <div>
        {activeFeature === 'investing' && <SmartInvesting />}
        {activeFeature === 'secure' && <Secure />}
        {activeFeature === 'tracking' && <Tracking />}
        {activeFeature === 'planning' && <Planning />}

      </div>
      <div className="flex justify-center items-center">
        <button className="h-10 bg-[#CB3CFF] w-40 text-white rounded-md text-center text-md flex justify-center items-center">
          Explore
        </button>
      </div>
    </section>
  );
};

export default Features;
