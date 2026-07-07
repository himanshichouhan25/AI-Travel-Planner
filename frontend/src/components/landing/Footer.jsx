import { Plane } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-center">

          <div className="flex items-center gap-2 text-2xl font-bold">
            <Plane />
            AI Travel Planner
          </div>

          <div className="flex gap-8 mt-8 md:mt-0">

            <a href="#">Home</a>

            <a href="#">Features</a>

            <a href="#">Pricing</a>

            <a href="#">Contact</a>

          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">

          © 2026 AI Travel Planner. All rights reserved.

        </div>

      </div>
    </footer>
  );
};

export default Footer;